import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ArticleList from './components/ArticleList';
import CategoryPanel from './components/CategoryPanel';
import CommentPanel from './components/CommentPanel';
import Dashboard from './components/Dashboard';
import PostList from './components/PostList';
import SystemSettings from './components/SystemSettings';

const menus = [
  { key: 'dashboard', label: '控制台' },
  { key: 'article', label: '文章管理' },
  { key: 'posts', label: '接口文章' },
  { key: 'category', label: '分类管理' },
  { key: 'comment', label: '评论管理' },
  { key: 'settings', label: '系统设置' },
];

const articles = [
  {
    id: 1,
    title: 'React 状态管理入门',
    category: '前端基础',
    author: '钱宇歆',
    status: 'published',
    statusText: '已发布',
    publishedAt: '2026-07-07',
  },
  {
    id: 2,
    title: 'Props 单向数据流实践',
    category: 'React 实战',
    author: '钱宇歆',
    status: 'review',
    statusText: '审核中',
    publishedAt: '2026-07-06',
  },
  {
    id: 3,
    title: 'Array.map 动态渲染列表',
    category: '组件开发',
    author: '钱宇歆',
    status: 'draft',
    statusText: '草稿',
    publishedAt: '2026-07-05',
  },
  {
    id: 4,
    title: 'Hexa CMS 后台页面切换',
    category: '项目实战',
    author: '钱宇歆',
    status: 'published',
    statusText: '已发布',
    publishedAt: '2026-07-04',
  },
];

function App() {
  const [currentMenu, setCurrentMenu] = useState('posts');

  function renderContent() {
    if (currentMenu === 'dashboard') {
      return <Dashboard articleCount={articles.length} />;
    }

    if (currentMenu === 'posts') {
      return <PostList />;
    }

    if (currentMenu === 'category') {
      return <CategoryPanel articles={articles} />;
    }

    if (currentMenu === 'comment') {
      return <CommentPanel />;
    }

    if (currentMenu === 'settings') {
      return <SystemSettings />;
    }

    return <ArticleList articles={articles} title="文章列表" />;
  }

  return (
    <div className="admin-shell">
      <Header title="Hexa CMS 管理后台" />
      <main className="admin-main">
        <Sidebar currentMenu={currentMenu} menus={menus} onChangeMenu={setCurrentMenu} />
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
