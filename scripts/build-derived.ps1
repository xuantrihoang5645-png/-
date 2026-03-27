$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$dataDir = Join-Path $root 'data'

function Read-Json($path) {
  Get-Content -Path $path -Raw -Encoding UTF8 | ConvertFrom-Json
}

function Write-Json($path, $value) {
  $value | ConvertTo-Json -Depth 12 | Set-Content -Path $path -Encoding UTF8
}

function Write-Text($path, $value) {
  Set-Content -Path $path -Value $value -Encoding UTF8
}

function Normalize([double[]]$values, [Nullable[double]]$target, [bool]$inverse = $false) {
  if ($null -eq $target) { return $null }
  $filtered = @($values | Where-Object { $null -ne $_ })
  if (-not $filtered.Count) { return $null }
  $min = ($filtered | Measure-Object -Minimum).Minimum
  $max = ($filtered | Measure-Object -Maximum).Maximum
  if ($max -eq $min) { return 50.0 }
  $score = (($target - $min) / ($max - $min)) * 100
  if ($inverse) { $score = 100 - $score }
  return [math]::Round($score, 1)
}

function Weighted-Score($parts) {
  $valid = @($parts | Where-Object { $null -ne $_.value })
  $weight = 0.0
  foreach ($part in $valid) { $weight += $part.weight }
  if ($weight -lt 0.75) { return $null }

  $sum = 0.0
  foreach ($part in $valid) { $sum += $part.value * $part.weight }
  return [math]::Round($sum / $weight, 1)
}

function Get-IncomeMonthly($row) {
  if ($null -ne $row.wageReferenceMonthly) { return [double]$row.wageReferenceMonthly }
  if ($null -ne $row.disposableIncome) { return [double]$row.disposableIncome / 12 }
  return $null
}

function Get-CoverageScore($city) {
  $income = if ($null -ne $city.disposableIncome -or $null -ne $city.wageReferenceMonthly) { 1.0 } else { 0.0 }
  $cost = if ($null -ne $city.rentMedian -and $null -ne $city.annualConsumptionPerCapita) { 1.0 } elseif ($null -ne $city.rentMedian -or $null -ne $city.annualConsumptionPerCapita) { 0.5 } else { 0.0 }

  $mobility = if ($null -ne $city.commuteIndex) {
    1.0
  } elseif (
    ($null -ne $city.avgCommuteTime) -and
    ($null -ne $city.commuteWithin45 -or $null -ne $city.railTransitLength -or $null -ne $city.publicTransportScore)
  ) {
    0.75
  } elseif ($null -ne $city.avgCommuteTime -or $null -ne $city.commuteWithin45 -or $null -ne $city.railTransitLength) {
    0.5
  } else {
    0.0
  }

  $environment = if ($null -ne $city.airQualityScore) {
    1.0
  } elseif ($null -ne $city.goodAirDaysRatio -and $null -ne $city.pm25Reference) {
    0.85
  } elseif ($null -ne $city.goodAirDaysRatio -or $null -ne $city.pm25Reference) {
    0.5
  } else {
    0.0
  }

  $services = if ($null -ne $city.basicServices) {
    1.0
  } elseif (
    ($null -ne $city.publicTransportScore) -and
    ($null -ne $city.utilityCoverage -or $null -ne $city.greenPublicSpaceProxy)
  ) {
    0.75
  } elseif ($null -ne $city.utilityCoverage -or $null -ne $city.greenPublicSpaceProxy -or $null -ne $city.publicTransportScore) {
    0.5
  } else {
    0.0
  }

  return [math]::Round((($income + $cost + $mobility + $environment + $services) / 5), 2)
}

function Get-CoverageCode([double]$score) {
  if ($score -ge 0.8) { return 'full' }
  if ($score -ge 0.6) { return 'degraded' }
  return 'limited'
}

function Get-CoverageLabel([string]$code) {
  switch ($code) {
    'full' { return 'full' }
    'degraded' { return 'degraded' }
    default { return 'limited' }
  }
}

function Distinct-Array($items) {
  return @($items | Where-Object { $null -ne $_ -and $_ -ne '' } | Select-Object -Unique)
}

function Get-LatestDate($items) {
  $dates = @($items | Where-Object { $_ } | Sort-Object)
  if ($dates.Count) { return $dates[-1] }
  return $null
}

function Get-ConfidenceAverage($items) {
  $values = @($items | Where-Object { $null -ne $_ })
  if (-not $values.Count) { return $null }
  return [math]::Round((($values | Measure-Object -Average).Average), 2)
}

