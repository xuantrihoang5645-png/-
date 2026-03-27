$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$dataDir = Join-Path $root 'data'
$rawDir = Join-Path $dataDir 'raw'

function Read-Json($path) {
  Get-Content -Path $path -Raw -Encoding UTF8 | ConvertFrom-Json
}

function Write-Json($path, $value) {
  $value | ConvertTo-Json -Depth 30 | Set-Content -Path $path -Encoding UTF8
}

function Write-Text($path, $value) {
  Set-Content -Path $path -Value $value -Encoding UTF8
}

function Distinct-Array($items) {
  return @($items | Where-Object { $null -ne $_ -and $_ -ne '' } | Select-Object -Unique)
}

function To-NullableNumber($value) {
  if ($null -eq $value) { return $null }
  if ($value -is [int] -or $value -is [double] -or $value -is [decimal]) {
    return [double]$value
  }
  $text = [string]$value
  if ([string]::IsNullOrWhiteSpace($text)) { return $null }
  $normalized = $text -replace ',', ''
  $parsed = 0.0
  if ([double]::TryParse($normalized, [ref]$parsed)) {
    return $parsed
  }
  return $null
}

function Normalize($values, $target, [bool]$inverse = $false) {
  $targetValue = To-NullableNumber $target
  if ($null -eq $targetValue) { return $null }

  $filtered = @($values | ForEach-Object { To-NullableNumber $_ } | Where-Object { $null -ne $_ })
  if (-not $filtered.Count) { return $null }

  $minimum = ($filtered | Measure-Object -Minimum).Minimum
  $maximum = ($filtered | Measure-Object -Maximum).Maximum
  if ($maximum -eq $minimum) { return 50.0 }

  $score = (($targetValue - $minimum) / ($maximum - $minimum)) * 100
  if ($inverse) { $score = 100 - $score }
  return [math]::Round([double]$score, 1)
}

function Weighted-Score($parts) {
  $valid = @($parts | Where-Object { $null -ne $_.value })
  if (-not $valid.Count) { return $null }

  $weightSum = 0.0
  foreach ($part in $valid) { $weightSum += [double]$part.weight }
  if ($weightSum -le 0) { return $null }

  $sum = 0.0
  foreach ($part in $valid) {
    $sum += ([double]$part.value * [double]$part.weight)
  }

  return [math]::Round($sum / $weightSum, 1)
}

function Province-Code-From-City-Code([string]$cityCode) {
  if ([string]::IsNullOrWhiteSpace($cityCode) -or $cityCode.Length -lt 2) { return $null }
  return '{0}0000000000' -f $cityCode.Substring(0, 2)
}

function Get-Region-By-Province-Code([string]$provinceCode) {
  switch ($provinceCode.Substring(0, 2)) {
    { $_ -in @('11', '12', '13', '14', '15') } { return 'northChina' }
    { $_ -in @('21', '22', '23') } { return 'northEast' }
    { $_ -in @('31', '32', '33', '34', '35', '36', '37') } { return 'eastChina' }
    { $_ -in @('41', '42', '43') } { return 'centralChina' }
    { $_ -in @('44', '45', '46') } { return 'southChina' }
    { $_ -in @('50', '51', '52', '53', '54') } { return 'southWest' }
    { $_ -in @('61', '62', '63', '64', '65') } { return 'northWest' }
    default { return 'greaterChinaLimited' }
  }
}

function Map-Existing-Region($value) {
  switch ($value) {
    '华北' { return 'northChina' }
    '东北' { return 'northEast' }
    '华东' { return 'eastChina' }
    '华中' { return 'centralChina' }
    '华南' { return 'southChina' }
    '西南' { return 'southWest' }
    '西北' { return 'northWest' }
    default { return $value }
  }
}

function Map-Existing-Tier($value) {
  switch ($value) {
    '一线' { return 'tier1' }
    '新一线' { return 'newTier1' }
    '强二线' { return 'strongTier2' }
    default { return $value }
  }
}

function New-Lookup($rows, [string]$keyName) {
  $lookup = @{}
  foreach ($row in $rows) {
    $key = $row.$keyName
    if ($null -ne $key -and $key -ne '') {
      $lookup[$key] = $row
    }
  }
  return $lookup
}

function Get-Metric-Value($metricContainer, [string]$key) {
  if ($null -eq $metricContainer) { return $null }
  $metric = $metricContainer.$key
  if ($null -eq $metric) { return $null }
  return To-NullableNumber $metric.value
}

