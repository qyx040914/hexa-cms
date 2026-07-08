import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password_repeat: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMsg('');

    if (formData.password !== formData.password_repeat) {
      setErrorMsg('两次输入的密码不一致！');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        navigate('/login', {
          state: { successMsg: '注册成功！请使用新账号登录。' },
        });
        return;
      }

      setErrorMsg(data.message || '注册失败，请检查输入。');
    } catch (error) {
      setErrorMsg('网络请求失败，请检查服务器连接！');
    }
  }

  return (
    <main className="auth-panel">
      <h2>注册账号</h2>
      <p className="auth-subtitle">创建 Hexa-CMS 后台访问账号</p>

      {errorMsg && <p className="auth-error">{errorMsg}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <input name="username" onChange={handleChange} placeholder="用户名" required type="text" />
        <input name="password" onChange={handleChange} placeholder="密码" required type="password" />
        <input
          name="password_repeat"
          onChange={handleChange}
          placeholder="确认密码"
          required
          type="password"
        />
        <button type="submit">立即注册</button>
      </form>

      <p className="auth-link">
        已有账号？ <Link to="/login">返回登录</Link>
      </p>
    </main>
  );
}

export default Register;