$cities = Read-Json (Join-Path $dataDir 'cities.json')
$cost = Read-Json (Join-Path $dataDir 'cost-of-living.json')
$income = Read-Json (Join-Path $dataDir 'income.json')
$mobility = Read-Json (Join-Path $dataDir 'mobility.json')
$environment = Read-Json (Join-Path $dataDir 'environment.json')
$sources = Read-Json (Join-Path $dataDir 'sources.json')
$meta = Read-Json (Join-Path $dataDir 'meta.json')
$aiConfig = Read-Json (Join-Path $dataDir 'ai-config.json')

$generatedAt = (Get-Date).ToString('yyyy-MM-dd')

$costMap = @{}; $cost | ForEach-Object { $costMap[$_.cityId] = $_ }
$incomeMap = @{}; $income | ForEach-Object { $incomeMap[$_.cityId] = $_ }
$mobilityMap = @{}; $mobility | ForEach-Object { $mobilityMap[$_.cityId] = $_ }
$environmentMap = @{}; $environment | ForEach-Object { $environmentMap[$_.cityId] = $_ }

$rentValues = @($cost | ForEach-Object { $_.rentMedian })
$consumptionValues = @($cost | ForEach-Object { $_.annualConsumptionPerCapita })
$incomeValues = @($income | ForEach-Object { $_.disposableIncome })
$avgCommuteValues = @($mobility | ForEach-Object { $_.avgCommuteTime })
$reachValues = @($mobility | ForEach-Object { $_.commuteWithin45 })
$railValues = @($mobility | ForEach-Object { $_.railTransitLength })
$publicValues = @($mobility | ForEach-Object { $_.publicTransportScore })
$utilityValues = @($mobility | ForEach-Object { $_.utilityCoverage })
$greenValues = @($mobility | ForEach-Object { $_.greenPublicSpaceProxy })
$pmValues = @($environment | ForEach-Object { $_.pm25Reference })

$rentBurdens = foreach ($item in $cost) {
  $linked = $incomeMap[$item.cityId]
  $monthly = Get-IncomeMonthly $linked
  if ($null -ne $item.rentMedian -and $null -ne $monthly) {
    $item.rentMedian / $monthly
  } else {
    $null
  }
}

$mergedCities = @()
$generatedMetrics = @()
$personaRows = @()

