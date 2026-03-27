$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot

$required = @(
  'index.html',
  'about.html',
  'css/style.css',
  'js/app.js',
  'js/charts.js',
  'js/recommendation.js',
  'js/about.js',
  'assets/vendor/echarts.min.js',
  'assets/vendor/china.js',
  'data/cities.json',
  'data/cost-of-living.json',
  'data/income.json',
  'data/mobility.json',
  'data/environment.json',
  'data/generated-metrics.json',
  'data/persona-recommendation.json',
  'data/view-model.json',
  'data/bootstrap.js',
  'data/ai-config.json',
  'data/sources.json',
  'data/meta.json'
)

$missing = @($required | Where-Object { -not (Test-Path (Join-Path $root $_)) })
if ($missing.Count) { throw "Missing required files: $($missing -join ', ')" }

function Read-Json($path) {
  Get-Content -Path $path -Raw -Encoding UTF8 | ConvertFrom-Json
}

function Read-Text($path) {
  Get-Content -Path $path -Raw -Encoding UTF8
}

$cities = Read-Json (Join-Path $root 'data/cities.json')
$cost = Read-Json (Join-Path $root 'data/cost-of-living.json')
$income = Read-Json (Join-Path $root 'data/income.json')
$mobility = Read-Json (Join-Path $root 'data/mobility.json')
$environment = Read-Json (Join-Path $root 'data/environment.json')
$generated = Read-Json (Join-Path $root 'data/generated-metrics.json')
$persona = Read-Json (Join-Path $root 'data/persona-recommendation.json')
$viewModel = Read-Json (Join-Path $root 'data/view-model.json')
$sources = Read-Json (Join-Path $root 'data/sources.json')
$bootstrap = Read-Text (Join-Path $root 'data/bootstrap.js')

$cityIds = @($cities | ForEach-Object { $_.id })
$sourceIds = @($sources.sources | ForEach-Object { $_.sourceId })

foreach ($dataset in @($cost, $income, $mobility, $environment)) {
  foreach ($row in $dataset) {
    if ($cityIds -notcontains $row.cityId) { throw "Unknown cityId in dataset: $($row.cityId)" }
    if (-not $row.sourceRefs -or @($row.sourceRefs).Count -eq 0) { throw "Missing sourceRefs for cityId $($row.cityId)" }
  }
}

foreach ($row in @($cities + $cost + $income + $mobility + $environment)) {
  $rowKey = if ($null -ne $row.id) { $row.id } else { $row.cityId }
  foreach ($sourceRef in @($row.sourceRefs)) {
    if ($sourceIds -notcontains $sourceRef) { throw "Unknown sourceRef '$sourceRef' in row for $rowKey" }
  }
}

foreach ($row in $generated) {
  foreach ($field in @('cityId', 'coverageScore', 'coverageLevel', 'sourceRefs', 'qualityFlags', 'periods')) {
    if (-not ($row.PSObject.Properties.Name -contains $field)) {
      throw "generated-metrics.json missing field '$field' for city $($row.cityId)"
    }
  }
}

foreach ($row in $persona) {
  foreach ($field in @('cityId', 'suitableForGraduates', 'suitableForCouples', 'sourceRefs', 'lastUpdated')) {
    if (-not ($row.PSObject.Properties.Name -contains $field)) {
      throw "persona-recommendation.json missing field '$field' for city $($row.cityId)"
    }
  }
}

foreach ($city in $viewModel.cities) {
  foreach ($field in @('id', 'name', 'tier', 'region', 'coordinates', 'coverageScore', 'coverageCode', 'coverageLabel', 'sourceRefs', 'qualityFlags', 'periods')) {
    if (-not ($city.PSObject.Properties.Name -contains $field)) {
      throw "view-model.json missing field '$field' for city $($city.id)"
    }
  }

  if (@($city.sourceRefs).Count -eq 0) { throw "view-model.json city $($city.id) has empty sourceRefs" }
  if (-not $city.periods.latest.label) { throw "view-model.json city $($city.id) missing latest label" }
  if (-not $city.periods.alignedAnnual.label) { throw "view-model.json city $($city.id) missing alignedAnnual label" }
}

if ($viewModel.summary.totalCities -ne $cities.Count) {
  throw "view-model summary totalCities does not match cities.json count"
}

if ($bootstrap -notmatch 'window\.CITY_SITE_DATA\s*=') {
  throw "bootstrap.js does not expose window.CITY_SITE_DATA"
}

foreach ($textFile in @(
  'index.html',
  'about.html',
  'css/style.css',
  'js/app.js',
  'js/charts.js',
  'js/recommendation.js',
  'js/about.js'
)) {
  $text = Read-Text (Join-Path $root $textFile)
  foreach ($pattern in @('https://cdn.jsdelivr.net', 'type="module"', 'fetch\(')) {
    if ($text -match $pattern) { throw "$textFile still contains forbidden runtime pattern: $pattern" }
  }
  if ($text.Contains([char]0xFFFD)) {
    throw "$textFile contains the Unicode replacement character, which usually means broken encoding"
  }
  foreach ($badPattern in @('Ã.', 'Â.', 'æ.', 'ç.', 'ä¸', 'å.')) {
    if ($text -match $badPattern) {
      throw "$textFile appears to contain mojibake-like byte patterns: $badPattern"
    }
  }
}

$echartsFile = Get-Item (Join-Path $root 'assets/vendor/echarts.min.js')
$chinaFile = Get-Item (Join-Path $root 'assets/vendor/china.js')
if ($echartsFile.Length -lt 500000) { throw 'echarts.min.js looks too small; vendor download may be broken' }
if ($chinaFile.Length -lt 10000) { throw 'china.js looks too small; vendor download may be broken' }

Write-Host "Validation passed for $($cities.Count) cities, $($sourceIds.Count) sources, and localized runtime assets."
