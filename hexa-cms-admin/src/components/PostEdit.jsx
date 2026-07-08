import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const adminHeaders = {
  'X-Admin-Token': 'hexa-admin-token',
};

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'blockquote', 'code-block'],
    ['clean'],
  ],
};

function isEmptyContent(value) {
  return !value || value === '<p><br></p>' || value.replace(/<[^>]*>/g, '').trim() === '';
}

function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('published');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/posts/${id}`)
      .then((response) => {
        setTitle(response.data.title || '');
        setAuthor(response.data.author || '');
        setContent(response.data.content || '');
        setStatus(response.data.status || 'published');
        setErrorMsg('');
      })
      .catch((error) => {
        console.error('文章回显失败：', error);
        setErrorMsg('文章数据加载失败，请确认文章是否存在。');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMsg('');

    if (!title.trim() || !author.trim() || isEmptyContent(content)) {
      setErrorMsg('请完整填写标题、作者与文章正文。');
      return;
    }

    try {
      setSubmitting(true);
      const response = await axios.put(
        `/api/posts/${id}`,
        {
          title: title.trim(),
          author: author.trim(),
          content,
          status,
        },
        { headers: adminHeaders }
      );

      if (response.status === 200) {
        navigate('/post');
      }
    } catch (error) {
      console.error('文章更新失败：', error);
      setErrorMsg('文章更新失败，请确认后端服务和管理员权限正常。');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <main className="post-page">文章数据加载中...</main>;
  }

  return (
    <main className="post-page post-create-page">
      <div className="post-toolbar">
        <div>
          <h2>编辑文章</h2>
          <p>回显原有富文本内容，修改后通过 PUT 接口覆盖保存。</p>
        </div>
        <Link className="text-action" to={`/post/${id}`}>
          返回详情
        </Link>
      </div>

      {errorMsg && <p className="error-tip">{errorMsg}</p>}

      <form className="post-create-form" onSubmit={handleSubmit}>
        <label>
          <span>文章标题</span>
          <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>

        <label>
          <span>作者</span>
          <input type="text" value={author} onChange={(event) => setAuthor(event.target.value)} />
        </label>

        <label>
          <span>状态</span>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="published">已发布</option>
            <option value="draft">草稿</option>
          </select>
        </label>

        <div className="editor-field">
          <span>文章正文</span>
          <ReactQuill theme="snow" value={content} onChange={setContent} modules={quillModules} />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={submitting}>
            {submitting ? '保存中...' : '保存修改'}
          </button>
          <Link to="/post">取消返回</Link>
        </div>
      </form>
    </main>
  );
}

export default PostEdit;
