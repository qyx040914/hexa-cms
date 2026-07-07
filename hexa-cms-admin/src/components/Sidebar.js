const menus = ['控制台', '文章管理', '分类管理', '评论管理', '系统设置'];

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>功能菜单</h2>
      <nav>
        {menus.map((menu, index) => (
          <a className={index === 1 ? 'menu-item active' : 'menu-item'} href="#content" key={menu}>
            {menu}
          </a>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