$cityReference = @{
  '110000000000' = @{ coordinates = @(116.4074, 39.9042); tier = 'tier1' }
  '120000000000' = @{ coordinates = @(117.2000, 39.1333); tier = 'newTier1' }
  '130100000000' = @{ coordinates = @(114.5149, 38.0428); tier = 'strongTier2' }
  '140100000000' = @{ coordinates = @(112.5492, 37.8570); tier = 'strongTier2' }
  '150100000000' = @{ coordinates = @(111.7519, 40.8415); tier = 'strongTier2' }
  '210100000000' = @{ coordinates = @(123.4315, 41.8057); tier = 'strongTier2' }
  '210200000000' = @{ coordinates = @(121.6147, 38.9140); tier = 'strongTier2' }
  '220100000000' = @{ coordinates = @(125.3235, 43.8171); tier = 'strongTier2' }
  '230100000000' = @{ coordinates = @(126.5349, 45.8038); tier = 'strongTier2' }
  '310000000000' = @{ coordinates = @(121.4737, 31.2304); tier = 'tier1' }
  '320100000000' = @{ coordinates = @(118.7969, 32.0603); tier = 'newTier1' }
  '320500000000' = @{ coordinates = @(120.5853, 31.2989); tier = 'newTier1' }
  '330100000000' = @{ coordinates = @(120.1551, 30.2741); tier = 'newTier1' }
  '330200000000' = @{ coordinates = @(121.5503, 29.8746); tier = 'newTier1' }
  '340100000000' = @{ coordinates = @(117.2272, 31.8206); tier = 'strongTier2' }
  '350100000000' = @{ coordinates = @(119.2965, 26.0745); tier = 'strongTier2' }
  '350200000000' = @{ coordinates = @(118.0894, 24.4798); tier = 'strongTier2' }
  '360100000000' = @{ coordinates = @(115.8582, 28.6829); tier = 'strongTier2' }
  '370100000000' = @{ coordinates = @(117.1201, 36.6512); tier = 'strongTier2' }
  '370200000000' = @{ coordinates = @(120.3826, 36.0671); tier = 'newTier1' }
  '410100000000' = @{ coordinates = @(113.6254, 34.7466); tier = 'newTier1' }
  '420100000000' = @{ coordinates = @(114.3054, 30.5931); tier = 'newTier1' }
  '430100000000' = @{ coordinates = @(112.9389, 28.2282); tier = 'newTier1' }
  '440100000000' = @{ coordinates = @(113.2644, 23.1291); tier = 'tier1' }
  '440300000000' = @{ coordinates = @(114.0579, 22.5431); tier = 'tier1' }
  '450100000000' = @{ coordinates = @(108.3669, 22.8170); tier = 'strongTier2' }
  '460100000000' = @{ coordinates = @(110.1983, 20.0440); tier = 'strongTier2' }
  '500000000000' = @{ coordinates = @(106.5516, 29.5630); tier = 'newTier1' }
  '510100000000' = @{ coordinates = @(104.0665, 30.5728); tier = 'newTier1' }
  '520100000000' = @{ coordinates = @(106.6302, 26.6470); tier = 'strongTier2' }
  '530100000000' = @{ coordinates = @(102.8332, 24.8797); tier = 'strongTier2' }
  '540100000000' = @{ coordinates = @(91.1322, 29.6604); tier = 'strongTier2' }
  '610100000000' = @{ coordinates = @(108.9398, 34.3416); tier = 'newTier1' }
  '620100000000' = @{ coordinates = @(103.8343, 36.0611); tier = 'strongTier2' }
  '630100000000' = @{ coordinates = @(101.7782, 36.6171); tier = 'strongTier2' }
  '640100000000' = @{ coordinates = @(106.2309, 38.4872); tier = 'strongTier2' }
  '650100000000' = @{ coordinates = @(87.6168, 43.8256); tier = 'strongTier2' }
}

$deepCodeByName = @{
  '北京' = '110000000000'
  '上海' = '310000000000'
  '广州' = '440100000000'
  '深圳' = '440300000000'
  '杭州' = '330100000000'
  '南京' = '320100000000'
  '武汉' = '420100000000'
  '苏州' = '320500000000'
  '厦门' = '350200000000'
}

$sources = Read-Json (Join-Path $dataDir 'sources.json')
$aiConfig = Read-Json (Join-Path $dataDir 'ai-config.json')

$citiesRaw = Read-Json (Join-Path $dataDir 'cities.json')
$incomeRaw = Read-Json (Join-Path $dataDir 'income.json')
$costRaw = Read-Json (Join-Path $dataDir 'cost-of-living.json')
$mobilityRaw = Read-Json (Join-Path $dataDir 'mobility.json')
$environmentRaw = Read-Json (Join-Path $dataDir 'environment.json')
$generatedRaw = Read-Json (Join-Path $dataDir 'generated-metrics.json')
$personaRaw = Read-Json (Join-Path $dataDir 'persona-recommendation.json')

$provinceRaw = Read-Json (Join-Path $rawDir 'nbs-province-annual-2024.json')
$majorCityRaw = Read-Json (Join-Path $rawDir 'nbs-major-city-annual-2024.json')

$cityById = New-Lookup $citiesRaw 'id'
$incomeById = New-Lookup $incomeRaw 'cityId'
$costById = New-Lookup $costRaw 'cityId'
$mobilityById = New-Lookup $mobilityRaw 'cityId'
$environmentById = New-Lookup $environmentRaw 'cityId'
$generatedById = New-Lookup $generatedRaw 'cityId'
$personaById = New-Lookup $personaRaw 'cityId'

$provinceRows = @($provinceRaw.provinces)
$provinceByCode = New-Lookup $provinceRows 'code'
$majorCityRows = @($majorCityRaw.cities)
$majorCityByCode = New-Lookup $majorCityRows 'code'

