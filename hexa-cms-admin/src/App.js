import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import PostList from './components/PostList';
import PostCreate from './components/PostCreate';
import PostDetail from './components/PostDetail';
import PostEdit from './components/PostEdit';

function App() {
  return (
    <Router>
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
