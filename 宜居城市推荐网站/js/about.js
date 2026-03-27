(function attachAboutPage(global) {
  const byId = (id) => document.getElementById(id);
  const ensureArray = (value) => (Array.isArray(value) ? value : value ? [value] : []);

  function showBanner(type, message) {
    const node = byId('about-banner');
    if (!node) return;
    node.className = `status-banner status-banner-${type}`;
    node.textContent = message;
  }

  function renderResearchTable(siteData) {
    const rows = ensureArray(siteData.sources?.researchSummary);
    byId('about-research-table').innerHTML = rows.map((item) => `
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

  function renderStats(siteData) {
    byId('about-city-count').textContent = `${siteData.provinceViewModel.summary.comparableMainlandProvinces} 省 / ${siteData.viewModel.summary.totalCities} 城`;
    byId('about-source-count').textContent = siteData.sources.sources.length;
    byId('about-generated-at').textContent = siteData.meta.siteGeneratedAt;
  }

  function renderLists(siteData) {
    byId('about-update-strategy').innerHTML = ensureArray(siteData.meta.updateStrategy).map((line) => `<li>${line}</li>`).join('');
    byId('about-limitations').innerHTML = ensureArray(siteData.meta.disclaimer).map((line) => `<li>${line}</li>`).join('');
    byId('about-source-list').innerHTML = ensureArray(siteData.sources.sources).map((source) => `
      <div>
        <h3>${source.name}</h3>
        <p><strong>类型：</strong>${source.type || '暂无'}</p>
        <p><strong>覆盖范围：</strong>${source.coverage || '暂无'}</p>
        <p><strong>更新频率：</strong>${source.updateFrequency || '暂无'}</p>
        <p><strong>备注：</strong>${source.notes || '暂无'}</p>
        <p><a href="${source.url}" target="_blank" rel="noreferrer">打开来源</a></p>
      </div>
    `).join('');
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

  function init() {
    const siteData = global.CITY_SITE_DATA;
    if (!siteData?.viewModel?.cities?.length || !siteData?.provinceViewModel?.provinces?.length) {
      showBanner('error', '本地数据包未成功加载，请先执行数据构建脚本。');
      return;
    }

    renderStats(siteData);
    renderResearchTable(siteData);
    renderLists(siteData);
    bindNavToggle();
  }

  document.addEventListener('DOMContentLoaded', init);
})(window);