$provinceComparable = @($provinceRows | Where-Object { $_.code -notin @('710000000000', '810000000000', '820000000000') })
$provinceIncomeValues = @($provinceComparable | ForEach-Object { Get-Metric-Value $_.metrics 'disposableIncome' })
$provinceConsumptionRatioValues = @($provinceComparable | ForEach-Object {
    $income = Get-Metric-Value $_.metrics 'disposableIncome'
    $consumption = Get-Metric-Value $_.metrics 'consumption'
    if ($null -ne $income -and $income -gt 0 -and $null -ne $consumption) {
      [math]::Round($consumption / $income, 4)
    }
  })
$provinceGreenValues = @($provinceComparable | ForEach-Object { Get-Metric-Value $_.metrics 'parkGreenPerCapita' })
$provinceRailValues = @($provinceComparable | ForEach-Object { Get-Metric-Value $_.metrics 'railwayLength' })
$provinceRoadValues = @($provinceComparable | ForEach-Object { Get-Metric-Value $_.metrics 'highwayLength' })

$provinceRecords = @()
foreach ($province in $provinceRows) {
  $code = $province.code
  $region = Get-Region-By-Province-Code $code
  $isLimited = $code -in @('710000000000', '810000000000', '820000000000')

  $population = Get-Metric-Value $province.metrics 'population'
  $income = Get-Metric-Value $province.metrics 'disposableIncome'
  $consumption = Get-Metric-Value $province.metrics 'consumption'
  $parkGreen = Get-Metric-Value $province.metrics 'parkGreenPerCapita'
  $gasCoverage = Get-Metric-Value $province.metrics 'gasCoverage'
  $railway = Get-Metric-Value $province.metrics 'railwayLength'
  $highway = Get-Metric-Value $province.metrics 'highwayLength'

  $consumptionRatio = if ($null -ne $income -and $income -gt 0 -and $null -ne $consumption) {
    [math]::Round($consumption / $income, 4)
  } else {
    $null
  }

  $incomeSupportScore = Normalize $provinceIncomeValues $income
  $consumptionBurdenScore = Normalize $provinceConsumptionRatioValues $consumptionRatio $true
  $greenScore = Normalize $provinceGreenValues $parkGreen
  $railScore = Normalize $provinceRailValues $railway
  $roadScore = Normalize $provinceRoadValues $highway
  $publicServiceScore = Weighted-Score @(
    @{ value = $gasCoverage; weight = 0.45 }
    @{ value = $greenScore; weight = 0.25 }
    @{ value = $railScore; weight = 0.15 }
    @{ value = $roadScore; weight = 0.15 }
  )
  $overviewScore = Weighted-Score @(
    @{ value = $incomeSupportScore; weight = 0.35 }
    @{ value = $consumptionBurdenScore; weight = 0.25 }
    @{ value = $publicServiceScore; weight = 0.20 }
    @{ value = $greenScore; weight = 0.20 }
  )

  $presentCount = @($population, $income, $consumption, $parkGreen, $gasCoverage, $railway, $highway | Where-Object { $null -ne $_ }).Count
  $coverageScore = if ($isLimited) { 0.35 } else { [math]::Round($presentCount / 7, 2) }
  $coverageLevel = if ($isLimited) { 'limited' } elseif ($coverageScore -ge 0.86) { 'full' } else { 'degraded' }

  $representativeCities = @(
    $majorCityRows |
      Where-Object { (Province-Code-From-City-Code $_.code) -eq $code } |
      Select-Object -First 3 |
      ForEach-Object {
        [pscustomobject]@{
          code = $_.code
          name = $_.name
        }
      }
  )

  $capital = if ($representativeCities.Count) { $representativeCities[0].name } else { $province.name }
  $qualityFlags = Distinct-Array @(
    $province.qualityFlags
    $(if ($isLimited) { 'limited_comparability' })
    $(if (-not $isLimited) { 'environment_green_proxy' })
  )

  $provinceRecords += [pscustomobject][ordered]@{
    id = $code
    code = $code
    name = $province.name
    region = $region
    adminLevel = 'province-level'
    provinceCapital = $capital
    representativeCities = $representativeCities
    population = $population
    populationUnit = '万人'
    disposableIncome = $income
    annualConsumptionPerCapita = $consumption
    parkGreenPerCapita = $parkGreen
    gasCoverage = $gasCoverage
    railwayLength = $railway
    highwayLength = $highway
    incomeSupportScore = $incomeSupportScore
    consumptionBurden = $consumptionRatio
    consumptionBurdenScore = $consumptionBurdenScore
    environmentScore = $greenScore
    publicServiceScore = $publicServiceScore
    overviewScore = $overviewScore
    coverageScore = $coverageScore
    coverageLevel = $coverageLevel
    sourceRefs = Distinct-Array @($province.sourceRefs)
    qualityFlags = $qualityFlags
    periods = [ordered]@{
      latest = [ordered]@{
        label = '2024 official annual province data'
        note = 'Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.'
        aligned = $true
      }
      alignedAnnual = [ordered]@{
        label = '2024 aligned annual province data'
        note = 'Province metrics are already aligned to the 2024 annual window.'
        aligned = $true
      }
    }
    periodValues = [ordered]@{
      latest = [ordered]@{
        population = $population
        disposableIncome = $income
        annualConsumptionPerCapita = $consumption
        parkGreenPerCapita = $parkGreen
        gasCoverage = $gasCoverage
        railwayLength = $railway
        highwayLength = $highway
      }
    }
    hasComparableProxyFields = $true
    lastUpdated = $provinceRaw.generatedAt
  }
}

