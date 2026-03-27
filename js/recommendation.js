(function attachCityRecommendation(global) {
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const isNum = (value) => typeof value === 'number' && Number.isFinite(value);

  const PRESET_UPDATES = {
    graduates: {
      budgetBand: 'moderate',
      lifeStage: 'graduate',
      household: 'solo',
      savingPriority: 55,
      commutePriority: 70,
      airPriority: 45,
      tierPreference: 'balanced',
      rentTolerance: 'medium',
      opportunityPriority: 55,
    },
    couples: {
      budgetBand: 'moderate',
      lifeStage: 'stable',
      household: 'couple',
      savingPriority: 45,
      commutePriority: 55,
      airPriority: 70,
      tierPreference: 'balanced',
      rentTolerance: 'medium',
      opportunityPriority: 45,
    },
    budget: {
      budgetBand: 'tight',
      lifeStage: 'earlyCareer',
      household: 'solo',
      savingPriority: 85,
      commutePriority: 50,
      airPriority: 35,
      tierPreference: 'calm',
      rentTolerance: 'low',
      opportunityPriority: 25,
    },
    saving: {
      budgetBand: 'tight',
      lifeStage: 'earlyCareer',
      household: 'solo',
      savingPriority: 92,
      commutePriority: 55,
      airPriority: 40,
      tierPreference: 'calm',
      rentTolerance: 'low',
      opportunityPriority: 20,
    },
    transit: {
      budgetBand: 'moderate',
      lifeStage: 'earlyCareer',
      household: 'solo',
      savingPriority: 45,
      commutePriority: 95,
      airPriority: 40,
      tierPreference: 'big',
      rentTolerance: 'high',
      opportunityPriority: 70,
    },
    air: {
      budgetBand: 'moderate',
      lifeStage: 'stable',
      household: 'solo',
      savingPriority: 40,
      commutePriority: 55,
      airPriority: 95,
      tierPreference: 'balanced',
      rentTolerance: 'medium',
      opportunityPriority: 45,
    },
    balanced: {
      budgetBand: 'moderate',
      lifeStage: 'earlyCareer',
      household: 'solo',
      savingPriority: 55,
      commutePriority: 65,
      airPriority: 60,
      tierPreference: 'balanced',
      rentTolerance: 'medium',
      opportunityPriority: 50,
    },
  };

  function buildWeightSummary(preferences) {
    const savingBias = preferences.savingPriority / 100;
    const comfortBias = 1 - savingBias;
    const opportunityBias = preferences.opportunityPriority / 100;
    const lowPressureBias = 1 - opportunityBias;

    return [
      `攒钱 ${(savingBias * 100).toFixed(0)}%，舒适 ${(comfortBias * 100).toFixed(0)}%。`,
      `通勤优先级 ${preferences.commutePriority.toFixed(0)}%，空气质量优先级 ${preferences.airPriority.toFixed(0)}%。`,
      `机会 ${(opportunityBias * 100).toFixed(0)}%，低压力 ${(lowPressureBias * 100).toFixed(0)}%。`,
      '最终结果会乘以覆盖置信度。',
    ];
  }

  function tierMatch(city, preference) {
    if (preference === 'flex') return 80;
    if (preference === 'big') return ['一线', '新一线'].includes(city.tier) ? 92 : 55;
    if (preference === 'balanced') return ['新一线', '强二线'].includes(city.tier) ? 92 : 62;
    if (preference === 'calm') return city.tier === '强二线' ? 90 : 58;
    return 70;
  }

  function rentToleranceScore(city, tolerance) {
    const burden = isNum(city.rentBurdenProxy) ? city.rentBurdenProxy : null;
    if (burden === null) return 55;
    if (tolerance === 'low') return clamp(100 - burden * 240, 0, 100);
    if (tolerance === 'medium') return clamp(100 - Math.abs(burden - 0.24) * 260, 0, 100);
    return clamp(55 + burden * 110, 0, 100);
  }

  function budgetMatch(city, band) {
    if (!isNum(city.totalCostIndex)) return 55;
    if (band === 'tight') return 100 - city.totalCostIndex;
    if (band === 'moderate') return 100 - Math.abs(city.totalCostIndex - 52);
    return clamp(55 + (city.balancedScore || 55) * 0.35, 0, 100);
  }

  function stageMatch(city, stage) {
    if (stage === 'graduate') return isNum(city.graduateScore) ? city.graduateScore : 55;
    if (stage === 'earlyCareer') return isNum(city.balancedScore) ? city.balancedScore : 60;
    if (isNum(city.airQualityScore) && isNum(city.balancedScore)) {
      return city.airQualityScore * 0.35 + city.balancedScore * 0.65;
    }
    return city.balancedScore || 58;
  }

  function householdMatch(city, household) {
    if (household === 'solo') return isNum(city.graduateScore) ? city.graduateScore : 55;
    if (household === 'couple') return isNum(city.coupleScore) ? city.coupleScore : 60;
    return isNum(city.balancedScore) ? city.balancedScore : 58;
  }

  function regionBonus(city, preference) {
    if (preference === 'all') return 0;
    return city.region === preference ? 8 : -6;
  }

  function opportunityVsPressure(city, value) {
    const opportunityBias = value / 100;
    const cityOpportunity = city.opportunityScore ?? 60;
    const cityPressure = city.pressureScore ?? 45;
    return cityOpportunity * opportunityBias + (100 - cityPressure) * (1 - opportunityBias);
  }

  function coverageLabel(city) {
    if ((city.coverageScore || 0) >= 0.8) return '完整推荐';
    if ((city.coverageScore || 0) >= 0.6) return '降级推荐';
    return '仅展示';
  }

  function scoreCities(cityMetrics, preferences) {
    const savingWeight = 0.16 + preferences.savingPriority / 100 * 0.16;
    const comfortWeight = 0.08 + (1 - preferences.savingPriority / 100) * 0.1;
    const commuteWeight = 0.08 + preferences.commutePriority / 100 * 0.16;
    const airWeight = 0.06 + preferences.airPriority / 100 * 0.12;
    const stageWeight = 0.12;
    const householdWeight = 0.08;
    const budgetWeight = 0.18;
    const tierWeight = 0.08;
    const rentWeight = 0.08;
    const opportunityWeight = 0.08;

    return cityMetrics
      .filter((city) => (city.coverageScore || 0) >= 0.6)
      .map((city) => {
        const factors = [
          { label: '预算适配', score: budgetMatch(city, preferences.budgetBand), weight: budgetWeight },
          { label: '阶段匹配', score: stageMatch(city, preferences.lifeStage), weight: stageWeight },
          { label: '家庭状态匹配', score: householdMatch(city, preferences.household), weight: householdWeight },
          { label: '攒钱偏好匹配', score: city.savingScore ?? 55, weight: savingWeight },
          { label: '生活质量匹配', score: city.balancedScore ?? 55, weight: comfortWeight },
          { label: '通勤偏好匹配', score: city.commuteIndex ?? 52, weight: commuteWeight },
          { label: '空气质量匹配', score: city.airQualityScore ?? 50, weight: airWeight },
          { label: '城市级别匹配', score: tierMatch(city, preferences.tierPreference), weight: tierWeight },
          { label: '房租压力容忍度匹配', score: rentToleranceScore(city, preferences.rentTolerance), weight: rentWeight },
          { label: '机会 / 压力取舍', score: opportunityVsPressure(city, preferences.opportunityPriority), weight: opportunityWeight },
        ];

        const totalWeight = factors.reduce((sum, factor) => sum + factor.weight, 0);
        const rawScore = factors.reduce((sum, factor) => sum + factor.score * factor.weight, 0) / totalWeight;
        const adjustedRaw = clamp(rawScore + regionBonus(city, preferences.regionPreference), 0, 100);
        const finalScore = adjustedRaw * (0.7 + 0.3 * (city.coverageScore || 0));
        const sorted = [...factors].sort((a, b) => b.score - a.score);

        return {
          ...city,
          rawAiScore: +adjustedRaw.toFixed(1),
          finalAiScore: +finalScore.toFixed(1),
          positives: sorted.slice(0, 3),
          tradeoffs: sorted.slice(-2),
          recommendationLabel: coverageLabel(city),
          factorBreakdown: factors,
        };
      })
      .sort((a, b) => b.finalAiScore - a.finalAiScore)
      .slice(0, 5);
  }

  function buildRecommendationNarrative(city, preferences) {
    const positives = city.positives.map((item) => item.label).join('、');
    const tradeoffs = city.tradeoffs.map((item) => item.label).join('、');
    const stageTextMap = {
      graduate: '刚毕业',
      earlyCareer: '工作 1–3 年',
      stable: '稳定期',
    };
    const fitText = preferences.household === 'solo'
      ? '单人起步'
      : preferences.household === 'couple'
        ? '双人协同生活'
        : '小家庭稳定生活';

    let nextStep = '下一步建议继续核对具体岗位分布、租住片区和真实通勤线路。';
    if ((city.totalCostIndex || 0) > 70) {
      nextStep = '下一步建议重点看房源分布、通勤线路和真实到手薪资。';
    } else if ((city.commuteIndex || 0) < 55) {
      nextStep = '下一步建议重点对比工作地分布与地铁沿线租房成本。';
    }

    return {
      title: `${city.name} · ${city.recommendationLabel}`,
      summary: `${city.name} 更适合 ${stageTextMap[preferences.lifeStage]}、${fitText}。`,
      why: `主要加分点在 ${positives}。`,
      tradeoff: `需要接受的代价主要在 ${tradeoffs}。`,
      fit: `更适合：${city.suitableFor.join('、')}。不太适合：${city.notIdealFor.join('、')}。`,
      nextStep,
    };
  }

  function summarizeCompare(selectedCities) {
    if (selectedCities.length < 2) {
      return '<p>至少选择两个城市后，系统才会生成对比总结。</p>';
    }

    const [a, b] = selectedCities;
    const lines = [`<p><strong>${a.name}</strong> 与 <strong>${b.name}</strong>，优先看房租压力、攒钱空间、通勤和空气质量。</p>`];

    const compareMetric = (label, key, higherIsBetter = true) => {
      const av = a[key];
      const bv = b[key];
      if (!isNum(av) || !isNum(bv)) return null;
      if (Math.abs(av - bv) < 3) return `${label} 上两城接近。`;
      const better = higherIsBetter ? (av > bv ? a.name : b.name) : (av < bv ? a.name : b.name);
      return `${label} 上 ${better} 更占优。`;
    };

    [
      compareMetric('攒钱友好度', 'savingScore'),
      compareMetric('通勤便利', 'commuteIndex'),
      compareMetric('空气质量', 'airQualityScore'),
      compareMetric('生活成本', 'totalCostIndex', false),
    ]
      .filter(Boolean)
      .forEach((line) => lines.push(`<p>${line}</p>`));

    lines.push('<p>低预算优先看生活成本，更看重资源则优先看综合平衡和通勤。</p>');
    return lines.join('');
  }

  function buildPersonaAdvice(cityMetrics) {
    const findTop = (key) =>
      [...cityMetrics]
        .filter((city) => isNum(city[key]))
        .sort((a, b) => b[key] - a[key])
        .slice(0, 2)
        .map((city) => city.name)
        .join('、');

    return [
      `<p><strong>刚毕业</strong>：先看房租、通勤和基础服务。可先看：${findTop('graduateScore') || '暂无足够样本'}。</p>`,
      `<p><strong>情侣或小家庭</strong>：再加看空气质量和稳定性。可先看：${findTop('coupleScore') || '暂无足够样本'}。</p>`,
      `<p><strong>想攒钱</strong>：别只看工资。可先看：${findTop('savingScore') || '暂无足够样本'}。</p>`,
      `<p><strong>重视生活质量</strong>：别忽略通勤和环境。可先看：${findTop('balancedScore') || '暂无足够样本'}。</p>`,
      '<p><strong>准备换城市</strong>：下一步看岗位分布、片区和真实通勤线路。</p>',
    ].join('');
  }

  function applyPresetToForm(form, preset) {
    const next = PRESET_UPDATES[preset];
    if (!next || !form) return false;

    Object.entries(next).forEach(([key, value]) => {
      const field = form.elements.namedItem(key);
      if (field) field.value = value;
    });

    return true;
  }

  global.CityRecommendation = {
    applyPresetToForm,
    buildPersonaAdvice,
    buildRecommendationNarrative,
    buildWeightSummary,
    scoreCities,
    summarizeCompare,
  };
})(window);
