import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PostList from './components/PostList';

function App() {
  return (
    <Router>
      <div className="route-shell">
        <header className="route-header">
          <div>
            <h1>Hexa-CMS Dashboard</h1>
            <p>MERN 全栈后台认证与内容管理</p>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post" element={<PostList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
