window.CITY_SITE_DATA = {
    "generatedAt":  "2026-03-27",
    "meta":  {
                 "siteGeneratedAt":  "2026-03-27",
                 "majorDataPeriods":  [
                                          "人口、收入、消费、轨道、绿地等基础字段优先来自 2024 年城市统计公报。",
                                          "空气质量优先使用 2024 年年度公报口径；个别城市缺项时不强行生成综合环境分。",
                                          "租金快照优先使用 2026 年 1-2 月公开城市月报/站内摘要，属于商业平台快照。",
                                          "通勤字段优先引用 2024 年度中国主要城市通勤监测报告及 2025 年公开报道摘要。"
                                      ],
                 "updateStrategy":  [
                                        "先更新官方年度公报，再更新空气质量与租金快照，最后补通勤报告。",
                                        "每次更新后运行 scripts/build-derived.ps1 与 scripts/validate-data.ps1。",
                                        "核对来源、周期和缺失标签后再发布到 GitHub Pages。"
                                    ],
                 "aiMode":  "rule-engine-local",
                 "coverageSummary":  {
                                         "includedCities":  9,
                                         "deepCoverageCities":  7,
                                         "degradedCoverageCities":  2,
                                         "nationalMapMode":  "china-basemap-with-city-points"
                                     },
                 "disclaimer":  [
                                    "本站是静态快照站点，不是实时数据库。",
                                    "商业平台租金数据不等于官方统计口径。",
                                    "AI 推荐只做解释层和决策辅助，不替代真实迁移、租房或求职决策。"
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
                                        "name":  "中指云 · 武汉住房租赁月报站内摘要（2026-02）",
                                        "type":  "commercial",
                                        "url":  "https://www.cih-index.com/",
                                        "coverage":  "武汉",
                                        "updateFrequency":  "月度",
                                        "reliabilityLevel":  "B",
                                        "notes":  "站内公开摘要显示全市平米租金约 25.71 元/㎡/月。"
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
                                    }
                                ]
                },
    "aiConfig":  {
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
                 },
    "viewModel":  {
                      "generatedAt":  "2026-03-27",
                      "summary":  {
                                      "totalCities":  9,
                                      "aiEligibleCities":  9,
                                      "fullCoverageCities":  5,
                                      "degradedCoverageCities":  4,
                                      "limitedCoverageCities":  0,
                                      "coreMetricCount":  6
                                  },
                      "enums":  {
                                    "tiers":  [
                                                  "一线",
                                                  "新一线",
                                                  "强二线"
                                              ],
                                    "regions":  [
                                                    "华北",
                                                    "华东",
                                                    "华南",
                                                    "华中"
                                                ],
                                    "mapMetrics":  [
                                                       {
                                                           "key":  "totalCostIndex",
                                                           "label":  "totalCostIndex",
                                                           "suffix":  "",
                                                           "direction":  "lowerBetter"
                                                       },
                                                       {
                                                           "key":  "rentBurdenProxy",
                                                           "label":  "rentBurdenProxy",
                                                           "suffix":  "",
                                                           "direction":  "lowerBetter"
                                                       },
                                                       {
                                                           "key":  "commuteIndex",
                                                           "label":  "commuteIndex",
                                                           "suffix":  "",
                                                           "direction":  "higherBetter"
                                                       },
                                                       {
                                                           "key":  "airQualityScore",
                                                           "label":  "airQualityScore",
                                                           "suffix":  "",
                                                           "direction":  "higherBetter"
                                                       },
                                                       {
                                                           "key":  "balancedScore",
                                                           "label":  "balancedScore",
                                                           "suffix":  "",
                                                           "direction":  "higherBetter"
                                                       },
                                                       {
                                                           "key":  "savingScore",
                                                           "label":  "savingScore",
                                                           "suffix":  "",
                                                           "direction":  "higherBetter"
                                                       }
                                                   ]
                                },
                      "cities":  [
                                     {
                                         "id":  "beijing",
                                         "name":  "北京",
                                         "pinyin":  "beijing",
                                         "province":  "北京市",
                                         "region":  "华北",
                                         "tier":  "一线",
                                         "coordinates":  [
                                                             116.4074,
                                                             39.9042
                                                         ],
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
                                         "disposableIncome":  85415,
                                         "wageReferenceMonthly":  null,
                                         "annualConsumptionPerCapita":  49748,
                                         "rentMedian":  2428.5,
                                         "rentMedianPerSqm":  80.95,
                                         "assumedDwellingSizeSqm":  30,
                                         "avgCommuteTime":  47,
                                         "commuteWithin45":  58,
                                         "publicTransportScore":  null,
                                         "railTransitLength":  879,
                                         "utilityCoverage":  97.5,
                                         "greenPublicSpaceProxy":  16.96,
                                         "pm25Reference":  30.5,
                                         "goodAirDaysRatio":  null,
                                         "rentBurdenProxy":  0.341,
                                         "rentIndex":  98.4,
                                         "rentBurdenIndex":  89.3,
                                         "consumptionIndex":  75.7,
                                         "transportCostIndex":  44.2,
                                         "totalCostIndex":  81.4,
                                         "costFriendliness":  18.6,
                                         "commuteIndex":  55.8,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  44.4,
                                         "graduateScore":  24.1,
                                         "balancedScore":  null,
                                         "coupleScore":  44.4,
                                         "opportunityScore":  87.5,
                                         "pressureScore":  81.4,
                                         "coverageScore":  0.8,
                                         "coverageCode":  "full",
                                         "coverageLabel":  "full",
                                         "aiEligible":  true,
                                         "sourceRefs":  [
                                                            "beijing-bulletin-2024",
                                                            "rent-beijing-2026-01",
                                                            "commute-report-2024"
                                                        ],
                                         "qualityFlags":  [
                                                              "rent_estimate_30sqm",
                                                              "income_proxy",
                                                              "mixed_periods",
                                                              "mobility_proxy_subset",
                                                              "missing_good_air_days_ratio"
                                                          ],
                                         "confidence":  0.8,
                                         "isEstimated":  true,
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
                                         "displayPeriodLabel":  "收入与消费为 2024，租金为 2026-01 快照",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "shanghai",
                                         "name":  "上海",
                                         "pinyin":  "shanghai",
                                         "province":  "上海市",
                                         "region":  "华东",
                                         "tier":  "一线",
                                         "coordinates":  [
                                                             121.4737,
                                                             31.2304
                                                         ],
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
                                         "disposableIncome":  88366,
                                         "wageReferenceMonthly":  null,
                                         "annualConsumptionPerCapita":  52722,
                                         "rentMedian":  2445,
                                         "rentMedianPerSqm":  81.5,
                                         "assumedDwellingSizeSqm":  30,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railTransitLength":  896,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  28,
                                         "goodAirDaysRatio":  88.5,
                                         "rentBurdenProxy":  0.332,
                                         "rentIndex":  99.4,
                                         "rentBurdenIndex":  85,
                                         "consumptionIndex":  98,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  92.5,
                                         "costFriendliness":  7.5,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  62.0,
                                         "savingScore":  46.4,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  54.2,
                                         "opportunityScore":  100,
                                         "pressureScore":  92.5,
                                         "coverageScore":  0.7,
                                         "coverageCode":  "degraded",
                                         "coverageLabel":  "degraded",
                                         "aiEligible":  true,
                                         "sourceRefs":  [
                                                            "shanghai-bulletin-2024",
                                                            "rent-shanghai-2026-01"
                                                        ],
                                         "qualityFlags":  [
                                                              "rent_estimate_30sqm",
                                                              "income_proxy",
                                                              "missing_commute_detail"
                                                          ],
                                         "confidence":  0.82,
                                         "isEstimated":  true,
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
                                         "displayPeriodLabel":  "收入与消费为 2024，租金为 2026-01 快照",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "shenzhen",
                                         "name":  "深圳",
                                         "pinyin":  "shenzhen",
                                         "province":  "广东省",
                                         "region":  "华南",
                                         "tier":  "一线",
                                         "coordinates":  [
                                                             114.0579,
                                                             22.5431
                                                         ],
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
                                         "disposableIncome":  81123,
                                         "wageReferenceMonthly":  null,
                                         "annualConsumptionPerCapita":  51415,
                                         "rentMedian":  2455.8,
                                         "rentMedianPerSqm":  81.86,
                                         "assumedDwellingSizeSqm":  30,
                                         "avgCommuteTime":  33,
                                         "commuteWithin45":  81,
                                         "publicTransportScore":  58,
                                         "railTransitLength":  595,
                                         "utilityCoverage":  100,
                                         "greenPublicSpaceProxy":  21.3,
                                         "pm25Reference":  17.3,
                                         "goodAirDaysRatio":  97,
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
                                         "opportunityScore":  70.3,
                                         "pressureScore":  88.3,
                                         "coverageScore":  1,
                                         "coverageCode":  "full",
                                         "coverageLabel":  "full",
                                         "aiEligible":  true,
                                         "sourceRefs":  [
                                                            "shenzhen-bulletin-2024",
                                                            "rent-shenzhen-2026-02",
                                                            "commute-report-2025-news"
                                                        ],
                                         "qualityFlags":  [
                                                              "rent_estimate_30sqm",
                                                              "income_proxy",
                                                              "mixed_periods"
                                                          ],
                                         "confidence":  0.87,
                                         "isEstimated":  true,
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
                                         "displayPeriodLabel":  "收入与消费为 2024，租金为 2026-02 快照",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "guangzhou",
                                         "name":  "广州",
                                         "pinyin":  "guangzhou",
                                         "province":  "广东省",
                                         "region":  "华南",
                                         "tier":  "一线",
                                         "coordinates":  [
                                                             113.2644,
                                                             23.1291
                                                         ],
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
                                         "disposableIncome":  83436,
                                         "wageReferenceMonthly":  null,
                                         "annualConsumptionPerCapita":  50496,
                                         "rentMedian":  1433.4,
                                         "rentMedianPerSqm":  47.78,
                                         "assumedDwellingSizeSqm":  30,
                                         "avgCommuteTime":  38.6,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  21,
                                         "goodAirDaysRatio":  null,
                                         "rentBurdenProxy":  0.206,
                                         "rentIndex":  39.3,
                                         "rentBurdenIndex":  24.5,
                                         "consumptionIndex":  81.3,
                                         "transportCostIndex":  82.1,
                                         "totalCostIndex":  52.4,
                                         "costFriendliness":  47.6,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  72.1,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  72.1,
                                         "opportunityScore":  77.1,
                                         "pressureScore":  52.4,
                                         "coverageScore":  0.6,
                                         "coverageCode":  "degraded",
                                         "coverageLabel":  "degraded",
                                         "aiEligible":  true,
                                         "sourceRefs":  [
                                                            "guangzhou-bulletin-2024",
                                                            "rent-guangzhou-2026-01",
                                                            "guangzhou-transport-summary"
                                                        ],
                                         "qualityFlags":  [
                                                              "income_scope_mismatch",
                                                              "rent_estimate_30sqm",
                                                              "scope_mismatch",
                                                              "income_proxy",
                                                              "missing_rail_detail",
                                                              "missing_45min_share",
                                                              "missing_good_air_days_ratio"
                                                          ],
                                         "confidence":  0.68,
                                         "isEstimated":  true,
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
                                         "displayPeriodLabel":  "消费为 2024 城镇居民口径，租金为 2026-01 快照",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "hangzhou",
                                         "name":  "杭州",
                                         "pinyin":  "hangzhou",
                                         "province":  "浙江省",
                                         "region":  "华东",
                                         "tier":  "新一线",
                                         "coordinates":  [
                                                             120.1551,
                                                             30.2741
                                                         ],
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
                                         "disposableIncome":  76777,
                                         "wageReferenceMonthly":  null,
                                         "annualConsumptionPerCapita":  52996,
                                         "rentMedian":  1456.2,
                                         "rentMedianPerSqm":  48.54,
                                         "assumedDwellingSizeSqm":  30,
                                         "avgCommuteTime":  35,
                                         "commuteWithin45":  79,
                                         "publicTransportScore":  null,
                                         "railTransitLength":  516,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  30,
                                         "goodAirDaysRatio":  81.7,
                                         "rentBurdenProxy":  0.228,
                                         "rentIndex":  40.7,
                                         "rentBurdenIndex":  35.1,
                                         "consumptionIndex":  100,
                                         "transportCostIndex":  35,
                                         "totalCostIndex":  58.6,
                                         "costFriendliness":  41.4,
                                         "commuteIndex":  65,
                                         "basicServices":  null,
                                         "airQualityScore":  55.7,
                                         "savingScore":  58.3,
                                         "graduateScore":  56.6,
                                         "balancedScore":  54.0,
                                         "coupleScore":  56,
                                         "opportunityScore":  49.6,
                                         "pressureScore":  58.6,
                                         "coverageScore":  0.8,
                                         "coverageCode":  "full",
                                         "coverageLabel":  "full",
                                         "aiEligible":  true,
                                         "sourceRefs":  [
                                                            "hangzhou-bulletin-2024",
                                                            "rent-hangzhou-2026-02",
                                                            "commute-report-2024"
                                                        ],
                                         "qualityFlags":  [
                                                              "rent_estimate_30sqm",
                                                              "income_proxy",
                                                              "mixed_periods",
                                                              "missing_public_transport_score"
                                                          ],
                                         "confidence":  0.84,
                                         "isEstimated":  true,
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
                                         "displayPeriodLabel":  "收入与消费为 2024，租金为 2026-02 快照",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "nanjing",
                                         "name":  "南京",
                                         "pinyin":  "nanjing",
                                         "province":  "江苏省",
                                         "region":  "华东",
                                         "tier":  "新一线",
                                         "coordinates":  [
                                                             118.7969,
                                                             32.0603
                                                         ],
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
                                         "disposableIncome":  75180,
                                         "wageReferenceMonthly":  null,
                                         "annualConsumptionPerCapita":  44578,
                                         "rentMedian":  1105.5,
                                         "rentMedianPerSqm":  36.85,
                                         "assumedDwellingSizeSqm":  30,
                                         "avgCommuteTime":  37,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railTransitLength":  483.3,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  28,
                                         "goodAirDaysRatio":  85.8,
                                         "rentBurdenProxy":  0.176,
                                         "rentIndex":  19.8,
                                         "rentBurdenIndex":  10.1,
                                         "consumptionIndex":  37,
                                         "transportCostIndex":  78.7,
                                         "totalCostIndex":  27.8,
                                         "costFriendliness":  72.2,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  60.4,
                                         "savingScore":  72,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  66.2,
                                         "opportunityScore":  39.4,
                                         "pressureScore":  27.8,
                                         "coverageScore":  0.75,
                                         "coverageCode":  "degraded",
                                         "coverageLabel":  "degraded",
                                         "aiEligible":  true,
                                         "sourceRefs":  [
                                                            "nanjing-bulletin-2024",
                                                            "rent-nanjing-2026-01",
                                                            "commute-report-2024"
                                                        ],
                                         "qualityFlags":  [
                                                              "rent_estimate_30sqm",
                                                              "income_proxy",
                                                              "missing_45min_share",
                                                              "missing_public_transport_score"
                                                          ],
                                         "confidence":  0.81,
                                         "isEstimated":  true,
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
                                         "displayPeriodLabel":  "收入与消费为 2024，租金为 2026-01 快照",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "wuhan",
                                         "name":  "武汉",
                                         "pinyin":  "wuhan",
                                         "province":  "湖北省",
                                         "region":  "华中",
                                         "tier":  "新一线",
                                         "coordinates":  [
                                                             114.3054,
                                                             30.5931
                                                         ],
                                         "shortDescription":  "租金压力代理友好、收入支撑尚可，是首版样本里更适合低预算起步的城市之一。",
                                         "longDescription":  "武汉的租金快照、收入和轨道交通都对起步阶段更友好，适合低预算和想攒钱的人，但环境质量上仍需要进一步对比具体片区。",
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
                                         "disposableIncome":  59732,
                                         "wageReferenceMonthly":  null,
                                         "annualConsumptionPerCapita":  39625,
                                         "rentMedian":  771.3,
                                         "rentMedianPerSqm":  25.71,
                                         "assumedDwellingSizeSqm":  30,
                                         "avgCommuteTime":  37,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  33,
                                         "railTransitLength":  577.52,
                                         "utilityCoverage":  100,
                                         "greenPublicSpaceProxy":  15.03,
                                         "pm25Reference":  36,
                                         "goodAirDaysRatio":  null,
                                         "rentBurdenProxy":  0.155,
                                         "rentIndex":  0,
                                         "rentBurdenIndex":  0,
                                         "consumptionIndex":  0,
                                         "transportCostIndex":  78.7,
                                         "totalCostIndex":  7.9,
                                         "costFriendliness":  92.1,
                                         "commuteIndex":  null,
                                         "basicServices":  73.9,
                                         "airQualityScore":  null,
                                         "savingScore":  59.4,
                                         "graduateScore":  92.1,
                                         "balancedScore":  null,
                                         "coupleScore":  59.4,
                                         "opportunityScore":  19.6,
                                         "pressureScore":  7.9,
                                         "coverageScore":  0.85,
                                         "coverageCode":  "full",
                                         "coverageLabel":  "full",
                                         "aiEligible":  true,
                                         "sourceRefs":  [
                                                            "wuhan-bulletin-2024",
                                                            "rent-wuhan-2026-02",
                                                            "commute-report-2024"
                                                        ],
                                         "qualityFlags":  [
                                                              "rent_estimate_30sqm",
                                                              "income_proxy",
                                                              "missing_45min_share",
                                                              "missing_good_air_days_ratio"
                                                          ],
                                         "confidence":  0.8,
                                         "isEstimated":  true,
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
                                         "displayPeriodLabel":  "收入与消费为 2024，租金为 2026-02 快照",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "suzhou",
                                         "name":  "苏州",
                                         "pinyin":  "suzhou",
                                         "province":  "江苏省",
                                         "region":  "华东",
                                         "tier":  "强二线",
                                         "coordinates":  [
                                                             120.5853,
                                                             31.2989
                                                         ],
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
                                         "disposableIncome":  77524,
                                         "wageReferenceMonthly":  null,
                                         "annualConsumptionPerCapita":  48108,
                                         "rentMedian":  1011.6,
                                         "rentMedianPerSqm":  33.72,
                                         "assumedDwellingSizeSqm":  30,
                                         "avgCommuteTime":  null,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  null,
                                         "railTransitLength":  392.4,
                                         "utilityCoverage":  100,
                                         "greenPublicSpaceProxy":  15.25,
                                         "pm25Reference":  29,
                                         "goodAirDaysRatio":  84.2,
                                         "rentBurdenProxy":  0.157,
                                         "rentIndex":  14.3,
                                         "rentBurdenIndex":  1,
                                         "consumptionIndex":  63.4,
                                         "transportCostIndex":  null,
                                         "totalCostIndex":  27.5,
                                         "costFriendliness":  72.5,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  58.3,
                                         "savingScore":  78.8,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  68.6,
                                         "opportunityScore":  51.8,
                                         "pressureScore":  27.5,
                                         "coverageScore":  0.8,
                                         "coverageCode":  "full",
                                         "coverageLabel":  "full",
                                         "aiEligible":  true,
                                         "sourceRefs":  [
                                                            "suzhou-bulletin-2024",
                                                            "rent-suzhou-2026-01"
                                                        ],
                                         "qualityFlags":  [
                                                              "rent_estimate_30sqm",
                                                              "income_proxy",
                                                              "missing_commute_detail"
                                                          ],
                                         "confidence":  0.82,
                                         "isEstimated":  true,
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
                                         "displayPeriodLabel":  "收入与消费为 2024，租金为 2026-01 快照",
                                         "lastUpdated":  "2026-03-27"
                                     },
                                     {
                                         "id":  "xiamen",
                                         "name":  "厦门",
                                         "pinyin":  "xiamen",
                                         "province":  "福建省",
                                         "region":  "华东",
                                         "tier":  "强二线",
                                         "coordinates":  [
                                                             118.0894,
                                                             24.4798
                                                         ],
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
                                         "disposableIncome":  74249,
                                         "wageReferenceMonthly":  null,
                                         "annualConsumptionPerCapita":  49085,
                                         "rentMedian":  1164.3,
                                         "rentMedianPerSqm":  38.81,
                                         "assumedDwellingSizeSqm":  30,
                                         "avgCommuteTime":  33,
                                         "commuteWithin45":  null,
                                         "publicTransportScore":  56,
                                         "railTransitLength":  null,
                                         "utilityCoverage":  null,
                                         "greenPublicSpaceProxy":  null,
                                         "pm25Reference":  null,
                                         "goodAirDaysRatio":  99.5,
                                         "rentBurdenProxy":  0.188,
                                         "rentIndex":  23.3,
                                         "rentBurdenIndex":  15.9,
                                         "consumptionIndex":  70.8,
                                         "transportCostIndex":  70.2,
                                         "totalCostIndex":  41.7,
                                         "costFriendliness":  58.3,
                                         "commuteIndex":  null,
                                         "basicServices":  null,
                                         "airQualityScore":  null,
                                         "savingScore":  65.4,
                                         "graduateScore":  null,
                                         "balancedScore":  null,
                                         "coupleScore":  65.4,
                                         "opportunityScore":  27.9,
                                         "pressureScore":  41.7,
                                         "coverageScore":  0.75,
                                         "coverageCode":  "degraded",
                                         "coverageLabel":  "degraded",
                                         "aiEligible":  true,
                                         "sourceRefs":  [
                                                            "xiamen-bulletin-2024",
                                                            "rent-xiamen-2026-01",
                                                            "mobility-public-summary"
                                                        ],
                                         "qualityFlags":  [
                                                              "environment_partial",
                                                              "mobility_partial",
                                                              "rent_estimate_30sqm",
                                                              "income_proxy",
                                                              "missing_rail_detail",
                                                              "missing_45min_share",
                                                              "missing_pm25_reference"
                                                          ],
                                         "confidence":  0.74,
                                         "isEstimated":  true,
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
                                         "displayPeriodLabel":  "收入与消费为 2024，租金为 2026-01 快照",
                                         "lastUpdated":  "2026-03-27"
                                     }
                                 ]
                  }
};

