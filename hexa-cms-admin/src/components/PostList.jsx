import { useEffect, useState } from 'react';
import axios from 'axios';

function formatDate(value) {
  if (!value) {
    return '-';
  }

  return new Date(value).toLocaleDateString('zh-CN');
}

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('/api/posts')
      .then((response) => {
        setPosts(response.data);
        setError('');
      })
      .catch((requestError) => {
        setError('拉取后端数据失败，请确认 Express 服务运行在 5000 端口。');
        console.error('拉取后端数据失败：', requestError);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="content-panel">
      <div className="content-header">
        <div>
          <h2>数据库文章列表</h2>
          <p>通过 Axios 请求 Express + Mongoose 接口，并由 React 动态渲染文章数据</p>
        </div>
      </div>

      {loading && <p className="empty-tip">正在从 Express 后端加载数据...</p>}
      {error && <p className="error-tip">{error}</p>}

      {!loading && !error && (
        <div className="article-table api-table mongo-table">
          <div className="table-row table-head">
            <span>ID</span>
            <span>文章标题</span>
            <span>作者</span>
            <span>发布日期</span>
          </div>
          {posts.map((post) => (
            <div className="table-row" key={post._id || post.id}>
              <span>{post._id || post.id}</span>
              <span>{post.title}</span>
              <span>{post.author}</span>
              <span>{formatDate(post.createdAt)}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default PostList;
