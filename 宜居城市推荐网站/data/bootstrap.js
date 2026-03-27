window.CITY_SITE_DATA = {
    "generatedAt":  "2026-03-27",
    "meta":  {
                 "siteGeneratedAt":  "2026-03-27",
                 "majorDataPeriods":  [
                                          "省级模式优先使用国家数据 API 的 2024 年度分省官方数据。",
                                          "城市模式结合 2024 主要城市年度官方层与现有深度快照城市层。",
                                          "租金快照仍只作用于深度覆盖城市。",
                                          "通勤和空气质量仍按覆盖度分层展示。"
                                      ],
                 "updateStrategy":  [
                                        "先运行 scripts/fetch-official-national-data.ps1 刷新官方省级与主要城市年度快照。",
                                        "再运行 scripts/build-derived.ps1 生成 province-view-model、view-model 与 bootstrap。",
                                        "发布前运行 scripts/validate-data.ps1。"
                                    ],
                 "aiMode":  "rule-engine-local-dual-layer",
                 "coverageSummary":  {
                                         "includedProvinces":  34,
                                         "comparableMainlandProvinces":  31,
                                         "includedCities":  37,
                                         "aiEligibleCities":  9,
                                         "nationalMapMode":  "dual-layer-province-choropleth-and-city-layer",
                                         "cityLayerScope":  "official-major-cities-plus-deep-snapshots"
                                     },
                 "disclaimer":  [
                                    "省级层已覆盖 31 个大陆省级地区；港澳台因口径差异标记为有限比较。",
                                    "城市层当前是 36 个主要城市官方年度层 + 站内深度快照城市，不是完整全国所有地级市。",
                                    "省级环境目前使用绿地代理，不等同于省级空气质量事实。",
                                    "AI 只解释已有数据与覆盖等级，不补造缺失事实。"
                                ]
             },
    "sources":  {
                    "researchSummary":  [
                                            {
                                                "name":  "国家统计局 · 中国统计年鉴 / 中国城市统计年鉴说明",
                                                "typeLabel":  "官方",
                                                "fields":  [
                                                               "人口",
                                                               "收入",
                                                               "消费",
                                                               "宏观口径说明"
                                                           ],
                                                "coverage":  "全国 / 城市口径参考",
                                                "updateFrequency":  "年度",
                                                "suitableForMvp":  true,
                                                "staticFriendly":  true,
                                                "comparable":  true,
                                                "limitations":  "城市级工资口径并不总是稳定公开，仍需落回城市公报补字段。"
                                            },
                                            {
                                                "name":  "各城市 2024 年国民经济和社会发展统计公报",
                                                "typeLabel":  "官方",
                                                "fields":  [
                                                               "常住人口",
                                                               "居民收入",
                                                               "消费支出",
                                                               "轨道交通",
                                                               "空气质量",
                                                               "绿地"
                                                           ],
                                                "coverage":  "单城",
                                                "updateFrequency":  "年度",
                                                "suitableForMvp":  true,
                                                "staticFriendly":  true,
                                                "comparable":  false,
                                                "limitations":  "不同城市公布字段并不完全一致，部分只给城镇居民口径或缺少环境细项。"
                                            },
                                            {
                                                "name":  "生态环境年度 / 月度空气质量公开信息",
                                                "typeLabel":  "官方",
                                                "fields":  [
                                                               "AQI",
                                                               "优良率",
                                                               "PM2.5",
                                                               "城市空气质量"
                                                           ],
                                                "coverage":  "全国重点城市",
                                                "updateFrequency":  "月度 / 年度",
                                                "suitableForMvp":  true,
                                                "staticFriendly":  true,
                                                "comparable":  true,
                                                "limitations":  "有些城市公报只给 PM2.5 或优良率中的一项。"
                                            },
                                            {
                                                "name":  "中指云城市租赁 / 房地产月报",
                                                "typeLabel":  "商业平台",
                                                "fields":  [
                                                               "住宅平均租金",
                                                               "城市租赁快照"
                                                           ],
                                                "coverage":  "重点城市",
                                                "updateFrequency":  "月度",
                                                "suitableForMvp":  true,
                                                "staticFriendly":  true,
                                                "comparable":  true,
                                                "limitations":  "商业样本不是官方口径，且公开永久链接不稳定。"
                                            },
                                            {
                                                "name":  "中国主要城市通勤监测报告",
                                                "typeLabel":  "报告",
                                                "fields":  [
                                                               "平均通勤时耗",
                                                               "45分钟覆盖",
                                                               "轨道覆盖通勤比重"
                                                           ],
                                                "coverage":  "核心城市样本",
                                                "updateFrequency":  "年度",
                                                "suitableForMvp":  true,
                                                "staticFriendly":  true,
                                                "comparable":  true,
                                                "limitations":  "不是全国地级市全覆盖，且发布时间与反映年份并不一致。"
                                            },
                                            {
                                                "name":  "地方交通公开摘要",
                                                "typeLabel":  "官方 / 报道",
                                                "fields":  [
                                                               "单城通勤时耗",
                                                               "公交服务摘要"
                                                           ],
                                                "coverage":  "个别城市",
                                                "updateFrequency":  "不定期",
                                                "suitableForMvp":  true,
                                                "staticFriendly":  true,
                                                "comparable":  false,
                                                "limitations":  "更多用于补齐个别城市说明，不适合作为统一全样本强比较。"
                                            },
                                            {
                                                "name":  "国家数据 · 分省年度官方接口",
                                                "typeLabel":  "官方",
                                                "fields":  [
                                                               "人口",
                                                               "居民收入",
                                                               "居民消费",
                                                               "绿地",
                                                               "燃气",
                                                               "铁路",
                                                               "公路"
                                                           ],
                                                "coverage":  "31个大陆省级地区",
                                                "updateFrequency":  "年度",
                                                "suitableForMvp":  true,
                                                "staticFriendly":  true,
                                                "comparable":  true,
                                                "limitations":  "当前省级环境维度以官方绿地/设施代理为主，暂未形成同口径省级空气质量事实层。"
                                            },
                                            {
                                                "name":  "国家数据 · 主要城市年度官方接口",
                                                "typeLabel":  "官方",
                                                "fields":  [
                                                               "GDP",
                                                               "工资",
                                                               "社零",
                                                               "高校在校生",
                                                               "医院",
                                                               "医生"
                                                           ],
                                                "coverage":  "36个主要城市",
                                                "updateFrequency":  "年度",
                                                "suitableForMvp":  true,
                                                "staticFriendly":  true,
                                                "comparable":  true,
                                                "limitations":  "这是主要城市口径，不等于全国全部地级市；租金、通勤、空气质量仍需额外深度补全。"
                                            }
                                        ],
                    "sources":  [
                                    {
                                        "sourceId":  "nbs-yearbook-overview",
                                        "name":  "国家统计局 · 年鉴总目录",
                                        "type":  "official",
                                        "url":  "https://www.stats.gov.cn/sj/ndsj/",
                                        "coverage":  "全国",
                                        "updateFrequency":  "年度",
                                        "reliabilityLevel":  "A",
                                        "notes":  "用于说明全国统计年鉴发布与口径环境。"
                                    },
                                    {
                                        "sourceId":  "city-yearbook-note",
                                        "name":  "国家统计局 · 中国城市统计年鉴说明",
                                        "type":  "official",
                                        "url":  "https://www.stats.gov.cn/zs/tjwh/tjkw/tjzl/202302/t20230215_1907995.html",
                                        "coverage":  "全国",
                                        "updateFrequency":  "年度",
                                        "reliabilityLevel":  "A",
                                        "notes":  "用于解释城市统计年鉴的口径与变化。"
                                    },
                                    {
                                        "sourceId":  "beijing-bulletin-2024",
                                        "name":  "北京市2024年国民经济和社会发展统计公报",
                                        "type":  "official",
                                        "url":  "https://tjj.beijing.gov.cn/tjsj_31433/tjgb_31445/ndgb_31446/202503/t20250319_4038820.html",
                                        "coverage":  "北京",
                                        "updateFrequency":  "年度",
                                        "reliabilityLevel":  "A",
                                        "notes":  "含常住人口、居民收入、消费、轨道交通、PM2.5、污水处理率、人均公园绿地面积。"
                                    },
                                    {
                                        "sourceId":  "shanghai-bulletin-2024",
                                        "name":  "上海市2024年国民经济和社会发展统计公报",
                                        "type":  "official",
                                        "url":  "https://tjj.sh.gov.cn/tjgb/20250324/a7fe18c6d5c24d66bfca89c5bb4cdcfb.html",
                                        "coverage":  "上海",
                                        "updateFrequency":  "年度",
                                        "reliabilityLevel":  "A",
                                        "notes":  "含常住人口、居民收入、消费、AQI优良率、PM2.5、轨道交通。"
                                    },
                                    {
                                        "sourceId":  "guangzhou-bulletin-2024",
                                        "name":  "广州市2024年国民经济和社会发展统计公报",
                                        "type":  "official",
                                        "url":  "https://tjj.gz.gov.cn/gkmlpt/content/10/10203/mpost_10203416.html",
                                        "coverage":  "广州",
                                        "updateFrequency":  "年度",
                                        "reliabilityLevel":  "A",
                                        "notes":  "首版主要使用人口、城镇居民收入/消费、PM2.5。"
                                    },
                                    {
                                        "sourceId":  "shenzhen-bulletin-2024",
                                        "name":  "深圳市2024年国民经济和社会发展统计公报",
                                        "type":  "official",
                                        "url":  "https://tjj.sz.gov.cn/gkmlpt/content/12/12190/mpost_12190509.html",
                                        "coverage":  "深圳",
                                        "updateFrequency":  "年度",
                                        "reliabilityLevel":  "A",
                                        "notes":  "含收入、消费、AQI优良率、PM2.5、轨道交通、公园面积、绿化覆盖率。"
                                    },
                                    {
                                        "sourceId":  "hangzhou-bulletin-2024",
                                        "name":  "杭州市2024年国民经济和社会发展统计公报",
                                        "type":  "official",
                                        "url":  "https://tjj.hangzhou.gov.cn/art/2025/3/20/art_1229279682_4338665.html",
                                        "coverage":  "杭州",
                                        "updateFrequency":  "年度",
                                        "reliabilityLevel":  "A",
                                        "notes":  "含人口、收入、消费、优良天数、PM2.5、轨道交通。"
                                    },
                                    {
                                        "sourceId":  "nanjing-bulletin-2024",
                                        "name":  "南京市2024年国民经济和社会发展统计公报",
                                        "type":  "official",
                                        "url":  "https://tjj.nanjing.gov.cn/njstjj/202504/t20250401_5108470.html",
                                        "coverage":  "南京",
                                        "updateFrequency":  "年度",
                                        "reliabilityLevel":  "A",
                                        "notes":  "含人口、收入、消费、优良天数比率、PM2.5、轨道交通。"
                                    },
                                    {
                                        "sourceId":  "wuhan-bulletin-2024",
                                        "name":  "武汉市2024年国民经济和社会发展统计公报",
                                        "type":  "official",
                                        "url":  "https://tjj.wuhan.gov.cn/tjfw/tjgb/202503/t20250327_2558447.shtml",
                                        "coverage":  "武汉",
                                        "updateFrequency":  "年度",
                                        "reliabilityLevel":  "A",
                                        "notes":  "含人口、收入、消费、PM2.5、轨道交通、人均公园绿地面积。"
                                    },
                                    {
                                        "sourceId":  "wuhan-wage-2024",
                                        "name":  "武汉市2024年劳动工资统计数据公告",
                                        "type":  "official",
                                        "url":  "https://tjj.wuhan.gov.cn/xwzx/tzgg/202506/t20250620_2598379.shtml",
                                        "coverage":  "武汉",
                                        "updateFrequency":  "年度",
                                        "reliabilityLevel":  "A",
                                        "notes":  "用于补充城镇单位就业人员平均工资，站内按月折算为 wageReferenceMonthly。"
                                    },
                                    {
                                        "sourceId":  "wuhan-environment-2024",
                                        "name":  "2024年武汉市生态环境状况公报",
                                        "type":  "official",
                                        "url":  "https://hbj.wuhan.gov.cn/fbjd_19/xxgkml/zwgk/hjjc/hjzkgb/202506/t20250605_2591163.html",
                                        "coverage":  "武汉",
                                        "updateFrequency":  "年度",
                                        "reliabilityLevel":  "A",
                                        "notes":  "用于补充武汉 2024 年 PM2.5 与空气质量优良天数比例。"
                                    },
                                    {
                                        "sourceId":  "wuhan-air-quality-2025-summary",
                                        "name":  "武汉市2025年环境空气质量改善创有监测记录以来同期最好水平",
                                        "type":  "official",
                                        "url":  "https://hbj.wuhan.gov.cn/hjxw/202601/t20260115_2711566.html",
                                        "coverage":  "武汉",
                                        "updateFrequency":  "年度快讯",
                                        "reliabilityLevel":  "A",
                                        "notes":  "用于 latestSnapshot 信号层，记录 2025 年空气质量优良天数比例 85.8%，不纳入 alignedAnnual。"
                                    },
                                    {
                                        "sourceId":  "suzhou-bulletin-2024",
                                        "name":  "苏州市2024年国民经济和社会发展统计公报",
                                        "type":  "official",
                                        "url":  "https://tjj.suzhou.gov.cn/sztjj/tjgb/202504/c77512c90a144784beba4870a6b5cc0d.shtml",
                                        "coverage":  "苏州",
                                        "updateFrequency":  "年度",
                                        "reliabilityLevel":  "A",
                                        "notes":  "含人口、收入、消费、优良天数、PM2.5、轨道交通、人均公园绿地面积。"
                                    },
                                    {
                                        "sourceId":  "xiamen-bulletin-2024",
                                        "name":  "厦门市2024年国民经济和社会发展统计公报",
                                        "type":  "official",
                                        "url":  "https://tjj.xm.gov.cn/tjzl/ndgb/202503/t20250326_2924164.htm",
                                        "coverage":  "厦门",
                                        "updateFrequency":  "年度",
                                        "reliabilityLevel":  "A",
                                        "notes":  "含人口、居民收入、消费、空气质量优良率。"
                                    },
                                    {
                                        "sourceId":  "mee-annual-2024",
                                        "name":  "生态环境部 · 2024年全国环境空气质量状况",
                                        "type":  "official",
                                        "url":  "https://www.mee.gov.cn/ywdt/xwfb/202501/t20250124_1101318.shtml",
                                        "coverage":  "全国重点城市",
                                        "updateFrequency":  "年度",
                                        "reliabilityLevel":  "A",
                                        "notes":  "用于说明空气质量年度公开机制。"
                                    },
                                    {
                                        "sourceId":  "mee-monthly-2025-04",
                                        "name":  "生态环境部 · 2025年4月全国城市空气质量报告",
                                        "type":  "official",
                                        "url":  "https://www.mee.gov.cn/hjzl/dqhj/cskqzlzkyb/202505/W020250530385407893901.pdf",
                                        "coverage":  "全国重点城市",
                                        "updateFrequency":  "月度",
                                        "reliabilityLevel":  "A",
                                        "notes":  "用于说明空气质量月报存在更高频更新。"
                                    },
                                    {
                                        "sourceId":  "commute-report-2024",
                                        "name":  "2024年度中国主要城市通勤监测报告",
                                        "type":  "report",
                                        "url":  "https://www.cswcr.com/2024%E5%B9%B4%E4%B8%AD%E5%9B%BD%E4%B8%BB%E8%A6%81%E5%9F%8E%E5%B8%82%E9%80%9A%E5%8B%A4%E7%9B%91%E6%B5%8B%E6%8A%A5%E5%91%8A.pdf",
                                        "coverage":  "主要城市样本",
                                        "updateFrequency":  "年度",
                                        "reliabilityLevel":  "B",
                                        "notes":  "用于北京、杭州、南京、武汉等城市的通勤时耗和覆盖摘要。"
                                    },
                                    {
                                        "sourceId":  "commute-report-2025-news",
                                        "name":  "中新网 · 2025年中国主要城市通勤监测报告公开报道",
                                        "type":  "report",
                                        "url":  "https://www.chinanews.com.cn/sh/2026/01-13/10550648.shtml",
                                        "coverage":  "主要城市样本",
                                        "updateFrequency":  "年度",
                                        "reliabilityLevel":  "B",
                                        "notes":  "用于确认更新版通勤公开报道已发布。"
                                    },
                                    {
                                        "sourceId":  "mobility-public-summary",
                                        "name":  "通勤公开摘要（主站记录）",
                                        "type":  "report",
                                        "url":  "https://www.cswcr.com/",
                                        "coverage":  "部分城市",
                                        "updateFrequency":  "不定期",
                                        "reliabilityLevel":  "C",
                                        "notes":  "首版个别城市的通勤细项来自公开摘要或报道，公开永久链接不稳定，因此先记录为主站来源并在字段层标注置信不足。"
                                    },
                                    {
                                        "sourceId":  "guangzhou-transport-summary",
                                        "name":  "广州交通公开摘要",
                                        "type":  "official",
                                        "url":  "https://jtt.gz.gov.cn/",
                                        "coverage":  "广州",
                                        "updateFrequency":  "不定期",
                                        "reliabilityLevel":  "C",
                                        "notes":  "用于补充广州平均通勤时耗摘要。"
                                    },
                                    {
                                        "sourceId":  "rent-beijing-2026-01",
                                        "name":  "中指云 · 北京住房租赁月报站内摘要（2026-01）",
                                        "type":  "commercial",
                                        "url":  "https://www.cih-index.com/",
                                        "coverage":  "北京",
                                        "updateFrequency":  "月度",
                                        "reliabilityLevel":  "B",
                                        "notes":  "站内公开摘要显示全市住宅平均租金约 80.95 元/㎡/月；公共永久链接不稳定。"
                                    },
                                    {
                                        "sourceId":  "rent-shanghai-2026-01",
                                        "name":  "中指云 · 上海二手房市场月报站内摘要（2026-01）",
                                        "type":  "commercial",
                                        "url":  "https://www.cih-index.com/",
                                        "coverage":  "上海",
                                        "updateFrequency":  "月度",
                                        "reliabilityLevel":  "B",
                                        "notes":  "站内公开摘要显示住宅平均租金约 81.5 元/㎡/月。"
                                    },
                                    {
                                        "sourceId":  "rent-shenzhen-2026-02",
                                        "name":  "中指云 · 深圳住房租赁月报站内摘要（2026-02）",
                                        "type":  "commercial",
                                        "url":  "https://www.cih-index.com/",
                                        "coverage":  "深圳",
                                        "updateFrequency":  "月度",
                                        "reliabilityLevel":  "B",
                                        "notes":  "站内公开摘要显示全市住宅平均租金约 81.86 元/㎡/月。"
                                    },
                                    {
                                        "sourceId":  "rent-guangzhou-2026-01",
                                        "name":  "中指云 · 广州二手房市场月报站内摘要（2026-01）",
                                        "type":  "commercial",
                                        "url":  "https://www.cih-index.com/",
                                        "coverage":  "广州",
                                        "updateFrequency":  "月度",
                                        "reliabilityLevel":  "B",
                                        "notes":  "站内公开摘要显示全市住宅平均租金约 47.78 元/㎡/月。"
                                    },
                                    {
                                        "sourceId":  "rent-hangzhou-2026-02",
                                        "name":  "中指云 · 杭州住房租赁月报站内摘要（2026-02）",
                                        "type":  "commercial",
                                        "url":  "https://www.cih-index.com/",
                                        "coverage":  "杭州",
                                        "updateFrequency":  "月度",
                                        "reliabilityLevel":  "B",
                                        "notes":  "站内公开摘要显示全市平米租金约 48.54 元/㎡/月。"
                                    },
                                    {
                                        "sourceId":  "rent-nanjing-2026-01",
                                        "name":  "中指云 · 南京房地产市场月报站内摘要（2026-01）",
                                        "type":  "commercial",
                                        "url":  "https://www.cih-index.com/",
                                        "coverage":  "南京",
                                        "updateFrequency":  "月度",
                                        "reliabilityLevel":  "B",
                                        "notes":  "站内公开摘要显示全市平米租金约 36.85 元/㎡/月。"
                                    },
                                    {
                                        "sourceId":  "rent-wuhan-2026-02",
                                        "name":  "中指云 · 武汉住房租赁市场监测月报（2026-02）",
                                        "type":  "commercial",
                                        "url":  "https://www.cih-index.com/report/detail/118637.html",
                                        "coverage":  "武汉",
                                        "updateFrequency":  "月度",
                                        "reliabilityLevel":  "B",
                                        "notes":  "详情页显示武汉全市平均租金约 25.69 元/㎡/月，站内按 30㎡ 假设派生租金代理。"
                                    },
                                    {
                                        "sourceId":  "rent-suzhou-2026-01",
                                        "name":  "中指云 · 苏州房地产市场月报站内摘要（2026-01）",
                                        "type":  "commercial",
                                        "url":  "https://www.cih-index.com/",
                                        "coverage":  "苏州",
                                        "updateFrequency":  "月度",
                                        "reliabilityLevel":  "B",
                                        "notes":  "站内公开摘要显示全市平米租金约 33.72 元/㎡/月。"
                                    },
                                    {
                                        "sourceId":  "rent-xiamen-2026-01",
                                        "name":  "中指云 · 厦门住房租赁月报站内摘要（2026-01）",
                                        "type":  "commercial",
                                        "url":  "https://www.cih-index.com/",
                                        "coverage":  "厦门",
                                        "updateFrequency":  "月度",
                                        "reliabilityLevel":  "B",
                                        "notes":  "站内公开摘要显示全市平米租金约 38.81 元/㎡/月。"
                                    },
                                    {
                                        "sourceId":  "ai-config-rule-engine",
                                        "name":  "站内 AI 规则引擎配置",
                                        "type":  "local",
                                        "url":  "./data/ai-config.json",
                                        "coverage":  "站内解释层",
                                        "updateFrequency":  "按代码更新",
                                        "reliabilityLevel":  "A",
                                        "notes":  "用于说明推荐逻辑，不是外部事实来源。"
                                    },
                                    {
                                        "sourceId":  "nbs-api-province-annual-2024",
                                        "name":  "国家数据 · 分省年度官方接口（2024）",
                                        "type":  "official",
                                        "url":  "https://data.stats.gov.cn/",
                                        "coverage":  "31个大陆省级地区",
                                        "updateFrequency":  "年度",
                                        "reliabilityLevel":  "A",
                                        "notes":  "通过国家数据公开接口抓取人口、居民收入、居民消费、城市燃气普及率、人均公园绿地面积、铁路营业里程、公路里程。"
                                    },
                                    {
                                        "sourceId":  "nbs-api-major-city-annual-2024",
                                        "name":  "国家数据 · 主要城市年度官方接口（2024）",
                                        "type":  "official",
                                        "url":  "https://data.stats.gov.cn/",
                                        "coverage":  "36个主要城市",
                                        "updateFrequency":  "年度",
                                        "reliabilityLevel":  "A",
                                        "notes":  "通过国家数据公开接口抓取主要城市 GDP、工资、社零、高校在校生、医院数、医生数等基础字段。"
                                    }
                                ]
                },
    "provinceViewModel":  {
                              "generatedAt":  "2026-03-27",
                              "summary":  {
                                              "totalProvinces":  34,
                                              "comparableMainlandProvinces":  31,
                                              "limitedProvinces":  3,
                                              "coreMetricCount":  5
                                          },
                              "enums":  {
                                            "regions":  [
                                                            "northChina",
                                                            "northEast",
                                                            "eastChina",
                                                            "centralChina",
                                                            "southChina",
                                                            "southWest",
                                                            "northWest",
                                                            "greaterChinaLimited"
                                                        ],
                                            "mapMetrics":  [
                                                               {
                                                                   "key":  "incomeSupportScore",
                                                                   "label":  "收入支撑力",
                                                                   "direction":  "higherBetter"
                                                               },
                                                               {
                                                                   "key":  "consumptionBurdenScore",
                                                                   "label":  "消费负担",
                                                                   "direction":  "higherBetter"
                                                               },
                                                               {
                                                                   "key":  "environmentScore",
                                                                   "label":  "环境宜居",
                                                                   "direction":  "higherBetter"
                                                               },
                                                               {
                                                                   "key":  "publicServiceScore",
                                                                   "label":  "基础公共服务",
                                                                   "direction":  "higherBetter"
                                                               },
                                                               {
                                                                   "key":  "overviewScore",
                                                                   "label":  "综合省级概览",
                                                                   "direction":  "higherBetter"
                                                               }
                                                           ]
                                        },
                              "provinces":  [
                                                {
                                                    "id":  "110000000000",
                                                    "code":  "110000000000",
                                                    "name":  "北京市",
                                                    "region":  "northChina",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "北京",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "110000000000",
                                                                                     "name":  "北京"
                                                                                 }
                                                                             ],
                                                    "population":  2183,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  85415,
                                                    "annualConsumptionPerCapita":  49748,
                                                    "parkGreenPerCapita":  17.09,
                                                    "gasCoverage":  100,
                                                    "railwayLength":  0.16,
                                                    "highwayLength":  2.26,
                                                    "incomeSupportScore":  95.2,
                                                    "consumptionBurden":  0.5824,
                                                    "consumptionBurdenScore":  100,
                                                    "environmentScore":  53.9,
                                                    "publicServiceScore":  59.9,
                                                    "overviewScore":  81.1,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  2183,
                                                                                        "disposableIncome":  85415,
                                                                                        "annualConsumptionPerCapita":  49748,
                                                                                        "parkGreenPerCapita":  17.09,
                                                                                        "gasCoverage":  100,
                                                                                        "railwayLength":  0.16,
                                                                                        "highwayLength":  2.26
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "120000000000",
                                                    "code":  "120000000000",
                                                    "name":  "天津市",
                                                    "region":  "northChina",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "天津",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "120000000000",
                                                                                     "name":  "天津"
                                                                                 }
                                                                             ],
                                                    "population":  1364,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  53581,
                                                    "annualConsumptionPerCapita":  35804,
                                                    "parkGreenPerCapita":  10.02,
                                                    "gasCoverage":  99.98,
                                                    "railwayLength":  0.13,
                                                    "highwayLength":  1.5,
                                                    "incomeSupportScore":  43.7,
                                                    "consumptionBurden":  0.6682,
                                                    "consumptionBurdenScore":  50.2,
                                                    "environmentScore":  2.5,
                                                    "publicServiceScore":  46.5,
                                                    "overviewScore":  37.6,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  1364,
                                                                                        "disposableIncome":  53581,
                                                                                        "annualConsumptionPerCapita":  35804,
                                                                                        "parkGreenPerCapita":  10.02,
                                                                                        "gasCoverage":  99.98,
                                                                                        "railwayLength":  0.13,
                                                                                        "highwayLength":  1.5
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "130000000000",
                                                    "code":  "130000000000",
                                                    "name":  "河北省",
                                                    "region":  "northChina",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "石家庄",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "130100000000",
                                                                                     "name":  "石家庄"
                                                                                 }
                                                                             ],
                                                    "population":  7378,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  34665,
                                                    "annualConsumptionPerCapita":  24253,
                                                    "parkGreenPerCapita":  14.74,
                                                    "gasCoverage":  99.67,
                                                    "railwayLength":  0.85,
                                                    "highwayLength":  21.52,
                                                    "incomeSupportScore":  13,
                                                    "consumptionBurden":  0.6996,
                                                    "consumptionBurdenScore":  32,
                                                    "environmentScore":  36.8,
                                                    "publicServiceScore":  70.1,
                                                    "overviewScore":  33.9,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  7378,
                                                                                        "disposableIncome":  34665,
                                                                                        "annualConsumptionPerCapita":  24253,
                                                                                        "parkGreenPerCapita":  14.74,
                                                                                        "gasCoverage":  99.67,
                                                                                        "railwayLength":  0.85,
                                                                                        "highwayLength":  21.52
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "140000000000",
                                                    "code":  "140000000000",
                                                    "name":  "山西省",
                                                    "region":  "northChina",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "太原",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "140100000000",
                                                                                     "name":  "太原"
                                                                                 }
                                                                             ],
                                                    "population":  3446,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  32441,
                                                    "annualConsumptionPerCapita":  21090,
                                                    "parkGreenPerCapita":  14.24,
                                                    "gasCoverage":  98.34,
                                                    "railwayLength":  0.65,
                                                    "highwayLength":  14.77,
                                                    "incomeSupportScore":  9.4,
                                                    "consumptionBurden":  0.6501,
                                                    "consumptionBurdenScore":  60.7,
                                                    "environmentScore":  33.1,
                                                    "publicServiceScore":  63.9,
                                                    "overviewScore":  37.9,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  3446,
                                                                                        "disposableIncome":  32441,
                                                                                        "annualConsumptionPerCapita":  21090,
                                                                                        "parkGreenPerCapita":  14.24,
                                                                                        "gasCoverage":  98.34,
                                                                                        "railwayLength":  0.65,
                                                                                        "highwayLength":  14.77
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "150000000000",
                                                    "code":  "150000000000",
                                                    "name":  "内蒙古自治区",
                                                    "region":  "northChina",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "呼和浩特",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "150100000000",
                                                                                     "name":  "呼和浩特"
                                                                                 }
                                                                             ],
                                                    "population":  2388,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  40077,
                                                    "annualConsumptionPerCapita":  28113,
                                                    "parkGreenPerCapita":  20.04,
                                                    "gasCoverage":  98.31,
                                                    "railwayLength":  1.43,
                                                    "highwayLength":  22.27,
                                                    "incomeSupportScore":  21.8,
                                                    "consumptionBurden":  0.7015,
                                                    "consumptionBurdenScore":  30.9,
                                                    "environmentScore":  75.3,
                                                    "publicServiceScore":  85.7,
                                                    "overviewScore":  47.6,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  2388,
                                                                                        "disposableIncome":  40077,
                                                                                        "annualConsumptionPerCapita":  28113,
                                                                                        "parkGreenPerCapita":  20.04,
                                                                                        "gasCoverage":  98.31,
                                                                                        "railwayLength":  1.43,
                                                                                        "highwayLength":  22.27
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "210000000000",
                                                    "code":  "210000000000",
                                                    "name":  "辽宁省",
                                                    "region":  "northEast",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "沈阳",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "210100000000",
                                                                                     "name":  "沈阳"
                                                                                 },
                                                                                 {
                                                                                     "code":  "210200000000",
                                                                                     "name":  "大连"
                                                                                 }
                                                                             ],
                                                    "population":  4155,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  39844,
                                                    "annualConsumptionPerCapita":  25963,
                                                    "parkGreenPerCapita":  14.56,
                                                    "gasCoverage":  98.74,
                                                    "railwayLength":  0.69,
                                                    "highwayLength":  13.24,
                                                    "incomeSupportScore":  21.4,
                                                    "consumptionBurden":  0.6516,
                                                    "consumptionBurdenScore":  59.9,
                                                    "environmentScore":  35.5,
                                                    "publicServiceScore":  64.6,
                                                    "overviewScore":  42.5,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  4155,
                                                                                        "disposableIncome":  39844,
                                                                                        "annualConsumptionPerCapita":  25963,
                                                                                        "parkGreenPerCapita":  14.56,
                                                                                        "gasCoverage":  98.74,
                                                                                        "railwayLength":  0.69,
                                                                                        "highwayLength":  13.24
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "220000000000",
                                                    "code":  "220000000000",
                                                    "name":  "吉林省",
                                                    "region":  "northEast",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "长春",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "220100000000",
                                                                                     "name":  "长春"
                                                                                 }
                                                                             ],
                                                    "population":  2317,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  31318,
                                                    "annualConsumptionPerCapita":  23118,
                                                    "parkGreenPerCapita":  15.04,
                                                    "gasCoverage":  96.84,
                                                    "railwayLength":  0.52,
                                                    "highwayLength":  11.15,
                                                    "incomeSupportScore":  7.6,
                                                    "consumptionBurden":  0.7382,
                                                    "consumptionBurdenScore":  9.6,
                                                    "environmentScore":  39,
                                                    "publicServiceScore":  62,
                                                    "overviewScore":  25.3,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  2317,
                                                                                        "disposableIncome":  31318,
                                                                                        "annualConsumptionPerCapita":  23118,
                                                                                        "parkGreenPerCapita":  15.04,
                                                                                        "gasCoverage":  96.84,
                                                                                        "railwayLength":  0.52,
                                                                                        "highwayLength":  11.15
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "230000000000",
                                                    "code":  "230000000000",
                                                    "name":  "黑龙江省",
                                                    "region":  "northEast",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "哈尔滨",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "230100000000",
                                                                                     "name":  "哈尔滨"
                                                                                 }
                                                                             ],
                                                    "population":  3029,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  31269,
                                                    "annualConsumptionPerCapita":  23467,
                                                    "parkGreenPerCapita":  15.54,
                                                    "gasCoverage":  95.81,
                                                    "railwayLength":  0.72,
                                                    "highwayLength":  16.93,
                                                    "incomeSupportScore":  7.5,
                                                    "consumptionBurden":  0.7505,
                                                    "consumptionBurdenScore":  2.5,
                                                    "environmentScore":  42.6,
                                                    "publicServiceScore":  66.7,
                                                    "overviewScore":  25.1,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  3029,
                                                                                        "disposableIncome":  31269,
                                                                                        "annualConsumptionPerCapita":  23467,
                                                                                        "parkGreenPerCapita":  15.54,
                                                                                        "gasCoverage":  95.81,
                                                                                        "railwayLength":  0.72,
                                                                                        "highwayLength":  16.93
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "310000000000",
                                                    "code":  "310000000000",
                                                    "name":  "上海市",
                                                    "region":  "eastChina",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "上海",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "310000000000",
                                                                                     "name":  "上海"
                                                                                 }
                                                                             ],
                                                    "population":  2480,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  88366,
                                                    "annualConsumptionPerCapita":  52722,
                                                    "parkGreenPerCapita":  9.68,
                                                    "gasCoverage":  100,
                                                    "railwayLength":  0.06,
                                                    "highwayLength":  1.3,
                                                    "incomeSupportScore":  100,
                                                    "consumptionBurden":  0.5966,
                                                    "consumptionBurdenScore":  91.8,
                                                    "environmentScore":  0,
                                                    "publicServiceScore":  45,
                                                    "overviewScore":  67,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  2480,
                                                                                        "disposableIncome":  88366,
                                                                                        "annualConsumptionPerCapita":  52722,
                                                                                        "parkGreenPerCapita":  9.68,
                                                                                        "gasCoverage":  100,
                                                                                        "railwayLength":  0.06,
                                                                                        "highwayLength":  1.3
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "320000000000",
                                                    "code":  "320000000000",
                                                    "name":  "江苏省",
                                                    "region":  "eastChina",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "南京",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "320100000000",
                                                                                     "name":  "南京"
                                                                                 }
                                                                             ],
                                                    "population":  8526,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  55415,
                                                    "annualConsumptionPerCapita":  37346,
                                                    "parkGreenPerCapita":  16.43,
                                                    "gasCoverage":  100,
                                                    "railwayLength":  0.48,
                                                    "highwayLength":  15.88,
                                                    "incomeSupportScore":  46.6,
                                                    "consumptionBurden":  0.6739,
                                                    "consumptionBurdenScore":  46.9,
                                                    "environmentScore":  49.1,
                                                    "publicServiceScore":  67.2,
                                                    "overviewScore":  51.3,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  8526,
                                                                                        "disposableIncome":  55415,
                                                                                        "annualConsumptionPerCapita":  37346,
                                                                                        "parkGreenPerCapita":  16.43,
                                                                                        "gasCoverage":  100,
                                                                                        "railwayLength":  0.48,
                                                                                        "highwayLength":  15.88
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "330000000000",
                                                    "code":  "330000000000",
                                                    "name":  "浙江省",
                                                    "region":  "eastChina",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "杭州",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "330100000000",
                                                                                     "name":  "杭州"
                                                                                 },
                                                                                 {
                                                                                     "code":  "330200000000",
                                                                                     "name":  "宁波"
                                                                                 }
                                                                             ],
                                                    "population":  6670,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  67013,
                                                    "annualConsumptionPerCapita":  45107,
                                                    "parkGreenPerCapita":  15.51,
                                                    "gasCoverage":  100,
                                                    "railwayLength":  0.42,
                                                    "highwayLength":  12.14,
                                                    "incomeSupportScore":  65.4,
                                                    "consumptionBurden":  0.6731,
                                                    "consumptionBurdenScore":  47.4,
                                                    "environmentScore":  42.4,
                                                    "publicServiceScore":  63.5,
                                                    "overviewScore":  55.9,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  6670,
                                                                                        "disposableIncome":  67013,
                                                                                        "annualConsumptionPerCapita":  45107,
                                                                                        "parkGreenPerCapita":  15.51,
                                                                                        "gasCoverage":  100,
                                                                                        "railwayLength":  0.42,
                                                                                        "highwayLength":  12.14
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "340000000000",
                                                    "code":  "340000000000",
                                                    "name":  "安徽省",
                                                    "region":  "eastChina",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "合肥",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "340100000000",
                                                                                     "name":  "合肥"
                                                                                 }
                                                                             ],
                                                    "population":  6123,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  36782,
                                                    "annualConsumptionPerCapita":  24996,
                                                    "parkGreenPerCapita":  17.74,
                                                    "gasCoverage":  99.95,
                                                    "railwayLength":  0.58,
                                                    "highwayLength":  24.05,
                                                    "incomeSupportScore":  16.5,
                                                    "consumptionBurden":  0.6796,
                                                    "consumptionBurdenScore":  43.6,
                                                    "environmentScore":  58.6,
                                                    "publicServiceScore":  73.6,
                                                    "overviewScore":  43.1,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  6123,
                                                                                        "disposableIncome":  36782,
                                                                                        "annualConsumptionPerCapita":  24996,
                                                                                        "parkGreenPerCapita":  17.74,
                                                                                        "gasCoverage":  99.95,
                                                                                        "railwayLength":  0.58,
                                                                                        "highwayLength":  24.05
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "350000000000",
                                                    "code":  "350000000000",
                                                    "name":  "福建省",
                                                    "region":  "eastChina",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "福州",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "350100000000",
                                                                                     "name":  "福州"
                                                                                 },
                                                                                 {
                                                                                     "code":  "350200000000",
                                                                                     "name":  "厦门"
                                                                                 }
                                                                             ],
                                                    "population":  4193,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  47857,
                                                    "annualConsumptionPerCapita":  33876,
                                                    "parkGreenPerCapita":  16.03,
                                                    "gasCoverage":  99.85,
                                                    "railwayLength":  0.46,
                                                    "highwayLength":  11.64,
                                                    "incomeSupportScore":  34.4,
                                                    "consumptionBurden":  0.7079,
                                                    "consumptionBurdenScore":  27.2,
                                                    "environmentScore":  46.1,
                                                    "publicServiceScore":  64.6,
                                                    "overviewScore":  41,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  4193,
                                                                                        "disposableIncome":  47857,
                                                                                        "annualConsumptionPerCapita":  33876,
                                                                                        "parkGreenPerCapita":  16.03,
                                                                                        "gasCoverage":  99.85,
                                                                                        "railwayLength":  0.46,
                                                                                        "highwayLength":  11.64
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "360000000000",
                                                    "code":  "360000000000",
                                                    "name":  "江西省",
                                                    "region":  "eastChina",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "南昌",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "360100000000",
                                                                                     "name":  "南昌"
                                                                                 }
                                                                             ],
                                                    "population":  4502,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  36007,
                                                    "annualConsumptionPerCapita":  24726,
                                                    "parkGreenPerCapita":  18.59,
                                                    "gasCoverage":  99.45,
                                                    "railwayLength":  0.53,
                                                    "highwayLength":  20.95,
                                                    "incomeSupportScore":  15.2,
                                                    "consumptionBurden":  0.6867,
                                                    "consumptionBurdenScore":  39.5,
                                                    "environmentScore":  64.8,
                                                    "publicServiceScore":  73.3,
                                                    "overviewScore":  42.8,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  4502,
                                                                                        "disposableIncome":  36007,
                                                                                        "annualConsumptionPerCapita":  24726,
                                                                                        "parkGreenPerCapita":  18.59,
                                                                                        "gasCoverage":  99.45,
                                                                                        "railwayLength":  0.53,
                                                                                        "highwayLength":  20.95
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "370000000000",
                                                    "code":  "370000000000",
                                                    "name":  "山东省",
                                                    "region":  "eastChina",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "济南",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "370100000000",
                                                                                     "name":  "济南"
                                                                                 },
                                                                                 {
                                                                                     "code":  "370200000000",
                                                                                     "name":  "青岛"
                                                                                 }
                                                                             ],
                                                    "population":  10080,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  42077,
                                                    "annualConsumptionPerCapita":  25645,
                                                    "parkGreenPerCapita":  18.84,
                                                    "gasCoverage":  99.85,
                                                    "railwayLength":  0.79,
                                                    "highwayLength":  29.58,
                                                    "incomeSupportScore":  25,
                                                    "consumptionBurden":  0.6095,
                                                    "consumptionBurdenScore":  84.3,
                                                    "environmentScore":  66.6,
                                                    "publicServiceScore":  79.9,
                                                    "overviewScore":  59.1,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  10080,
                                                                                        "disposableIncome":  42077,
                                                                                        "annualConsumptionPerCapita":  25645,
                                                                                        "parkGreenPerCapita":  18.84,
                                                                                        "gasCoverage":  99.85,
                                                                                        "railwayLength":  0.79,
                                                                                        "highwayLength":  29.58
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "410000000000",
                                                    "code":  "410000000000",
                                                    "name":  "河南省",
                                                    "region":  "centralChina",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "郑州",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "410100000000",
                                                                                     "name":  "郑州"
                                                                                 }
                                                                             ],
                                                    "population":  9785,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  31552,
                                                    "annualConsumptionPerCapita":  21956,
                                                    "parkGreenPerCapita":  15.88,
                                                    "gasCoverage":  99.76,
                                                    "railwayLength":  0.68,
                                                    "highwayLength":  28.31,
                                                    "incomeSupportScore":  8,
                                                    "consumptionBurden":  0.6959,
                                                    "consumptionBurdenScore":  34.2,
                                                    "environmentScore":  45.1,
                                                    "publicServiceScore":  72.8,
                                                    "overviewScore":  34.9,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  9785,
                                                                                        "disposableIncome":  31552,
                                                                                        "annualConsumptionPerCapita":  21956,
                                                                                        "parkGreenPerCapita":  15.88,
                                                                                        "gasCoverage":  99.76,
                                                                                        "railwayLength":  0.68,
                                                                                        "highwayLength":  28.31
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "420000000000",
                                                    "code":  "420000000000",
                                                    "name":  "湖北省",
                                                    "region":  "centralChina",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "武汉",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "420100000000",
                                                                                     "name":  "武汉"
                                                                                 }
                                                                             ],
                                                    "population":  5834,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  36947,
                                                    "annualConsumptionPerCapita":  27888,
                                                    "parkGreenPerCapita":  16.02,
                                                    "gasCoverage":  99.54,
                                                    "railwayLength":  0.58,
                                                    "highwayLength":  31.07,
                                                    "incomeSupportScore":  16.7,
                                                    "consumptionBurden":  0.7548,
                                                    "consumptionBurdenScore":  0,
                                                    "environmentScore":  46.1,
                                                    "publicServiceScore":  72.9,
                                                    "overviewScore":  29.6,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  5834,
                                                                                        "disposableIncome":  36947,
                                                                                        "annualConsumptionPerCapita":  27888,
                                                                                        "parkGreenPerCapita":  16.02,
                                                                                        "gasCoverage":  99.54,
                                                                                        "railwayLength":  0.58,
                                                                                        "highwayLength":  31.07
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "430000000000",
                                                    "code":  "430000000000",
                                                    "name":  "湖南省",
                                                    "region":  "centralChina",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "长沙",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "430100000000",
                                                                                     "name":  "长沙"
                                                                                 }
                                                                             ],
                                                    "population":  6539,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  37679,
                                                    "annualConsumptionPerCapita":  26760,
                                                    "parkGreenPerCapita":  14.07,
                                                    "gasCoverage":  98.61,
                                                    "railwayLength":  0.61,
                                                    "highwayLength":  24.35,
                                                    "incomeSupportScore":  17.9,
                                                    "consumptionBurden":  0.7102,
                                                    "consumptionBurdenScore":  25.9,
                                                    "environmentScore":  31.9,
                                                    "publicServiceScore":  66.7,
                                                    "overviewScore":  32.5,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  6539,
                                                                                        "disposableIncome":  37679,
                                                                                        "annualConsumptionPerCapita":  26760,
                                                                                        "parkGreenPerCapita":  14.07,
                                                                                        "gasCoverage":  98.61,
                                                                                        "railwayLength":  0.61,
                                                                                        "highwayLength":  24.35
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "440000000000",
                                                    "code":  "440000000000",
                                                    "name":  "广东省",
                                                    "region":  "southChina",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "广州",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "440100000000",
                                                                                     "name":  "广州"
                                                                                 },
                                                                                 {
                                                                                     "code":  "440300000000",
                                                                                     "name":  "深圳"
                                                                                 }
                                                                             ],
                                                    "population":  12780,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  51474,
                                                    "annualConsumptionPerCapita":  35818,
                                                    "parkGreenPerCapita":  17.92,
                                                    "gasCoverage":  97.24,
                                                    "railwayLength":  0.6,
                                                    "highwayLength":  22.44,
                                                    "incomeSupportScore":  40.3,
                                                    "consumptionBurden":  0.6958,
                                                    "consumptionBurdenScore":  34.2,
                                                    "environmentScore":  59.9,
                                                    "publicServiceScore":  72.3,
                                                    "overviewScore":  49.1,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  12780,
                                                                                        "disposableIncome":  51474,
                                                                                        "annualConsumptionPerCapita":  35818,
                                                                                        "parkGreenPerCapita":  17.92,
                                                                                        "gasCoverage":  97.24,
                                                                                        "railwayLength":  0.6,
                                                                                        "highwayLength":  22.44
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "450000000000",
                                                    "code":  "450000000000",
                                                    "name":  "广西壮族自治区",
                                                    "region":  "southChina",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "南宁",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "450100000000",
                                                                                     "name":  "南宁"
                                                                                 }
                                                                             ],
                                                    "population":  5013,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  31125,
                                                    "annualConsumptionPerCapita":  21150,
                                                    "parkGreenPerCapita":  12.96,
                                                    "gasCoverage":  99.44,
                                                    "railwayLength":  0.59,
                                                    "highwayLength":  18.7,
                                                    "incomeSupportScore":  7.3,
                                                    "consumptionBurden":  0.6795,
                                                    "consumptionBurdenScore":  43.7,
                                                    "environmentScore":  23.8,
                                                    "publicServiceScore":  62.8,
                                                    "overviewScore":  30.8,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  5013,
                                                                                        "disposableIncome":  31125,
                                                                                        "annualConsumptionPerCapita":  21150,
                                                                                        "parkGreenPerCapita":  12.96,
                                                                                        "gasCoverage":  99.44,
                                                                                        "railwayLength":  0.59,
                                                                                        "highwayLength":  18.7
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "460000000000",
                                                    "code":  "460000000000",
                                                    "name":  "海南省",
                                                    "region":  "southChina",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "海口",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "460100000000",
                                                                                     "name":  "海口"
                                                                                 }
                                                                             ],
                                                    "population":  1048,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  34829,
                                                    "annualConsumptionPerCapita":  25908,
                                                    "parkGreenPerCapita":  12.52,
                                                    "gasCoverage":  99.99,
                                                    "railwayLength":  0.1,
                                                    "highwayLength":  4.21,
                                                    "incomeSupportScore":  13.3,
                                                    "consumptionBurden":  0.7439,
                                                    "consumptionBurdenScore":  6.3,
                                                    "environmentScore":  20.6,
                                                    "publicServiceScore":  51.6,
                                                    "overviewScore":  20.7,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  1048,
                                                                                        "disposableIncome":  34829,
                                                                                        "annualConsumptionPerCapita":  25908,
                                                                                        "parkGreenPerCapita":  12.52,
                                                                                        "gasCoverage":  99.99,
                                                                                        "railwayLength":  0.1,
                                                                                        "highwayLength":  4.21
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "500000000000",
                                                    "code":  "500000000000",
                                                    "name":  "重庆市",
                                                    "region":  "southWest",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "重庆",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "500000000000",
                                                                                     "name":  "重庆"
                                                                                 }
                                                                             ],
                                                    "population":  3190,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  39713,
                                                    "annualConsumptionPerCapita":  27451,
                                                    "parkGreenPerCapita":  20.93,
                                                    "gasCoverage":  99.77,
                                                    "railwayLength":  0.29,
                                                    "highwayLength":  18.71,
                                                    "incomeSupportScore":  21.2,
                                                    "consumptionBurden":  0.6912,
                                                    "consumptionBurdenScore":  36.9,
                                                    "environmentScore":  81.8,
                                                    "publicServiceScore":  74.2,
                                                    "overviewScore":  47.8,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  3190,
                                                                                        "disposableIncome":  39713,
                                                                                        "annualConsumptionPerCapita":  27451,
                                                                                        "parkGreenPerCapita":  20.93,
                                                                                        "gasCoverage":  99.77,
                                                                                        "railwayLength":  0.29,
                                                                                        "highwayLength":  18.71
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "510000000000",
                                                    "code":  "510000000000",
                                                    "name":  "四川省",
                                                    "region":  "southWest",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "成都",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "510100000000",
                                                                                     "name":  "成都"
                                                                                 }
                                                                             ],
                                                    "population":  8364,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  34325,
                                                    "annualConsumptionPerCapita":  24878,
                                                    "parkGreenPerCapita":  14.69,
                                                    "gasCoverage":  98.2,
                                                    "railwayLength":  0.68,
                                                    "highwayLength":  42.5,
                                                    "incomeSupportScore":  12.5,
                                                    "consumptionBurden":  0.7248,
                                                    "consumptionBurdenScore":  17.4,
                                                    "environmentScore":  36.4,
                                                    "publicServiceScore":  75.1,
                                                    "overviewScore":  31,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  8364,
                                                                                        "disposableIncome":  34325,
                                                                                        "annualConsumptionPerCapita":  24878,
                                                                                        "parkGreenPerCapita":  14.69,
                                                                                        "gasCoverage":  98.2,
                                                                                        "railwayLength":  0.68,
                                                                                        "highwayLength":  42.5
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "520000000000",
                                                    "code":  "520000000000",
                                                    "name":  "贵州省",
                                                    "region":  "southWest",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "贵阳",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "520100000000",
                                                                                     "name":  "贵阳"
                                                                                 }
                                                                             ],
                                                    "population":  3860,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  28561,
                                                    "annualConsumptionPerCapita":  20871,
                                                    "parkGreenPerCapita":  17.39,
                                                    "gasCoverage":  95.64,
                                                    "railwayLength":  0.43,
                                                    "highwayLength":  22.03,
                                                    "incomeSupportScore":  3.2,
                                                    "consumptionBurden":  0.7308,
                                                    "consumptionBurdenScore":  13.9,
                                                    "environmentScore":  56,
                                                    "publicServiceScore":  68.6,
                                                    "overviewScore":  29.5,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  3860,
                                                                                        "disposableIncome":  28561,
                                                                                        "annualConsumptionPerCapita":  20871,
                                                                                        "parkGreenPerCapita":  17.39,
                                                                                        "gasCoverage":  95.64,
                                                                                        "railwayLength":  0.43,
                                                                                        "highwayLength":  22.03
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "530000000000",
                                                    "code":  "530000000000",
                                                    "name":  "云南省",
                                                    "region":  "southWest",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "昆明",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "530100000000",
                                                                                     "name":  "昆明"
                                                                                 }
                                                                             ],
                                                    "population":  4655,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  29932,
                                                    "annualConsumptionPerCapita":  22280,
                                                    "parkGreenPerCapita":  14.35,
                                                    "gasCoverage":  83.5,
                                                    "railwayLength":  0.52,
                                                    "highwayLength":  34,
                                                    "incomeSupportScore":  5.4,
                                                    "consumptionBurden":  0.7444,
                                                    "consumptionBurdenScore":  6,
                                                    "environmentScore":  33.9,
                                                    "publicServiceScore":  63,
                                                    "overviewScore":  22.8,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  4655,
                                                                                        "disposableIncome":  29932,
                                                                                        "annualConsumptionPerCapita":  22280,
                                                                                        "parkGreenPerCapita":  14.35,
                                                                                        "gasCoverage":  83.5,
                                                                                        "railwayLength":  0.52,
                                                                                        "highwayLength":  34
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "540000000000",
                                                    "code":  "540000000000",
                                                    "name":  "西藏自治区",
                                                    "region":  "southWest",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "拉萨",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "540100000000",
                                                                                     "name":  "拉萨"
                                                                                 }
                                                                             ],
                                                    "population":  370,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  31358,
                                                    "annualConsumptionPerCapita":  18983,
                                                    "parkGreenPerCapita":  17.48,
                                                    "gasCoverage":  89.42,
                                                    "railwayLength":  0.12,
                                                    "highwayLength":  12.38,
                                                    "incomeSupportScore":  7.7,
                                                    "consumptionBurden":  0.6054,
                                                    "consumptionBurdenScore":  86.7,
                                                    "environmentScore":  56.7,
                                                    "publicServiceScore":  59.1,
                                                    "overviewScore":  47.5,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  370,
                                                                                        "disposableIncome":  31358,
                                                                                        "annualConsumptionPerCapita":  18983,
                                                                                        "parkGreenPerCapita":  17.48,
                                                                                        "gasCoverage":  89.42,
                                                                                        "railwayLength":  0.12,
                                                                                        "highwayLength":  12.38
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "610000000000",
                                                    "code":  "610000000000",
                                                    "name":  "陕西省",
                                                    "region":  "northWest",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "西安",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "610100000000",
                                                                                     "name":  "西安"
                                                                                 }
                                                                             ],
                                                    "population":  3953,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  33905,
                                                    "annualConsumptionPerCapita":  23213,
                                                    "parkGreenPerCapita":  13.11,
                                                    "gasCoverage":  98.88,
                                                    "railwayLength":  0.56,
                                                    "highwayLength":  19.01,
                                                    "incomeSupportScore":  11.8,
                                                    "consumptionBurden":  0.6846,
                                                    "consumptionBurdenScore":  40.7,
                                                    "environmentScore":  24.9,
                                                    "publicServiceScore":  62.6,
                                                    "overviewScore":  31.8,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  3953,
                                                                                        "disposableIncome":  33905,
                                                                                        "annualConsumptionPerCapita":  23213,
                                                                                        "parkGreenPerCapita":  13.11,
                                                                                        "gasCoverage":  98.88,
                                                                                        "railwayLength":  0.56,
                                                                                        "highwayLength":  19.01
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "620000000000",
                                                    "code":  "620000000000",
                                                    "name":  "甘肃省",
                                                    "region":  "northWest",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "兰州",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "620100000000",
                                                                                     "name":  "兰州"
                                                                                 }
                                                                             ],
                                                    "population":  2458,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  26612,
                                                    "annualConsumptionPerCapita":  19829,
                                                    "parkGreenPerCapita":  15.39,
                                                    "gasCoverage":  98.32,
                                                    "railwayLength":  0.58,
                                                    "highwayLength":  15.93,
                                                    "incomeSupportScore":  0,
                                                    "consumptionBurden":  0.7451,
                                                    "consumptionBurdenScore":  5.6,
                                                    "environmentScore":  41.5,
                                                    "publicServiceScore":  65.6,
                                                    "overviewScore":  22.8,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  2458,
                                                                                        "disposableIncome":  26612,
                                                                                        "annualConsumptionPerCapita":  19829,
                                                                                        "parkGreenPerCapita":  15.39,
                                                                                        "gasCoverage":  98.32,
                                                                                        "railwayLength":  0.58,
                                                                                        "highwayLength":  15.93
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "630000000000",
                                                    "code":  "630000000000",
                                                    "name":  "青海省",
                                                    "region":  "northWest",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "西宁",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "630100000000",
                                                                                     "name":  "西宁"
                                                                                 }
                                                                             ],
                                                    "population":  593,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  30117,
                                                    "annualConsumptionPerCapita":  21204,
                                                    "parkGreenPerCapita":  12.95,
                                                    "gasCoverage":  97.45,
                                                    "railwayLength":  0.3,
                                                    "highwayLength":  9.12,
                                                    "incomeSupportScore":  5.7,
                                                    "consumptionBurden":  0.7041,
                                                    "consumptionBurdenScore":  29.4,
                                                    "environmentScore":  23.8,
                                                    "publicServiceScore":  55.3,
                                                    "overviewScore":  25.2,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  593,
                                                                                        "disposableIncome":  30117,
                                                                                        "annualConsumptionPerCapita":  21204,
                                                                                        "parkGreenPerCapita":  12.95,
                                                                                        "gasCoverage":  97.45,
                                                                                        "railwayLength":  0.3,
                                                                                        "highwayLength":  9.12
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "640000000000",
                                                    "code":  "640000000000",
                                                    "name":  "宁夏回族自治区",
                                                    "region":  "northWest",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "银川",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "640100000000",
                                                                                     "name":  "银川"
                                                                                 }
                                                                             ],
                                                    "population":  729,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  33355,
                                                    "annualConsumptionPerCapita":  22865,
                                                    "parkGreenPerCapita":  23.44,
                                                    "gasCoverage":  98.44,
                                                    "railwayLength":  0.18,
                                                    "highwayLength":  3.9,
                                                    "incomeSupportScore":  10.9,
                                                    "consumptionBurden":  0.6855,
                                                    "consumptionBurdenScore":  40.2,
                                                    "environmentScore":  100,
                                                    "publicServiceScore":  71.6,
                                                    "overviewScore":  48.2,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  729,
                                                                                        "disposableIncome":  33355,
                                                                                        "annualConsumptionPerCapita":  22865,
                                                                                        "parkGreenPerCapita":  23.44,
                                                                                        "gasCoverage":  98.44,
                                                                                        "railwayLength":  0.18,
                                                                                        "highwayLength":  3.9
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "650000000000",
                                                    "code":  "650000000000",
                                                    "name":  "新疆维吾尔自治区",
                                                    "region":  "northWest",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "乌鲁木齐",
                                                    "representativeCities":  [
                                                                                 {
                                                                                     "code":  "650100000000",
                                                                                     "name":  "乌鲁木齐"
                                                                                 }
                                                                             ],
                                                    "population":  2623,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  30899,
                                                    "annualConsumptionPerCapita":  21364,
                                                    "parkGreenPerCapita":  16.67,
                                                    "gasCoverage":  98.86,
                                                    "railwayLength":  0.92,
                                                    "highwayLength":  23.19,
                                                    "incomeSupportScore":  6.9,
                                                    "consumptionBurden":  0.6914,
                                                    "consumptionBurdenScore":  36.8,
                                                    "environmentScore":  50.8,
                                                    "publicServiceScore":  74.6,
                                                    "overviewScore":  36.7,
                                                    "coverageScore":  1,
                                                    "coverageLevel":  "full",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "environment_green_proxy",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  2623,
                                                                                        "disposableIncome":  30899,
                                                                                        "annualConsumptionPerCapita":  21364,
                                                                                        "parkGreenPerCapita":  16.67,
                                                                                        "gasCoverage":  98.86,
                                                                                        "railwayLength":  0.92,
                                                                                        "highwayLength":  23.19
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "710000000000",
                                                    "code":  "710000000000",
                                                    "name":  "台湾省",
                                                    "region":  "greaterChinaLimited",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "台湾省",
                                                    "representativeCities":  [

                                                                             ],
                                                    "population":  null,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  null,
                                                    "annualConsumptionPerCapita":  null,
                                                    "parkGreenPerCapita":  null,
                                                    "gasCoverage":  null,
                                                    "railwayLength":  null,
                                                    "highwayLength":  null,
                                                    "incomeSupportScore":  null,
                                                    "consumptionBurden":  null,
                                                    "consumptionBurdenScore":  null,
                                                    "environmentScore":  null,
                                                    "publicServiceScore":  null,
                                                    "overviewScore":  null,
                                                    "coverageScore":  0.35,
                                                    "coverageLevel":  "limited",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "limited_comparability",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  null,
                                                                                        "disposableIncome":  null,
                                                                                        "annualConsumptionPerCapita":  null,
                                                                                        "parkGreenPerCapita":  null,
                                                                                        "gasCoverage":  null,
                                                                                        "railwayLength":  null,
                                                                                        "highwayLength":  null
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "810000000000",
                                                    "code":  "810000000000",
                                                    "name":  "香港特别行政区",
                                                    "region":  "greaterChinaLimited",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "香港特别行政区",
                                                    "representativeCities":  [

                                                                             ],
                                                    "population":  null,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  null,
                                                    "annualConsumptionPerCapita":  null,
                                                    "parkGreenPerCapita":  null,
                                                    "gasCoverage":  null,
                                                    "railwayLength":  null,
                                                    "highwayLength":  null,
                                                    "incomeSupportScore":  null,
                                                    "consumptionBurden":  null,
                                                    "consumptionBurdenScore":  null,
                                                    "environmentScore":  null,
                                                    "publicServiceScore":  null,
                                                    "overviewScore":  null,
                                                    "coverageScore":  0.35,
                                                    "coverageLevel":  "limited",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "limited_comparability",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  null,
                                                                                        "disposableIncome":  null,
                                                                                        "annualConsumptionPerCapita":  null,
                                                                                        "parkGreenPerCapita":  null,
                                                                                        "gasCoverage":  null,
                                                                                        "railwayLength":  null,
                                                                                        "highwayLength":  null
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                },
                                                {
                                                    "id":  "820000000000",
                                                    "code":  "820000000000",
                                                    "name":  "澳门特别行政区",
                                                    "region":  "greaterChinaLimited",
                                                    "adminLevel":  "province-level",
                                                    "provinceCapital":  "澳门特别行政区",
                                                    "representativeCities":  [

                                                                             ],
                                                    "population":  null,
                                                    "populationUnit":  "万人",
                                                    "disposableIncome":  null,
                                                    "annualConsumptionPerCapita":  null,
                                                    "parkGreenPerCapita":  null,
                                                    "gasCoverage":  null,
                                                    "railwayLength":  null,
                                                    "highwayLength":  null,
                                                    "incomeSupportScore":  null,
                                                    "consumptionBurden":  null,
                                                    "consumptionBurdenScore":  null,
                                                    "environmentScore":  null,
                                                    "publicServiceScore":  null,
                                                    "overviewScore":  null,
                                                    "coverageScore":  0.35,
                                                    "coverageLevel":  "limited",
                                                    "sourceRefs":  "nbs-api-province-annual-2024",
                                                    "qualityFlags":  "limited_comparability",
                                                    "periods":  {
                                                                    "latest":  {
                                                                                   "label":  "2024 official annual province data",
                                                                                   "note":  "Province mode currently uses official annual 2024 fields. Environment is represented by green-space proxy, not province-level air quality.",
                                                                                   "aligned":  true
                                                                               },
                                                                    "alignedAnnual":  {
                                                                                          "label":  "2024 aligned annual province data",
                                                                                          "note":  "Province metrics are already aligned to the 2024 annual window.",
                                                                                          "aligned":  true
                                                                                      }
                                                                },
                                                    "periodValues":  {
                                                                         "latest":  {
                                                                                        "population":  null,
                                                                                        "disposableIncome":  null,
                                                                                        "annualConsumptionPerCapita":  null,
                                                                                        "parkGreenPerCapita":  null,
                                                                                        "gasCoverage":  null,
                                                                                        "railwayLength":  null,
                                                                                        "highwayLength":  null
                                                                                    }
                                                                     },
                                                    "hasComparableProxyFields":  true,
                                                    "lastUpdated":  "2026-03-27"
                                                }
                                            ]
                          },
    "viewModel":  {
                      "generatedAt":  "2026-03-27",
                      "summary":  {
                                      "totalCities":  37,
                                      "deepSnapshotCities":  9,
                                      "majorOfficialCities":  28,
                                      "aiEligibleCities":  9,
                                      "cityMapEligibleCities":  37,
                                      "coreMetricCount":  9
                                  },
                      "enums":  {
                                    "tiers":  [
                                                  "tier1",
                                                  "newTier1",
                                                  "strongTier2"
                                              ],
                                    "regions":  [
                                                    "northChina",
                                                    "eastChina",
                                                    "southChina",
                                                    "centralChina",
                                                    "northEast",
                                                    "southWest",
                                                    "northWest"
                                                ],
                                    "mapMetrics":  [
                                                       {
                                                           "key":  "balancedScore",
                                                           "label":  "综合平衡",
                                                           "direction":  "higherBetter"
                                                       },
                                                       {
                                                           "key":  "savingScore",
                                                           "label":  "攒钱友好",
                                                           "direction":  "higherBetter"
                                                       },
                                                       {
                                                           "key":  "commuteIndex",
                                                           "label":  "通勤便利",
                                                           "direction":  "higherBetter"
                                                       },
                                                       {
                                                           "key":  "airQualityScore",
                                                           "label":  "空气质量",
                                                           "direction":  "higherBetter"
                                                       },
                                                       {
                                                           "key":  "totalCostIndex",
                                                           "label":  "综合生活成本",
                                                           "direction":  "lowerBetter"
                                                       },
                                                       {
                                                           "key":  "rentBurdenProxy",
                                                           "label":  "房租压力",
                                                           "direction":  "lowerBetter"
                                                       },
                                                       {
                                                           "key":  "wageReferenceMonthly",
                                                           "label":  "工资参考",
                                                           "direction":  "higherBetter"
                                                       },
                                                       {
                                                           "key":  "officialGdp",
                                                           "label":  "GDP",
                                                           "direction":  "higherBetter"
                                                       },
                                                       {
                                                           "key":  "baseOfficialScore",
                                                           "label":  "基础官方实力",
                                                           "direction":  "higherBetter"
                                                       }
                                                   ]
                                },
                      "cities":  [
                                     {
                                         "id":  "beijing",
                                         "officialCode":  "110000000000",
                                         "name":  "北京",
                                         "pinyin":  "beijing",
                                         "province":  "北京市",
                                         "provinceId":  "110000000000",
                                         "region":  "northChina",
                                         "tier":  "tier1",
                                         "coordinates":  [
                                                             116.4074,
                                                             39.9042
                                                         ],
                                         "layerType":  "deep-plus-official",
                                         "shortDescription":  "机会、收入和轨道交通都强，但房租与通勤压力也更高。",
                                         "longDescription":  "北京在收入、公共资源和轨道网络上仍然非常强，但对刚毕业或低预算用户来说，房租与通勤压力不容忽视。",
                                         "tags":  [
                                                      "机会密集",
                                                      "轨道通勤强",
                                                      "房租高",
                                                      "资源集中"
                                                  ],
                                         "suitableFor":  [
                                                             "重视职业机会",
                                                             "依赖轨道通勤",
                                                             "可接受较高生活压力"
                                                         ],
                                         "notIdealFor":  [
                                                             "低预算单人租房",
                                                             "优先追求轻松生活节奏"
                                                         ],
                                         "population":  2183.2,
                                         "populationUnit":  "万人",
                                         "populationScope":  "resident",
                                         "disposableIncome":  85415,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  232592,
                                         "annualConsumptionPerCapita":  49748,
                                         "rentMedian":  2428.5,
                                         "rentMedianPerSqm":  80.95,
                                         "assumedDwellingSizeSqm":  30,
                                         "avgCommuteTime":  47,
                                         "commuteWithin45":  58,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  879,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  97.5,
                                         "greenPublicSpaceProxy":  16.96,
                                         "pm25Reference":  30.5,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  0.341,
                                         "rentIndex":  98.4,
                                         "rentBurdenIndex":  92.1,
                                         "consumptionIndex":  75.7,
                                         "transportCostIndex":  44.2,
                                         "totalCostIndex":  82.5,
                                         "costFriendliness":  17.5,
                                         "commuteIndex":  55.8,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  43.2,
                                         "graduateScore":  22.6,
                                         "balancedScore":  null,
                                         "coupleScore":  43.2,
                                         "officialGdp":  49843.1,
                                         "officialRetailSales":  14092.4,
                                         "officialStudents":  66.5412,
                                         "officialHospitals":  682,
                                         "officialDoctors":  12.64,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  83.5,
                                         "opportunityScore":  73.3,
                                         "pressureScore":  89.3,
                                         "coverageScore":  0.8,
                                         "coverageCode":  "full",
                                         "coverageLabel":  "完整推荐",
                                         "aiEligible":  true,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  true,
                                         "sourceRefs":  [
                                                            "beijing-bulletin-2024",
                                                            "rent-beijing-2026-01",
                                                            "commute-report-2024",
                                                            "ai-config-rule-engine",
                                                            "nbs-api-major-city-annual-2024"
                                                        ],
                                         "qualityFlags":  [
                                                              "income_proxy",
                                                              "rent_estimate_30sqm",
                                                              "mixed_periods",
                                                              "mobility_proxy_subset",
                                                              "missing_good_air_days_ratio"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "收入与消费为 2024，租金为 2026-01 快照",
                                                                        "note":  "Latest mode shows the most recent verifiable snapshot for each metric.",
                                                                        "aligned":  false,
                                                                        "flags":  [

                                                                                  ]
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "Aligned annual mode targets 2024, but this city still contains newer or mixed snapshots.",
                                                                               "note":  "Aligned annual mode prefers 2024, but may retain newer snapshots where 2024 city-level values are unavailable.",
                                                                               "aligned":  false,
                                                                               "flags":  [
                                                                                             "rent_not_aligned_2024",
                                                                                             "mobility_not_fully_aligned_2024"
                                                                                         ]
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "totalCostIndex":  82.5,
                                                                             "rentBurdenProxy":  0.341,
                                                                             "commuteIndex":  55.8,
                                                                             "airQualityScore":  null
                                                                         },
                                                              "alignedAnnual":  {
                                                                                    "totalCostIndex":  82.5,
                                                                                    "rentBurdenProxy":  0.341,
                                                                                    "commuteIndex":  55.8,
                                                                                    "airQualityScore":  null
                                                                                }
                                                          },
                                         "displayPeriodLabel":  "收入与消费为 2024，租金为 2026-01 快照",
                                         "lastUpdated":  "2025-03-19"
                                     },
                                     {
                                         "id":  "shanghai",
                                         "officialCode":  "310000000000",
                                         "name":  "上海",
                                         "pinyin":  "shanghai",
                                         "province":  "上海市",
                                         "provinceId":  "310000000000",
                                         "region":  "eastChina",
                                         "tier":  "tier1",
                                         "coordinates":  [
                                                             121.4737,
                                                             31.2304
                                                         ],
                                         "layerType":  "deep-plus-official",
                                         "shortDescription":  "收入、空气质量和轨道网络都强，生活成本也处于样本高位。",
                                         "longDescription":  "上海在收入、公共交通和城市服务上更均衡，空气质量也优于很多超大城市，但租房与消费支出依旧偏高。",
                                         "tags":  [
                                                      "城市服务强",
                                                      "轨道密度高",
                                                      "房租高",
                                                      "生活便利"
                                                  ],
                                         "suitableFor":  [
                                                             "追求综合平衡",
                                                             "看重城市服务和公共交通",
                                                             "职业机会导向"
                                                         ],
                                         "notIdealFor":  [
                                                             "低预算起步",
                                                             "不接受较高租金"
                                                         ],
                                         "population":  2480.26,
                                         "populationUnit":  "万人",
                                         "populationScope":  "resident",
                                         "disposableIncome":  88366,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  247174,
                                         "annualConsumptionPerCapita":  52722,
                                         "rentMedian":  2445,
                                         "rentMedianPerSqm":  81.5,
                                         "assumedDwellingSizeSqm":  30,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  896,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  28,
                                         "goodAirDaysRatio":  88.5,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  0.332,
                                         "rentIndex":  99.4,
                                         "rentBurdenIndex":  88.9,
                                         "consumptionIndex":  98,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  94.2,
                                         "costFriendliness":  5.8,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  62,
                                         "savingScore":  44.5,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  53.2,
                                         "officialGdp":  53926.7,
                                         "officialRetailSales":  15872.3,
                                         "officialStudents":  58.7313,
                                         "officialHospitals":  492,
                                         "officialDoctors":  9.42,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  74.2,
                                         "opportunityScore":  76,
                                         "pressureScore":  95.1,
                                         "coverageScore":  0.7,
                                         "coverageCode":  "degraded",
                                         "coverageLabel":  "降级推荐",
                                         "aiEligible":  true,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  true,
                                         "sourceRefs":  [
                                                            "shanghai-bulletin-2024",
                                                            "rent-shanghai-2026-01",
                                                            "ai-config-rule-engine",
                                                            "nbs-api-major-city-annual-2024"
                                                        ],
                                         "qualityFlags":  [
                                                              "income_proxy",
                                                              "rent_estimate_30sqm",
                                                              "missing_commute_detail"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "收入与消费为 2024，租金为 2026-01 快照",
                                                                        "note":  "Latest mode shows the most recent verifiable snapshot for each metric.",
                                                                        "aligned":  false,
                                                                        "flags":  [

                                                                                  ]
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "Aligned annual mode targets 2024, but this city still contains newer or mixed snapshots.",
                                                                               "note":  "Aligned annual mode prefers 2024, but may retain newer snapshots where 2024 city-level values are unavailable.",
                                                                               "aligned":  false,
                                                                               "flags":  [
                                                                                             "rent_not_aligned_2024"
                                                                                         ]
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "totalCostIndex":  94.2,
                                                                             "rentBurdenProxy":  0.332,
                                                                             "commuteIndex":  null,
                                                                             "airQualityScore":  62
                                                                         },
                                                              "alignedAnnual":  {
                                                                                    "totalCostIndex":  94.2,
                                                                                    "rentBurdenProxy":  0.332,
                                                                                    "commuteIndex":  null,
                                                                                    "airQualityScore":  62
                                                                                }
                                                          },
                                         "displayPeriodLabel":  "收入与消费为 2024，租金为 2026-01 快照",
                                         "lastUpdated":  "2025-03-24"
                                     },
                                     {
                                         "id":  "shenzhen",
                                         "officialCode":  "440300000000",
                                         "name":  "深圳",
                                         "pinyin":  "shenzhen",
                                         "province":  "广东省",
                                         "provinceId":  "440000000000",
                                         "region":  "southChina",
                                         "tier":  "tier1",
                                         "coordinates":  [
                                                             114.0579,
                                                             22.5431
                                                         ],
                                         "layerType":  "deep-plus-official",
                                         "shortDescription":  "空气质量和通勤便利都很强，机会密集，但租金压力很高。",
                                         "longDescription":  "深圳的空气质量、地铁网络和创新产业机会都很突出，适合看重机会与效率的用户，但租房成本仍然偏高。",
                                         "tags":  [
                                                      "创新产业",
                                                      "空气质量强",
                                                      "通勤效率高",
                                                      "租金高"
                                                  ],
                                         "suitableFor":  [
                                                             "重视效率与机会",
                                                             "可接受较高租房成本",
                                                             "科技行业从业者"
                                                         ],
                                         "notIdealFor":  [
                                                             "预算紧张",
                                                             "偏好更慢节奏生活"
                                                         ],
                                         "population":  1798.95,
                                         "populationUnit":  "万人",
                                         "populationScope":  "resident",
                                         "disposableIncome":  81123,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  51415,
                                         "rentMedian":  2455.8,
                                         "rentMedianPerSqm":  81.86,
                                         "assumedDwellingSizeSqm":  30,
                                         "avgCommuteTime":  33,
                                         "commuteWithin45":  81,
                                         "publicTransportScore":  58,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  595,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  100,
                                         "greenPublicSpaceProxy":  21.3,
                                         "pm25Reference":  17.3,
                                         "goodAirDaysRatio":  97,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  0.363,
                                         "rentIndex":  100,
                                         "rentBurdenIndex":  99.9,
                                         "consumptionIndex":  88.2,
                                         "transportCostIndex":  24.3,
                                         "totalCostIndex":  88.3,
                                         "costFriendliness":  11.7,
                                         "commuteIndex":  75.7,
                                         "basicServices":  100,
                                         "airQualityScore":  79,
                                         "savingScore":  36.1,
                                         "graduateScore":  33.7,
                                         "balancedScore":  66.6,
                                         "coupleScore":  60.6,
                                         "officialGdp":  36801.87,
                                         "officialRetailSales":  10025,
                                         "officialStudents":  12.2842,
                                         "officialHospitals":  162,
                                         "officialDoctors":  5.43,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  40.1,
                                         "opportunityScore":  44.2,
                                         "pressureScore":  96.4,
                                         "coverageScore":  1,
                                         "coverageCode":  "full",
                                         "coverageLabel":  "完整推荐",
                                         "aiEligible":  true,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  true,
                                         "sourceRefs":  [
                                                            "shenzhen-bulletin-2024",
                                                            "rent-shenzhen-2026-02",
                                                            "commute-report-2025-news",
                                                            "ai-config-rule-engine",
                                                            "nbs-api-major-city-annual-2024"
                                                        ],
                                         "qualityFlags":  [
                                                              "income_proxy",
                                                              "rent_estimate_30sqm",
                                                              "mixed_periods"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "收入与消费为 2024，租金为 2026-02 快照",
                                                                        "note":  "Latest mode shows the most recent verifiable snapshot for each metric.",
                                                                        "aligned":  false,
                                                                        "flags":  [

                                                                                  ]
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "Aligned annual mode targets 2024, but this city still contains newer or mixed snapshots.",
                                                                               "note":  "Aligned annual mode prefers 2024, but may retain newer snapshots where 2024 city-level values are unavailable.",
                                                                               "aligned":  false,
                                                                               "flags":  [
                                                                                             "rent_not_aligned_2024",
                                                                                             "mobility_not_fully_aligned_2024"
                                                                                         ]
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "totalCostIndex":  88.3,
                                                                             "rentBurdenProxy":  0.363,
                                                                             "commuteIndex":  75.7,
                                                                             "airQualityScore":  79
                                                                         },
                                                              "alignedAnnual":  {
                                                                                    "totalCostIndex":  88.3,
                                                                                    "rentBurdenProxy":  0.363,
                                                                                    "commuteIndex":  75.7,
                                                                                    "airQualityScore":  79
                                                                                }
                                                          },
                                         "displayPeriodLabel":  "收入与消费为 2024，租金为 2026-02 快照",
                                         "lastUpdated":  "2025-04-01"
                                     },
                                     {
                                         "id":  "guangzhou",
                                         "officialCode":  "440100000000",
                                         "name":  "广州",
                                         "pinyin":  "guangzhou",
                                         "province":  "广东省",
                                         "provinceId":  "440000000000",
                                         "region":  "southChina",
                                         "tier":  "tier1",
                                         "coordinates":  [
                                                             113.2644,
                                                             23.1291
                                                         ],
                                         "layerType":  "deep-plus-official",
                                         "shortDescription":  "一线城市里租金相对没那么激进，空气质量表现也不差。",
                                         "longDescription":  "广州兼具一线机会和相对可控的房租快照，对想留在一线又不想承受极端租金的人更友好，但部分居民收入口径为城镇居民。",
                                         "tags":  [
                                                      "一线但相对友好",
                                                      "华南枢纽",
                                                      "租金中高",
                                                      "空气较稳"
                                                  ],
                                         "suitableFor":  [
                                                             "想留在一线",
                                                             "看重华南机会",
                                                             "希望租金别太极端"
                                                         ],
                                         "notIdealFor":  [
                                                             "只接受统一全体居民收入口径",
                                                             "极端预算敏感"
                                                         ],
                                         "population":  1897.8,
                                         "populationUnit":  "万人",
                                         "populationScope":  "resident",
                                         "disposableIncome":  83436,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  50496,
                                         "rentMedian":  1433.4,
                                         "rentMedianPerSqm":  47.78,
                                         "assumedDwellingSizeSqm":  30,
                                         "avgCommuteTime":  38.6,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  21,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  0.206,
                                         "rentIndex":  39.3,
                                         "rentBurdenIndex":  44.1,
                                         "consumptionIndex":  81.3,
                                         "transportCostIndex":  82.1,
                                         "totalCostIndex":  60.2,
                                         "costFriendliness":  39.8,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  62.8,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  62.8,
                                         "officialGdp":  31032.5,
                                         "officialRetailSales":  10450.6,
                                         "officialStudents":  151.4739,
                                         "officialHospitals":  336,
                                         "officialDoctors":  7.54,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  59.2,
                                         "opportunityScore":  73.4,
                                         "pressureScore":  54.1,
                                         "coverageScore":  0.6,
                                         "coverageCode":  "degraded",
                                         "coverageLabel":  "降级推荐",
                                         "aiEligible":  true,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  true,
                                         "sourceRefs":  [
                                                            "guangzhou-bulletin-2024",
                                                            "rent-guangzhou-2026-01",
                                                            "guangzhou-transport-summary",
                                                            "ai-config-rule-engine",
                                                            "nbs-api-major-city-annual-2024"
                                                        ],
                                         "qualityFlags":  [
                                                              "income_scope_mismatch",
                                                              "income_proxy",
                                                              "scope_mismatch",
                                                              "rent_estimate_30sqm",
                                                              "missing_rail_detail",
                                                              "missing_45min_share",
                                                              "missing_good_air_days_ratio"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "消费为 2024 城镇居民口径，租金为 2026-01 快照",
                                                                        "note":  "Latest mode shows the most recent verifiable snapshot for each metric.",
                                                                        "aligned":  false,
                                                                        "flags":  [

                                                                                  ]
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "Aligned annual mode targets 2024, but this city still contains newer or mixed snapshots.",
                                                                               "note":  "Aligned annual mode prefers 2024, but may retain newer snapshots where 2024 city-level values are unavailable.",
                                                                               "aligned":  false,
                                                                               "flags":  [
                                                                                             "rent_not_aligned_2024"
                                                                                         ]
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "totalCostIndex":  60.2,
                                                                             "rentBurdenProxy":  0.206,
                                                                             "commuteIndex":  null,
                                                                             "airQualityScore":  null
                                                                         },
                                                              "alignedAnnual":  {
                                                                                    "totalCostIndex":  60.2,
                                                                                    "rentBurdenProxy":  0.206,
                                                                                    "commuteIndex":  null,
                                                                                    "airQualityScore":  null
                                                                                }
                                                          },
                                         "displayPeriodLabel":  "消费为 2024 城镇居民口径，租金为 2026-01 快照",
                                         "lastUpdated":  "2025-03-28"
                                     },
                                     {
                                         "id":  "hangzhou",
                                         "officialCode":  "330100000000",
                                         "name":  "杭州",
                                         "pinyin":  "hangzhou",
                                         "province":  "浙江省",
                                         "provinceId":  "330000000000",
                                         "region":  "eastChina",
                                         "tier":  "newTier1",
                                         "coordinates":  [
                                                             120.1551,
                                                             30.2741
                                                         ],
                                         "layerType":  "deep-plus-official",
                                         "shortDescription":  "收入与生活质量都不错，但消费与租金也不低。",
                                         "longDescription":  "杭州在收入、消费能力、空气质量和轨道扩张上表现均衡，适合在大城市资源和相对舒适之间找平衡的人。",
                                         "tags":  [
                                                      "新一线平衡型",
                                                      "数字经济",
                                                      "生活质量较好",
                                                      "租金中高"
                                                  ],
                                         "suitableFor":  [
                                                             "追求平衡生活",
                                                             "看重新一线机会",
                                                             "可接受中高成本"
                                                         ],
                                         "notIdealFor":  [
                                                             "极低预算",
                                                             "只看最低房租"
                                                         ],
                                         "population":  1262.4,
                                         "populationUnit":  "万人",
                                         "populationScope":  "resident",
                                         "disposableIncome":  76777,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  52996,
                                         "rentMedian":  1456.2,
                                         "rentMedianPerSqm":  48.54,
                                         "assumedDwellingSizeSqm":  30,
                                         "avgCommuteTime":  35,
                                         "commuteWithin45":  79,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  516,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  30,
                                         "goodAirDaysRatio":  81.7,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  0.228,
                                         "rentIndex":  40.7,
                                         "rentBurdenIndex":  51.9,
                                         "consumptionIndex":  100,
                                         "transportCostIndex":  35,
                                         "totalCostIndex":  65.4,
                                         "costFriendliness":  34.6,
                                         "commuteIndex":  65,
                                         "basicServices":  null,
                                         "airQualityScore":  55.7,
                                         "savingScore":  51.1,
                                         "graduateScore":  47.3,
                                         "balancedScore":  51.8,
                                         "coupleScore":  52.9,
                                         "officialGdp":  21860.32,
                                         "officialRetailSales":  9150.9,
                                         "officialStudents":  52.2588,
                                         "officialHospitals":  417,
                                         "officialDoctors":  6.62,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  42.8,
                                         "opportunityScore":  37.1,
                                         "pressureScore":  60.9,
                                         "coverageScore":  0.8,
                                         "coverageCode":  "full",
                                         "coverageLabel":  "完整推荐",
                                         "aiEligible":  true,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  true,
                                         "sourceRefs":  [
                                                            "hangzhou-bulletin-2024",
                                                            "rent-hangzhou-2026-02",
                                                            "commute-report-2024",
                                                            "ai-config-rule-engine",
                                                            "nbs-api-major-city-annual-2024"
                                                        ],
                                         "qualityFlags":  [
                                                              "income_proxy",
                                                              "rent_estimate_30sqm",
                                                              "mixed_periods",
                                                              "missing_public_transport_score"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "收入与消费为 2024，租金为 2026-02 快照",
                                                                        "note":  "Latest mode shows the most recent verifiable snapshot for each metric.",
                                                                        "aligned":  false,
                                                                        "flags":  [

                                                                                  ]
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "Aligned annual mode targets 2024, but this city still contains newer or mixed snapshots.",
                                                                               "note":  "Aligned annual mode prefers 2024, but may retain newer snapshots where 2024 city-level values are unavailable.",
                                                                               "aligned":  false,
                                                                               "flags":  [
                                                                                             "rent_not_aligned_2024",
                                                                                             "mobility_not_fully_aligned_2024"
                                                                                         ]
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "totalCostIndex":  65.4,
                                                                             "rentBurdenProxy":  0.228,
                                                                             "commuteIndex":  65,
                                                                             "airQualityScore":  55.7
                                                                         },
                                                              "alignedAnnual":  {
                                                                                    "totalCostIndex":  65.4,
                                                                                    "rentBurdenProxy":  0.228,
                                                                                    "commuteIndex":  65,
                                                                                    "airQualityScore":  55.7
                                                                                }
                                                          },
                                         "displayPeriodLabel":  "收入与消费为 2024，租金为 2026-02 快照",
                                         "lastUpdated":  "2025-03-20"
                                     },
                                     {
                                         "id":  "nanjing",
                                         "officialCode":  "320100000000",
                                         "name":  "南京",
                                         "pinyin":  "nanjing",
                                         "province":  "江苏省",
                                         "provinceId":  "320000000000",
                                         "region":  "eastChina",
                                         "tier":  "newTier1",
                                         "coordinates":  [
                                                             118.7969,
                                                             32.0603
                                                         ],
                                         "layerType":  "deep-plus-official",
                                         "shortDescription":  "收入、空气质量和租金压力代理都比较平衡，适合稳健型选择。",
                                         "longDescription":  "南京在收入、房租压力代理、空气质量和轨道交通上都比较均衡，既不像一线那样高压，也保留了较强的教育与产业资源。",
                                         "tags":  [
                                                      "稳健型城市",
                                                      "教育资源强",
                                                      "租金中等",
                                                      "环境较好"
                                                  ],
                                         "suitableFor":  [
                                                             "刚毕业",
                                                             "双人稳定生活",
                                                             "追求平衡"
                                                         ],
                                         "notIdealFor":  [
                                                             "只想去一线",
                                                             "追求最低租金"
                                                         ],
                                         "population":  957.7,
                                         "populationUnit":  "万人",
                                         "populationScope":  "resident",
                                         "disposableIncome":  75180,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  44578,
                                         "rentMedian":  1105.5,
                                         "rentMedianPerSqm":  36.85,
                                         "assumedDwellingSizeSqm":  30,
                                         "avgCommuteTime":  37,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  483.3,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  28,
                                         "goodAirDaysRatio":  85.8,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  0.176,
                                         "rentIndex":  19.9,
                                         "rentBurdenIndex":  33.4,
                                         "consumptionIndex":  37,
                                         "transportCostIndex":  78.7,
                                         "totalCostIndex":  37.2,
                                         "costFriendliness":  62.8,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  60.4,
                                         "savingScore":  60.8,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  60.6,
                                         "officialGdp":  18500.81,
                                         "officialRetailSales":  7864.1,
                                         "officialStudents":  83.4347,
                                         "officialHospitals":  315,
                                         "officialDoctors":  4.58,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  36.8,
                                         "opportunityScore":  41.3,
                                         "pressureScore":  35.4,
                                         "coverageScore":  0.75,
                                         "coverageCode":  "degraded",
                                         "coverageLabel":  "降级推荐",
                                         "aiEligible":  true,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  true,
                                         "sourceRefs":  [
                                                            "nanjing-bulletin-2024",
                                                            "rent-nanjing-2026-01",
                                                            "commute-report-2024",
                                                            "ai-config-rule-engine",
                                                            "nbs-api-major-city-annual-2024"
                                                        ],
                                         "qualityFlags":  [
                                                              "income_proxy",
                                                              "rent_estimate_30sqm",
                                                              "missing_45min_share",
                                                              "missing_public_transport_score"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "收入与消费为 2024，租金为 2026-01 快照",
                                                                        "note":  "Latest mode shows the most recent verifiable snapshot for each metric.",
                                                                        "aligned":  false,
                                                                        "flags":  [

                                                                                  ]
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "Aligned annual mode targets 2024, but this city still contains newer or mixed snapshots.",
                                                                               "note":  "Aligned annual mode prefers 2024, but may retain newer snapshots where 2024 city-level values are unavailable.",
                                                                               "aligned":  false,
                                                                               "flags":  [
                                                                                             "rent_not_aligned_2024",
                                                                                             "mobility_not_fully_aligned_2024"
                                                                                         ]
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "totalCostIndex":  37.2,
                                                                             "rentBurdenProxy":  0.176,
                                                                             "commuteIndex":  null,
                                                                             "airQualityScore":  60.4
                                                                         },
                                                              "alignedAnnual":  {
                                                                                    "totalCostIndex":  37.2,
                                                                                    "rentBurdenProxy":  0.176,
                                                                                    "commuteIndex":  null,
                                                                                    "airQualityScore":  60.4
                                                                                }
                                                          },
                                         "displayPeriodLabel":  "收入与消费为 2024，租金为 2026-01 快照",
                                         "lastUpdated":  "2025-04-01"
                                     },
                                     {
                                         "id":  "wuhan",
                                         "officialCode":  "420100000000",
                                         "name":  "武汉",
                                         "pinyin":  "wuhan",
                                         "province":  "湖北省",
                                         "provinceId":  "420000000000",
                                         "region":  "centralChina",
                                         "tier":  "newTier1",
                                         "coordinates":  [
                                                             114.3054,
                                                             30.5931
                                                         ],
                                         "layerType":  "deep-plus-official",
                                         "shortDescription":  "租金压力相对更低，轨道网络与中部机会兼顾，适合低预算起步。",
                                         "longDescription":  "武汉在中部城市中兼具产业机会、轨道扩张和相对可控的租房成本，适合刚毕业、低预算起步和希望提高存钱效率的人，但空气质量仍需要结合具体片区做进一步比较。",
                                         "tags":  [
                                                      "低预算友好",
                                                      "轨道交通扩张",
                                                      "中部机会",
                                                      "房租较低"
                                                  ],
                                         "suitableFor":  [
                                                             "刚毕业",
                                                             "低预算起步",
                                                             "想提高存钱效率"
                                                         ],
                                         "notIdealFor":  [
                                                             "只接受最优空气质量",
                                                             "极端依赖超一线资源"
                                                         ],
                                         "population":  1380.91,
                                         "populationUnit":  "万人",
                                         "populationScope":  "resident",
                                         "disposableIncome":  59732,
                                         "wageReferenceMonthly":  9409.75,
                                         "wageReferenceAnnual":  112917,
                                         "annualConsumptionPerCapita":  39625,
                                         "rentMedian":  770.7,
                                         "rentMedianPerSqm":  25.69,
                                         "assumedDwellingSizeSqm":  30,
                                         "avgCommuteTime":  37,
                                         "commuteWithin45":  73,
                                         "publicTransportScore":  33,
                                         "railCoverageCommute":  33,
                                         "bus45Service":  46,
                                         "extremeCommute60":  15,
                                         "avgCommuteDistance":  8.6,
                                         "railTransitLength":  577.52,
                                         "reportRailTransitLength":  556,
                                         "utilityCoverage":  100,
                                         "greenPublicSpaceProxy":  15.03,
                                         "pm25Reference":  36,
                                         "goodAirDaysRatio":  77.9,
                                         "latestGoodAirDaysRatio":  85.8,
                                         "latestSignalPeriod":  "2025",
                                         "rentBurdenProxy":  0.082,
                                         "rentIndex":  0,
                                         "rentBurdenIndex":  0,
                                         "consumptionIndex":  0,
                                         "transportCostIndex":  38.9,
                                         "totalCostIndex":  3.9,
                                         "costFriendliness":  96.1,
                                         "commuteIndex":  61.1,
                                         "basicServices":  73.9,
                                         "airQualityScore":  46.7,
                                         "savingScore":  60.3,
                                         "graduateScore":  87.1,
                                         "balancedScore":  69.4,
                                         "coupleScore":  58.8,
                                         "officialGdp":  21106.23,
                                         "officialRetailSales":  7931.9,
                                         "officialStudents":  119.3975,
                                         "officialHospitals":  373,
                                         "officialDoctors":  5.28,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  29.5,
                                         "opportunityScore":  34.8,
                                         "pressureScore":  0,
                                         "coverageScore":  1,
                                         "coverageCode":  "full",
                                         "coverageLabel":  "完整推荐",
                                         "aiEligible":  true,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  true,
                                         "sourceRefs":  [
                                                            "wuhan-bulletin-2024",
                                                            "wuhan-wage-2024",
                                                            "wuhan-environment-2024",
                                                            "wuhan-air-quality-2025-summary",
                                                            "commute-report-2024",
                                                            "rent-wuhan-2026-02",
                                                            "ai-config-rule-engine",
                                                            "nbs-api-major-city-annual-2024"
                                                        ],
                                         "qualityFlags":  [
                                                              "rent_estimate_30sqm",
                                                              "wage_scope_urban_units",
                                                              {

                                                              }
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "Latest mode uses 2024 annual income, consumption, rail and environment fields, plus the 2026-02 rent snapshot and a 2025 air-quality signal.",
                                                                        "note":  "Latest mode shows the most recent verifiable snapshot for each metric.",
                                                                        "aligned":  false,
                                                                        "flags":  [

                                                                                  ]
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "Aligned annual mode keeps the 2024 official baseline and 2023/2024 commuting support fields, excluding the 2026-02 rent snapshot and the 2025 air signal.",
                                                                               "note":  "Aligned annual mode prefers 2024, but may retain newer snapshots where 2024 city-level values are unavailable.",
                                                                               "aligned":  false,
                                                                               "flags":  [
                                                                                             "rent_not_aligned_2024"
                                                                                         ]
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "totalCostIndex":  3.9,
                                                                             "rentBurdenProxy":  0.082,
                                                                             "commuteIndex":  61.1,
                                                                             "airQualityScore":  46.7
                                                                         },
                                                              "alignedAnnual":  {
                                                                                    "totalCostIndex":  3.9,
                                                                                    "rentBurdenProxy":  0.082,
                                                                                    "commuteIndex":  61.1,
                                                                                    "airQualityScore":  46.7
                                                                                }
                                                          },
                                         "displayPeriodLabel":  "Latest mode uses 2024 annual income, consumption, rail and environment fields, plus the 2026-02 rent snapshot and a 2025 air-quality signal.",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "suzhou",
                                         "officialCode":  "320500000000",
                                         "name":  "苏州",
                                         "pinyin":  "suzhou",
                                         "province":  "江苏省",
                                         "provinceId":  "320000000000",
                                         "region":  "eastChina",
                                         "tier":  "strongTier2",
                                         "coordinates":  [
                                                             120.5853,
                                                             31.2989
                                                         ],
                                         "layerType":  "deep-snapshot",
                                         "shortDescription":  "收入不错、租金压力代理较友好，适合作为“能赚钱也能存钱”的候选。",
                                         "longDescription":  "苏州拥有较好的制造业与服务业支撑，收入表现不错，租金快照相对温和，是首版样本里很强的攒钱型和双人生活型候选。",
                                         "tags":  [
                                                      "攒钱友好",
                                                      "制造业强",
                                                      "生活相对平衡",
                                                      "华东机会"
                                                  ],
                                         "suitableFor":  [
                                                             "情侣",
                                                             "想攒钱",
                                                             "看重工作与生活平衡"
                                                         ],
                                         "notIdealFor":  [
                                                             "只认一线城市标签",
                                                             "追求最强娱乐资源"
                                                         ],
                                         "population":  1298.7,
                                         "populationUnit":  "万人",
                                         "populationScope":  "resident",
                                         "disposableIncome":  77524,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  48108,
                                         "rentMedian":  1011.6,
                                         "rentMedianPerSqm":  33.72,
                                         "assumedDwellingSizeSqm":  30,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  392.4,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  100,
                                         "greenPublicSpaceProxy":  15.25,
                                         "pm25Reference":  29,
                                         "goodAirDaysRatio":  84.2,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  0.157,
                                         "rentIndex":  14.3,
                                         "rentBurdenIndex":  26.7,
                                         "consumptionIndex":  63.4,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  38.9,
                                         "costFriendliness":  61.1,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  58.3,
                                         "savingScore":  66.2,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  62.2,
                                         "officialGdp":  null,
                                         "officialRetailSales":  null,
                                         "officialStudents":  null,
                                         "officialHospitals":  null,
                                         "officialDoctors":  null,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  null,
                                         "opportunityScore":  null,
                                         "pressureScore":  33.4,
                                         "coverageScore":  0.8,
                                         "coverageCode":  "full",
                                         "coverageLabel":  "完整推荐",
                                         "aiEligible":  true,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  true,
                                         "sourceRefs":  [
                                                            "suzhou-bulletin-2024",
                                                            "rent-suzhou-2026-01",
                                                            "ai-config-rule-engine"
                                                        ],
                                         "qualityFlags":  [
                                                              "income_proxy",
                                                              "rent_estimate_30sqm",
                                                              "missing_commute_detail"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "收入与消费为 2024，租金为 2026-01 快照",
                                                                        "note":  "Latest mode shows the most recent verifiable snapshot for each metric.",
                                                                        "aligned":  false,
                                                                        "flags":  [

                                                                                  ]
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "Aligned annual mode targets 2024, but this city still contains newer or mixed snapshots.",
                                                                               "note":  "Aligned annual mode prefers 2024, but may retain newer snapshots where 2024 city-level values are unavailable.",
                                                                               "aligned":  false,
                                                                               "flags":  [
                                                                                             "rent_not_aligned_2024"
                                                                                         ]
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "totalCostIndex":  38.9,
                                                                             "rentBurdenProxy":  0.157,
                                                                             "commuteIndex":  null,
                                                                             "airQualityScore":  58.3
                                                                         },
                                                              "alignedAnnual":  {
                                                                                    "totalCostIndex":  38.9,
                                                                                    "rentBurdenProxy":  0.157,
                                                                                    "commuteIndex":  null,
                                                                                    "airQualityScore":  58.3
                                                                                }
                                                          },
                                         "displayPeriodLabel":  "收入与消费为 2024，租金为 2026-01 快照",
                                         "lastUpdated":  "2025-04-03"
                                     },
                                     {
                                         "id":  "xiamen",
                                         "officialCode":  "350200000000",
                                         "name":  "厦门",
                                         "pinyin":  "xiamen",
                                         "province":  "福建省",
                                         "provinceId":  "350000000000",
                                         "region":  "eastChina",
                                         "tier":  "strongTier2",
                                         "coordinates":  [
                                                             118.0894,
                                                             24.4798
                                                         ],
                                         "layerType":  "deep-plus-official",
                                         "shortDescription":  "空气质量非常亮眼，适合看重生活舒适度，但收入与通勤数据覆盖相对不完整。",
                                         "longDescription":  "厦门的环境质量和生活舒适度对很多人有吸引力，但首版内置快照里，它的通勤与部分环境细项覆盖不如其他城市完整，推荐会降级展示。",
                                         "tags":  [
                                                      "空气质量强",
                                                      "舒适生活",
                                                      "沿海城市",
                                                      "数据覆盖偏少"
                                                  ],
                                         "suitableFor":  [
                                                             "重视环境",
                                                             "双人舒适生活",
                                                             "偏好海边城市"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要最完整的数据证据",
                                                             "只看产业机会密度"
                                                         ],
                                         "population":  535,
                                         "populationUnit":  "万人",
                                         "populationScope":  "resident",
                                         "disposableIncome":  74249,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  49085,
                                         "rentMedian":  1164.3,
                                         "rentMedianPerSqm":  38.81,
                                         "assumedDwellingSizeSqm":  30,
                                         "avgCommuteTime":  33,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  56,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  99.5,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  0.188,
                                         "rentIndex":  23.4,
                                         "rentBurdenIndex":  37.7,
                                         "consumptionIndex":  70.8,
                                         "transportCostIndex":  70.2,
                                         "totalCostIndex":  50.4,
                                         "costFriendliness":  49.6,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  55,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  55,
                                         "officialGdp":  8589.01,
                                         "officialRetailSales":  3329.8,
                                         "officialStudents":  19.9268,
                                         "officialHospitals":  70,
                                         "officialDoctors":  2.01,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  11.3,
                                         "opportunityScore":  13.4,
                                         "pressureScore":  45.3,
                                         "coverageScore":  0.75,
                                         "coverageCode":  "degraded",
                                         "coverageLabel":  "降级推荐",
                                         "aiEligible":  true,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  true,
                                         "sourceRefs":  [
                                                            "xiamen-bulletin-2024",
                                                            "rent-xiamen-2026-01",
                                                            "mobility-public-summary",
                                                            "ai-config-rule-engine",
                                                            "nbs-api-major-city-annual-2024"
                                                        ],
                                         "qualityFlags":  [
                                                              "environment_partial",
                                                              "mobility_partial",
                                                              "income_proxy",
                                                              "rent_estimate_30sqm",
                                                              "missing_rail_detail",
                                                              "missing_45min_share",
                                                              "missing_pm25_reference"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "收入与消费为 2024，租金为 2026-01 快照",
                                                                        "note":  "Latest mode shows the most recent verifiable snapshot for each metric.",
                                                                        "aligned":  false,
                                                                        "flags":  [

                                                                                  ]
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "Aligned annual mode targets 2024, but this city still contains newer or mixed snapshots.",
                                                                               "note":  "Aligned annual mode prefers 2024, but may retain newer snapshots where 2024 city-level values are unavailable.",
                                                                               "aligned":  false,
                                                                               "flags":  [
                                                                                             "rent_not_aligned_2024"
                                                                                         ]
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "totalCostIndex":  50.4,
                                                                             "rentBurdenProxy":  0.188,
                                                                             "commuteIndex":  null,
                                                                             "airQualityScore":  null
                                                                         },
                                                              "alignedAnnual":  {
                                                                                    "totalCostIndex":  50.4,
                                                                                    "rentBurdenProxy":  0.188,
                                                                                    "commuteIndex":  null,
                                                                                    "airQualityScore":  null
                                                                                }
                                                          },
                                         "displayPeriodLabel":  "收入与消费为 2024，租金为 2026-01 快照",
                                         "lastUpdated":  "2025-03-26"
                                     },
                                     {
                                         "id":  "120000000000",
                                         "officialCode":  "120000000000",
                                         "name":  "天津",
                                         "pinyin":  "",
                                         "province":  "天津市",
                                         "provinceId":  "120000000000",
                                         "region":  "northChina",
                                         "tier":  "newTier1",
                                         "coordinates":  [
                                                             117.2,
                                                             39.1333
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "天津 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "天津 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  12207.5,
                                         "wageReferenceAnnual":  146490,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  18024.3,
                                         "officialRetailSales":  4128.3,
                                         "officialStudents":  60.536,
                                         "officialHospitals":  453,
                                         "officialDoctors":  6.08,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  61.6,
                                         "opportunityScore":  57.6,
                                         "pressureScore":  50,
                                         "coverageScore":  0.86,
                                         "coverageCode":  "degraded",
                                         "coverageLabel":  "基础官方分析",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  18024.3,
                                                                             "wageReferenceAnnual":  146490,
                                                                             "officialRetailSales":  4128.3,
                                                                             "officialStudents":  60.536,
                                                                             "officialHospitals":  453,
                                                                             "officialDoctors":  6.08
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "130100000000",
                                         "officialCode":  "130100000000",
                                         "name":  "石家庄",
                                         "pinyin":  "",
                                         "province":  "河北省",
                                         "provinceId":  "130000000000",
                                         "region":  "northChina",
                                         "tier":  "strongTier2",
                                         "coordinates":  [
                                                             114.5149,
                                                             38.0428
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "石家庄 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "石家庄 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  8203.44,
                                         "officialRetailSales":  3021.7,
                                         "officialStudents":  70.1389,
                                         "officialHospitals":  344,
                                         "officialDoctors":  5.24,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  30.1,
                                         "opportunityScore":  25.8,
                                         "pressureScore":  50,
                                         "coverageScore":  0.71,
                                         "coverageCode":  "limited",
                                         "coverageLabel":  "仅展示",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  8203.44,
                                                                             "wageReferenceAnnual":  null,
                                                                             "officialRetailSales":  3021.7,
                                                                             "officialStudents":  70.1389,
                                                                             "officialHospitals":  344,
                                                                             "officialDoctors":  5.24
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "140100000000",
                                         "officialCode":  "140100000000",
                                         "name":  "太原",
                                         "pinyin":  "",
                                         "province":  "山西省",
                                         "provinceId":  "140000000000",
                                         "region":  "northChina",
                                         "tier":  "strongTier2",
                                         "coordinates":  [
                                                             112.5492,
                                                             37.857
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "太原 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "太原 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  5418.87,
                                         "officialRetailSales":  2260.4,
                                         "officialStudents":  73.314,
                                         "officialHospitals":  162,
                                         "officialDoctors":  2.91,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  18.8,
                                         "opportunityScore":  23.4,
                                         "pressureScore":  50,
                                         "coverageScore":  0.71,
                                         "coverageCode":  "limited",
                                         "coverageLabel":  "仅展示",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  5418.87,
                                                                             "wageReferenceAnnual":  null,
                                                                             "officialRetailSales":  2260.4,
                                                                             "officialStudents":  73.314,
                                                                             "officialHospitals":  162,
                                                                             "officialDoctors":  2.91
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "150100000000",
                                         "officialCode":  "150100000000",
                                         "name":  "呼和浩特",
                                         "pinyin":  "",
                                         "province":  "内蒙古自治区",
                                         "provinceId":  "150000000000",
                                         "region":  "northChina",
                                         "tier":  "strongTier2",
                                         "coordinates":  [
                                                             111.7519,
                                                             40.8415
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "呼和浩特 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "呼和浩特 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  4107.08,
                                         "officialRetailSales":  1176,
                                         "officialStudents":  24.9351,
                                         "officialHospitals":  122,
                                         "officialDoctors":  1.59,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  9.3,
                                         "opportunityScore":  9.4,
                                         "pressureScore":  50,
                                         "coverageScore":  0.71,
                                         "coverageCode":  "limited",
                                         "coverageLabel":  "仅展示",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  4107.08,
                                                                             "wageReferenceAnnual":  null,
                                                                             "officialRetailSales":  1176,
                                                                             "officialStudents":  24.9351,
                                                                             "officialHospitals":  122,
                                                                             "officialDoctors":  1.59
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "210100000000",
                                         "officialCode":  "210100000000",
                                         "name":  "沈阳",
                                         "pinyin":  "",
                                         "province":  "辽宁省",
                                         "provinceId":  "210000000000",
                                         "region":  "northEast",
                                         "tier":  "strongTier2",
                                         "coordinates":  [
                                                             123.4315,
                                                             41.8057
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "沈阳 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "沈阳 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  9027.14,
                                         "officialRetailSales":  4154.8,
                                         "officialStudents":  46.0484,
                                         "officialHospitals":  314,
                                         "officialDoctors":  4.12,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  25.2,
                                         "opportunityScore":  20.6,
                                         "pressureScore":  50,
                                         "coverageScore":  0.71,
                                         "coverageCode":  "limited",
                                         "coverageLabel":  "仅展示",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  9027.14,
                                                                             "wageReferenceAnnual":  null,
                                                                             "officialRetailSales":  4154.8,
                                                                             "officialStudents":  46.0484,
                                                                             "officialHospitals":  314,
                                                                             "officialDoctors":  4.12
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "210200000000",
                                         "officialCode":  "210200000000",
                                         "name":  "大连",
                                         "pinyin":  "",
                                         "province":  "辽宁省",
                                         "provinceId":  "210000000000",
                                         "region":  "northEast",
                                         "tier":  "strongTier2",
                                         "coordinates":  [
                                                             121.6147,
                                                             38.914
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "大连 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "大连 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  9516.87,
                                         "officialRetailSales":  2135.9,
                                         "officialStudents":  33.6841,
                                         "officialHospitals":  250,
                                         "officialDoctors":  2.83,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  20,
                                         "opportunityScore":  17.9,
                                         "pressureScore":  50,
                                         "coverageScore":  0.71,
                                         "coverageCode":  "limited",
                                         "coverageLabel":  "仅展示",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  9516.87,
                                                                             "wageReferenceAnnual":  null,
                                                                             "officialRetailSales":  2135.9,
                                                                             "officialStudents":  33.6841,
                                                                             "officialHospitals":  250,
                                                                             "officialDoctors":  2.83
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "220100000000",
                                         "officialCode":  "220100000000",
                                         "name":  "长春",
                                         "pinyin":  "",
                                         "province":  "吉林省",
                                         "provinceId":  "220000000000",
                                         "region":  "northEast",
                                         "tier":  "strongTier2",
                                         "coordinates":  [
                                                             125.3235,
                                                             43.8171
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "长春 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "长春 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  7632.19,
                                         "officialRetailSales":  2454.5,
                                         "officialStudents":  54.5186,
                                         "officialHospitals":  289,
                                         "officialDoctors":  3.97,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  24,
                                         "opportunityScore":  21.1,
                                         "pressureScore":  50,
                                         "coverageScore":  0.71,
                                         "coverageCode":  "limited",
                                         "coverageLabel":  "仅展示",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  7632.19,
                                                                             "wageReferenceAnnual":  null,
                                                                             "officialRetailSales":  2454.5,
                                                                             "officialStudents":  54.5186,
                                                                             "officialHospitals":  289,
                                                                             "officialDoctors":  3.97
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "230100000000",
                                         "officialCode":  "230100000000",
                                         "name":  "哈尔滨",
                                         "pinyin":  "",
                                         "province":  "黑龙江省",
                                         "provinceId":  "230000000000",
                                         "region":  "northEast",
                                         "tier":  "strongTier2",
                                         "coordinates":  [
                                                             126.5349,
                                                             45.8038
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "哈尔滨 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "哈尔滨 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  6016.33,
                                         "officialRetailSales":  2460.5,
                                         "officialStudents":  72.0528,
                                         "officialHospitals":  360,
                                         "officialDoctors":  3.62,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  26,
                                         "opportunityScore":  23.8,
                                         "pressureScore":  50,
                                         "coverageScore":  0.71,
                                         "coverageCode":  "limited",
                                         "coverageLabel":  "仅展示",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  6016.33,
                                                                             "wageReferenceAnnual":  null,
                                                                             "officialRetailSales":  2460.5,
                                                                             "officialStudents":  72.0528,
                                                                             "officialHospitals":  360,
                                                                             "officialDoctors":  3.62
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "330200000000",
                                         "officialCode":  "330200000000",
                                         "name":  "宁波",
                                         "pinyin":  "",
                                         "province":  "浙江省",
                                         "provinceId":  "330000000000",
                                         "region":  "eastChina",
                                         "tier":  "newTier1",
                                         "coordinates":  [
                                                             121.55029999999999,
                                                             29.8746
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "宁波 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "宁波 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  18147.7,
                                         "officialRetailSales":  5279.2,
                                         "officialStudents":  19.3807,
                                         "officialHospitals":  214,
                                         "officialDoctors":  3.97,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  25.9,
                                         "opportunityScore":  24.3,
                                         "pressureScore":  50,
                                         "coverageScore":  0.71,
                                         "coverageCode":  "limited",
                                         "coverageLabel":  "仅展示",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  18147.7,
                                                                             "wageReferenceAnnual":  null,
                                                                             "officialRetailSales":  5279.2,
                                                                             "officialStudents":  19.3807,
                                                                             "officialHospitals":  214,
                                                                             "officialDoctors":  3.97
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "340100000000",
                                         "officialCode":  "340100000000",
                                         "name":  "合肥",
                                         "pinyin":  "",
                                         "province":  "安徽省",
                                         "provinceId":  "340000000000",
                                         "region":  "eastChina",
                                         "tier":  "strongTier2",
                                         "coordinates":  [
                                                             117.2272,
                                                             31.8206
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "合肥 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "合肥 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  13507.69,
                                         "officialRetailSales":  5156.5,
                                         "officialStudents":  83.9507,
                                         "officialHospitals":  231,
                                         "officialDoctors":  3.64,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  29.1,
                                         "opportunityScore":  35.6,
                                         "pressureScore":  50,
                                         "coverageScore":  0.71,
                                         "coverageCode":  "limited",
                                         "coverageLabel":  "仅展示",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  13507.69,
                                                                             "wageReferenceAnnual":  null,
                                                                             "officialRetailSales":  5156.5,
                                                                             "officialStudents":  83.9507,
                                                                             "officialHospitals":  231,
                                                                             "officialDoctors":  3.64
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "350100000000",
                                         "officialCode":  "350100000000",
                                         "name":  "福州",
                                         "pinyin":  "",
                                         "province":  "福建省",
                                         "provinceId":  "350000000000",
                                         "region":  "eastChina",
                                         "tier":  "strongTier2",
                                         "coordinates":  [
                                                             119.2965,
                                                             26.0745
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "福州 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "福州 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  14236.76,
                                         "officialRetailSales":  5633.7,
                                         "officialStudents":  45.2993,
                                         "officialHospitals":  152,
                                         "officialDoctors":  3.11,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  22.4,
                                         "opportunityScore":  26.4,
                                         "pressureScore":  50,
                                         "coverageScore":  0.71,
                                         "coverageCode":  "limited",
                                         "coverageLabel":  "仅展示",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  14236.76,
                                                                             "wageReferenceAnnual":  null,
                                                                             "officialRetailSales":  5633.7,
                                                                             "officialStudents":  45.2993,
                                                                             "officialHospitals":  152,
                                                                             "officialDoctors":  3.11
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "360100000000",
                                         "officialCode":  "360100000000",
                                         "name":  "南昌",
                                         "pinyin":  "",
                                         "province":  "江西省",
                                         "provinceId":  "360000000000",
                                         "region":  "eastChina",
                                         "tier":  "strongTier2",
                                         "coordinates":  [
                                                             115.8582,
                                                             28.6829
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "南昌 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "南昌 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  7800.37,
                                         "officialRetailSales":  2847.7,
                                         "officialStudents":  82.0266,
                                         "officialHospitals":  158,
                                         "officialDoctors":  2.45,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  20.5,
                                         "opportunityScore":  28.5,
                                         "pressureScore":  50,
                                         "coverageScore":  0.71,
                                         "coverageCode":  "limited",
                                         "coverageLabel":  "仅展示",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  7800.37,
                                                                             "wageReferenceAnnual":  null,
                                                                             "officialRetailSales":  2847.7,
                                                                             "officialStudents":  82.0266,
                                                                             "officialHospitals":  158,
                                                                             "officialDoctors":  2.45
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "370100000000",
                                         "officialCode":  "370100000000",
                                         "name":  "济南",
                                         "pinyin":  "",
                                         "province":  "山东省",
                                         "provinceId":  "370000000000",
                                         "region":  "eastChina",
                                         "tier":  "strongTier2",
                                         "coordinates":  [
                                                             117.1201,
                                                             36.6512
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "济南 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "济南 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  13527.55,
                                         "officialRetailSales":  5316.1,
                                         "officialStudents":  68.73,
                                         "officialHospitals":  336,
                                         "officialDoctors":  5.09,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  33.3,
                                         "opportunityScore":  31.7,
                                         "pressureScore":  50,
                                         "coverageScore":  0.71,
                                         "coverageCode":  "limited",
                                         "coverageLabel":  "仅展示",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  13527.55,
                                                                             "wageReferenceAnnual":  null,
                                                                             "officialRetailSales":  5316.1,
                                                                             "officialStudents":  68.73,
                                                                             "officialHospitals":  336,
                                                                             "officialDoctors":  5.09
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "370200000000",
                                         "officialCode":  "370200000000",
                                         "name":  "青岛",
                                         "pinyin":  "",
                                         "province":  "山东省",
                                         "provinceId":  "370000000000",
                                         "region":  "eastChina",
                                         "tier":  "newTier1",
                                         "coordinates":  [
                                                             120.3826,
                                                             36.0671
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "青岛 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "青岛 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  16719.46,
                                         "officialRetailSales":  6746.8,
                                         "officialStudents":  51.628,
                                         "officialHospitals":  369,
                                         "officialDoctors":  4.49,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  33.6,
                                         "opportunityScore":  31,
                                         "pressureScore":  50,
                                         "coverageScore":  0.71,
                                         "coverageCode":  "limited",
                                         "coverageLabel":  "仅展示",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  16719.46,
                                                                             "wageReferenceAnnual":  null,
                                                                             "officialRetailSales":  6746.8,
                                                                             "officialStudents":  51.628,
                                                                             "officialHospitals":  369,
                                                                             "officialDoctors":  4.49
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "410100000000",
                                         "officialCode":  "410100000000",
                                         "name":  "郑州",
                                         "pinyin":  "",
                                         "province":  "河南省",
                                         "provinceId":  "410000000000",
                                         "region":  "centralChina",
                                         "tier":  "newTier1",
                                         "coordinates":  [
                                                             113.6254,
                                                             34.7466
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "郑州 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "郑州 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  14532.07,
                                         "officialRetailSales":  6310.7,
                                         "officialStudents":  143.2172,
                                         "officialHospitals":  292,
                                         "officialDoctors":  6,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  42.2,
                                         "opportunityScore":  52.1,
                                         "pressureScore":  50,
                                         "coverageScore":  0.71,
                                         "coverageCode":  "limited",
                                         "coverageLabel":  "仅展示",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  14532.07,
                                                                             "wageReferenceAnnual":  null,
                                                                             "officialRetailSales":  6310.7,
                                                                             "officialStudents":  143.2172,
                                                                             "officialHospitals":  292,
                                                                             "officialDoctors":  6
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "430100000000",
                                         "officialCode":  "430100000000",
                                         "name":  "长沙",
                                         "pinyin":  "",
                                         "province":  "湖南省",
                                         "provinceId":  "430000000000",
                                         "region":  "centralChina",
                                         "tier":  "newTier1",
                                         "coordinates":  [
                                                             112.9389,
                                                             28.2282
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "长沙 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "长沙 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  15268.78,
                                         "officialRetailSales":  5797.7,
                                         "officialStudents":  83.1578,
                                         "officialHospitals":  245,
                                         "officialDoctors":  4.51,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  32.3,
                                         "opportunityScore":  37.4,
                                         "pressureScore":  50,
                                         "coverageScore":  0.71,
                                         "coverageCode":  "limited",
                                         "coverageLabel":  "仅展示",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  15268.78,
                                                                             "wageReferenceAnnual":  null,
                                                                             "officialRetailSales":  5797.7,
                                                                             "officialStudents":  83.1578,
                                                                             "officialHospitals":  245,
                                                                             "officialDoctors":  4.51
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "450100000000",
                                         "officialCode":  "450100000000",
                                         "name":  "南宁",
                                         "pinyin":  "",
                                         "province":  "广西壮族自治区",
                                         "provinceId":  "450000000000",
                                         "region":  "southChina",
                                         "tier":  "strongTier2",
                                         "coordinates":  [
                                                             108.3669,
                                                             22.817
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "南宁 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "南宁 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  5995.36,
                                         "officialRetailSales":  2100.4,
                                         "officialStudents":  72.0832,
                                         "officialHospitals":  179,
                                         "officialDoctors":  3.59,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  20.9,
                                         "opportunityScore":  23.8,
                                         "pressureScore":  50,
                                         "coverageScore":  0.71,
                                         "coverageCode":  "limited",
                                         "coverageLabel":  "仅展示",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  5995.36,
                                                                             "wageReferenceAnnual":  null,
                                                                             "officialRetailSales":  2100.4,
                                                                             "officialStudents":  72.0832,
                                                                             "officialHospitals":  179,
                                                                             "officialDoctors":  3.59
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "460100000000",
                                         "officialCode":  "460100000000",
                                         "name":  "海口",
                                         "pinyin":  "",
                                         "province":  "海南省",
                                         "provinceId":  "460000000000",
                                         "region":  "southChina",
                                         "tier":  "strongTier2",
                                         "coordinates":  [
                                                             110.1983,
                                                             20.044
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "海口 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "海口 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  2470.63,
                                         "officialRetailSales":  1046.3,
                                         "officialStudents":  19.357,
                                         "officialHospitals":  78,
                                         "officialDoctors":  1.27,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  5.6,
                                         "opportunityScore":  6.1,
                                         "pressureScore":  50,
                                         "coverageScore":  0.71,
                                         "coverageCode":  "limited",
                                         "coverageLabel":  "仅展示",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  2470.63,
                                                                             "wageReferenceAnnual":  null,
                                                                             "officialRetailSales":  1046.3,
                                                                             "officialStudents":  19.357,
                                                                             "officialHospitals":  78,
                                                                             "officialDoctors":  1.27
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "500000000000",
                                         "officialCode":  "500000000000",
                                         "name":  "重庆",
                                         "pinyin":  "",
                                         "province":  "重庆市",
                                         "provinceId":  "500000000000",
                                         "region":  "southWest",
                                         "tier":  "newTier1",
                                         "coordinates":  [
                                                             106.5516,
                                                             29.563
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "重庆 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "重庆 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  10105.9,
                                         "wageReferenceAnnual":  121271,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  32193.2,
                                         "officialRetailSales":  16190.4,
                                         "officialStudents":  112.786,
                                         "officialHospitals":  851,
                                         "officialDoctors":  10.87,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  58.7,
                                         "opportunityScore":  50.8,
                                         "pressureScore":  50,
                                         "coverageScore":  0.86,
                                         "coverageCode":  "degraded",
                                         "coverageLabel":  "基础官方分析",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  32193.2,
                                                                             "wageReferenceAnnual":  121271,
                                                                             "officialRetailSales":  16190.4,
                                                                             "officialStudents":  112.786,
                                                                             "officialHospitals":  851,
                                                                             "officialDoctors":  10.87
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "510100000000",
                                         "officialCode":  "510100000000",
                                         "name":  "成都",
                                         "pinyin":  "",
                                         "province":  "四川省",
                                         "provinceId":  "510000000000",
                                         "region":  "southWest",
                                         "tier":  "newTier1",
                                         "coordinates":  [
                                                             104.0665,
                                                             30.5728
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "成都 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "成都 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  23511.34,
                                         "officialRetailSales":  10835.3,
                                         "officialStudents":  116.8489,
                                         "officialHospitals":  807,
                                         "officialDoctors":  9.12,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  66.4,
                                         "opportunityScore":  55.7,
                                         "pressureScore":  50,
                                         "coverageScore":  0.71,
                                         "coverageCode":  "limited",
                                         "coverageLabel":  "仅展示",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  23511.34,
                                                                             "wageReferenceAnnual":  null,
                                                                             "officialRetailSales":  10835.3,
                                                                             "officialStudents":  116.8489,
                                                                             "officialHospitals":  807,
                                                                             "officialDoctors":  9.12
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "520100000000",
                                         "officialCode":  "520100000000",
                                         "name":  "贵阳",
                                         "pinyin":  "",
                                         "province":  "贵州省",
                                         "provinceId":  "520000000000",
                                         "region":  "southWest",
                                         "tier":  "strongTier2",
                                         "coordinates":  [
                                                             106.6302,
                                                             26.647
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "贵阳 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "贵阳 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  5777.41,
                                         "officialRetailSales":  2491.3,
                                         "officialStudents":  47.8012,
                                         "officialHospitals":  225,
                                         "officialDoctors":  2.81,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  18,
                                         "opportunityScore":  17.2,
                                         "pressureScore":  50,
                                         "coverageScore":  0.71,
                                         "coverageCode":  "limited",
                                         "coverageLabel":  "仅展示",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  5777.41,
                                                                             "wageReferenceAnnual":  null,
                                                                             "officialRetailSales":  2491.3,
                                                                             "officialStudents":  47.8012,
                                                                             "officialHospitals":  225,
                                                                             "officialDoctors":  2.81
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "530100000000",
                                         "officialCode":  "530100000000",
                                         "name":  "昆明",
                                         "pinyin":  "",
                                         "province":  "云南省",
                                         "provinceId":  "530000000000",
                                         "region":  "southWest",
                                         "tier":  "strongTier2",
                                         "coordinates":  [
                                                             102.8332,
                                                             24.8797
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "昆明 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "昆明 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  8275.22,
                                         "officialRetailSales":  3769.4,
                                         "officialStudents":  78.4871,
                                         "officialHospitals":  314,
                                         "officialDoctors":  4.09,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  28,
                                         "opportunityScore":  28.1,
                                         "pressureScore":  50,
                                         "coverageScore":  0.71,
                                         "coverageCode":  "limited",
                                         "coverageLabel":  "仅展示",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  8275.22,
                                                                             "wageReferenceAnnual":  null,
                                                                             "officialRetailSales":  3769.4,
                                                                             "officialStudents":  78.4871,
                                                                             "officialHospitals":  314,
                                                                             "officialDoctors":  4.09
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "540100000000",
                                         "officialCode":  "540100000000",
                                         "name":  "拉萨",
                                         "pinyin":  "",
                                         "province":  "西藏自治区",
                                         "provinceId":  "540000000000",
                                         "region":  "southWest",
                                         "tier":  "strongTier2",
                                         "coordinates":  [
                                                             91.1322,
                                                             29.6604
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "拉萨 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "拉萨 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  990.04,
                                         "officialRetailSales":  526.8,
                                         "officialStudents":  2.515,
                                         "officialHospitals":  35,
                                         "officialDoctors":  0.43,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  0,
                                         "opportunityScore":  0,
                                         "pressureScore":  50,
                                         "coverageScore":  0.71,
                                         "coverageCode":  "limited",
                                         "coverageLabel":  "仅展示",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  990.04,
                                                                             "wageReferenceAnnual":  null,
                                                                             "officialRetailSales":  526.8,
                                                                             "officialStudents":  2.515,
                                                                             "officialHospitals":  35,
                                                                             "officialDoctors":  0.43
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "610100000000",
                                         "officialCode":  "610100000000",
                                         "name":  "西安",
                                         "pinyin":  "",
                                         "province":  "陕西省",
                                         "provinceId":  "610000000000",
                                         "region":  "northWest",
                                         "tier":  "newTier1",
                                         "coordinates":  [
                                                             108.9398,
                                                             34.3416
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "西安 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "西安 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  13317.78,
                                         "officialRetailSales":  4915.1,
                                         "officialStudents":  86.0359,
                                         "officialHospitals":  390,
                                         "officialDoctors":  5.57,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  37.3,
                                         "opportunityScore":  35.9,
                                         "pressureScore":  50,
                                         "coverageScore":  0.71,
                                         "coverageCode":  "limited",
                                         "coverageLabel":  "仅展示",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  13317.78,
                                                                             "wageReferenceAnnual":  null,
                                                                             "officialRetailSales":  4915.1,
                                                                             "officialStudents":  86.0359,
                                                                             "officialHospitals":  390,
                                                                             "officialDoctors":  5.57
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "620100000000",
                                         "officialCode":  "620100000000",
                                         "name":  "兰州",
                                         "pinyin":  "",
                                         "province":  "甘肃省",
                                         "provinceId":  "620000000000",
                                         "region":  "northWest",
                                         "tier":  "strongTier2",
                                         "coordinates":  [
                                                             103.8343,
                                                             36.0611
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "兰州 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "兰州 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  3742.25,
                                         "officialRetailSales":  1463.6,
                                         "officialStudents":  45.2283,
                                         "officialHospitals":  120,
                                         "officialDoctors":  1.94,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  11.7,
                                         "opportunityScore":  14.2,
                                         "pressureScore":  50,
                                         "coverageScore":  0.71,
                                         "coverageCode":  "limited",
                                         "coverageLabel":  "仅展示",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  3742.25,
                                                                             "wageReferenceAnnual":  null,
                                                                             "officialRetailSales":  1463.6,
                                                                             "officialStudents":  45.2283,
                                                                             "officialHospitals":  120,
                                                                             "officialDoctors":  1.94
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "630100000000",
                                         "officialCode":  "630100000000",
                                         "name":  "西宁",
                                         "pinyin":  "",
                                         "province":  "青海省",
                                         "provinceId":  "630000000000",
                                         "region":  "northWest",
                                         "tier":  "strongTier2",
                                         "coordinates":  [
                                                             101.7782,
                                                             36.6171
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "西宁 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "西宁 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  1862.09,
                                         "officialRetailSales":  618.7,
                                         "officialStudents":  7.8619,
                                         "officialHospitals":  81,
                                         "officialDoctors":  1.23,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  4,
                                         "opportunityScore":  2.4,
                                         "pressureScore":  50,
                                         "coverageScore":  0.71,
                                         "coverageCode":  "limited",
                                         "coverageLabel":  "仅展示",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  1862.09,
                                                                             "wageReferenceAnnual":  null,
                                                                             "officialRetailSales":  618.7,
                                                                             "officialStudents":  7.8619,
                                                                             "officialHospitals":  81,
                                                                             "officialDoctors":  1.23
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "640100000000",
                                         "officialCode":  "640100000000",
                                         "name":  "银川",
                                         "pinyin":  "",
                                         "province":  "宁夏回族自治区",
                                         "provinceId":  "640000000000",
                                         "region":  "northWest",
                                         "tier":  "strongTier2",
                                         "coordinates":  [
                                                             106.2309,
                                                             38.4872
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "银川 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "银川 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  2939.53,
                                         "officialRetailSales":  839.8,
                                         "officialStudents":  14.0729,
                                         "officialHospitals":  86,
                                         "officialDoctors":  1.3,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  5.7,
                                         "opportunityScore":  5.3,
                                         "pressureScore":  50,
                                         "coverageScore":  0.71,
                                         "coverageCode":  "limited",
                                         "coverageLabel":  "仅展示",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  2939.53,
                                                                             "wageReferenceAnnual":  null,
                                                                             "officialRetailSales":  839.8,
                                                                             "officialStudents":  14.0729,
                                                                             "officialHospitals":  86,
                                                                             "officialDoctors":  1.3
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "650100000000",
                                         "officialCode":  "650100000000",
                                         "name":  "乌鲁木齐",
                                         "pinyin":  "",
                                         "province":  "新疆维吾尔自治区",
                                         "provinceId":  "650000000000",
                                         "region":  "northWest",
                                         "tier":  "strongTier2",
                                         "coordinates":  [
                                                             87.6168,
                                                             43.8256
                                                         ],
                                         "layerType":  "major-city-official",
                                         "shortDescription":  "乌鲁木齐 当前仅覆盖 2024 官方基础面，租金与通勤仍待补全。",
                                         "longDescription":  "乌鲁木齐 已纳入主要城市年度官方层，可比较工资、GDP、医院、医生和高校在校生；租金、通勤、空气与生活成本快照尚不足以进入完整城市推荐。",
                                         "tags":  [
                                                      "主要城市",
                                                      "官方年度层",
                                                      "基础官方层"
                                                  ],
                                         "suitableFor":  [
                                                             "先看省会/主要城市基本面"
                                                         ],
                                         "notIdealFor":  [
                                                             "需要租金与通勤完整快照"
                                                         ],
                                         "population":  null,
                                         "populationUnit":  null,
                                         "populationScope":  null,
                                         "disposableIncome":  null,
                                         "wageReferenceMonthly":  null,
                                         "wageReferenceAnnual":  null,
                                         "annualConsumptionPerCapita":  null,
                                         "rentMedian":  null,
                                         "rentMedianPerSqm":  null,
                                         "assumedDwellingSizeSqm":  null,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railCoverageCommute":  null,
                                         "bus45Service":  null,
                                         "extremeCommute60":  null,
                                         "avgCommuteDistance":  null,
                                         "railTransitLength":  null,
                                         "reportRailTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  null,
                                         "latestGoodAirDaysRatio":  null,
                                         "latestSignalPeriod":  null,
                                         "rentBurdenProxy":  null,
                                         "rentIndex":  null,
                                         "rentBurdenIndex":  null,
                                         "consumptionIndex":  null,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  null,
                                         "costFriendliness":  null,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  null,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  null,
                                         "officialGdp":  4502.16,
                                         "officialRetailSales":  1232.3,
                                         "officialStudents":  24.2994,
                                         "officialHospitals":  130,
                                         "officialDoctors":  1.92,
                                         "officialRegisteredPopulation":  null,
                                         "baseOfficialScore":  10.3,
                                         "opportunityScore":  9.7,
                                         "pressureScore":  50,
                                         "coverageScore":  0.71,
                                         "coverageCode":  "limited",
                                         "coverageLabel":  "仅展示",
                                         "aiEligible":  false,
                                         "cityMapEligibility":  true,
                                         "cityRecommendationEligibility":  false,
                                         "sourceRefs":  "nbs-api-major-city-annual-2024",
                                         "qualityFlags":  [
                                                              "major_city_official_layer",
                                                              "base_official_only"
                                                          ],
                                         "periods":  {
                                                         "latest":  {
                                                                        "label":  "2024 official major-city annual data",
                                                                        "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                        "aligned":  true
                                                                    },
                                                         "alignedAnnual":  {
                                                                               "label":  "2024 official major-city annual data",
                                                                               "note":  "This city currently provides official annual fundamentals only. Rent, commute, air and cost snapshots are not complete.",
                                                                               "aligned":  true
                                                                           }
                                                     },
                                         "periodValues":  {
                                                              "latest":  {
                                                                             "officialGdp":  4502.16,
                                                                             "wageReferenceAnnual":  null,
                                                                             "officialRetailSales":  1232.3,
                                                                             "officialStudents":  24.2994,
                                                                             "officialHospitals":  130,
                                                                             "officialDoctors":  1.92
                                                                         }
                                                          },
                                         "displayPeriodLabel":  "2024 official major-city annual data",
                                         "lastUpdated":  "2026-03-27"
                                     }
                                 ]
                  },
    "recommendationConfig":  {
                                 "factorWeights":  {
                                                       "budget":  0.18,
                                                       "lifeStage":  0.12,
                                                       "household":  0.08,
                                                       "saving":  0.16,
                                                       "comfort":  0.08,
                                                       "commute":  0.12,
                                                       "air":  0.08,
                                                       "tier":  0.08,
                                                       "rentTolerance":  0.08,
                                                       "opportunity":  0.1
                                                   },
                                 "personaProfiles":  {
                                                         "graduates":  {
                                                                           "description":  "优先考虑房租压力、刚毕业友好度与通勤便利。",
                                                                           "defaults":  {
                                                                                            "budgetBand":  "moderate",
                                                                                            "lifeStage":  "graduate",
                                                                                            "savingPriority":  55,
                                                                                            "commutePriority":  70,
                                                                                            "airPriority":  45,
                                                                                            "tierPreference":  "balanced",
                                                                                            "rentTolerance":  "medium",
                                                                                            "opportunityPriority":  55
                                                                                        }
                                                                       },
                                                         "couples":  {
                                                                         "description":  "兼顾空气质量、综合平衡和双人稳定生活。",
                                                                         "defaults":  {
                                                                                          "budgetBand":  "moderate",
                                                                                          "lifeStage":  "stable",
                                                                                          "household":  "couple",
                                                                                          "savingPriority":  45,
                                                                                          "commutePriority":  55,
                                                                                          "airPriority":  70,
                                                                                          "tierPreference":  "balanced",
                                                                                          "rentTolerance":  "medium",
                                                                                          "opportunityPriority":  45
                                                                                      }
                                                                     },
                                                         "budget":  {
                                                                        "description":  "偏重低成本与存钱，不把大城市机会放在首位。",
                                                                        "defaults":  {
                                                                                         "budgetBand":  "tight",
                                                                                         "savingPriority":  85,
                                                                                         "commutePriority":  50,
                                                                                         "airPriority":  35,
                                                                                         "tierPreference":  "calm",
                                                                                         "rentTolerance":  "low",
                                                                                         "opportunityPriority":  25
                                                                                     }
                                                                    }
                                                     },
                                 "templateBlocks":  {
                                                        "positiveIntro":  [
                                                                              "这次排位靠前，主要因为",
                                                                              "从当前偏好看，最加分的是",
                                                                              "系统把它放进候选前列，关键原因在于"
                                                                          ],
                                                        "tradeoffIntro":  [
                                                                              "需要接受的现实代价是",
                                                                              "如果你选它，最常见的代价在于",
                                                                              "但它并不是没有代价，主要要注意"
                                                                          ],
                                                        "nextStep":  [
                                                                         "下一步建议重点核对岗位分布与租住片区。",
                                                                         "下一步建议继续看真实到手薪资和地铁沿线房源。",
                                                                         "下一步建议把工作地、房租、通勤线路放到同一张表里复核。"
                                                                     ]
                                                    },
                                 "explanationRules":  {
                                                          "positiveFactors":  3,
                                                          "tradeoffFactors":  2,
                                                          "requireCoverageMultiplier":  true,
                                                          "coverageThresholds":  {
                                                                                     "full":  0.8,
                                                                                     "degraded":  0.6
                                                                                 }
                                                      },
                                 "recommendationThresholds":  {
                                                                  "showInAiTop":  0.6,
                                                                  "showAsFull":  0.8,
                                                                  "highlightScore":  70
                                                              },
                                 "tradeoffRules":  [
                                                       {
                                                           "if":  "opportunityScore high \u0026\u0026 totalCostIndex high",
                                                           "message":  "机会更多，但房租与生活成本压力也明显更高。"
                                                       },
                                                       {
                                                           "if":  "savingScore high \u0026\u0026 opportunityScore mid",
                                                           "message":  "更适合攒钱和稳健生活，但岗位密度未必是一线级别。"
                                                       },
                                                       {
                                                           "if":  "airQualityScore high \u0026\u0026 mobility coverage partial",
                                                           "message":  "生活舒适度更突出，但通勤结论需要结合片区进一步核实。"
                                                       }
                                                   ]
                             }
};
