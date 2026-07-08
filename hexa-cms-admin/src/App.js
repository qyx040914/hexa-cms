import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { io } from 'socket.io-client';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import PostList from './components/PostList';
import PostCreate from './components/PostCreate';
import PostDetail from './components/PostDetail';
import PostEdit from './components/PostEdit';

function getSocketUrl() {
  if (process.env.REACT_APP_SOCKET_URL) {
    return process.env.REACT_APP_SOCKET_URL;
  }

  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000';
  }

  return window.location.origin;
}

function App() {
  const [alertMsg, setAlertMsg] = useState('');

  useEffect(() => {
    const socket = io(getSocketUrl(), {
      transports: ['websocket'],
      withCredentials: true,
    });
    let alertTimer;

    socket.on('connect', () => {
      console.log(`WebSocket connected: ${socket.id}`);
    });

    socket.on('server:welcome', (payload) => {
      console.log('WebSocket welcome message:', payload);
    });

    socket.on('connect_error', (error) => {
      console.error('WebSocket connection failed:', error.message);
    });

    const handleNewPostAlert = (data) => {
      const author = data?.author || '有成员';
      const title = data?.title || '未命名文章';

      console.log('New post alert received:', data);
      setAlertMsg(`系统通知：${author} 刚刚发布了新文章《${title}》`);

      window.clearTimeout(alertTimer);
      alertTimer = window.setTimeout(() => {
        setAlertMsg('');
      }, 5000);
    };

    socket.on('new_post_alert', handleNewPostAlert);

    return () => {
      window.clearTimeout(alertTimer);
      socket.off('new_post_alert', handleNewPostAlert);
      socket.disconnect();
    };
  }, []);

  return (
    <Router>
      {alertMsg && <div className="realtime-alert">{alertMsg}</div>}
      <div className="route-shell">
        <div className="route-container">
          <Navbar />

          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post" element={<PostList />} />
            <Route path="/post/new" element={<PostCreate />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/post/edit/:id" element={<PostEdit />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
