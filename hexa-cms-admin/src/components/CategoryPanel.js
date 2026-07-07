function CategoryPanel(props) {
  const categories = Array.from(new Set(props.articles.map((article) => article.category)));

  return (
    <section className="content-panel">
      <div className="content-header">
        <div>
          <h2>分类管理</h2>
          <p>从文章数据中动态提取分类</p>
        </div>
      </div>
      <div className="tag-list">
        {categories.map((category) => (
          <span className="tag" key={category}>
            {category}
          </span>
        ))}
      </div>
    </section>
  );
}

export default CategoryPanel;