$provinceGenerated = @($provinceRecords | ForEach-Object {
    [pscustomobject][ordered]@{
      provinceId = $_.id
      incomeSupportScore = $_.incomeSupportScore
      consumptionBurdenScore = $_.consumptionBurdenScore
      environmentScore = $_.environmentScore
      publicServiceScore = $_.publicServiceScore
      overviewScore = $_.overviewScore
      coverageScore = $_.coverageScore
      coverageLevel = $_.coverageLevel
      sourceRefs = $_.sourceRefs
      qualityFlags = $_.qualityFlags
      periods = $_.periods
      generatedAt = $provinceRaw.generatedAt
    }
  })

$matchedOfficialCodes = @{}
$cityRecords = @()

foreach ($city in $citiesRaw) {
  $income = $incomeById[$city.id]
  $cost = $costById[$city.id]
  $mobility = $mobilityById[$city.id]
  $environment = $environmentById[$city.id]
  $generated = $generatedById[$city.id]
  $persona = $personaById[$city.id]

  $officialCode = $deepCodeByName[$city.name]
  if ($officialCode) { $matchedOfficialCodes[$officialCode] = $true }
  $officialRow = if ($officialCode) { $majorCityByCode[$officialCode] } else { $null }
  $provinceCode = if ($officialCode) { Province-Code-From-City-Code $officialCode } else { $null }

  $officialGdp = if ($officialRow) { Get-Metric-Value $officialRow.metrics 'gdp' } else { $null }
  $officialRetailSales = if ($officialRow) { Get-Metric-Value $officialRow.metrics 'retailSales' } else { $null }
  $officialStudents = if ($officialRow) { Get-Metric-Value $officialRow.metrics 'students' } else { $null }
  $officialHospitals = if ($officialRow) { Get-Metric-Value $officialRow.metrics 'hospitals' } else { $null }
  $officialDoctors = if ($officialRow) { Get-Metric-Value $officialRow.metrics 'doctors' } else { $null }
  $officialRegisteredPopulation = if ($officialRow) { Get-Metric-Value $officialRow.metrics 'registeredPopulation' } else { $null }
  $officialWageAnnual = if ($officialRow) { Get-Metric-Value $officialRow.metrics 'wageAnnual' } else { $null }

  $coverageScore = To-NullableNumber $generated.coverageScore
  $coverageCode = if ($coverageScore -ge 0.8) { 'full' } elseif ($coverageScore -ge 0.6) { 'degraded' } else { 'limited' }
  $coverageLabel = switch ($coverageCode) {
    'full' { '完整推荐' }
    'degraded' { '降级推荐' }
    default { '仅展示' }
  }

  $cityRecords += [pscustomobject][ordered]@{
    id = $city.id
    officialCode = $officialCode
    name = $city.name
    pinyin = $city.pinyin
    province = $city.province
    provinceId = $provinceCode
    region = Map-Existing-Region $city.region
    tier = Map-Existing-Tier $city.tier
    coordinates = $city.coordinates
    layerType = if ($officialRow) { 'deep-plus-official' } else { 'deep-snapshot' }
    shortDescription = $city.shortDescription
    longDescription = $city.longDescription
    tags = $city.tags
    suitableFor = $city.suitableFor
    notIdealFor = $city.notIdealFor
    population = To-NullableNumber $city.population
    populationUnit = $city.populationUnit
    populationScope = 'resident'
    disposableIncome = To-NullableNumber $income.disposableIncome
    wageReferenceMonthly = To-NullableNumber $income.wageReferenceMonthly
    wageReferenceAnnual = if ($null -ne $income.wageReferenceMonthly) { [math]::Round([double]$income.wageReferenceMonthly * 12, 1) } else { $officialWageAnnual }
    annualConsumptionPerCapita = To-NullableNumber $cost.annualConsumptionPerCapita
    rentMedian = To-NullableNumber $cost.rentMedian
    rentMedianPerSqm = To-NullableNumber $cost.rentMedianPerSqm
    assumedDwellingSizeSqm = To-NullableNumber $cost.assumedDwellingSizeSqm
    avgCommuteTime = To-NullableNumber $mobility.avgCommuteTime
    commuteWithin45 = To-NullableNumber $mobility.commuteWithin45
    publicTransportScore = To-NullableNumber $mobility.publicTransportScore
    railCoverageCommute = To-NullableNumber $mobility.railCoverageCommute
    bus45Service = To-NullableNumber $mobility.bus45Service
    extremeCommute60 = To-NullableNumber $mobility.extremeCommute60
    avgCommuteDistance = To-NullableNumber $mobility.avgCommuteDistance
    railTransitLength = To-NullableNumber $mobility.railTransitLength
    reportRailTransitLength = To-NullableNumber $mobility.reportRailTransitLength
    utilityCoverage = To-NullableNumber $mobility.utilityCoverage
    greenPublicSpaceProxy = To-NullableNumber $mobility.greenPublicSpaceProxy
    pm25Reference = To-NullableNumber $environment.pm25Reference
    goodAirDaysRatio = To-NullableNumber $environment.goodAirDaysRatio
    latestGoodAirDaysRatio = To-NullableNumber $environment.latestGoodAirDaysRatio
    latestSignalPeriod = $environment.latestSignalPeriod
    rentBurdenProxy = To-NullableNumber $generated.rentBurdenProxy
    rentIndex = To-NullableNumber $generated.rentIndex
    rentBurdenIndex = To-NullableNumber $generated.rentBurdenIndex
    consumptionIndex = To-NullableNumber $generated.consumptionIndex
    transportCostIndex = To-NullableNumber $generated.transportCostIndex
    totalCostIndex = To-NullableNumber $generated.totalCostIndex
    costFriendliness = To-NullableNumber $generated.costFriendliness
    commuteIndex = To-NullableNumber $generated.commuteIndex
    basicServices = To-NullableNumber $generated.basicServices
    airQualityScore = To-NullableNumber $generated.airQualityScore
    savingScore = To-NullableNumber $generated.savingScore
    graduateScore = To-NullableNumber $generated.graduateScore
    balancedScore = To-NullableNumber $generated.balancedScore
    coupleScore = To-NullableNumber $generated.coupleScore
    officialGdp = $officialGdp
    officialRetailSales = $officialRetailSales
    officialStudents = $officialStudents
    officialHospitals = $officialHospitals
    officialDoctors = $officialDoctors
    officialRegisteredPopulation = $officialRegisteredPopulation
    baseOfficialScore = $null
    opportunityScore = $null
    pressureScore = $null
    coverageScore = $coverageScore
    coverageCode = $coverageCode
    coverageLabel = $coverageLabel
    aiEligible = [bool]($coverageScore -ge 0.6)
    cityMapEligibility = $true
    cityRecommendationEligibility = [bool]($coverageScore -ge 0.6)
    sourceRefs = Distinct-Array @($city.sourceRefs + $income.sourceRefs + $cost.sourceRefs + $mobility.sourceRefs + $environment.sourceRefs + $generated.sourceRefs + $persona.sourceRefs + $(if ($officialRow) { $officialRow.sourceRefs }))
    qualityFlags = Distinct-Array @($city.qualityFlags + $income.qualityFlags + $cost.qualityFlags + $mobility.qualityFlags + $environment.qualityFlags + $generated.qualityFlags)
    periods = $generated.periods
    periodValues = [ordered]@{
      latest = [ordered]@{
        totalCostIndex = To-NullableNumber $generated.totalCostIndex
        rentBurdenProxy = To-NullableNumber $generated.rentBurdenProxy
        commuteIndex = To-NullableNumber $generated.commuteIndex
        airQualityScore = To-NullableNumber $generated.airQualityScore
      }
      alignedAnnual = [ordered]@{
        totalCostIndex = To-NullableNumber $generated.totalCostIndex
        rentBurdenProxy = To-NullableNumber $generated.rentBurdenProxy
        commuteIndex = To-NullableNumber $generated.commuteIndex
        airQualityScore = To-NullableNumber $generated.airQualityScore
      }
    }
    displayPeriodLabel = $generated.periods.latest.label
    lastUpdated = $city.lastUpdated
  }
}

