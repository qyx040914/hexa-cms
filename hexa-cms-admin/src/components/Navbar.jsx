import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('cms_user') || 'null');
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  function handleLogout() {
    if (window.confirm('确定要退出登录吗？')) {
      localStorage.removeItem('cms_user');
      navigate('/login');
    }
  }

  if (isAuthPage) {
    return (
      <header className="navbar navbar-auth">
        <Link to="/login">Hexa-CMS 欢迎您</Link>
      </header>
    );
  }

  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/post">
        Hexa-CMS Dashboard
      </Link>

      <div className="navbar-menu">
        {user ? <span className="navbar-user">欢迎，{user.username}</span> : <Link to="/login">请重新登录</Link>}
        <Link to="/post">文章大盘</Link>
        <Link to="/post/new">发布文章</Link>
        {user && (
          <button type="button" onClick={handleLogout}>
            退出登录
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
