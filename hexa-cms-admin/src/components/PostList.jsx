import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function formatDate(value) {
  if (!value) {
    return '-';
  }

  return new Date(value).toLocaleString('zh-CN');
}

function formatStatus(value) {
  return value === 'draft' ? '草稿' : '已发布';
}

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const currentUser = JSON.parse(localStorage.getItem('cms_user') || 'null');

  useEffect(() => {
    axios
      .get('/api/posts')
      .then((response) => {
        setPosts(response.data);
        setError('');
      })
      .catch((requestError) => {
        setError('拉取后端文章数据失败，请确认 Express 服务运行在 5000 端口。');
        console.error('拉取后端文章数据失败：', requestError);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="post-page">
      <div className="post-toolbar">
        <div>
          <h2>后台文章数据</h2>
          <p>登录用户：{currentUser?.username || '未读取到用户信息'}</p>
        </div>
        <div className="toolbar-actions">
          <Link className="primary-link" to="/post/new">
            发布新文章
          </Link>
          <Link className="text-action" to="/login">
            返回登录
          </Link>
        </div>
      </div>

      {loading && <p className="empty-tip">正在从 Express 后端拉取数据...</p>}
      {error && <p className="error-tip">{error}</p>}

      {!loading && !error && posts.length === 0 && <p className="empty-tip">暂无文章，请先用 Postman 新增文章。</p>}

      {!loading && !error && posts.length > 0 && (
        <div className="article-table api-table mongo-table">
          <div className="table-row table-head">
            <span>ID</span>
            <span>文章标题</span>
            <span>作者</span>
            <span>状态</span>
            <span>发布时间</span>
            <span>操作</span>
          </div>
          {posts.map((post) => (
            <div className="table-row" key={post._id || post.id}>
              <span>{post._id || post.id}</span>
              <strong>
                <Link className="table-link" to={`/post/${post._id || post.id}`}>
                  {post.title}
                </Link>
              </strong>
              <span>{post.author}</span>
              <span>{formatStatus(post.status)}</span>
              <span>{formatDate(post.createdAt)}</span>
              <span className="row-actions">
                <Link className="btn-edit" to={`/post/edit/${post._id || post.id}`}>
                  编辑
                </Link>
                <Link className="btn-detail" to={`/post/${post._id || post.id}`}>
                  查看详情
                </Link>
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default PostList;
