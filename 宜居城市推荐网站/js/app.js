(function attachCityApp(global) {
  const Charts = global.CityCharts;
  const Recommendation = global.CityRecommendation;

  const REGION_LABELS = {
    all: '全部',
    northChina: '华北',
    northEast: '东北',
    eastChina: '华东',
    centralChina: '华中',
    southChina: '华南',
    southWest: '西南',
    northWest: '西北',
    greaterChinaLimited: '港澳台',
  };

  const TIER_LABELS = {
    all: '全部',
    tier1: '一线',
    newTier1: '新一线',
    strongTier2: '强二线',
  };

  const DEEP_METRICS = new Set(['balancedScore', 'savingScore', 'commuteIndex', 'airQualityScore', 'totalCostIndex', 'rentBurdenProxy']);
  const FALLBACK_CITY_METRIC = 'baseOfficialScore';

  const state = {
    siteData: null,
    provinces: [],
    cities: [],
    filteredCities: [],
    mapMode: 'province',
    selectedProvinceId: null,
    activeCityId: null,
    periodMode: 'latest',
    provinceMetric: 'overviewScore',
    cityMetric: 'balancedScore',
    compareIds: [],
    aiPreferences: Recommendation?.defaultPreferences ? Recommendation.defaultPreferences() : {},
    metrics: { province: {}, city: {} },
    charts: { map: null, compare: null, scatter: null },
  };

  const byId = (id) => document.getElementById(id);
  const qsa = (selector) => Array.from(document.querySelectorAll(selector));
  const num = (value) => (typeof value === 'number' && Number.isFinite(value) ? value : null);
  const ensureArray = (value) => (Array.isArray(value) ? value : value ? [value] : []);

  function fmt(value, digits = 1) {
    return num(value) === null ? '暂无' : Number(value).toFixed(digits);
  }

  function fmtInt(value, suffix = '') {
    return num(value) === null ? '暂无' : `${Math.round(value)}${suffix}`;
  }

  function fmtPercent(value, digits = 1) {
    return num(value) === null ? '暂无' : `${Number(value).toFixed(digits)}%`;
  }

  function formatMetricValue(key, value) {
    const metric = num(value);
    if (metric === null) return '暂无';
    if (key === 'rentBurdenProxy') return fmtPercent(metric * 100, 1);
    if (key === 'wageReferenceMonthly' || key === 'effectiveMonthlyIncome') return `${Math.round(metric)} 元/月`;
    if (key === 'officialGdp') return `${metric.toFixed(0)} 亿元`;
    return metric.toFixed(1);
  }

  function showBanner(type, message, targetId = 'global-banner') {
    const node = byId(targetId);
    if (!node) return;
    node.className = `status-banner status-banner-${type}`;
    node.textContent = message;
  }

  function hideBanner(targetId = 'global-banner') {
    const node = byId(targetId);
    if (!node) return;
    node.className = 'status-banner status-banner-hidden';
    node.textContent = '';
  }

  function setModuleState(id, kind, message) {
    const node = byId(id);
    if (!node) return;
    node.className = `module-state module-state-${kind}`;
    node.textContent = message;
  }

  function hideModuleState(id) {
    const node = byId(id);
    if (!node) return;
    node.className = 'module-state module-state-hidden';
    node.textContent = '';
  }

  function getSourceById(sourceId) {
    return state.siteData?.sources?.sources?.find((item) => item.sourceId === sourceId) || null;
  }

  function effectiveMonthlyIncome(city) {
    return num(city.wageReferenceMonthly)
      ?? (num(city.wageReferenceAnnual) === null ? null : city.wageReferenceAnnual / 12)
      ?? (num(city.disposableIncome) === null ? null : city.disposableIncome / 12);
  }

  function normalizeProvince(province) {
    return {
      ...province,
      sourceRefs: ensureArray(province.sourceRefs),
      qualityFlags: ensureArray(province.qualityFlags),
    };
  }

  function normalizeCity(city) {
    return {
      ...city,
      sourceRefs: ensureArray(city.sourceRefs),
      qualityFlags: ensureArray(city.qualityFlags),
      tags: ensureArray(city.tags),
      suitableFor: ensureArray(city.suitableFor),
      notIdealFor: ensureArray(city.notIdealFor),
      effectiveMonthlyIncome: effectiveMonthlyIncome(city),
    };
  }

  function buildMetricMeta(entries, fallbackLabels = {}) {
    const result = {};
    ensureArray(entries).forEach((item) => {
      result[item.key] = item;
    });
    Object.entries(fallbackLabels).forEach(([key, label]) => {
      if (!result[key]) result[key] = { key, label, direction: 'higherBetter' };
    });
    return result;
  }

  function currentProvince() {
    return state.provinces.find((province) => province.id === state.selectedProvinceId) || null;
  }

  function currentProvinceMetricMeta() {
    return state.metrics.province[state.provinceMetric] || { key: state.provinceMetric, label: state.provinceMetric, direction: 'higherBetter' };
  }

  function currentCityMetricMeta() {
    return state.metrics.city[state.cityMetric] || { key: state.cityMetric, label: state.cityMetric, direction: 'higherBetter' };
  }

  function currentCityPool() {
    if (state.mapMode === 'city' && state.selectedProvinceId) {
      return state.filteredCities.filter((city) => city.provinceId === state.selectedProvinceId);
    }
    return state.filteredCities;
  }

  function cityScopeIsBaseOnly() {
    const pool = currentCityPool();
    return state.mapMode === 'city' && pool.length > 0 && !pool.some((city) => city.cityRecommendationEligibility);
  }

  function resolveProvinceIdByName(name) {
    const normalized = Charts?.normalizeRegionName ? Charts.normalizeRegionName(name) : String(name || '').replace(/省|市/g, '');
    const hit = state.provinces.find((province) => {
      const provinceName = Charts?.normalizeRegionName ? Charts.normalizeRegionName(province.name) : province.name;
      const capitalName = Charts?.normalizeRegionName ? Charts.normalizeRegionName(province.provinceCapital) : province.provinceCapital;
      return provinceName === normalized || capitalName === normalized;
    });
    return hit?.id || null;
  }

  function syncToggleButtons(selector, matcher) {
    qsa(selector).forEach((node) => {
      node.classList.toggle('is-active', matcher(node));
    });
  }

  function syncMapModeButtons() {
    syncToggleButtons('[data-map-mode]', (node) => node.dataset.mapMode === state.mapMode);
  }

  function syncPeriodButtons() {
    syncToggleButtons('[data-period-mode]', (node) => node.dataset.periodMode === state.periodMode);
  }

  function syncRangeOutputs() {
    qsa('input[type="range"]').forEach((input) => {
      const output = document.querySelector(`[data-range-output="${input.name}"]`);
      if (output) output.textContent = input.value;
    });
  }

  function populateSelect(selectId, values, labelMap, includeAll = true) {
    const select = byId(selectId);
    if (!select) return;
    const currentValue = select.value;
    const options = [];
    if (includeAll) options.push('<option value="all">全部</option>');
    values.forEach((value) => {
      options.push(`<option value="${value}">${labelMap?.[value] || value}</option>`);
    });
    select.innerHTML = options.join('');
    if (values.includes(currentValue) || currentValue === 'all') select.value = currentValue;
  }

  function populateControls() {
    const cityEnums = state.siteData?.viewModel?.enums || {};
    const provinceEnums = state.siteData?.provinceViewModel?.enums || {};

    populateSelect('filter-tier', ensureArray(cityEnums.tiers), TIER_LABELS);
    populateSelect('filter-region', ensureArray(cityEnums.regions), REGION_LABELS);
    populateSelect('ai-region', ensureArray(provinceEnums.regions).filter((item) => item !== 'greaterChinaLimited'), REGION_LABELS);

    const provinceOptions = ['<option value="all">全国范围</option>']
      .concat(state.provinces.map((province) => `<option value="${province.id}">${province.name}</option>`))
      .join('');
    if (byId('ai-province')) byId('ai-province').innerHTML = provinceOptions;
  }

  function filterBucket(value, thresholds) {
    const score = num(value);
    if (score === null) return 'limited';
    if (score <= thresholds[0]) return 'low';
    if (score >= thresholds[1]) return 'high';
    return 'mid';
  }

  function ensureCitySelection() {
    if (state.mapMode !== 'city') return;
    const hasAnyCity = state.cities.some((city) => city.provinceId === state.selectedProvinceId && city.cityMapEligibility);
    if (!state.selectedProvinceId || !hasAnyCity) {
      state.selectedProvinceId = state.cities.find((city) => city.cityMapEligibility)?.provinceId || null;
    }
  }

  function ensureCityMetricForScope() {
    if (!cityScopeIsBaseOnly()) return;
    if (!DEEP_METRICS.has(state.cityMetric)) return;
    state.cityMetric = FALLBACK_CITY_METRIC;
    if (byId('city-map-metric')) byId('city-map-metric').value = FALLBACK_CITY_METRIC;
  }

  function applyFilters() {
    ensureCitySelection();

    const tier = byId('filter-tier')?.value || 'all';
    const region = byId('filter-region')?.value || 'all';
    const rent = byId('filter-rent')?.value || 'all';
    const income = byId('filter-income')?.value || 'all';
    const commute = byId('filter-commute')?.value || 'all';
    const air = byId('filter-air')?.value || 'all';
    const cost = byId('filter-cost')?.value || 'all';
    const persona = byId('filter-persona')?.value || 'all';
    const sortMode = byId('sort-mode')?.value || 'balancedScore';

    let items = state.cities.filter((city) => city.cityMapEligibility);
    if (tier !== 'all') items = items.filter((city) => city.tier === tier);
    if (region !== 'all') items = items.filter((city) => city.region === region);
    if (state.mapMode === 'city' && state.selectedProvinceId) items = items.filter((city) => city.provinceId === state.selectedProvinceId);

    if (rent !== 'all') {
      items = items.filter((city) => {
        const bucket = filterBucket(city.rentBurdenProxy, [0.22, 0.32]);
        return rent === 'low' ? bucket === 'low' : rent === 'mid' ? bucket === 'mid' : bucket === 'high';
      });
    }

    if (income !== 'all') {
      items = items.filter((city) => {
        const bucket = filterBucket(city.effectiveMonthlyIncome, [9000, 14000]);
        return income === 'low' ? bucket === 'low' : income === 'mid' ? bucket === 'mid' : bucket === 'high';
      });
    }
    if (commute !== 'all') items = items.filter((city) => (commute === 'good' ? num(city.commuteIndex) !== null && city.commuteIndex >= 60 : num(city.commuteIndex) === null));
    if (air !== 'all') items = items.filter((city) => (air === 'good' ? num(city.airQualityScore) !== null && city.airQualityScore >= 60 : num(city.airQualityScore) === null));

    if (cost !== 'all') {
      items = items.filter((city) => {
        const score = num(city.totalCostIndex);
        if (score === null) return false;
        if (cost === 'friendly') return score <= 48;
        if (cost === 'balanced') return score > 48 && score < 68;
        return score >= 68;
      });
    }

    if (persona !== 'all') {
      const mapping = { graduates: 'graduateScore', couples: 'coupleScore', budget: 'costFriendliness', saving: 'savingScore' };
      const metric = mapping[persona];
      items = items.filter((city) => num(city[metric]) !== null && city[metric] >= 55);
    }

    items.sort((a, b) => {
      if (sortMode === 'totalCostIndexAsc') return (num(a.totalCostIndex) ?? 999) - (num(b.totalCostIndex) ?? 999);
      return (num(b[sortMode]) ?? -999) - (num(a[sortMode]) ?? -999);
    });

    state.filteredCities = items;

    if (state.mapMode === 'city' && state.selectedProvinceId && !currentCityPool().length) {
      const fallbackProvinceId = items[0]?.provinceId || state.cities.find((city) => city.cityMapEligibility)?.provinceId || null;
      if (fallbackProvinceId && fallbackProvinceId !== state.selectedProvinceId) {
        state.selectedProvinceId = fallbackProvinceId;
        state.filteredCities = state.cities.filter((city) => city.cityMapEligibility);
        applyFilters();
        return;
      }
    }

    const summary = byId('filter-summary');
    if (summary) {
      summary.textContent = state.mapMode === 'province'
        ? `当前筛出了 ${items.length} 个城市样本；省级地图不受这些城市筛选直接影响。`
        : `当前筛出了 ${items.length} 个城市样本；地图只展示当前省内结果。`;
    }
  }

  function renderOverview() {
    const citySummary = state.siteData?.viewModel?.summary || {};
    const provinceSummary = state.siteData?.provinceViewModel?.summary || {};
    byId('hero-city-count').textContent = citySummary.totalCities || 0;
    byId('hero-deep-count').textContent = citySummary.aiEligibleCities || 0;
    byId('hero-source-count').textContent = state.siteData?.sources?.sources?.length || 0;
    byId('coverage-pill').textContent = `${provinceSummary.comparableMainlandProvinces || 31} 省级可比 + ${citySummary.totalCities || 0} 城市层样本`;
    byId('period-pill').textContent = `当前口径：${state.periodMode === 'latest' ? '最新快照' : '统一年度'}`;
    byId('freshness-pill').textContent = `生成于 ${state.siteData?.meta?.siteGeneratedAt || '未知'}`;
  }

  function renderKpis() {
    const labels = qsa('.kpi-grid .kpi-label');
    if (labels.length >= 2) {
      labels[0].textContent = state.mapMode === 'province' ? '当前可比省级地区' : '当前可比城市';
      labels[1].textContent = state.mapMode === 'province' ? '省级核心指标数' : '城市核心指标数';
    }

    if (state.mapMode === 'province') {
      const comparable = state.provinces.filter((item) => item.coverageLevel !== 'limited');
      const bestIncome = [...comparable].sort((a, b) => (b.incomeSupportScore ?? 0) - (a.incomeSupportScore ?? 0))[0];
      const bestOverview = [...comparable].sort((a, b) => (b.overviewScore ?? 0) - (a.overviewScore ?? 0))[0];
      const bestService = [...comparable].sort((a, b) => (b.publicServiceScore ?? 0) - (a.publicServiceScore ?? 0))[0];
      byId('kpi-city-count').textContent = state.siteData?.provinceViewModel?.summary?.comparableMainlandProvinces || comparable.length || 0;
      byId('kpi-metric-count').textContent = state.siteData?.provinceViewModel?.summary?.coreMetricCount || 0;
      byId('kpi-rent-friendly').textContent = bestIncome?.name || '—';
      byId('kpi-rent-friendly-note').textContent = '收入支撑更强';
      byId('kpi-saving-friendly').textContent = bestOverview?.name || '—';
      byId('kpi-saving-friendly-note').textContent = '综合省级概览更高';
      byId('kpi-transit-friendly').textContent = bestService?.name || '—';
      byId('kpi-transit-friendly-note').textContent = '基础公共服务更强';
    } else {
      const pool = state.filteredCities.length ? state.filteredCities : state.cities.filter((city) => city.cityMapEligibility);
      const rentFriendly = [...pool].filter((city) => num(city.rentBurdenProxy) !== null).sort((a, b) => a.rentBurdenProxy - b.rentBurdenProxy)[0];
      const savingFriendly = [...pool].filter((city) => num(city.savingScore) !== null).sort((a, b) => b.savingScore - a.savingScore)[0];
      const transitFriendly = [...pool].filter((city) => num(city.commuteIndex) !== null).sort((a, b) => b.commuteIndex - a.commuteIndex)[0];
      byId('kpi-city-count').textContent = pool.length || 0;
      byId('kpi-metric-count').textContent = state.siteData?.viewModel?.summary?.coreMetricCount || 0;
      byId('kpi-rent-friendly').textContent = rentFriendly?.name || '—';
      byId('kpi-rent-friendly-note').textContent = '房租压力更低';
      byId('kpi-saving-friendly').textContent = savingFriendly?.name || '—';
      byId('kpi-saving-friendly-note').textContent = '攒钱友好度更高';
      byId('kpi-transit-friendly').textContent = transitFriendly?.name || '—';
      byId('kpi-transit-friendly-note').textContent = '通勤便利度更高';
    }

    byId('kpi-updated-at').textContent = state.siteData?.meta?.siteGeneratedAt || '—';
  }

  function renderMapSidePanel() {
    const description = byId('map-description');
    const coverageList = byId('map-coverage-list');
    const sourceList = byId('map-source-list');
    const selectionPill = byId('map-selection-pill');
    const backButton = byId('map-back-button');
    if (!description || !coverageList || !sourceList || !selectionPill || !backButton) return;

    const province = currentProvince();

    if (state.mapMode === 'province') {
      const metric = currentProvinceMetricMeta();
      selectionPill.textContent = province ? `当前：${province.name} · ${metric.label}` : `当前：全国省级概览 · ${metric.label}`;
      backButton.hidden = true;

      if (province) {
        description.textContent = `${province.name} 当前省级概览分为 ${fmt(province.overviewScore)}。点击地图可直接切换到该省城市层。`;
        coverageList.innerHTML = [
          `<li>收入支撑：${fmt(province.incomeSupportScore)}</li>`,
          `<li>消费负担：${fmt(province.consumptionBurdenScore)}</li>`,
          `<li>公共服务：${fmt(province.publicServiceScore)}</li>`,
          `<li>环境项：${fmt(province.environmentScore)}${province.qualityFlags.includes('environment_green_proxy') ? '（代理值）' : ''}</li>`,
        ].join('');
        sourceList.innerHTML = [
          `<li>省会 / 代表城市：${province.provinceCapital || '暂无'}</li>`,
          `<li>来源：${province.sourceRefs.map((id) => getSourceById(id)?.name).filter(Boolean).join('、') || '国家统计局公开口径'}</li>`,
        ].join('');
      } else {
        description.textContent = '当前为全国省级概览。点击任一省份后进入城市层，继续查看省内城市差异。';
        coverageList.innerHTML = [
          '<li>大陆 31 个省级地区可比；港澳台单独标记为有限比较。</li>',
          '<li>省级层默认使用 2024 官方年度底座。</li>',
          '<li>环境项如使用代理值，会在右侧说明和推荐结果中明确标注。</li>',
        ].join('');
        sourceList.innerHTML = '<li>来源：国家数据 / 国家统计局分省年度公开接口</li>';
      }
      return;
    }

    const metric = currentCityMetricMeta();
    selectionPill.textContent = province ? `当前：${province.name} · ${metric.label}` : `当前：省内城市 · ${metric.label}`;
    backButton.hidden = false;

    if (!province) {
      description.textContent = '请选择一个省份查看城市层。';
      coverageList.innerHTML = '<li>点击任一省份即可进入该省城市视图。</li>';
      sourceList.innerHTML = '<li>当前暂无省份上下文。</li>';
      return;
    }

    const cityPool = currentCityPool();
    const deepCount = cityPool.filter((city) => city.cityRecommendationEligibility).length;
    description.textContent = `${province.name} 已切换到城市层。点击其他省份可直接切换，不需要先返回全国。`;
    coverageList.innerHTML = [
      `<li>省内城市样本：${cityPool.length} 个</li>`,
      `<li>完整推荐资格：${deepCount} 个</li>`,
      `<li>${cityScopeIsBaseOnly() ? '当前省份主要是基础官方层。' : '当前省份含深度快照城市。'}</li>`,
    ].join('');

    const sourceNames = [...new Set(cityPool.flatMap((city) => city.sourceRefs).map((id) => getSourceById(id)?.name).filter(Boolean))].slice(0, 5);
    sourceList.innerHTML = sourceNames.length ? sourceNames.map((name) => `<li>${name}</li>`).join('') : '<li>查看城市详情可追溯单城来源。</li>';
  }

  function renderMap() {
    ensureCityMetricForScope();
    if (!state.charts.map) {
      setModuleState('map-state', 'error', '本地图表资源未成功加载。');
      return;
    }

    const ok = state.mapMode === 'province'
      ? Charts.renderProvinceMap(state.charts.map, state.provinces, currentProvinceMetricMeta(), state.selectedProvinceId)
      : Charts.renderCityMap(state.charts.map, currentCityPool(), state.provinces, currentProvince(), currentCityMetricMeta(), state.activeCityId);

    if (!ok) {
      setModuleState('map-state', 'warning', state.mapMode === 'province' ? '暂无省级可比数据。' : '当前省份城市层仍在补全，可先查看榜单和右侧说明。');
    } else {
      hideModuleState('map-state');
    }

    renderMapSidePanel();
  }

  function renderRankingList(targetId, items, key, highBetter = true) {
    const node = byId(targetId);
    if (!node) return;
    const sorted = [...items]
      .filter((item) => num(item[key]) !== null)
      .sort((a, b) => (highBetter ? b[key] - a[key] : a[key] - b[key]))
      .slice(0, 5);

    node.innerHTML = sorted.length
      ? sorted.map((item) => `
          <li>
            <button class="ranking-link" type="button" data-entity-type="${state.mapMode === 'province' ? 'province' : 'city'}" data-entity-id="${item.id}">
              <span>${item.name}</span>
              <span>${formatMetricValue(key, item[key])}</span>
            </button>
          </li>
        `).join('')
      : '<li class="empty-state">暂无可比较样本</li>';
  }
  function renderRankings() {
    const titles = qsa('#ranking-section .card h3');
    if (state.mapMode === 'province') {
      titles[0].textContent = '收入支撑更强的省份';
      titles[1].textContent = '综合概览更高的省份';
      titles[2].textContent = '公共服务更强的省份';
      titles[3].textContent = '环境代理更优的省份';
      titles[4].textContent = '消费负担更友好的省份';
      const comparable = state.provinces.filter((item) => item.coverageLevel !== 'limited');
      renderRankingList('ranking-rent', comparable, 'incomeSupportScore', true);
      renderRankingList('ranking-saving', comparable, 'overviewScore', true);
      renderRankingList('ranking-transit', comparable, 'publicServiceScore', true);
      renderRankingList('ranking-air', comparable, 'environmentScore', true);
      renderRankingList('ranking-balanced', comparable, 'consumptionBurdenScore', true);
      return;
    }

    const pool = currentCityPool();
    if (cityScopeIsBaseOnly()) {
      titles[0].textContent = '工资参考更高的城市';
      titles[1].textContent = '基础官方实力更强的城市';
      titles[2].textContent = 'GDP 更高的城市';
      titles[3].textContent = '医院资源更强的城市';
      titles[4].textContent = '高校资源更强的城市';
      renderRankingList('ranking-rent', pool, 'effectiveMonthlyIncome', true);
      renderRankingList('ranking-saving', pool, 'baseOfficialScore', true);
      renderRankingList('ranking-transit', pool, 'officialGdp', true);
      renderRankingList('ranking-air', pool, 'officialHospitals', true);
      renderRankingList('ranking-balanced', pool, 'officialStudents', true);
      return;
    }

    titles[0].textContent = '房租压力较低城市';
    titles[1].textContent = '攒钱友好城市';
    titles[2].textContent = '通勤便利城市';
    titles[3].textContent = '空气质量较好城市';
    titles[4].textContent = '综合平衡样本';
    renderRankingList('ranking-rent', pool, 'rentBurdenProxy', false);
    renderRankingList('ranking-saving', pool, 'savingScore', true);
    renderRankingList('ranking-transit', pool, 'commuteIndex', true);
    renderRankingList('ranking-air', pool, 'airQualityScore', true);
    renderRankingList('ranking-balanced', pool, 'balancedScore', true);
  }

  function comparePool() {
    const pool = currentCityPool();
    if (pool.length >= 2) return pool;
    return state.cities.filter((city) => city.cityRecommendationEligibility || city.cityMapEligibility);
  }

  function renderComparePicker() {
    const node = byId('compare-city-list');
    if (!node) return;
    const options = comparePool().slice(0, 24);
    node.innerHTML = options.length
      ? options.map((city) => `
          <label class="picker-item">
            <span>
              <input type="checkbox" value="${city.id}" ${state.compareIds.includes(city.id) ? 'checked' : ''} />
              <strong>${city.name}</strong>
            </span>
            <small>${city.layerType === 'major-city-official' ? '基础官方层' : '深度快照层'}</small>
          </label>
        `).join('')
      : '<p class="empty-state">当前没有可对比城市。</p>';
  }

  function renderCompare() {
    const items = state.cities.filter((city) => state.compareIds.includes(city.id)).slice(0, 4);
    const ok = Charts.renderCompareChart(state.charts.compare, items, 'city');
    if (!ok) setModuleState('compare-state', 'loading', '等待选择城市…');
    else hideModuleState('compare-state');
    const summaryNode = byId('compare-summary-content');
    if (!summaryNode) return;
    const summary = Recommendation.buildCityComparisonSummary(items);
    summaryNode.innerHTML = summary.map((line) => `<p>${line}</p>`).join('');
  }

  function renderScatter() {
    const pool = currentCityPool().length >= 2 ? currentCityPool() : state.cities.filter((city) => city.cityRecommendationEligibility || city.cityMapEligibility);
    const ok = Charts.renderScatter(state.charts.scatter, pool);
    if (!ok) setModuleState('scatter-state', 'warning', '当前可用于散点图的城市样本不足。');
    else hideModuleState('scatter-state');
  }

  function selectedProvinceNameForAi(provinceId) {
    if (!provinceId || provinceId === 'all') return '';
    return state.provinces.find((province) => province.id === provinceId)?.name || '';
  }

  function renderAiResults() {
    const prefs = state.aiPreferences;
    const scope = prefs.scope || 'city';
    const provinceScope = scope === 'city' && prefs.provinceScope === 'all' && state.mapMode === 'city' && state.selectedProvinceId
      ? state.selectedProvinceId
      : (prefs.provinceScope || 'all');

    const results = scope === 'province'
      ? Recommendation.recommendProvinces(state.provinces, prefs)
      : Recommendation.recommendCities(state.cities, prefs, { provinceId: provinceScope });

    const summaryNode = byId('ai-weight-summary');
    if (summaryNode) {
      const lines = Recommendation.summarizeWeight(scope, prefs, selectedProvinceNameForAi(scope === 'city' ? provinceScope : ''));
      summaryNode.innerHTML = lines.map((line) => `<p>${line}</p>`).join('');
    }

    const listNode = byId('ai-results-list');
    if (!listNode) return;
    if (!results.length) {
      listNode.innerHTML = '<p class="empty-state">当前条件下暂无合适结果，请放宽条件或先看省级推荐。</p>';
      return;
    }

    listNode.innerHTML = results.map((item) => {
      const proxyNote = scope === 'province' && ensureArray(item.qualityFlags).includes('environment_green_proxy')
        ? '<p class="section-note">当前省级环境项含代理值，不等同于省级实时空气质量。</p>'
        : item.layerType === 'major-city-official'
          ? '<p class="section-note">当前为基础官方分析：已比较收入、GDP、医疗和教育，租金 / 通勤 / 空气仍在补全。</p>'
          : '';

      return `
        <article class="recommendation-card card">
          <div class="recommendation-head">
            <div>
              <h3>${item.name}</h3>
              <p class="section-note">${item.recommendationLabel}</p>
            </div>
            <strong>${fmt(item.finalAiScore)}</strong>
          </div>
          ${proxyNote}
          <p><strong>推荐理由：</strong>${item.positives.map((factor) => factor.label).join('、')}</p>
          <p><strong>潜在代价：</strong>${item.tradeoffs.map((factor) => factor.label).join('、')}</p>
          <p><strong>下一步：</strong>${item.nextStep}</p>
          <div class="recommendation-actions">
            <button class="btn btn-secondary btn-compact" type="button" data-ai-focus="${scope}" data-entity-id="${item.id}">在地图中查看</button>
          </div>
        </article>
      `;
    }).join('');
  }

  function renderPersonaAdvice() {
    const node = byId('persona-advice');
    if (!node) return;
    const lines = Recommendation.buildPersonaAdvice(state.cities, state.provinces);
    node.innerHTML = lines.map((line) => `<p>${line}</p>`).join('');
  }

  function renderDisclaimers() {
    const node = byId('data-disclaimer-list');
    if (!node) return;
    const lines = ensureArray(state.siteData?.meta?.disclaimer);
    node.innerHTML = lines.length ? lines.map((line) => `<li>${line}</li>`).join('') : '<li>暂无说明。</li>';
  }

  function renderResearchTable() {
    const node = byId('research-table-body');
    if (!node) return;
    const rows = ensureArray(state.siteData?.sources?.researchSummary);
    node.innerHTML = rows.map((item) => `
      <tr>
        <td>${item.name || '暂无'}</td>
        <td>${item.typeLabel || item.type || '暂无'}</td>
        <td>${ensureArray(item.fields).join('、') || '暂无'}</td>
        <td>${item.coverage || '暂无'}</td>
        <td>${item.updateFrequency || '暂无'}</td>
        <td>${item.suitableForMvp ? '是' : '否'}</td>
        <td>${item.staticFriendly ? '是' : '否'}</td>
        <td>${item.comparable ? '是' : '否'}</td>
        <td>${item.limitations || '暂无'}</td>
      </tr>
    `).join('');
  }

  function renderFooter() {
    const node = byId('footer-generated-at');
    if (node) node.textContent = `生成时间：${state.siteData?.meta?.siteGeneratedAt || '未知'}`;
  }

  function openDrawer(cityId) {
    const city = state.cities.find((item) => item.id === cityId);
    const drawer = byId('city-drawer');
    const content = byId('drawer-content');
    if (!city || !drawer || !content) return;

    const sourceList = city.sourceRefs
      .map((id) => getSourceById(id))
      .filter(Boolean)
      .map((item) => `<li><a href="${item.url}" target="_blank" rel="noreferrer">${item.name}</a></li>`)
      .join('');

    content.innerHTML = `
      <div class="drawer-header">
        <h2>${city.name}</h2>
        <p>${city.longDescription || city.shortDescription || '暂无城市说明。'}</p>
      </div>
      <div class="detail-grid">
        <div><strong>省份</strong><span>${city.province || '暂无'}</span></div>
        <div><strong>层级</strong><span>${city.layerType === 'major-city-official' ? '基础官方层' : '深度快照层'}</span></div>
        <div><strong>城市等级</strong><span>${TIER_LABELS[city.tier] || city.tier || '暂无'}</span></div>
        <div><strong>统计周期</strong><span>${city.displayPeriodLabel || '查看来源'}</span></div>
        <div><strong>月收入参考</strong><span>${formatMetricValue('effectiveMonthlyIncome', city.effectiveMonthlyIncome)}</span></div>
        <div><strong>人均可支配收入</strong><span>${fmtInt(city.disposableIncome, ' 元/年')}</span></div>
        <div><strong>房租压力</strong><span>${formatMetricValue('rentBurdenProxy', city.rentBurdenProxy)}</span></div>
        <div><strong>综合生活成本</strong><span>${fmt(city.totalCostIndex)}</span></div>
        <div><strong>通勤便利</strong><span>${fmt(city.commuteIndex)}</span></div>
        <div><strong>空气质量</strong><span>${fmt(city.airQualityScore)}</span></div>
        <div><strong>基础官方实力</strong><span>${fmt(city.baseOfficialScore)}</span></div>
        <div><strong>覆盖等级</strong><span>${city.coverageLabel || '仅展示'}</span></div>
      </div>
      <div class="detail-section"><h3>适合人群</h3><p>${city.suitableFor.join('、') || '暂无'}</p></div>
      <div class="detail-section"><h3>不太适合</h3><p>${city.notIdealFor.join('、') || '暂无'}</p></div>
      <div class="detail-section"><h3>标签</h3><p>${city.tags.join('、') || '暂无'}</p></div>
      <div class="detail-section"><h3>来源</h3><ul class="meta-list">${sourceList || '<li>暂无来源信息</li>'}</ul></div>
    `;

    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
  }

  function closeDrawer() {
    const drawer = byId('city-drawer');
    if (!drawer) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
  }
  function focusEntity(scope, id) {
    if (scope === 'province') {
      state.selectedProvinceId = id;
      state.activeCityId = null;
      state.mapMode = 'province';
      syncMapModeButtons();
      renderAll();
      return;
    }

    const city = state.cities.find((item) => item.id === id);
    if (!city) return;
    state.selectedProvinceId = city.provinceId;
    state.mapMode = 'city';
    state.activeCityId = city.id;
    syncMapModeButtons();
    renderAll();
    openDrawer(city.id);
  }

  function readAiPreferences() {
    const form = byId('ai-form');
    if (!form) return state.aiPreferences;
    const data = new FormData(form);
    return {
      scope: data.get('scope'),
      provinceScope: data.get('provinceScope'),
      budgetBand: data.get('budgetBand'),
      lifeStage: data.get('lifeStage'),
      household: data.get('household'),
      regionPreference: data.get('regionPreference'),
      tierPreference: data.get('tierPreference'),
      rentTolerance: data.get('rentTolerance'),
      savingPriority: Number(data.get('savingPriority')),
      commutePriority: Number(data.get('commutePriority')),
      airPriority: Number(data.get('airPriority')),
      opportunityPriority: Number(data.get('opportunityPriority')),
    };
  }

  function renderAll() {
    applyFilters();
    ensureCityMetricForScope();
    state.compareIds = state.compareIds.filter((id) => comparePool().some((item) => item.id === id));
    renderOverview();
    renderKpis();
    renderMap();
    renderRankings();
    renderComparePicker();
    renderCompare();
    renderScatter();
    renderAiResults();
    renderPersonaAdvice();
    renderDisclaimers();
    renderResearchTable();
    renderFooter();
  }

  function bindMapControls() {
    qsa('[data-map-mode]').forEach((button) => {
      button.addEventListener('click', () => {
        state.mapMode = button.dataset.mapMode;
        if (state.mapMode === 'city' && !state.selectedProvinceId) {
          state.selectedProvinceId = state.cities.find((city) => city.cityMapEligibility)?.provinceId || null;
        }
        if (state.mapMode === 'province') state.activeCityId = null;
        syncMapModeButtons();
        renderAll();
      });
    });

    byId('province-map-metric')?.addEventListener('change', (event) => {
      state.provinceMetric = event.target.value;
      renderMap();
    });

    byId('city-map-metric')?.addEventListener('change', (event) => {
      state.cityMetric = event.target.value;
      renderMap();
    });

    byId('map-back-button')?.addEventListener('click', () => {
      state.mapMode = 'province';
      state.activeCityId = null;
      syncMapModeButtons();
      renderAll();
    });
  }

  function bindPeriodToggle() {
    qsa('[data-period-mode]').forEach((button) => {
      button.addEventListener('click', () => {
        state.periodMode = button.dataset.periodMode;
        syncPeriodButtons();
        renderAll();
      });
    });
  }

  function bindFilters() {
    ['filter-tier', 'filter-region', 'filter-rent', 'filter-income', 'filter-commute', 'filter-air', 'filter-cost', 'filter-persona', 'sort-mode'].forEach((id) => {
      byId(id)?.addEventListener('change', renderAll);
    });
  }

  function bindRanges() {
    qsa('input[type="range"]').forEach((input) => {
      input.addEventListener('input', syncRangeOutputs);
    });
    syncRangeOutputs();
  }

  function bindSearch() {
    const runSearch = () => {
      const keyword = (byId('hero-search')?.value || '').trim();
      const feedback = byId('search-feedback');
      if (!keyword) {
        if (feedback) feedback.textContent = '支持搜索省份中文名、城市中文名和部分拼音。';
        return;
      }

      const lower = keyword.toLowerCase();
      const province = state.provinces.find((item) => item.name.includes(keyword) || (item.provinceCapital || '').includes(keyword));
      if (province) {
        state.selectedProvinceId = province.id;
        state.mapMode = 'province';
        state.activeCityId = null;
        syncMapModeButtons();
        renderAll();
        if (feedback) feedback.textContent = `已定位到 ${province.name}，再点一次地图可进入该省城市层。`;
        return;
      }

      const city = state.cities.find((item) => item.name.includes(keyword) || (item.pinyin || '').toLowerCase().includes(lower));
      if (city) {
        state.selectedProvinceId = city.provinceId;
        state.mapMode = 'city';
        state.activeCityId = city.id;
        syncMapModeButtons();
        renderAll();
        openDrawer(city.id);
        if (feedback) feedback.textContent = `已定位到 ${city.name}。`;
        return;
      }

      if (feedback) feedback.textContent = `没有找到“${keyword}”对应的省份或城市。`;
    };

    byId('search-button')?.addEventListener('click', runSearch);
    byId('hero-search')?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        runSearch();
      }
    });
  }

  function bindAi() {
    const form = byId('ai-form');
    form?.addEventListener('submit', (event) => {
      event.preventDefault();
      state.aiPreferences = readAiPreferences();
      renderAiResults();
    });

    ['ai-scope', 'ai-province', 'ai-region'].forEach((id) => {
      byId(id)?.addEventListener('change', () => {
        state.aiPreferences = readAiPreferences();
        renderAiResults();
      });
    });

    qsa('#persona-pills .chip').forEach((button) => {
      button.addEventListener('click', () => {
        state.aiPreferences = Recommendation.applyPreset(readAiPreferences(), button.dataset.preset);
        const currentForm = byId('ai-form');
        Object.entries(state.aiPreferences).forEach(([key, value]) => {
          if (!currentForm?.elements?.[key]) return;
          currentForm.elements[key].value = value;
        });
        syncRangeOutputs();
        renderAiResults();
      });
    });
  }

  function bindCompare() {
    byId('compare-city-list')?.addEventListener('change', (event) => {
      const input = event.target;
      if (!input.matches('input[type="checkbox"]')) return;
      if (input.checked) {
        if (state.compareIds.length >= 4) {
          input.checked = false;
          return;
        }
        state.compareIds.push(input.value);
      } else {
        state.compareIds = state.compareIds.filter((id) => id !== input.value);
      }
      renderCompare();
    });
  }

  function bindDrawer() {
    qsa('[data-close-drawer]').forEach((node) => node.addEventListener('click', closeDrawer));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeDrawer();
    });
  }

  function bindDelegatedClicks() {
    document.body.addEventListener('click', (event) => {
      const rankingLink = event.target.closest('.ranking-link');
      if (rankingLink) focusEntity(rankingLink.dataset.entityType, rankingLink.dataset.entityId);
      const aiFocus = event.target.closest('[data-ai-focus]');
      if (aiFocus) focusEntity(aiFocus.dataset.aiFocus, aiFocus.dataset.entityId);
    });
  }

  function bindNavToggle() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const nav = document.querySelector('[data-nav]');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('is-open', !expanded);
    });
  }

  function initCharts() {
    state.charts.map = Charts.createMap('city-map', ({ type, id, name }) => {
      if (type === 'province' || type === 'provinceName') {
        const targetProvinceId = id || resolveProvinceIdByName(name);
        if (!targetProvinceId) return;
        state.selectedProvinceId = targetProvinceId;
        state.activeCityId = null;
        if (state.mapMode === 'province') state.mapMode = 'city';
        syncMapModeButtons();
        renderAll();
        return;
      }

      if (type === 'city' && id) {
        state.activeCityId = id;
        openDrawer(id);
      }
    });

    state.charts.compare = Charts.createCompareChart('compare-chart');
    state.charts.scatter = Charts.createScatter('income-rent-scatter', openDrawer);
  }

  function init() {
    if (!Charts || !Recommendation) {
      showBanner('error', '前端脚本没有完整加载，请刷新页面后重试。');
      return;
    }

    const siteData = global.CITY_SITE_DATA;
    if (!siteData?.provinceViewModel?.provinces?.length || !siteData?.viewModel?.cities?.length) {
      showBanner('error', '本地数据包未成功加载，请先执行数据构建脚本。');
      return;
    }

    hideBanner();
    state.siteData = siteData;
    state.provinces = siteData.provinceViewModel.provinces.map(normalizeProvince);
    state.cities = siteData.viewModel.cities.map(normalizeCity);
    state.metrics.province = buildMetricMeta(siteData.provinceViewModel.enums?.mapMetrics);
    state.metrics.city = buildMetricMeta(siteData.viewModel.enums?.mapMetrics, { effectiveMonthlyIncome: '工资参考', baseOfficialScore: '基础官方实力' });

    initCharts();
    populateControls();
    bindNavToggle();
    bindMapControls();
    bindPeriodToggle();
    bindFilters();
    bindRanges();
    bindSearch();
    bindAi();
    bindCompare();
    bindDrawer();
    bindDelegatedClicks();
    syncMapModeButtons();
    syncPeriodButtons();
    renderAll();
  }

  document.addEventListener('DOMContentLoaded', init);
})(window);
