import { useState } from 'react';

function ArticleList(props) {
  const [keyword, setKeyword] = useState('');
  const filteredArticles = props.articles.filter((article) =>
    article.title.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  return (
    <section className="content-panel" id="content">
      <div className="content-header">
        <div>
          <h2>{props.title}</h2>
          <p>通过 Props 接收数据，使用 State 记录搜索关键词，并用 map 动态渲染表格</p>
        </div>
        <input
          aria-label="搜索文章"
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="搜索文章标题"
          type="search"
          value={keyword}
        />
      </div>

      <div className="article-table">
        <div className="table-row table-head">
          <span>ID</span>
          <span>文章标题</span>
          <span>分类</span>
          <span>发布日期</span>
          <span>状态</span>
          <span>操作</span>
        </div>
        {filteredArticles.map((article) => (
          <div className="table-row" key={article.id}>
            <span>{article.id}</span>
            <span>{article.title}</span>
            <span>{article.category}</span>
            <span>{article.publishedAt}</span>
            <span>
              <strong className={`status status-${article.status}`}>{article.statusText}</strong>
            </span>
            <span className="row-actions">
              <button type="button">编辑</button>
              <button type="button">预览</button>
            </span>
          </div>
        ))}
      </div>
      {filteredArticles.length === 0 && <p className="empty-tip">没有找到匹配的文章。</p>}
    </section>
  );
}

export default ArticleList;
