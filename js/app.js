(function attachCityApp(global) {
  const Charts = global.CityCharts;
  const Recommendation = global.CityRecommendation;

  const state = {
    siteData: null,
    baseCities: [],
    filteredCities: [],
    selectedCompareIds: [],
    periodMode: 'latest',
    mapMetric: 'totalCostIndex',
    charts: {
      map: null,
      scatter: null,
      compare: null,
    },
  };

  const num = (value) => (typeof value === 'number' && Number.isFinite(value) ? value : null);
  const fmt = (value, digits = 1, suffix = '') => (num(value) === null ? '暂无' : `${value.toFixed(digits)}${suffix}`);
  const fmtInt = (value, suffix = '') => (num(value) === null ? '暂无' : `${Math.round(value)}${suffix}`);
  const COVERAGE_LABELS = {
    full: '完整推荐',
    degraded: '降级推荐',
    limited: '仅展示',
    '完整推荐': '完整推荐',
    '降级推荐': '降级推荐',
    '仅展示': '仅展示',
  };
  const METRIC_LABELS = {
    totalCostIndex: '综合生活成本',
    rentBurdenProxy: '房租压力',
    commuteIndex: '通勤便利',
    airQualityScore: '空气质量',
    balancedScore: '综合平衡型',
    savingScore: '攒钱友好度',
  };

  const byId = (id) => document.getElementById(id);
  const firstNonEmpty = (...values) => values.find((value) => value !== null && value !== undefined && value !== '');

  function showBanner(type, message, targetId = 'global-banner') {
    const banner = byId(targetId);
    if (!banner) return;
    banner.className = `status-banner status-banner-${type}`;
    banner.textContent = message;
  }

  function hideBanner(targetId = 'global-banner') {
    const banner = byId(targetId);
    if (!banner) return;
    banner.className = 'status-banner status-banner-hidden';
    banner.textContent = '';
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

  function getSiteData() {
    return global.CITY_SITE_DATA || null;
  }

  function getSources() {
    return state.siteData?.sources?.sources || [];
  }

  function getSourceById(sourceId) {
    return getSources().find((item) => item.sourceId === sourceId) || null;
  }

  function getMetricMeta() {
    const found = state.siteData?.viewModel?.enums?.mapMetrics?.find((item) => item.key === state.mapMetric)
      || { key: state.mapMetric, label: state.mapMetric };
    return {
      ...found,
      label: METRIC_LABELS[state.mapMetric] || found.label || state.mapMetric,
    };
  }

  function getCoverageLabel(city) {
    return COVERAGE_LABELS[city.coverageCode] || COVERAGE_LABELS[city.coverageLabel] || '仅展示';
  }

  function getPeriodPresentation(city, periodInfo) {
    if (state.periodMode === 'alignedAnnual') {
      return {
        label: periodInfo.aligned
          ? '统一年度模式：当前核心字段已尽量对齐到 2024。'
          : '统一年度模式：目标对齐 2024，但当前城市仍含未完全对齐的最近快照。',
        note: '统一年度模式优先使用 2024 年度口径；若缺少 2024 城市级值，则保留最近快照并明确提示。',
      };
    }

    const label = periodInfo.label === 'Latest verified snapshot'
      ? '按最近可核实快照展示'
      : periodInfo.label;
    return {
      label,
      note: '最新可用模式：按各指标最近可核实快照展示。',
    };
  }

  function attachPeriodFields(city) {
    const periodInfo = city.periods?.[state.periodMode] || city.periods?.latest || {};
    const periodPresentation = getPeriodPresentation(city, periodInfo);
    return {
      ...city,
      coverageLabel: getCoverageLabel(city),
      displayPeriodLabel: firstNonEmpty(periodPresentation.label, city.displayPeriodLabel, '见数据说明'),
      periodNote: firstNonEmpty(periodPresentation.note, '见数据说明'),
      alignedToAnnual: Boolean(periodInfo.aligned),
      periodFlags: periodInfo.flags || [],
    };
  }

  function getCities() {
    return (state.siteData?.viewModel?.cities || []).map(attachPeriodFields);
  }

  function buildOption(select, value, label) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    select.appendChild(option);
  }

  function populateStaticSelects() {
    const tiers = state.siteData?.viewModel?.enums?.tiers || [];
    const regions = state.siteData?.viewModel?.enums?.regions || [];

    const tierSelect = byId('filter-tier');
    const regionSelect = byId('filter-region');
    const aiRegionSelect = byId('ai-region');

    tierSelect.innerHTML = '<option value="all">全部</option>';
    regionSelect.innerHTML = '<option value="all">全部</option>';
    aiRegionSelect.innerHTML = '<option value="all">不限</option>';

    tiers.forEach((tier) => buildOption(tierSelect, tier, tier));
    regions.forEach((region) => {
      buildOption(regionSelect, region, region);
      buildOption(aiRegionSelect, region, region);
    });
  }

  function band(value, low, high) {
    if (num(value) === null) return null;
    if (value <= low) return 'low';
    if (value <= high) return 'mid';
    return 'high';
  }

  function applyFilters() {
    const filters = {
      tier: byId('filter-tier').value,
      region: byId('filter-region').value,
      rent: byId('filter-rent').value,
      income: byId('filter-income').value,
      commute: byId('filter-commute').value,
      air: byId('filter-air').value,
      cost: byId('filter-cost').value,
      persona: byId('filter-persona').value,
      sortMode: byId('sort-mode').value,
    };

    const filtered = state.baseCities.filter((city) => {
      if (filters.tier !== 'all' && city.tier !== filters.tier) return false;
      if (filters.region !== 'all' && city.region !== filters.region) return false;
      if (filters.rent !== 'all' && band(city.rentMedianPerSqm, 35, 55) !== filters.rent) return false;
      if (filters.income !== 'all' && band(city.disposableIncome, 70000, 82000) !== filters.income) return false;
      if (filters.commute === 'good' && (num(city.commuteIndex) === null || city.commuteIndex < 60)) return false;
      if (filters.commute === 'limited' && num(city.commuteIndex) !== null) return false;
      if (filters.air === 'good' && (num(city.airQualityScore) === null || city.airQualityScore < 65)) return false;
      if (filters.air === 'limited' && num(city.airQualityScore) !== null) return false;
      if (filters.cost === 'friendly' && (num(city.totalCostIndex) === null || city.totalCostIndex > 45)) return false;
      if (filters.cost === 'balanced' && (num(city.totalCostIndex) === null || city.totalCostIndex < 45 || city.totalCostIndex > 65)) return false;
      if (filters.cost === 'pressured' && (num(city.totalCostIndex) === null || city.totalCostIndex <= 65)) return false;
      if (filters.persona === 'graduates' && (num(city.graduateScore) === null || city.graduateScore < 68)) return false;
      if (filters.persona === 'couples' && (num(city.coupleScore) === null || city.coupleScore < 68)) return false;
      if (filters.persona === 'budget' && (num(city.costFriendliness) === null || city.costFriendliness < 60)) return false;
      if (filters.persona === 'saving' && (num(city.savingScore) === null || city.savingScore < 65)) return false;
      return true;
    });

    const sorted = [...filtered];
    sorted.sort((a, b) => {
      if (filters.sortMode === 'totalCostIndexAsc') return (a.totalCostIndex ?? 999) - (b.totalCostIndex ?? 999);
      return (b[filters.sortMode] ?? -999) - (a[filters.sortMode] ?? -999);
    });

    state.filteredCities = sorted;
    byId('filter-summary').textContent = state.filteredCities.length
      ? `当前可比较 ${state.filteredCities.length} 城。`
      : '当前筛选下无结果。';
  }

  function renderHero() {
    const summary = state.siteData.viewModel.summary;
    byId('hero-city-count').textContent = summary.totalCities;
    byId('hero-deep-count').textContent = summary.aiEligibleCities;
    byId('hero-source-count').textContent = getSources().length;
    byId('coverage-pill').textContent = `当前内置 ${summary.totalCities} 城快照`;
    byId('period-pill').textContent = state.periodMode === 'latest' ? '当前模式：最新可用' : '当前模式：统一年度';
    byId('freshness-pill').textContent = `派生数据生成于 ${state.siteData.viewModel.generatedAt}`;
    byId('footer-generated-at').textContent = `生成时间：${state.siteData.viewModel.generatedAt}`;
  }

  function renderKpis() {
    byId('kpi-city-count').textContent = state.filteredCities.length;
    byId('kpi-metric-count').textContent = state.siteData.viewModel.summary.coreMetricCount;

    const topBy = (key, ascending = false) =>
      [...state.filteredCities]
        .filter((city) => num(city[key]) !== null)
        .sort((a, b) => ascending ? a[key] - b[key] : b[key] - a[key])[0];

    const rent = topBy('rentBurdenProxy', true);
    const saving = topBy('savingScore');
    const transit = topBy('commuteIndex');

    byId('kpi-rent-friendly').textContent = rent?.name || '暂无';
    byId('kpi-rent-friendly-note').textContent = rent ? `${(rent.rentBurdenProxy * 100).toFixed(1)}% 代理压力` : '暂无足够数据';
    byId('kpi-saving-friendly').textContent = saving?.name || '暂无';
    byId('kpi-saving-friendly-note').textContent = saving ? `${saving.savingScore.toFixed(1)} 分` : '暂无足够数据';
    byId('kpi-transit-friendly').textContent = transit?.name || '暂无';
    byId('kpi-transit-friendly-note').textContent = transit ? `${transit.commuteIndex.toFixed(1)} 分` : '暂无足够数据';
    byId('kpi-updated-at').textContent = state.siteData.viewModel.generatedAt;
  }

  function renderRankings() {
    const groups = [
      ['ranking-rent', 'rentBurdenProxy', true, (city) => `${(city.rentBurdenProxy * 100).toFixed(1)}%`],
      ['ranking-saving', 'savingScore', false, (city) => `${city.savingScore.toFixed(1)} 分`],
      ['ranking-transit', 'commuteIndex', false, (city) => `${city.commuteIndex.toFixed(1)} 分`],
      ['ranking-air', 'airQualityScore', false, (city) => `${city.airQualityScore.toFixed(1)} 分`],
      ['ranking-balanced', 'balancedScore', false, (city) => `${city.balancedScore.toFixed(1)} 分`],
    ];

    groups.forEach(([id, key, ascending, formatValue]) => {
      const container = byId(id);
      const rows = [...state.filteredCities]
        .filter((city) => num(city[key]) !== null)
        .sort((a, b) => ascending ? a[key] - b[key] : b[key] - a[key])
        .slice(0, 5);

      container.innerHTML = rows.length
        ? rows.map((city) => `
            <li>
              <button class="link-button" type="button" data-city-open="${city.id}">${city.name}</button>
              <span class="drawer-metadata">${formatValue(city)}</span>
            </li>
          `).join('')
        : '<li class="empty-state">当前筛选下暂无足够数据。</li>';
    });
  }

  function renderMapBlock() {
    const metricMeta = getMetricMeta();
    const descriptions = {
      totalCostIndex: '越低越友好。',
      rentBurdenProxy: '估算月租 ÷ 收入参考。',
      commuteIndex: '综合通勤时长、可达性和轨道交通。',
      airQualityScore: '综合优良天数和 PM2.5。',
      balancedScore: '同时看成本、通勤、环境和基础服务。',
      savingScore: '同时看收入、成本和房租压力。',
    };

    byId('map-description').textContent = descriptions[state.mapMetric];
    byId('map-coverage-list').innerHTML = [
      `<li>当前筛选后共有 ${state.filteredCities.length} 城。</li>`,
      `<li>${state.filteredCities.filter((city) => (city.coverageScore || 0) >= 0.8).length} 城达到完整推荐阈值。</li>`,
      `<li>${state.filteredCities.filter((city) => (city.coverageScore || 0) >= 0.6 && (city.coverageScore || 0) < 0.8).length} 城为降级推荐。</li>`,
    ].join('');

    byId('map-source-list').innerHTML = (state.siteData.meta.majorDataPeriods || [])
      .map((line) => `<li>${line}</li>`)
      .join('');

    if (!Charts.hasCharts()) {
      setModuleState('map-state', 'error', '图表未加载，地图不可用。');
      return;
    }

    if (!Charts.hasChinaMap()) {
      setModuleState('map-state', 'warning', '底图未加载，地图暂不可用。');
      return;
    }

    const hasRendered = Charts.renderMap(state.charts.map, state.filteredCities, metricMeta);
    if (hasRendered) {
      hideModuleState('map-state');
    } else {
      setModuleState('map-state', 'warning', '当前筛选下暂无地图点位。');
    }
  }

  function renderComparePicker() {
    const container = byId('compare-city-list');
    container.innerHTML = '';

    state.filteredCities.forEach((city) => {
      const item = document.createElement('label');
      item.className = 'picker-item';
      item.innerHTML = `
        <span>
          <input type="checkbox" value="${city.id}" ${state.selectedCompareIds.includes(city.id) ? 'checked' : ''} />
          ${city.name}
        </span>
        <button type="button" data-city-open="${city.id}">详情</button>
      `;

      item.querySelector('input').addEventListener('change', (event) => {
        if (event.target.checked) {
          state.selectedCompareIds = [...new Set([...state.selectedCompareIds, city.id])].slice(0, 4);
        } else {
          state.selectedCompareIds = state.selectedCompareIds.filter((id) => id !== city.id);
        }
        renderComparePicker();
        renderCompare();
      });

      container.appendChild(item);
    });
  }

  function renderCompare() {
    const selected = state.baseCities.filter((city) => state.selectedCompareIds.includes(city.id));
    byId('compare-summary-content').innerHTML = Recommendation.summarizeCompare(selected);

    if (!Charts.hasCharts()) {
      setModuleState('compare-state', 'error', '图表未加载。');
      return;
    }

    if (selected.length < 2) {
      setModuleState('compare-state', 'warning', '至少选 2 个城市。');
      state.charts.compare?.clear();
      return;
    }

    const rendered = Charts.renderCompareChart(state.charts.compare, selected);
    if (rendered) {
      hideModuleState('compare-state');
    } else {
      setModuleState('compare-state', 'warning', '当前对比数据不足。');
    }
  }

  function renderScatter() {
    if (!Charts.hasCharts()) {
      setModuleState('scatter-state', 'error', '图表未加载。');
      return;
    }

    const rendered = Charts.renderScatter(state.charts.scatter, state.filteredCities);
    if (rendered) {
      hideModuleState('scatter-state');
    } else {
      setModuleState('scatter-state', 'warning', '当前筛选下数据不足。');
    }
  }

  function renderResearchTable() {
    const tbody = byId('research-table-body');
    const rows = state.siteData.sources.researchSummary || [];
    tbody.innerHTML = rows.map((item) => `
      <tr>
        <td>${item.name}</td>
        <td>${item.typeLabel}</td>
        <td>${item.fields.join('、')}</td>
        <td>${item.coverage}</td>
        <td>${item.updateFrequency}</td>
        <td>${item.suitableForMvp ? '是' : '否'}</td>
        <td>${item.staticFriendly ? '是' : '否'}</td>
        <td>${item.comparable ? '是' : '否'}</td>
        <td>${item.limitations}</td>
      </tr>
    `).join('');
  }

  function renderDisclaimers() {
    const list = byId('data-disclaimer-list');
    const lines = state.siteData.meta.disclaimer || [];
    list.innerHTML = lines.map((line) => `<li>${line}</li>`).join('');
  }

  function renderDrawer(cityId) {
    const city = state.baseCities.find((item) => item.id === cityId);
    if (!city) return;

    const sourceLinks = (city.sourceRefs || [])
      .map((sourceId) => getSourceById(sourceId))
      .filter(Boolean)
      .map((source) => `<li><a href="${source.url}" target="_blank" rel="noreferrer">${source.name}</a> · ${source.notes || source.coverage}</li>`)
      .join('');

    byId('drawer-content').innerHTML = `
      <p class="eyebrow">${city.region} · ${city.tier} · ${city.coverageLabel}</p>
      <h2>${city.name}</h2>
      <p>${city.longDescription}</p>
      <div class="drawer-metric-grid">
        <div class="drawer-metric"><span>常住人口</span><strong>${fmt(city.population, 1, ' 万人')}</strong></div>
        <div class="drawer-metric"><span>居民收入</span><strong>${fmtInt(city.disposableIncome, ' 元/年')}</strong></div>
        <div class="drawer-metric"><span>消费支出</span><strong>${fmtInt(city.annualConsumptionPerCapita, ' 元/年')}</strong></div>
        <div class="drawer-metric"><span>租金快照</span><strong>${fmt(city.rentMedianPerSqm, 2, ' 元/㎡/月')}</strong></div>
        <div class="drawer-metric"><span>房租压力代理</span><strong>${num(city.rentBurdenProxy) !== null ? `${(city.rentBurdenProxy * 100).toFixed(1)}%` : '暂无'}</strong></div>
        <div class="drawer-metric"><span>通勤便利</span><strong>${fmt(city.commuteIndex, 1, ' 分')}</strong></div>
        <div class="drawer-metric"><span>空气质量</span><strong>${fmt(city.airQualityScore, 1, ' 分')}</strong></div>
        <div class="drawer-metric"><span>基础服务</span><strong>${fmt(city.basicServices, 1, ' 分')}</strong></div>
        <div class="drawer-metric"><span>攒钱友好度</span><strong>${fmt(city.savingScore, 1, ' 分')}</strong></div>
        <div class="drawer-metric"><span>综合平衡型</span><strong>${fmt(city.balancedScore, 1, ' 分')}</strong></div>
      </div>
      <div class="rich-text">
        <p><strong>生活标签：</strong>${city.tags.join('、')}</p>
        <p><strong>更适合：</strong>${city.suitableFor.join('、')}</p>
        <p><strong>不太适合：</strong>${city.notIdealFor.join('、')}</p>
        <p><strong>覆盖置信：</strong>${Math.round((city.coverageScore || 0) * 100)}% · ${city.coverageLabel}</p>
        <p><strong>周期说明：</strong>${city.displayPeriodLabel}</p>
        <p><strong>质量标记：</strong>${city.qualityFlags?.length ? city.qualityFlags.join('、') : '无'}</p>
        <p><strong>更新时间：</strong>${city.lastUpdated || state.siteData.viewModel.generatedAt}</p>
      </div>
      <div class="side-panel">
        <h3>来源</h3>
        <ul class="meta-list">${sourceLinks || '<li>见 About 页方法说明。</li>'}</ul>
      </div>
    `;

    const drawer = byId('city-drawer');
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
  }

  function closeDrawer() {
    const drawer = byId('city-drawer');
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
  }

  function collectPreferences() {
    const form = byId('ai-form');
    const data = new FormData(form);
    return {
      budgetBand: data.get('budgetBand'),
      lifeStage: data.get('lifeStage'),
      household: data.get('household'),
      savingPriority: +data.get('savingPriority'),
      commutePriority: +data.get('commutePriority'),
      airPriority: +data.get('airPriority'),
      tierPreference: data.get('tierPreference'),
      rentTolerance: data.get('rentTolerance'),
      opportunityPriority: +data.get('opportunityPriority'),
      regionPreference: data.get('regionPreference'),
    };
  }

  function syncRangeOutputs() {
    const form = byId('ai-form');
    form.querySelectorAll('input[type="range"]').forEach((input) => {
      const node = form.querySelector(`[data-range-output="${input.name}"]`);
      if (node) node.textContent = input.value;
    });
  }

  function renderAiResults(preferences) {
    const summary = Recommendation.buildWeightSummary(preferences);
    byId('ai-weight-summary').innerHTML = summary.map((line) => `<p>${line}</p>`).join('');

    const pool = state.filteredCities.length ? state.filteredCities : state.baseCities;
    const results = Recommendation.scoreCities(pool, preferences);
    const list = byId('ai-results-list');

    if (!results.length) {
      const excludedCount = pool.filter((city) => (city.coverageScore || 0) < 0.6).length;
      list.innerHTML = `
        <p class="empty-state">当前偏好下无推荐结果。</p>
        <p class="helper-text">可放宽筛选。另有 ${excludedCount} 城因覆盖不足未进入推荐。</p>
      `;
      return;
    }

    list.innerHTML = results.map((city, index) => {
      const text = Recommendation.buildRecommendationNarrative(city, preferences);
      return `
        <article class="recommendation-card">
          <div class="score-row">
            <span class="tag">Top ${index + 1}</span>
            <span class="tag">${city.finalAiScore.toFixed(1)} 分</span>
            <span class="tag ${city.recommendationLabel === '完整推荐' ? '' : 'tag-warning'}">${city.recommendationLabel}</span>
          </div>
          <h4>${text.title}</h4>
          <p>${text.summary}</p>
          <p><strong>推荐理由：</strong>${text.why}</p>
          <p><strong>潜在代价：</strong>${text.tradeoff}</p>
          <p><strong>适合人群：</strong>${text.fit}</p>
          <p><strong>下一步建议：</strong>${text.nextStep}</p>
          <button class="btn btn-secondary" type="button" data-city-open="${city.id}">查看城市详情</button>
        </article>
      `;
    }).join('');
  }

  function renderSecondary() {
    renderResearchTable();
    renderDisclaimers();
    byId('persona-advice').innerHTML = Recommendation.buildPersonaAdvice(state.filteredCities.length ? state.filteredCities : state.baseCities);
    renderComparePicker();
    renderCompare();
    renderScatter();
  }

  function rerender() {
    state.baseCities = getCities();
    applyFilters();
    renderHero();
    renderKpis();
    renderRankings();
    renderMapBlock();
    renderSecondary();
    renderAiResults(collectPreferences());
  }

  function bindSearch() {
    byId('search-button').addEventListener('click', () => {
      const keyword = byId('hero-search').value.trim().toLowerCase();
      const feedback = byId('search-feedback');
      if (!keyword) {
        feedback.textContent = '请输入城市名或拼音。';
        return;
      }

      const matched = state.baseCities.find((city) =>
        city.name.toLowerCase().includes(keyword) || city.pinyin.toLowerCase().includes(keyword),
      );

      if (!matched) {
        feedback.textContent = `未找到“${keyword}”。`;
        return;
      }

      feedback.textContent = `已定位到 ${matched.name}。`;
      renderDrawer(matched.id);
    });
  }

  function bindFilters() {
    [
      'filter-tier',
      'filter-region',
      'filter-rent',
      'filter-income',
      'filter-commute',
      'filter-air',
      'filter-cost',
      'filter-persona',
      'sort-mode',
      'map-metric',
    ].forEach((id) => {
      byId(id).addEventListener('change', (event) => {
        if (event.target.id === 'map-metric') {
          state.mapMetric = event.target.value;
        }
        rerender();
      });
    });
  }

  function bindPeriodMode() {
    document.querySelectorAll('[data-period-mode]').forEach((button) => {
      button.addEventListener('click', () => {
        document.querySelectorAll('[data-period-mode]').forEach((item) => item.classList.remove('is-active'));
        button.classList.add('is-active');
        state.periodMode = button.dataset.periodMode;
        rerender();
      });
    });
  }

  function bindAiForm() {
    const form = byId('ai-form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      renderAiResults(collectPreferences());
    });
    form.querySelectorAll('input[type="range"]').forEach((input) => {
      input.addEventListener('input', syncRangeOutputs);
    });
  }

  function bindPersonaPills() {
    byId('persona-pills').addEventListener('click', (event) => {
      const preset = event.target?.dataset?.preset;
      if (!preset) return;

      document.querySelectorAll('.chip').forEach((chip) => {
        chip.classList.toggle('is-active', chip.dataset.preset === preset);
      });

      const applied = Recommendation.applyPresetToForm(byId('ai-form'), preset);
      if (applied) {
        syncRangeOutputs();
        renderAiResults(collectPreferences());
      }
    });
  }

  function bindGlobalClicks() {
    document.addEventListener('click', (event) => {
      const openId = event.target?.dataset?.cityOpen;
      if (openId) {
        renderDrawer(openId);
      }
      if (event.target?.dataset?.closeDrawer === 'true') {
        closeDrawer();
      }
    });
  }

  function initCharts() {
    state.charts.map = Charts.createMap('city-map', renderDrawer);
    state.charts.scatter = Charts.createScatter('income-rent-scatter', renderDrawer);
    state.charts.compare = Charts.createCompareChart('compare-chart');
    Charts.bindResize(Object.values(state.charts));

    if (!Charts.hasCharts()) {
      showBanner('warning', '图表未加载，榜单和推荐仍可用。');
    } else if (!Charts.hasChinaMap()) {
      showBanner('warning', '底图未加载，地图将降级。');
    } else {
      hideBanner();
    }
  }

  function init() {
    state.siteData = getSiteData();
    if (!state.siteData?.viewModel?.cities?.length) {
      showBanner('error', '本地数据包未加载成功。');
      setModuleState('map-state', 'error', '数据包缺失。');
      setModuleState('compare-state', 'error', '数据包缺失。');
      setModuleState('scatter-state', 'error', '数据包缺失。');
      return;
    }

    populateStaticSelects();
    syncRangeOutputs();
    initCharts();
    bindSearch();
    bindFilters();
    bindPeriodMode();
    bindAiForm();
    bindPersonaPills();
    bindGlobalClicks();
    rerender();
  }

  document.addEventListener('DOMContentLoaded', init);
})(window);
