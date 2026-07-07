function Header(props) {
  return (
    <header className="site-header">
      <div>
        <h1>{props.title}</h1>
        <p>文章内容管理与发布中心</p>
      </div>
      <button className="primary-action" type="button">
        新建文章
      </button>
    </header>
  );
}

export default Header;
