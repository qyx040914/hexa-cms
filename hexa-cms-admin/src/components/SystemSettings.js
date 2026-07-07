function SystemSettings() {
  return (
    <section className="content-panel">
      <div className="content-header">
        <div>
          <h2>系统设置</h2>
          <p>通过条件渲染切换到设置页面</p>
        </div>
      </div>
      <div className="settings-list">
        <label>
          <span>站点名称</span>
          <input defaultValue="Hexa CMS" />
        </label>
        <label>
          <span>允许评论</span>
          <input defaultChecked type="checkbox" />
        </label>
      </div>
    </section>
  );
}

export default SystemSettings;
