function Dashboard(props) {
  return (
    <section className="content-panel">
      <div className="content-header">
        <div>
          <h2>控制台</h2>
          <p>根据当前文章数据动态生成统计信息</p>
        </div>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <span>文章总数</span>
          <strong>{props.articleCount}</strong>
        </div>
        <div className="stat-card">
          <span>今日访问</span>
          <strong>128</strong>
        </div>
        <div className="stat-card">
          <span>待审核</span>
          <strong>1</strong>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
