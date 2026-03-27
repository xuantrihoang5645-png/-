(function attachCityCharts(global) {
  const num = (value) => (typeof value === 'number' && Number.isFinite(value) ? value : null);
  const runtime = () => global.echarts || null;
  const hasChinaMap = () => Boolean(runtime()?.getMap?.('china'));

  function formatMetric(key, value) {
    const metric = num(value);
    if (metric === null) return '暂无';
    if (key === 'rentBurdenProxy') return `${(metric * 100).toFixed(1)}%`;
    if (key === 'wageReferenceMonthly' || key === 'effectiveMonthlyIncome') return `${Math.round(metric)} 元/月`;
    if (key === 'officialGdp') return `${metric.toFixed(0)} 亿元`;
    return `${metric.toFixed(1)}`;
  }

  function normalizeRegionName(name) {
    return String(name || '')
      .replace(/特别行政区/g, '')
      .replace(/维吾尔自治区|壮族自治区|回族自治区|自治区/g, '')
      .replace(/省|市/g, '')
      .replace(/\s+/g, '')
      .trim();
  }

  function initChart(domId) {
    const echarts = runtime();
    const dom = document.getElementById(domId);
    if (!echarts || !dom) return null;

    let chart = echarts.getInstanceByDom(dom);
    if (!chart) {
      chart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: true,
        useCoarsePointer: true,
        pointerSize: 44,
      });
    }

    if (!dom.dataset.chartResizeBound) {
      const resize = () => chart.resize({ animation: { duration: 0 } });
      if (typeof ResizeObserver !== 'undefined') {
        const observer = new ResizeObserver(() => resize());
        observer.observe(dom);
        dom.__chartResizeObserver = observer;
      }
      global.addEventListener('resize', resize, { passive: true });
      dom.dataset.chartResizeBound = 'true';
    }

    return chart;
  }

  function stableSetOption(chart, option) {
    chart.clear();
    try {
      chart.setOption(option, { notMerge: true, lazyUpdate: true });
    } catch (error) {
      chart.setOption(option, true);
    }
  }

  function createMap(domId, onClick) {
    const chart = initChart(domId);
    if (!chart) return null;

    chart.off('click');
    if (typeof onClick === 'function') {
      chart.on('click', (params) => {
        if (params?.data?.entityType === 'city' && params.data.id) {
          onClick({ type: 'city', id: params.data.id, name: params.data.name });
          return;
        }

        if (params?.data?.id) {
          onClick({ type: 'province', id: params.data.id, name: params.data.name || params.name });
          return;
        }

        if (params?.name) {
          onClick({ type: 'provinceName', name: params.name });
        }
      });
    }

    return chart;
  }

  function createCompareChart(domId) {
    return initChart(domId);
  }

  function createScatter(domId, onClick) {
    const chart = initChart(domId);
    if (!chart) return null;

    chart.off('click');
    if (typeof onClick === 'function') {
      chart.on('click', (params) => {
        if (params?.data?.id) onClick(params.data.id);
      });
    }

    return chart;
  }

  function metricRange(values) {
    const list = values.filter((value) => value !== null);
    if (!list.length) return { min: 0, max: 100 };
    const min = Math.min(...list);
    const max = Math.max(...list);
    return { min, max: min === max ? min + 1 : max };
  }

  function remapMetric(rawValue, direction, range) {
    if (rawValue === null) return null;
    return direction === 'lowerBetter' ? range.min + range.max - rawValue : rawValue;
  }

  function makeProvinceTooltip(item, metricMeta) {
    const coverageText = item.coverageLevel === 'limited' ? '有限比较' : '可比较';
    return [
      `<strong>${item.name}</strong>`,
      `${metricMeta.label}：${formatMetric(metricMeta.key, item[metricMeta.key])}`,
      `覆盖等级：${coverageText}`,
      item.qualityFlags?.includes('environment_green_proxy') ? '环境项当前为代理值' : '口径：2024 官方年度层',
      '点击进入该省城市层',
    ].join('<br />');
  }

  function renderProvinceMap(chart, provinces, metricMeta, selectedProvinceId) {
    if (!chart || !hasChinaMap()) return false;

    const values = provinces.map((item) => num(item[metricMeta.key]));
    const range = metricRange(values);

    stableSetOption(chart, {
      animation: false,
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          if (!params?.data) return params?.name || '暂无';
          return makeProvinceTooltip(params.data, metricMeta);
        },
      },
      visualMap: {
        min: range.min,
        max: range.max,
        orient: 'horizontal',
        left: 'center',
        bottom: 4,
        calculable: true,
        text: ['高', '低'],
        inRange: {
          color: ['#edf5ff', '#b4dcff', '#64bbff', '#2563eb'],
        },
        textStyle: { color: '#5c6d82' },
      },
      series: [
        {
          type: 'map',
          map: 'china',
          roam: false,
          selectedMode: false,
          label: { show: false },
          emphasis: {
            label: { show: false },
            itemStyle: { areaColor: '#cfe2ff' },
          },
          itemStyle: {
            areaColor: '#eef4fb',
            borderColor: '#9db5cc',
            borderWidth: 1,
          },
          data: provinces.map((province) => ({
            id: province.id,
            name: province.name,
            value: num(province[metricMeta.key]),
            coverageLevel: province.coverageLevel,
            qualityFlags: province.qualityFlags || [],
            [metricMeta.key]: num(province[metricMeta.key]),
          })),
          regions: selectedProvinceId
            ? provinces
                .filter((province) => province.id === selectedProvinceId)
                .map((province) => ({
                  name: province.name,
                  itemStyle: {
                    areaColor: '#d9ebff',
                    borderColor: '#2563eb',
                    borderWidth: 1.6,
                  },
                }))
            : [],
        },
      ],
    });

    return true;
  }

  function renderCityMap(chart, cities, provinces, province, metricMeta, activeCityId) {
    if (!chart || !hasChinaMap() || !province) return false;

    const cityRecords = cities.filter((city) => Array.isArray(city.coordinates) && city.coordinates.length === 2);
    if (!cityRecords.length) {
      chart.clear();
      return false;
    }

    const rawValues = cityRecords.map((city) => num(city[metricMeta.key]));
    const rawRange = metricRange(rawValues);
    const displayValues = rawValues.map((value) => remapMetric(value, metricMeta.direction, rawRange));
    const displayRange = metricRange(displayValues);
    const currentProvinceName = province.name;

    stableSetOption(chart, {
      animation: false,
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          const item = params?.data;
          if (!item) return params?.name || '暂无';

          if (item.entityType === 'city') {
            return [
              `<strong>${item.name}</strong>`,
              `${metricMeta.label}：${formatMetric(metricMeta.key, item.metricRaw)}`,
              `覆盖等级：${item.coverageLabel || '仅展示'}`,
              item.displayPeriodLabel || '查看详情可追溯来源',
            ].join('<br />');
          }

          return [
            `<strong>${item.name}</strong>`,
            item.name === currentProvinceName ? '当前省份' : '点击切换到该省城市层',
          ].join('<br />');
        },
      },
      visualMap: {
        show: displayValues.some((value) => value !== null),
        seriesIndex: 1,
        min: displayRange.min,
        max: displayRange.max,
        orient: 'horizontal',
        left: 'center',
        bottom: 4,
        calculable: true,
        text: ['更优', '较弱'],
        inRange: {
          color: ['#dff7f1', '#9ce4d3', '#34c2a3', '#1473e6'],
        },
        textStyle: { color: '#5c6d82' },
      },
      geo: {
        map: 'china',
        roam: false,
        silent: true,
        itemStyle: {
          areaColor: '#f3f7fc',
          borderColor: '#c6d6e6',
          borderWidth: 1,
        },
        emphasis: {
          itemStyle: { areaColor: '#ebf3ff' },
        },
        regions: [
          {
            name: currentProvinceName,
            itemStyle: {
              areaColor: '#deecff',
              borderColor: '#2563eb',
              borderWidth: 1.6,
            },
          },
        ],
      },
      series: [
        {
          type: 'map',
          map: 'china',
          roam: false,
          selectedMode: false,
          label: { show: false },
          tooltip: { show: false },
          itemStyle: {
            areaColor: 'rgba(255,255,255,0.01)',
            borderColor: '#bfd0e1',
            borderWidth: 1,
          },
          emphasis: {
            itemStyle: { areaColor: 'rgba(37,99,235,0.08)' },
          },
          data: provinces.map((item) => ({
            id: item.id,
            name: item.name,
            value: item.id === province.id ? 1 : 0,
            entityType: 'province',
          })),
          regions: [
            {
              name: currentProvinceName,
              itemStyle: {
                areaColor: 'rgba(37,99,235,0.10)',
                borderColor: '#2563eb',
                borderWidth: 1.6,
              },
            },
          ],
          z: 1,
        },
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          progressive: 300,
          progressiveThreshold: 600,
          symbolSize: (value) => {
            const metric = typeof value?.[2] === 'number' ? value[2] : displayRange.min;
            const ratio = (metric - displayRange.min) / Math.max(displayRange.max - displayRange.min, 1);
            return 11 + ratio * 14;
          },
          itemStyle: {
            borderColor: '#ffffff',
            borderWidth: 1.5,
            color: '#18b59d',
          },
          emphasis: {
            scale: 1.16,
            itemStyle: { borderColor: '#0f172a' },
          },
          data: cityRecords.map((city) => {
            const rawMetric = num(city[metricMeta.key]);
            const displayMetric = remapMetric(rawMetric, metricMeta.direction, rawRange);
            return {
              id: city.id,
              name: city.name,
              entityType: 'city',
              coverageLabel: city.coverageLabel,
              displayPeriodLabel: city.displayPeriodLabel,
              metricRaw: rawMetric,
              value: [...city.coordinates, displayMetric ?? displayRange.min],
              itemStyle: activeCityId === city.id ? { color: '#2563eb' } : undefined,
            };
          }),
          z: 3,
        },
      ],
    });

    return true;
  }

  function renderCompareChart(chart, items, scope) {
    if (!chart) return false;
    if (!items.length) {
      chart.clear();
      return false;
    }

    const metricDefs = scope === 'province'
      ? [
          ['overviewScore', '综合概览'],
          ['incomeSupportScore', '收入支撑'],
          ['consumptionBurdenScore', '消费负担'],
          ['publicServiceScore', '公共服务'],
          ['environmentScore', '环境宜居'],
        ]
      : [
          ['balancedScore', '综合平衡'],
          ['savingScore', '攒钱友好'],
          ['commuteIndex', '通勤便利'],
          ['airQualityScore', '空气质量'],
          ['baseOfficialScore', '基础官方实力'],
        ];

    stableSetOption(chart, {
      animationDuration: 180,
      animationDurationUpdate: 120,
      legend: { top: 4 },
      tooltip: { trigger: 'axis' },
      grid: { left: 48, right: 18, top: 54, bottom: 30 },
      xAxis: {
        type: 'category',
        data: metricDefs.map((item) => item[1]),
        axisLabel: { color: '#506176' },
      },
      yAxis: {
        type: 'value',
        max: 100,
        axisLabel: { color: '#506176' },
        splitLine: { lineStyle: { color: '#e4eef8' } },
      },
      series: items.map((item) => ({
        type: 'bar',
        name: item.name,
        data: metricDefs.map(([key]) => num(item[key]) ?? 0),
        barMaxWidth: 22,
      })),
    });

    return true;
  }

  function renderScatter(chart, cities) {
    if (!chart) return false;

    const points = cities
      .map((city) => {
        const income = num(city.effectiveMonthlyIncome);
        const burden = num(city.rentBurdenProxy);
        if (income === null || burden === null) return null;
        return {
          id: city.id,
          name: city.name,
          value: [income, +(burden * 100).toFixed(1), num(city.baseOfficialScore) ?? 50],
          coverageLabel: city.coverageLabel,
        };
      })
      .filter(Boolean);

    if (!points.length) {
      chart.clear();
      return false;
    }

    stableSetOption(chart, {
      animationDuration: 150,
      animationDurationUpdate: 120,
      grid: { left: 54, right: 18, top: 20, bottom: 48 },
      tooltip: {
        formatter: (params) => {
          const item = params?.data;
          if (!item) return '暂无';
          return [
            `<strong>${item.name}</strong>`,
            `月收入参考：${Math.round(item.value[0])} 元`,
            `房租压力：${item.value[1].toFixed(1)}%`,
            `覆盖等级：${item.coverageLabel || '仅展示'}`,
          ].join('<br />');
        },
      },
      xAxis: {
        type: 'value',
        name: '月收入参考（元）',
        nameLocation: 'middle',
        nameGap: 30,
        axisLabel: { color: '#506176' },
        splitLine: { lineStyle: { color: '#e4eef8' } },
      },
      yAxis: {
        type: 'value',
        name: '房租压力（%）',
        nameLocation: 'middle',
        nameGap: 36,
        axisLabel: { color: '#506176' },
        splitLine: { lineStyle: { color: '#e4eef8' } },
      },
      series: [
        {
          type: 'scatter',
          progressive: 300,
          progressiveThreshold: 500,
          symbolSize: (value) => 10 + ((value[2] || 50) / 100) * 10,
          itemStyle: {
            color: '#2563eb',
            opacity: 0.88,
          },
          emphasis: { scale: 1.18 },
          data: points,
        },
      ],
    });

    return true;
  }

  global.CityCharts = {
    createMap,
    createCompareChart,
    createScatter,
    renderProvinceMap,
    renderCityMap,
    renderCompareChart,
    renderScatter,
    normalizeRegionName,
    hasChinaMap,
  };
})(window);