foreach ($officialCity in $majorCityRows) {
  if ($matchedOfficialCodes.ContainsKey($officialCity.code)) { continue }

  $provinceCode = Province-Code-From-City-Code $officialCity.code
  $province = $provinceByCode[$provinceCode]
  $ref = $cityReference[$officialCity.code]
  $gdp = Get-Metric-Value $officialCity.metrics 'gdp'
  $wageAnnual = Get-Metric-Value $officialCity.metrics 'wageAnnual'
  $wageMonthly = if ($null -ne $wageAnnual) { [math]::Round($wageAnnual / 12, 1) } else { $null }
  $registeredPopulation = Get-Metric-Value $officialCity.metrics 'registeredPopulation'
  $retailSales = Get-Metric-Value $officialCity.metrics 'retailSales'
  $students = Get-Metric-Value $officialCity.metrics 'students'
  $hospitals = Get-Metric-Value $officialCity.metrics 'hospitals'
  $doctors = Get-Metric-Value $officialCity.metrics 'doctors'
  $presentCount = @($gdp, $wageAnnual, $registeredPopulation, $retailSales, $students, $hospitals, $doctors | Where-Object { $null -ne $_ }).Count
  $coverageScore = [math]::Round($presentCount / 7, 2)
  $coverageCode = if ($coverageScore -ge 0.75) { 'degraded' } else { 'limited' }
  $coverageLabel = if ($coverageCode -eq 'degraded') { '基础官方分析' } else { '仅展示' }

  $cityRecords += [pscustomobject][ordered]@{
    id = $officialCity.code
    officialCode = $officialCity.code
    name = $officialCity.name
    pinyin = ''
    province = $province.name
    provinceId = $provinceCode
    region = Get-Region-By-Province-Code $provinceCode
    tier = if ($ref) { $ref.tier } else { '强二线' }
    coordinates = if ($ref) { $ref.coordinates } else { @() }
    layerType = 'major-city-official'
    shortDescription = $null
    longDescription = $null
    tags = @('主要城市', '官方年度层')
    suitableFor = @('先看省会/主要城市基本面')
    notIdealFor = @('需要租金与通勤完整快照')
    population = $registeredPopulation
    populationUnit = if ($null -ne $registeredPopulation) { '万人' } else { $null }
    populationScope = if ($null -ne $registeredPopulation) { 'registered' } else { $null }
    disposableIncome = $null
    wageReferenceMonthly = $wageMonthly
    wageReferenceAnnual = $wageAnnual
    annualConsumptionPerCapita = $null
    rentMedian = $null
    rentMedianPerSqm = $null
    assumedDwellingSizeSqm = $null
    avgCommuteTime = $null
    commuteWithin45 = $null
    publicTransportScore = $null
    railCoverageCommute = $null
    bus45Service = $null
    extremeCommute60 = $null
    avgCommuteDistance = $null
    railTransitLength = $null
    reportRailTransitLength = $null
    utilityCoverage = $null
    greenPublicSpaceProxy = $null
    pm25Reference = $null
    goodAirDaysRatio = $null
    latestGoodAirDaysRatio = $null
    latestSignalPeriod = $null
    rentBurdenProxy = $null
    rentIndex = $null
    rentBurdenIndex = $null
    consumptionIndex = $null
    transportCostIndex = $null
    totalCostIndex = $null
    costFriendliness = $null
    commuteIndex = $null
    basicServices = $null
    airQualityScore = $null
    savingScore = $null
    graduateScore = $null
    balancedScore = $null
    coupleScore = $null
    officialGdp = $gdp
    officialRetailSales = $retailSales
    officialStudents = $students
    officialHospitals = $hospitals
    officialDoctors = $doctors
    officialRegisteredPopulation = $registeredPopulation
    baseOfficialScore = $null
    opportunityScore = $null
    pressureScore = $null
    coverageScore = $coverageScore
    coverageCode = $coverageCode
    coverageLabel = $coverageLabel
    aiEligible = $false
    cityMapEligibility = $true
    cityRecommendationEligibility = $false
    sourceRefs = Distinct-Array @($officialCity.sourceRefs)
    qualityFlags = Distinct-Array @($officialCity.qualityFlags + @('base_official_only') + $(if ($null -ne $registeredPopulation) { 'population_registered_only' }))
    periods = [ordered]@{
      latest = [ordered]@{
        label = '2024 official major-city annual data'
        note = 'This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.'
        aligned = $true
      }
      alignedAnnual = [ordered]@{
        label = '2024 official major-city annual data'
        note = 'This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.'
        aligned = $true
      }
    }
    periodValues = [ordered]@{
      latest = [ordered]@{
        officialGdp = $gdp
        wageReferenceAnnual = $wageAnnual
        officialRetailSales = $retailSales
        officialStudents = $students
        officialHospitals = $hospitals
        officialDoctors = $doctors
      }
    }
    displayPeriodLabel = '2024 official major-city annual data'
    lastUpdated = $majorCityRaw.generatedAt
  }
}

