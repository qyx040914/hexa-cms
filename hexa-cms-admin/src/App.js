import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ArticleList from './components/ArticleList';

function App() {
  return (
    <div className="admin-shell">
      <Header />
      <main className="admin-main">
        <Sidebar />
        <ArticleList />
      </main>
    </div>
  );
}

export default App;
