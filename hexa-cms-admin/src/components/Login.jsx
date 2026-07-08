import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const successMsg = location.state?.successMsg || '';

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMsg('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('cms_user', JSON.stringify(data.user));
        navigate('/post');
        return;
      }

      setErrorMsg(data.message || '登录失败，请检查账号或密码。');
    } catch (error) {
      setErrorMsg('网络请求失败！');
    }
  }

  return (
    <main className="auth-panel">
      <h2>登录后台</h2>
      <p className="auth-subtitle">使用已注册账号进入内容管理面板</p>

      {successMsg && !errorMsg && <p className="auth-success">{successMsg}</p>}
      {errorMsg && <p className="auth-error">{errorMsg}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <input name="username" onChange={handleChange} placeholder="用户名" required type="text" />
        <input name="password" onChange={handleChange} placeholder="密码" required type="password" />
        <button type="submit">安全登录</button>
      </form>

      <p className="auth-link">
        没有账号？ <Link to="/register">立即注册</Link>
      </p>
    </main>
  );
}

export default Login;