$cityWageValues = @($cityRecords | ForEach-Object { $_.wageReferenceMonthly })
$cityGdpValues = @($cityRecords | ForEach-Object { $_.officialGdp })
$cityStudentValues = @($cityRecords | ForEach-Object { $_.officialStudents })
$cityDoctorValues = @($cityRecords | ForEach-Object { $_.officialDoctors })
$cityHospitalValues = @($cityRecords | ForEach-Object { $_.officialHospitals })
$cityCostValues = @($cityRecords | ForEach-Object { $_.totalCostIndex })
$cityRentValues = @($cityRecords | ForEach-Object { $_.rentBurdenProxy })

$enrichedCityRecords = @()
foreach ($city in $cityRecords) {
  $baseOfficialScore = Weighted-Score @(
    @{ value = Normalize $cityWageValues $city.wageReferenceMonthly; weight = 0.35 }
    @{ value = Normalize $cityGdpValues $city.officialGdp; weight = 0.25 }
    @{ value = Normalize $cityDoctorValues $city.officialDoctors; weight = 0.15 }
    @{ value = Normalize $cityHospitalValues $city.officialHospitals; weight = 0.15 }
    @{ value = Normalize $cityStudentValues $city.officialStudents; weight = 0.10 }
  )

  $opportunityScore = Weighted-Score @(
    @{ value = Normalize $cityWageValues $city.wageReferenceMonthly; weight = 0.35 }
    @{ value = Normalize $cityGdpValues $city.officialGdp; weight = 0.40 }
    @{ value = Normalize $cityStudentValues $city.officialStudents; weight = 0.25 }
  )

  $pressureScore = if ($null -ne $city.totalCostIndex -or $null -ne $city.rentBurdenProxy) {
    Weighted-Score @(
      @{ value = Normalize $cityCostValues $city.totalCostIndex; weight = 0.55 }
      @{ value = Normalize $cityRentValues $city.rentBurdenProxy; weight = 0.45 }
    )
  } else {
    50.0
  }
  $fallbackShort = if ($city.layerType -eq 'major-city-official') {
    '{0} 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。' -f $city.name
  } else {
    $city.shortDescription
  }
  $fallbackLong = if ($city.layerType -eq 'major-city-official') {
    '{0} 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。' -f $city.name
  } else {
    $city.longDescription
  }
  $tags = if ($city.layerType -eq 'major-city-official') {
    Distinct-Array @($city.tags + @('基础官方层', '主要城市'))
  } else {
    $city.tags
  }

  $enrichedCityRecords += [pscustomobject][ordered]@{
    id = $city.id
    officialCode = $city.officialCode
    name = $city.name
    pinyin = $city.pinyin
    province = $city.province
    provinceId = $city.provinceId
    region = $city.region
    tier = $city.tier
    coordinates = $city.coordinates
    layerType = $city.layerType
    shortDescription = $fallbackShort
    longDescription = $fallbackLong
    tags = $tags
    suitableFor = $city.suitableFor
    notIdealFor = $city.notIdealFor
    population = $city.population
    populationUnit = $city.populationUnit
    populationScope = $city.populationScope
    disposableIncome = $city.disposableIncome
    wageReferenceMonthly = $city.wageReferenceMonthly
    wageReferenceAnnual = $city.wageReferenceAnnual
    annualConsumptionPerCapita = $city.annualConsumptionPerCapita
    rentMedian = $city.rentMedian
    rentMedianPerSqm = $city.rentMedianPerSqm
    assumedDwellingSizeSqm = $city.assumedDwellingSizeSqm
    avgCommuteTime = $city.avgCommuteTime
    commuteWithin45 = $city.commuteWithin45
    publicTransportScore = $city.publicTransportScore
    railCoverageCommute = $city.railCoverageCommute
    bus45Service = $city.bus45Service
    extremeCommute60 = $city.extremeCommute60
    avgCommuteDistance = $city.avgCommuteDistance
    railTransitLength = $city.railTransitLength
    reportRailTransitLength = $city.reportRailTransitLength
    utilityCoverage = $city.utilityCoverage
    greenPublicSpaceProxy = $city.greenPublicSpaceProxy
    pm25Reference = $city.pm25Reference
    goodAirDaysRatio = $city.goodAirDaysRatio
    latestGoodAirDaysRatio = $city.latestGoodAirDaysRatio
    latestSignalPeriod = $city.latestSignalPeriod
    rentBurdenProxy = $city.rentBurdenProxy
    rentIndex = $city.rentIndex
    rentBurdenIndex = $city.rentBurdenIndex
    consumptionIndex = $city.consumptionIndex
    transportCostIndex = $city.transportCostIndex
    totalCostIndex = $city.totalCostIndex
    costFriendliness = $city.costFriendliness
    commuteIndex = $city.commuteIndex
    basicServices = $city.basicServices
    airQualityScore = $city.airQualityScore
    savingScore = $city.savingScore
    graduateScore = $city.graduateScore
    balancedScore = $city.balancedScore
    coupleScore = $city.coupleScore
    officialGdp = $city.officialGdp
    officialRetailSales = $city.officialRetailSales
    officialStudents = $city.officialStudents
    officialHospitals = $city.officialHospitals
    officialDoctors = $city.officialDoctors
    officialRegisteredPopulation = $city.officialRegisteredPopulation
    baseOfficialScore = $baseOfficialScore
    opportunityScore = $opportunityScore
    pressureScore = $pressureScore
    coverageScore = $city.coverageScore
    coverageCode = $city.coverageCode
    coverageLabel = $city.coverageLabel
    aiEligible = $city.aiEligible
    cityMapEligibility = $city.cityMapEligibility
    cityRecommendationEligibility = $city.cityRecommendationEligibility
    sourceRefs = $city.sourceRefs
    qualityFlags = $city.qualityFlags
    periods = $city.periods
    periodValues = $city.periodValues
    displayPeriodLabel = $city.displayPeriodLabel
    lastUpdated = $city.lastUpdated
  }
}