foreach ($city in $cities) {
  $costRow = $costMap[$city.id]
  $incomeRow = $incomeMap[$city.id]
  $mobilityRow = $mobilityMap[$city.id]
  $environmentRow = $environmentMap[$city.id]

  $incomeMonthly = Get-IncomeMonthly $incomeRow
  $rentBurdenProxy = if ($null -ne $costRow.rentMedian -and $null -ne $incomeMonthly) {
    [math]::Round($costRow.rentMedian / $incomeMonthly, 3)
  } else { $null }

  $rentIndex = Normalize $rentValues $costRow.rentMedian
  $rentBurdenIndex = Normalize $rentBurdens $rentBurdenProxy
  $consumptionIndex = Normalize $consumptionValues $costRow.annualConsumptionPerCapita

  $commuteIndex = Weighted-Score @(
    @{ value = if ($null -ne $mobilityRow.commuteWithin45) { Normalize $reachValues $mobilityRow.commuteWithin45 } else { $null }; weight = 0.35 },
    @{ value = if ($null -ne $mobilityRow.avgCommuteTime) { Normalize $avgCommuteValues $mobilityRow.avgCommuteTime $true } else { $null }; weight = 0.25 },
    @{ value = if ($null -ne $mobilityRow.railTransitLength) { Normalize $railValues $mobilityRow.railTransitLength } else { $null }; weight = 0.20 },
    @{ value = if ($null -ne $mobilityRow.publicTransportScore) { Normalize $publicValues $mobilityRow.publicTransportScore } else { $null }; weight = 0.20 }
  )

  $basicServices = Weighted-Score @(
    @{ value = if ($null -ne $mobilityRow.publicTransportScore) { Normalize $publicValues $mobilityRow.publicTransportScore } else { $null }; weight = 0.40 },
    @{ value = if ($null -ne $mobilityRow.utilityCoverage) { Normalize $utilityValues $mobilityRow.utilityCoverage } else { $null }; weight = 0.30 },
    @{ value = if ($null -ne $mobilityRow.greenPublicSpaceProxy) { Normalize $greenValues $mobilityRow.greenPublicSpaceProxy } else { $null }; weight = 0.30 }
  )

  $transportCostIndex = if ($null -ne $commuteIndex) {
    [math]::Round(100 - $commuteIndex, 1)
  } elseif ($null -ne $mobilityRow.avgCommuteTime) {
    Normalize $avgCommuteValues $mobilityRow.avgCommuteTime
  } else {
    $null
  }

  $pmScore = if ($null -ne $environmentRow.pm25Reference) {
    100 - (Normalize $pmValues $environmentRow.pm25Reference)
  } else {
    $null
  }

  $airQualityScore = if ($null -ne $environmentRow.goodAirDaysRatio -and $null -ne $pmScore) {
    [math]::Round($environmentRow.goodAirDaysRatio * 0.6 + $pmScore * 0.4, 1)
  } else {
    $null
  }

  $incomeScore = Normalize $incomeValues $incomeRow.disposableIncome
  $totalCostIndex = Weighted-Score @(
    @{ value = $rentBurdenIndex; weight = 0.40 },
    @{ value = $consumptionIndex; weight = 0.35 },
    @{ value = $rentIndex; weight = 0.15 },
    @{ value = $transportCostIndex; weight = 0.10 }
  )
  $costFriendliness = if ($null -ne $totalCostIndex) { [math]::Round(100 - $totalCostIndex, 1) } else { $null }

  $savingScore = Weighted-Score @(
    @{ value = $incomeScore; weight = 0.35 },
    @{ value = if ($null -ne $rentBurdenIndex) { 100 - $rentBurdenIndex } else { $null }; weight = 0.35 },
    @{ value = $costFriendliness; weight = 0.20 },
    @{ value = $commuteIndex; weight = 0.10 }
  )

  $graduateScore = Weighted-Score @(
    @{ value = if ($null -ne $rentBurdenIndex) { 100 - $rentBurdenIndex } else { $null }; weight = 0.35 },
    @{ value = $costFriendliness; weight = 0.30 },
    @{ value = $commuteIndex; weight = 0.20 },
    @{ value = $basicServices; weight = 0.15 }
  )

  $balancedScore = Weighted-Score @(
    @{ value = $costFriendliness; weight = 0.25 },
    @{ value = $commuteIndex; weight = 0.25 },
    @{ value = $airQualityScore; weight = 0.25 },
    @{ value = $basicServices; weight = 0.25 }
  )

  $coupleInputs = @($balancedScore, $airQualityScore, $savingScore) | Where-Object { $null -ne $_ }
  $coupleScore = if ($coupleInputs.Count) {
    [math]::Round((($coupleInputs | Measure-Object -Sum).Sum) / $coupleInputs.Count, 1)
  } else {
    $null
  }

  $qualityFlags = Distinct-Array @(
    $city.qualityFlags
    $costRow.qualityFlags
    $incomeRow.qualityFlags
    $mobilityRow.qualityFlags
    $environmentRow.qualityFlags
  )

  $sourceRefs = Distinct-Array @(
    $city.sourceRefs
    $costRow.sourceRefs
    $incomeRow.sourceRefs
    $mobilityRow.sourceRefs
    $environmentRow.sourceRefs
  )

  $coverageScore = Get-CoverageScore ([pscustomobject]@{
    disposableIncome = $incomeRow.disposableIncome
    wageReferenceMonthly = $incomeRow.wageReferenceMonthly
    rentMedian = $costRow.rentMedian
    annualConsumptionPerCapita = $costRow.annualConsumptionPerCapita
    commuteIndex = $commuteIndex
    avgCommuteTime = $mobilityRow.avgCommuteTime
    railTransitLength = $mobilityRow.railTransitLength
    airQualityScore = $airQualityScore
    goodAirDaysRatio = $environmentRow.goodAirDaysRatio
    pm25Reference = $environmentRow.pm25Reference
    basicServices = $basicServices
    utilityCoverage = $mobilityRow.utilityCoverage
    publicTransportScore = $mobilityRow.publicTransportScore
    greenPublicSpaceProxy = $mobilityRow.greenPublicSpaceProxy
  })

  $coverageCode = Get-CoverageCode $coverageScore
  $coverageLabel = Get-CoverageLabel $coverageCode
  $confidence = Get-ConfidenceAverage @(
    $costRow.confidence
    $incomeRow.confidence
    $mobilityRow.confidence
    $environmentRow.confidence
  )

  $latestLabel = @(
    $costRow.periodLabel
    $incomeRow.periodLabel
    $mobilityRow.periodLabel
    $environmentRow.periodLabel
  ) | Where-Object { $_ } | Select-Object -First 1

  if (-not $latestLabel) {
    $latestLabel = 'Latest verified snapshot'
  }

  $alignmentFlags = @()
  if ($costRow.period -notmatch '^2024$') { $alignmentFlags += 'rent_not_aligned_2024' }
  if ($mobilityRow.period -notmatch '^2024$') { $alignmentFlags += 'mobility_not_fully_aligned_2024' }
  if ($environmentRow.period -notmatch '^2024$') { $alignmentFlags += 'environment_not_fully_aligned_2024' }

  $alignedAnnualLabel = if ($alignmentFlags.Count) {
    'Aligned annual mode targets 2024, but this city still contains newer or mixed snapshots.'
  } else {
    'Aligned annual mode is fully aligned to 2024 for the current core fields.'
  }

  $lastUpdated = Get-LatestDate @(
    $city.lastUpdated
    $costRow.lastUpdated
    $incomeRow.lastUpdated
    $mobilityRow.lastUpdated
    $environmentRow.lastUpdated
  )

  $populationValues = @($cities | ForEach-Object { $_.population })
  $populationScore = Normalize $populationValues $city.population
  $opportunityScore = Weighted-Score @(
    @{ value = $incomeScore; weight = 0.55 },
    @{ value = $populationScore; weight = 0.45 }
  )

  $pressureScore = if ($null -ne $totalCostIndex) {
    $totalCostIndex
  } elseif ($null -ne $rentIndex) {
    $rentIndex
  } else {
    48
  }

  $periods = [ordered]@{
    latest = [ordered]@{
      label = $latestLabel
      note = 'Latest mode shows the most recent verifiable snapshot for each metric.'
      aligned = $false
      flags = @()
    }
    alignedAnnual = [ordered]@{
      label = $alignedAnnualLabel
      note = 'Aligned annual mode prefers 2024, but may retain newer snapshots where 2024 city-level values are unavailable.'
      aligned = ($alignmentFlags.Count -eq 0)
      flags = $alignmentFlags
    }
  }

  $mergedCity = [ordered]@{
    id = $city.id
    name = $city.name
    pinyin = $city.pinyin
    province = $city.province
    region = $city.region
    tier = $city.tier
    coordinates = $city.coordinates
    shortDescription = $city.shortDescription
    longDescription = $city.longDescription
    tags = $city.tags
    suitableFor = $city.suitableFor
    notIdealFor = $city.notIdealFor
    population = $city.population
    populationUnit = $city.populationUnit
    disposableIncome = $incomeRow.disposableIncome
    wageReferenceMonthly = $incomeRow.wageReferenceMonthly
    annualConsumptionPerCapita = $costRow.annualConsumptionPerCapita
    rentMedian = $costRow.rentMedian
    rentMedianPerSqm = $costRow.rentMedianPerSqm
    assumedDwellingSizeSqm = $costRow.assumedDwellingSizeSqm
    avgCommuteTime = $mobilityRow.avgCommuteTime
    commuteWithin45 = $mobilityRow.commuteWithin45
    publicTransportScore = $mobilityRow.publicTransportScore
    railTransitLength = $mobilityRow.railTransitLength
    utilityCoverage = $mobilityRow.utilityCoverage
    greenPublicSpaceProxy = $mobilityRow.greenPublicSpaceProxy
    pm25Reference = $environmentRow.pm25Reference
    goodAirDaysRatio = $environmentRow.goodAirDaysRatio
    rentBurdenProxy = $rentBurdenProxy
    rentIndex = $rentIndex
    rentBurdenIndex = $rentBurdenIndex
    consumptionIndex = $consumptionIndex
    transportCostIndex = $transportCostIndex
    totalCostIndex = $totalCostIndex
    costFriendliness = $costFriendliness
    commuteIndex = $commuteIndex
    basicServices = $basicServices
    airQualityScore = $airQualityScore
    savingScore = $savingScore
    graduateScore = $graduateScore
    balancedScore = $balancedScore
    coupleScore = $coupleScore
    opportunityScore = $opportunityScore
    pressureScore = $pressureScore
    coverageScore = $coverageScore
    coverageCode = $coverageCode
    coverageLabel = $coverageLabel
    aiEligible = ($coverageScore -ge 0.6)
    sourceRefs = $sourceRefs
    qualityFlags = $qualityFlags
    confidence = $confidence
    isEstimated = [bool]($costRow.isEstimated -or $mobilityRow.isEstimated -or $environmentRow.isEstimated -or $incomeRow.isEstimated)
    periods = $periods
    displayPeriodLabel = $latestLabel
    lastUpdated = $lastUpdated
  }

  $mergedCities += [pscustomobject]$mergedCity

  $generatedMetrics += [pscustomobject]@{
    cityId = $city.id
    rentBurdenProxy = $rentBurdenProxy
    rentIndex = $rentIndex
    rentBurdenIndex = $rentBurdenIndex
    consumptionIndex = $consumptionIndex
    commuteIndex = $commuteIndex
    basicServices = $basicServices
    airQualityScore = $airQualityScore
    transportCostIndex = $transportCostIndex
    totalCostIndex = $totalCostIndex
    costFriendliness = $costFriendliness
    savingScore = $savingScore
    graduateScore = $graduateScore
    balancedScore = $balancedScore
    coupleScore = $coupleScore
    coverageScore = $coverageScore
    coverageLevel = $coverageLabel
    sourceRefs = $sourceRefs
    qualityFlags = $qualityFlags
    confidence = $confidence
    periods = $periods
    generatedAt = $generatedAt
  }

  $personaRows += [pscustomobject]@{
    cityId = $city.id
    suitableForGraduates = $graduateScore
    suitableForCouples = $coupleScore
    suitableForBudget = $costFriendliness
    suitableForSavingMoney = $savingScore
    suitableForTransit = $commuteIndex
    suitableForAirQuality = $airQualityScore
    explanation = 'Generated from income, rent, mobility, environment and service signals for the local rule engine.'
    source = 'rule-engine-local'
    sourceRefs = @('ai-config-rule-engine')
    lastUpdated = $generatedAt
  }
}

