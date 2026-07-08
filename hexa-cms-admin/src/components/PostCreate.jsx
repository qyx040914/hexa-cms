import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

function PostCreate() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMsg('');

    if (!title.trim() || !author.trim() || isEmptyContent(content)) {
      setErrorMsg('请完整填写标题、作者与文章正文。');
      return;
    }

    try {
      setSubmitting(true);
      const response = await axios.post('/api/posts', {
        title: title.trim(),
        author: author.trim(),
        content,
        status: 'published',
      });

      if (response.status === 201) {
        navigate('/post');
      }
    } catch (error) {
      console.error('文章发布失败：', error);
      setErrorMsg('文章发布失败，请确认后端服务和 MongoDB 正常运行。');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="post-page post-create-page">
      <div className="post-toolbar">
        <div>
          <h2>发布新文章</h2>
          <p>使用富文本编辑器撰写内容，提交后保存到 MongoDB。</p>
        </div>
        <Link className="text-action" to="/post">
          返回文章列表
        </Link>
      </div>

      {errorMsg && <p className="error-tip">{errorMsg}</p>}

      <form className="post-create-form" onSubmit={handleSubmit}>
        <label>
          <span>文章标题</span>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="请输入文章标题"
          />
        </label>

        <label>
          <span>作者</span>
          <input
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="请输入作者姓名"
          />
        </label>

        <div className="editor-field">
          <span>文章正文</span>
          <ReactQuill theme="snow" value={content} onChange={setContent} modules={quillModules} />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={submitting}>
            {submitting ? '发布中...' : '确认发布'}
          </button>
          <Link to="/post">取消返回</Link>
        </div>
      </form>
    </main>
  );
}

export default PostCreate;
