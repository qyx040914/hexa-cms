function Sidebar(props) {
  return (
    <aside className="sidebar">
      <h2>功能菜单</h2>
      <nav>
        {props.menus.map((menu) => (
          <button
            className={props.currentMenu === menu.key ? 'menu-item active' : 'menu-item'}
            key={menu.key}
            onClick={() => props.onChangeMenu(menu.key)}
            type="button"
          >
            {menu.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
