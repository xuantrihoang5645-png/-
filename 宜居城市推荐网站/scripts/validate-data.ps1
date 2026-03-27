$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot

$required = @(
  'index.html',
  'about.html',
  'css/style.css',
  'js/about.js',
  'js/app.js',
  'js/charts.js',
  'js/recommendation.js',
  'assets/vendor/echarts.min.js',
  'assets/vendor/china.js',
  'data/sources.json',
  'data/meta.json',
  'data/bootstrap.js',
  'data/view-model.json',
  'data/province-view-model.json',
  'data/province-generated-metrics.json',
  'data/raw/nbs-province-annual-2024.json',
  'data/raw/nbs-major-city-annual-2024.json',
  'scripts/fetch-official-national-data.ps1',
  'scripts/build-derived.ps1'
)

$missing = @($required | Where-Object { -not (Test-Path (Join-Path $root $_)) })
if ($missing.Count) {
  throw "Missing required files: $($missing -join ', ')"
}

function Read-Json($path) {
  Get-Content -Path $path -Raw -Encoding UTF8 | ConvertFrom-Json
}

function Read-Text($path) {
  Get-Content -Path $path -Raw -Encoding UTF8
}

$viewModel = Read-Json (Join-Path $root 'data/view-model.json')
$provinceViewModel = Read-Json (Join-Path $root 'data/province-view-model.json')
$provinceGenerated = Read-Json (Join-Path $root 'data/province-generated-metrics.json')
$sources = Read-Json (Join-Path $root 'data/sources.json')
$meta = Read-Json (Join-Path $root 'data/meta.json')
$bootstrap = Read-Text (Join-Path $root 'data/bootstrap.js')

if (@($provinceViewModel.provinces).Count -lt 34) { throw 'Province layer must include 34 provincial-level records.' }
if (@($viewModel.cities).Count -lt 30) { throw 'City layer must include at least 30 city records.' }
if (@($provinceGenerated).Count -lt 34) { throw 'Province generated metrics are incomplete.' }

foreach ($province in $provinceViewModel.provinces) {
  foreach ($field in @('id', 'name', 'region', 'coverageScore', 'coverageLevel', 'sourceRefs', 'qualityFlags', 'periods')) {
    if (-not ($province.PSObject.Properties.Name -contains $field)) {
      throw "Province record missing field '$field': $($province.id)"
    }
  }
}

foreach ($city in $viewModel.cities) {
  foreach ($field in @('id', 'name', 'provinceId', 'region', 'tier', 'coverageScore', 'sourceRefs', 'qualityFlags', 'periods', 'cityMapEligibility')) {
    if (-not ($city.PSObject.Properties.Name -contains $field)) {
      throw "City record missing field '$field': $($city.id)"
    }
  }
}

$sourceIds = @($sources.sources | ForEach-Object { $_.sourceId })
foreach ($province in $provinceViewModel.provinces) {
  foreach ($ref in @($province.sourceRefs)) {
    if ($sourceIds -notcontains $ref) {
      throw "Unknown province sourceRef '$ref' in $($province.id)"
    }
  }
}

foreach ($city in $viewModel.cities) {
  foreach ($ref in @($city.sourceRefs)) {
    if ($sourceIds -notcontains $ref) {
      throw "Unknown city sourceRef '$ref' in $($city.id)"
    }
  }
}

if ($meta.coverageSummary.nationalMapMode -ne 'dual-layer-province-choropleth-and-city-layer') {
  throw 'meta.json nationalMapMode is not the dual-layer value.'
}

if ($bootstrap -notmatch 'provinceViewModel' -or $bootstrap -notmatch 'viewModel') {
  throw 'bootstrap.js is missing provinceViewModel or viewModel.'
}

$textFiles = @(
  'index.html',
  'about.html',
  'css/style.css',
  'js/about.js',
  'js/app.js',
  'js/charts.js',
  'js/recommendation.js'
)

foreach ($file in $textFiles) {
  $content = Read-Text (Join-Path $root $file)
  if ($content -match '�|鏉|涓€|鍏�') {
    throw "Potential encoding corruption found in $file"
  }
}

Write-Host 'Validation passed for dual-layer province and city data.'
