(function attachAboutPage(global) {
  const byId = (id) => document.getElementById(id);

  function showBanner(type, message) {
    const node = byId('about-banner');
    if (!node) return;
    node.className = `status-banner status-banner-${type}`;
    node.textContent = message;
  }

  function renderResearchTable(siteData) {
    const rows = siteData.sources.researchSummary || [];
    byId('about-research-table').innerHTML = rows.map((item) => `
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

  function renderStats(siteData) {
    byId('about-city-count').textContent = siteData.viewModel.summary.totalCities;
    byId('about-source-count').textContent = siteData.sources.sources.length;
    byId('about-generated-at').textContent = siteData.viewModel.generatedAt;
  }

  function renderLists(siteData) {
    byId('about-update-strategy').innerHTML = (siteData.meta.updateStrategy || [])
      .map((line) => `<li>${line}</li>`)
      .join('');

    byId('about-limitations').innerHTML = (siteData.meta.disclaimer || [])
      .map((line) => `<li>${line}</li>`)
      .join('');

    byId('about-source-list').innerHTML = (siteData.sources.sources || [])
      .map((source) => `
        <div>
          <h3>${source.name}</h3>
          <p><strong>类型：</strong>${source.type}</p>
          <p><strong>覆盖范围：</strong>${source.coverage}</p>
          <p><strong>更新频率：</strong>${source.updateFrequency}</p>
          <p><strong>备注：</strong>${source.notes || '—'}</p>
          <p><a href="${source.url}" target="_blank" rel="noreferrer">打开来源</a></p>
        </div>
      `)
      .join('');
  }

  function init() {
    const siteData = global.CITY_SITE_DATA;
    if (!siteData?.viewModel?.cities?.length) {
      showBanner('error', '本地数据包未加载成功，请先运行 scripts/build-derived.ps1。');
      return;
    }

    renderStats(siteData);
    renderResearchTable(siteData);
    renderLists(siteData);
  }

  document.addEventListener('DOMContentLoaded', init);
})(window);