$provinceViewModel = [ordered]@{
  generatedAt = $provinceRaw.generatedAt
  summary = [ordered]@{
    totalProvinces = @($provinceRecords).Count
    comparableMainlandProvinces = @($provinceRecords | Where-Object { $_.coverageLevel -ne 'limited' }).Count
    limitedProvinces = @($provinceRecords | Where-Object { $_.coverageLevel -eq 'limited' }).Count
    coreMetricCount = 5
  }
  enums = [ordered]@{
    regions = Distinct-Array @($provinceRecords.region)
    mapMetrics = @(
      [ordered]@{ key = 'incomeSupportScore'; label = '收入支撑力'; direction = 'higherBetter' }
      [ordered]@{ key = 'consumptionBurdenScore'; label = '消费负担'; direction = 'higherBetter' }
      [ordered]@{ key = 'environmentScore'; label = '环境宜居'; direction = 'higherBetter' }
      [ordered]@{ key = 'publicServiceScore'; label = '基础公共服务'; direction = 'higherBetter' }
      [ordered]@{ key = 'overviewScore'; label = '综合省级概览'; direction = 'higherBetter' }
    )
  }
  provinces = $provinceRecords
}

$cityViewModel = [ordered]@{
  generatedAt = (Get-Date).ToString('yyyy-MM-dd')
  summary = [ordered]@{
    totalCities = @($enrichedCityRecords).Count
    deepSnapshotCities = @($enrichedCityRecords | Where-Object { $_.layerType -ne 'major-city-official' }).Count
    majorOfficialCities = @($enrichedCityRecords | Where-Object { $_.layerType -eq 'major-city-official' }).Count
    aiEligibleCities = @($enrichedCityRecords | Where-Object { $_.cityRecommendationEligibility }).Count
    cityMapEligibleCities = @($enrichedCityRecords | Where-Object { $_.cityMapEligibility }).Count
    coreMetricCount = 9
  }
  enums = [ordered]@{
    tiers = Distinct-Array @($enrichedCityRecords.tier)
    regions = Distinct-Array @($enrichedCityRecords.region)
    mapMetrics = @(
      [ordered]@{ key = 'balancedScore'; label = '综合平衡'; direction = 'higherBetter' }
      [ordered]@{ key = 'savingScore'; label = '攒钱友好'; direction = 'higherBetter' }
      [ordered]@{ key = 'commuteIndex'; label = '通勤便利'; direction = 'higherBetter' }
      [ordered]@{ key = 'airQualityScore'; label = '空气质量'; direction = 'higherBetter' }
      [ordered]@{ key = 'totalCostIndex'; label = '综合生活成本'; direction = 'lowerBetter' }
      [ordered]@{ key = 'rentBurdenProxy'; label = '房租压力'; direction = 'lowerBetter' }
      [ordered]@{ key = 'wageReferenceMonthly'; label = '工资参考'; direction = 'higherBetter' }
      [ordered]@{ key = 'officialGdp'; label = 'GDP'; direction = 'higherBetter' }
      [ordered]@{ key = 'baseOfficialScore'; label = '基础官方实力'; direction = 'higherBetter' }
    )
  }
  cities = $enrichedCityRecords
}

