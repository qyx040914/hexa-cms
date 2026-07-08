import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';

const adminHeaders = {
  'X-Admin-Token': 'hexa-admin-token',
};

function formatDate(value) {
  if (!value) {
    return '-';
  }

  return new Date(value).toLocaleString('zh-CN');
}

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/posts/${id}`)
      .then((response) => {
        setPost(response.data);
        setErrorMsg('');
      })
      .catch((error) => {
        console.error('文章详情加载失败：', error);
        setErrorMsg('文章详情加载失败，请确认文章是否存在。');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  async function handleDelete() {
    if (!window.confirm('危险操作：确定要永久删除这篇文章吗？')) {
      return;
    }

    try {
      setDeleting(true);
      await axios.delete(`/api/posts/${id}`, { headers: adminHeaders });
      navigate('/post');
    } catch (error) {
      console.error('文章删除失败：', error);
      setErrorMsg('文章删除失败，请确认后端服务和管理员权限正常。');
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return <main className="post-page">文章详情加载中...</main>;
  }

  if (errorMsg) {
    return (
      <main className="post-page">
        <p className="error-tip">{errorMsg}</p>
        <Link className="text-action" to="/post">
          返回文章列表
        </Link>
      </main>
    );
  }

  const safeHTML = DOMPurify.sanitize(post.content || '');
  const postId = post._id || post.id;

  return (
    <main className="post-page post-detail-page">
      <div className="post-toolbar">
        <div>
          <h2>{post.title}</h2>
          <p>
            作者：{post.author} | 发布时间：{formatDate(post.createdAt)}
          </p>
        </div>
        <Link className="text-action" to="/post">
          返回文章列表
        </Link>
      </div>

      <article className="post-content" dangerouslySetInnerHTML={{ __html: safeHTML }} />

      <div className="form-actions detail-actions">
        <Link to={`/post/edit/${postId}`}>编辑文章</Link>
        <button type="button" className="danger-button" disabled={deleting} onClick={handleDelete}>
          {deleting ? '删除中...' : '永久删除'}
        </button>
      </div>
    </main>
  );
}

export default PostDetail;
