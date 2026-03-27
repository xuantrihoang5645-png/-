(function attachCityCharts(global) {
  const defaultNumber = (value) =>
    typeof value === 'number' && Number.isFinite(value) ? value : null;

  const safeLabel = (value, suffix = '') => {
    const normalized = defaultNumber(value);
    return normalized === null ? '暂无' : `${normalized.toFixed(1)}${suffix}`;
  };

  const getRuntime = () => global.echarts || null;
  const hasCharts = () => Boolean(getRuntime());
  const hasChinaMap = () => Boolean(getRuntime()?.getMap?.('china'));

  function initChart(domId, onClick) {
    if (!hasCharts()) return null;
    const dom = document.getElementById(domId);
    if (!dom) return null;
    const chart = getRuntime().init(dom);
    if (typeof onClick === 'function') {
      chart.on('click', (params) => {
        if (params?.data?.cityId) onClick(params.data.cityId);
      });
    }
    return chart;
  }

  function createMap(domId, onClick) {
    if (!hasChinaMap()) return null;
    return initChart(domId, onClick);
  }

  function createScatter(domId, onClick) {
    return initChart(domId, onClick);
  }

  function createCompareChart(domId) {
    return initChart(domId);
  }

  function renderMap(chart, cityMetrics, metricMeta) {
    if (!chart || !hasChinaMap()) return false;
    const metricKey = metricMeta.key;
    const metricLabel = metricMeta.label || metricKey;
    const values = cityMetrics
      .map((city) => defaultNumber(city[metricKey]))
      .filter((value) => value !== null);
    const min = values.length ? Math.min(...values) : 0;
    const max = values.length ? Math.max(...values) : 100;

    chart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          const data = params.data;
          if (!data?.cityId) return params.name;
          return [
            `<strong>${data.name}</strong>`,
            `${metricLabel}：${safeLabel(data.valueMetric, metricMeta.suffix || '')}`,
            `统计周期：${data.periodLabel || '见城市详情'}`,
            `覆盖等级：${data.coverageLabel || '仅展示'}`,
          ].join('<br />');
        },
      },
      visualMap: {
        min,
        max,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: 0,
        inRange: { color: ['#d6f5ef', '#7fe0cf', '#15b79e', '#1877f2'] },
        text: ['高', '低'],
      },
      geo: {
        map: 'china',
        roam: true,
        itemStyle: { areaColor: '#eef5ff', borderColor: '#9ab3d3' },
        emphasis: { itemStyle: { areaColor: '#d8e8ff' } },
      },
      series: [{
        type: 'scatter',
        coordinateSystem: 'geo',
        symbolSize: (value) => {
          const base = value[2] || 0;
          return 10 + (base / (max || 100)) * 18;
        },
        data: cityMetrics.map((city) => ({
          name: city.name,
          cityId: city.id,
          coverageLabel: city.coverageLabel,
          periodLabel: city.displayPeriodLabel,
          valueMetric: defaultNumber(city[metricKey]),
          value: [...city.coordinates, defaultNumber(city[metricKey]) ?? 0],
        })),
        itemStyle: { borderColor: '#fff', borderWidth: 1 },
        emphasis: { scale: true },
      }],
    });

    return true;
  }

  function renderScatter(chart, cityMetrics) {
    if (!chart) return false;

    const data = cityMetrics
      .filter((city) => defaultNumber(city.disposableIncome) !== null && defaultNumber(city.rentBurdenProxy) !== null)
      .map((city) => ({
        value: [
          city.disposableIncome,
          +(city.rentBurdenProxy * 100).toFixed(1),
          Math.round((city.coverageScore || 0) * 100),
        ],
        cityId: city.id,
        name: city.name,
      }));

    if (!data.length) {
      chart.clear();
      return false;
    }

    chart.setOption({
      tooltip: {
        formatter: (params) =>
          [
            `<strong>${params.data.name}</strong>`,
            `人均可支配收入：${params.data.value[0].toFixed(0)} 元/年`,
            `房租压力代理：${params.data.value[1].toFixed(1)}%`,
            `覆盖置信：${params.data.value[2].toFixed(0)}%`,
          ].join('<br />'),
      },
      xAxis: {
        name: '居民人均可支配收入（元/年）',
        splitLine: { lineStyle: { color: '#edf2f8' } },
      },
      yAxis: {
        name: '房租压力代理（%）',
        splitLine: { lineStyle: { color: '#edf2f8' } },
      },
      series: [{
        type: 'scatter',
        data,
        symbolSize: (value) => 10 + value[2] / 8,
        itemStyle: { color: '#1877f2', opacity: 0.82 },
      }],
    });

    return true;
  }

  function renderCompareChart(chart, cities) {
    if (!chart) return false;
    if (!cities.length) {
      chart.clear();
      return false;
    }

    const indicators = [
      { name: '攒钱友好', max: 100, key: 'savingScore' },
      { name: '生活成本更低', max: 100, key: 'costFriendliness' },
      { name: '通勤便利', max: 100, key: 'commuteIndex' },
      { name: '空气质量', max: 100, key: 'airQualityScore' },
      { name: '刚毕业友好', max: 100, key: 'graduateScore' },
      { name: '综合平衡', max: 100, key: 'balancedScore' },
    ];

    chart.setOption({
      tooltip: {},
      legend: { top: 10, data: cities.map((city) => city.name) },
      radar: {
        indicator: indicators,
        splitLine: { lineStyle: { color: '#dbe6f3' } },
        splitArea: { areaStyle: { color: ['#f9fbff', '#f3f8ff'] } },
      },
      series: [{
        type: 'radar',
        data: cities.map((city) => ({
          name: city.name,
          value: indicators.map((indicator) => defaultNumber(city[indicator.key]) ?? 0),
        })),
      }],
    });

    return true;
  }

  function bindResize(charts) {
    global.addEventListener('resize', () => {
      charts.filter(Boolean).forEach((chart) => chart.resize());
    });
  }

  global.CityCharts = {
    hasCharts,
    hasChinaMap,
    createMap,
    createScatter,
    createCompareChart,
    renderMap,
    renderScatter,
    renderCompareChart,
    bindResize,
  };
})(window);