$metaOut = [ordered]@{
  siteGeneratedAt = (Get-Date).ToString('yyyy-MM-dd')
  majorDataPeriods = @(
    '省级模式优先使用国家数据 API 的 2024 年度分省官方数据。',
    '城市模式结合 2024 主要城市年度官方层与现有深度快照城市层。',
    '租金快照仍只作用于深度覆盖城市。',
    '通勤和空气质量仍按覆盖度分层展示。'
  )
  updateStrategy = @(
    '先运行 scripts/fetch-official-national-data.ps1 刷新官方省级与主要城市年度快照。',
    '再运行 scripts/build-derived.ps1 生成 province-view-model、view-model 与 bootstrap。',
    '发布前运行 scripts/validate-data.ps1。'
  )
  aiMode = 'rule-engine-local-dual-layer'
  coverageSummary = [ordered]@{
    includedProvinces = $provinceViewModel.summary.totalProvinces
    comparableMainlandProvinces = $provinceViewModel.summary.comparableMainlandProvinces
    includedCities = $cityViewModel.summary.totalCities
    aiEligibleCities = $cityViewModel.summary.aiEligibleCities
    nationalMapMode = 'dual-layer-province-choropleth-and-city-layer'
    cityLayerScope = 'official-major-cities-plus-deep-snapshots'
  }
  disclaimer = @(
    '省级层已覆盖 31 个大陆省级地区；港澳台因口径差异标记为有限比较。',
    '城市层当前是 36 个主要城市官方年度层 + 站内深度快照城市，不是完整全国所有地级市。',
    '省级环境目前使用绿地代理，不等同于省级空气质量事实。',
    'AI 只解释已有数据与覆盖等级，不补造缺失事实。'
  )
}

Write-Json (Join-Path $dataDir 'province-generated-metrics.json') $provinceGenerated
Write-Json (Join-Path $dataDir 'province-view-model.json') $provinceViewModel
Write-Json (Join-Path $dataDir 'view-model.json') $cityViewModel
Write-Json (Join-Path $dataDir 'meta.json') $metaOut

$bootstrap = [ordered]@{
  generatedAt = (Get-Date).ToString('yyyy-MM-dd')
  meta = $metaOut
  sources = $sources
  provinceViewModel = $provinceViewModel
  viewModel = $cityViewModel
  recommendationConfig = $aiConfig
}

$bootstrapJson = $bootstrap | ConvertTo-Json -Depth 30
Write-Text (Join-Path $dataDir 'bootstrap.js') ("window.CITY_SITE_DATA = $bootstrapJson;")

Write-Host 'Built province-view-model.json, view-model.json, meta.json and bootstrap.js'