$regions = Distinct-Array ($mergedCities | ForEach-Object { $_.region })
$tiers = Distinct-Array ($mergedCities | ForEach-Object { $_.tier })

$summary = [ordered]@{
  totalCities = $mergedCities.Count
  aiEligibleCities = @($mergedCities | Where-Object { $_.aiEligible }).Count
  fullCoverageCities = @($mergedCities | Where-Object { $_.coverageCode -eq 'full' }).Count
  degradedCoverageCities = @($mergedCities | Where-Object { $_.coverageCode -eq 'degraded' }).Count
  limitedCoverageCities = @($mergedCities | Where-Object { $_.coverageCode -eq 'limited' }).Count
  coreMetricCount = 6
}

$viewModel = [ordered]@{
  generatedAt = $generatedAt
  summary = $summary
  enums = [ordered]@{
    tiers = $tiers
    regions = $regions
    mapMetrics = @(
      [ordered]@{ key = 'totalCostIndex'; label = 'totalCostIndex'; suffix = ''; direction = 'lowerBetter' }
      [ordered]@{ key = 'rentBurdenProxy'; label = 'rentBurdenProxy'; suffix = ''; direction = 'lowerBetter' }
      [ordered]@{ key = 'commuteIndex'; label = 'commuteIndex'; suffix = ''; direction = 'higherBetter' }
      [ordered]@{ key = 'airQualityScore'; label = 'airQualityScore'; suffix = ''; direction = 'higherBetter' }
      [ordered]@{ key = 'balancedScore'; label = 'balancedScore'; suffix = ''; direction = 'higherBetter' }
      [ordered]@{ key = 'savingScore'; label = 'savingScore'; suffix = ''; direction = 'higherBetter' }
    )
  }
  cities = $mergedCities
}

$bootstrap = [ordered]@{
  generatedAt = $generatedAt
  meta = $meta
  sources = $sources
  aiConfig = $aiConfig
  viewModel = $viewModel
}

Write-Json (Join-Path $dataDir 'generated-metrics.json') $generatedMetrics
Write-Json (Join-Path $dataDir 'persona-recommendation.json') $personaRows
Write-Json (Join-Path $dataDir 'view-model.json') $viewModel
Write-Text (Join-Path $dataDir 'bootstrap.js') ("window.CITY_SITE_DATA = " + ($bootstrap | ConvertTo-Json -Depth 12) + ";" + [Environment]::NewLine)

Write-Host "Generated derived data for $($mergedCities.Count) cities."
