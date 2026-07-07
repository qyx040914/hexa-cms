const articles = [
  {
    id: 1,
    title: 'React 组件化开发入门',
    category: '前端基础',
    author: '钱宇歆',
    status: '已发布',
    updatedAt: '2026-07-07',
  },
  {
    id: 2,
    title: '企业级 Git 协作流程总结',
    category: '工程实践',
    author: '钱宇歆',
    status: '草稿',
    updatedAt: '2026-07-06',
  },
  {
    id: 3,
    title: 'Hexa CMS 后台布局设计',
    category: '项目实战',
    author: '钱宇歆',
    status: '审核中',
    updatedAt: '2026-07-05',
  },
];

function ArticleList() {
  return (
    <section className="content-panel" id="content">
      <div className="content-header">
        <div>
          <h2>文章列表</h2>
          <p>使用 React 组件渲染后台管理数据</p>
        </div>
        <input aria-label="搜索文章" placeholder="搜索文章标题" type="search" />
      </div>

      <div className="article-table">
        <div className="table-row table-head">
          <span>标题</span>
          <span>分类</span>
          <span>作者</span>
          <span>状态</span>
          <span>更新时间</span>
        </div>
        {articles.map((article) => (
          <div className="table-row" key={article.id}>
            <span>{article.title}</span>
            <span>{article.category}</span>
            <span>{article.author}</span>
            <span>
              <strong className={`status status-${article.status}`}>{article.status}</strong>
            </span>
            <span>{article.updatedAt}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ArticleList;
