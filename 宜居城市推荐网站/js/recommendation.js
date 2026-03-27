(function attachCityRecommendation(global) {
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const num = (value) => (typeof value === 'number' && Number.isFinite(value) ? value : null);

  const PRESET_UPDATES = {
    graduates: { budgetBand: 'tight', lifeStage: 'graduate', household: 'solo', savingPriority: 72, commutePriority: 62, airPriority: 40, tierPreference: 'balanced', rentTolerance: 'low', opportunityPriority: 58 },
    couples: { budgetBand: 'moderate', lifeStage: 'stable', household: 'couple', savingPriority: 48, commutePriority: 52, airPriority: 68, tierPreference: 'balanced', rentTolerance: 'medium', opportunityPriority: 45 },
    budget: { budgetBand: 'tight', lifeStage: 'earlyCareer', household: 'solo', savingPriority: 88, commutePriority: 46, airPriority: 32, tierPreference: 'calm', rentTolerance: 'low', opportunityPriority: 24 },
    saving: { budgetBand: 'tight', lifeStage: 'earlyCareer', household: 'solo', savingPriority: 92, commutePriority: 55, airPriority: 38, tierPreference: 'calm', rentTolerance: 'low', opportunityPriority: 20 },
    transit: { budgetBand: 'moderate', lifeStage: 'earlyCareer', household: 'solo', savingPriority: 40, commutePriority: 95, airPriority: 38, tierPreference: 'big', rentTolerance: 'high', opportunityPriority: 72 },
    air: { budgetBand: 'moderate', lifeStage: 'stable', household: 'solo', savingPriority: 36, commutePriority: 52, airPriority: 95, tierPreference: 'balanced', rentTolerance: 'medium', opportunityPriority: 40 },
    balanced: { budgetBand: 'moderate', lifeStage: 'earlyCareer', household: 'solo', savingPriority: 55, commutePriority: 64, airPriority: 60, tierPreference: 'balanced', rentTolerance: 'medium', opportunityPriority: 50 },
  };

  function defaultPreferences() {
    return {
      scope: 'city',
      provinceScope: 'all',
      budgetBand: 'moderate',
      lifeStage: 'earlyCareer',
      household: 'solo',
      regionPreference: 'all',
      tierPreference: 'balanced',
      rentTolerance: 'medium',
      savingPriority: 55,
      commutePriority: 65,
      airPriority: 55,
      opportunityPriority: 50,
    };
  }

  function applyPreset(preferences, presetKey) {
    return { ...preferences, ...(PRESET_UPDATES[presetKey] || {}) };
  }

  function tierMatch(record, preference) {
    const tier = record.tier;
    if (preference === 'flex') return 72;
    if (preference === 'big') return ['tier1', 'newTier1'].includes(tier) ? 92 : 58;
    if (preference === 'balanced') return ['newTier1', 'strongTier2'].includes(tier) ? 90 : 64;
    if (preference === 'calm') return tier === 'strongTier2' ? 88 : 54;
    return 70;
  }

  function budgetMatchCity(city, band) {
    if (num(city.totalCostIndex) === null) return num(city.baseOfficialScore) ?? 55;
    if (band === 'tight') return clamp(100 - city.totalCostIndex, 0, 100);
    if (band === 'moderate') return clamp(100 - Math.abs(city.totalCostIndex - 52), 0, 100);
    return clamp((city.balancedScore ?? city.baseOfficialScore ?? 55) * 0.96, 0, 100);
  }

  function budgetMatchProvince(province, band) {
    if (band === 'tight') return province.consumptionBurdenScore ?? 55;
    if (band === 'moderate') return province.overviewScore ?? 58;
    return clamp((province.incomeSupportScore ?? 55) * 0.6 + (province.publicServiceScore ?? 55) * 0.4, 0, 100);
  }

  function stageMatchCity(city, stage) {
    if (stage === 'graduate') return city.graduateScore ?? city.baseOfficialScore ?? 55;
    if (stage === 'earlyCareer') return city.balancedScore ?? city.baseOfficialScore ?? 58;
    return clamp((city.balancedScore ?? 55) * 0.6 + (city.airQualityScore ?? 50) * 0.4, 0, 100);
  }

  function stageMatchProvince(province, stage) {
    if (stage === 'graduate') return clamp((province.consumptionBurdenScore ?? 55) * 0.55 + (province.publicServiceScore ?? 55) * 0.45, 0, 100);
    if (stage === 'earlyCareer') return clamp((province.incomeSupportScore ?? 55) * 0.5 + (province.overviewScore ?? 55) * 0.5, 0, 100);
    return clamp((province.overviewScore ?? 55) * 0.6 + (province.environmentScore ?? 55) * 0.4, 0, 100);
  }

  function householdMatchCity(city, household) {
    if (household === 'solo') return city.graduateScore ?? city.baseOfficialScore ?? 55;
    if (household === 'couple') return city.coupleScore ?? city.balancedScore ?? city.baseOfficialScore ?? 58;
    return clamp((city.balancedScore ?? city.baseOfficialScore ?? 55) * 0.65 + (city.airQualityScore ?? 50) * 0.35, 0, 100);
  }

  function householdMatchProvince(province, household) {
    if (household === 'solo') return clamp((province.consumptionBurdenScore ?? 55) * 0.55 + (province.incomeSupportScore ?? 55) * 0.45, 0, 100);
    return clamp((province.publicServiceScore ?? 55) * 0.6 + (province.environmentScore ?? 55) * 0.4, 0, 100);
  }

  function rentToleranceScore(city, tolerance) {
    const burden = num(city.rentBurdenProxy);
    if (burden === null) return city.layerType === 'major-city-official' ? 50 : 55;
    if (tolerance === 'low') return clamp(100 - burden * 240, 0, 100);
    if (tolerance === 'medium') return clamp(100 - Math.abs(burden - 0.24) * 260, 0, 100);
    return clamp(55 + burden * 110, 0, 100);
  }

  function regionBonus(record, preference) {
    if (!preference || preference === 'all') return 0;
    return record.region === preference ? 8 : -6;
  }

  function opportunityVsPressure(record, bias) {
    const opportunityBias = bias / 100;
    const opportunity = record.opportunityScore ?? record.incomeSupportScore ?? 60;
    const pressure = record.pressureScore ?? (100 - (record.consumptionBurdenScore ?? 55));
    return opportunity * opportunityBias + (100 - pressure) * (1 - opportunityBias);
  }

  function coverageLabel(record) {
    if (record.layerType === 'major-city-official') return '基础官方分析';
    if (record.cityRecommendationEligibility || (record.coverageScore ?? 0) >= 0.8) return '完整推荐';
    if ((record.coverageScore ?? 0) >= 0.6) return '降级推荐';
    return '仅展示';
  }

  function provinceCoverageLabel(record) {
    if ((record.coverageScore ?? 0) >= 0.85) return '完整省级分析';
    if ((record.coverageScore ?? 0) >= 0.6) return '降级省级分析';
    return '有限分析';
  }

  function budgetLabel(value) {
    if (value === 'tight') return '预算偏紧';
    if (value === 'comfortable') return '预算较宽松';
    return '预算中等';
  }

  function stageLabel(value) {
    if (value === 'graduate') return '刚毕业';
    if (value === 'stable') return '相对稳定';
    return '工作 1–3 年';
  }

  function householdLabel(value) {
    if (value === 'couple') return '情侣';
    if (value === 'family') return '小家庭';
    return '单人';
  }

  function summarizeWeight(scope, preferences, selectedProvinceName) {
    const scopeText = scope === 'province' ? '省级推荐' : selectedProvinceName ? `${selectedProvinceName} 城市推荐` : '全国城市推荐';
    return [
      `当前模式：${scopeText}`,
      `基础条件：${budgetLabel(preferences.budgetBand)} · ${stageLabel(preferences.lifeStage)} · ${householdLabel(preferences.household)}`,
      `显性权重：攒钱 ${preferences.savingPriority}% · 通勤 ${preferences.commutePriority}% · 空气 ${preferences.airPriority}%`,
      `取向偏好：机会 ${preferences.opportunityPriority}% · 低压力 ${100 - preferences.opportunityPriority}%`,
    ];
  }

  function buildResult(record, factors, mode) {
    const sorted = [...factors].sort((a, b) => b.score - a.score);
    const tradeoffs = [...factors].sort((a, b) => a.score - b.score).slice(0, 2);
    return {
      ...record,
      recommendationLabel: mode === 'province' ? provinceCoverageLabel(record) : coverageLabel(record),
      positives: sorted.slice(0, 3),
      tradeoffs,
      nextStep:
        mode === 'province'
          ? '建议下一步进入该省城市层，继续比较工资、房租、通勤和空气快照。'
          : record.layerType === 'major-city-official'
            ? '建议下一步补看该城市的租金、通勤和空气快照，再决定是否纳入完整候选。'
            : '建议下一步拉一个同省或同级城市做对比，验证房租压力和通勤是否都能接受。',
    };
  }

  function recommendProvinces(provinces, preferences) {
    return provinces
      .filter((province) => (province.coverageScore ?? 0) >= 0.6)
      .map((province) => {
        const savingBias = preferences.savingPriority / 100;
        const comfortBias = 1 - savingBias;
        const airBias = preferences.airPriority / 100;
        const factors = [
          { label: '预算匹配', score: budgetMatchProvince(province, preferences.budgetBand), weight: 0.2 },
          { label: '阶段匹配', score: stageMatchProvince(province, preferences.lifeStage), weight: 0.14 },
          { label: '家庭匹配', score: householdMatchProvince(province, preferences.household), weight: 0.1 },
          { label: '攒钱潜力', score: clamp((province.incomeSupportScore ?? 55) * 0.45 + (province.consumptionBurdenScore ?? 55) * 0.55, 0, 100), weight: 0.18 + savingBias * 0.12 },
          { label: '舒适度', score: clamp((province.overviewScore ?? 55) * 0.6 + (province.publicServiceScore ?? 55) * 0.4, 0, 100), weight: 0.08 + comfortBias * 0.1 },
          { label: '环境匹配', score: province.environmentScore ?? 50, weight: 0.06 + airBias * 0.12 },
          { label: '机会与压力', score: opportunityVsPressure(province, preferences.opportunityPriority), weight: 0.12 },
        ];
        const totalWeight = factors.reduce((sum, factor) => sum + factor.weight, 0);
        const rawScore = factors.reduce((sum, factor) => sum + factor.score * factor.weight, 0) / totalWeight;
        const finalScore = clamp(rawScore + regionBonus(province, preferences.regionPreference), 0, 100) * (0.7 + 0.3 * (province.coverageScore || 0));
        return buildResult({ ...province, rawAiScore: +rawScore.toFixed(1), finalAiScore: +finalScore.toFixed(1) }, factors, 'province');
      })
      .sort((a, b) => b.finalAiScore - a.finalAiScore)
      .slice(0, 5);
  }

  function recommendCities(cities, preferences, options = {}) {
    const { provinceId = 'all' } = options;
    let pool = provinceId === 'all'
      ? cities.filter((city) => city.cityRecommendationEligibility)
      : cities.filter((city) => city.provinceId === provinceId && city.cityMapEligibility);

    const provinceHasDeepCities = provinceId !== 'all' && pool.some((city) => city.cityRecommendationEligibility);
    if (provinceId !== 'all' && provinceHasDeepCities) {
      pool = pool.filter((city) => city.cityRecommendationEligibility);
    }

    return pool
      .map((city) => {
        const savingBias = preferences.savingPriority / 100;
        const comfortBias = 1 - savingBias;
        const commuteBias = preferences.commutePriority / 100;
        const airBias = preferences.airPriority / 100;
        const factors = [
          { label: '预算匹配', score: budgetMatchCity(city, preferences.budgetBand), weight: 0.17 },
          { label: '阶段匹配', score: stageMatchCity(city, preferences.lifeStage), weight: 0.12 },
          { label: '家庭匹配', score: householdMatchCity(city, preferences.household), weight: 0.08 },
          { label: '攒钱潜力', score: city.savingScore ?? clamp((city.baseOfficialScore ?? 55) * 0.65 + (100 - (city.pressureScore ?? 50)) * 0.35, 0, 100), weight: 0.14 + savingBias * 0.12 },
          { label: '综合舒适度', score: city.balancedScore ?? city.baseOfficialScore ?? 55, weight: 0.08 + comfortBias * 0.1 },
          { label: '通勤便利', score: city.commuteIndex ?? 50, weight: 0.06 + commuteBias * 0.14 },
          { label: '空气质量', score: city.airQualityScore ?? 50, weight: 0.04 + airBias * 0.12 },
          { label: '城市级别', score: tierMatch(city, preferences.tierPreference), weight: 0.08 },
          { label: '房租容忍', score: rentToleranceScore(city, preferences.rentTolerance), weight: 0.06 },
          { label: '机会与压力', score: opportunityVsPressure(city, preferences.opportunityPriority), weight: 0.11 },
        ];
        const totalWeight = factors.reduce((sum, factor) => sum + factor.weight, 0);
        const rawScore = factors.reduce((sum, factor) => sum + factor.score * factor.weight, 0) / totalWeight;
        const adjustedRaw = clamp(rawScore + regionBonus(city, preferences.regionPreference), 0, 100);
        const finalScore = adjustedRaw * (0.7 + 0.3 * (city.coverageScore || 0));
        return buildResult({ ...city, rawAiScore: +adjustedRaw.toFixed(1), finalAiScore: +finalScore.toFixed(1) }, factors, 'city');
      })
      .sort((a, b) => b.finalAiScore - a.finalAiScore)
      .slice(0, 5);
  }

  function compareEntity(a, b, key, highBetter = true) {
    const av = num(a[key]);
    const bv = num(b[key]);
    if (av === null && bv === null) return null;
    if (av === null) return b.name;
    if (bv === null) return a.name;
    if (Math.abs(av - bv) < 0.01) return '两者接近';
    if (highBetter) return av > bv ? a.name : b.name;
    return av < bv ? a.name : b.name;
  }

  function buildCityComparisonSummary(records) {
    if (!records || records.length < 2) {
      return ['至少选择两个城市后，系统才会生成对比摘要。'];
    }

    const [a, b] = records;
    return [
      `${compareEntity(a, b, 'graduateScore') || '暂无'}更适合刚毕业用户。`,
      `${compareEntity(a, b, 'savingScore') || '暂无'}在攒钱空间上更占优。`,
      `${compareEntity(a, b, 'commuteIndex') || '暂无'}的通勤体验更轻松。`,
      `${compareEntity(a, b, 'airQualityScore') || '暂无'}的空气环境信号更好。`,
      `${compareEntity(a, b, 'totalCostIndex', false) || '暂无'}的生活成本压力更低。`,
    ];
  }

  function buildPersonaAdvice(cities, provinces) {
    const deepCities = cities.filter((city) => city.cityRecommendationEligibility);
    const bestGraduate = [...deepCities].sort((a, b) => (b.graduateScore ?? 0) - (a.graduateScore ?? 0))[0];
    const bestSaving = [...deepCities].sort((a, b) => (b.savingScore ?? 0) - (a.savingScore ?? 0))[0];
    const bestProvince = [...provinces]
      .filter((province) => (province.coverageScore ?? 0) >= 0.6)
      .sort((a, b) => (b.overviewScore ?? 0) - (a.overviewScore ?? 0))[0];

    return [
      `刚毕业：优先看房租压力、通勤和基础服务；当前可先从 ${bestGraduate?.name || '样本不足'} 这类城市开始比较。`,
      '情侣或小家庭：先看省级公共服务和环境，再进入城市层比较工资、房租和通勤。',
      `想攒钱：可优先关注 ${bestSaving?.name || '样本不足'} 这类收入支撑更强、成本压力更低的城市。`,
      `如果你只想先缩小范围，可先从 ${bestProvince?.name || '样本不足'} 这类省级概览更高的地区入手。`,
    ];
  }

  global.CityRecommendation = {
    defaultPreferences,
    applyPreset,
    summarizeWeight,
    recommendProvinces,
    recommendCities,
    buildCityComparisonSummary,
    buildPersonaAdvice,
  };
})(window);
