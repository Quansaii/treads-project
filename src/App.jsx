import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from './Components/PostItem';
import Modal from './Components/Modal';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(100); 
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
          params: { _page: page, _limit: limit }
        });
        setPosts(res.data);
      } catch (err) {
        console.error("Ошибка загрузки данных", err);
      }
    };
    fetchPosts();
  }, [page, limit]);

  const totalPages = Math.ceil(totalPosts / limit);

  const handleAddPost = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPost = {
      id: Date.now(),
      title: formData.get('title'),
      body: formData.get('body')
    };
    setPosts([newPost, ...posts.slice(0, limit - 1)]);
    setModalOpen(false);
    e.target.reset();
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Главная</h1>
        <div className="controls">
          <label>Постов на странице: </label>
          <select value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <button onClick={() => setModalOpen(true)} className="btn-primary">Добавить пост</button>
        </div>
      </header>

      <main>
        {posts.map(post => <PostItem key={post.id} post={post} />)}
      </main>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Назад</button>
        {[...Array(totalPages)].map((_, i) => (
          <button 
            key={i + 1} 
            className={page === i + 1 ? 'active' : ''} 
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Вперед</button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2>Создать новый пост</h2>
        <form onSubmit={handleAddPost} className="post-form">
          <input name="title" placeholder="Заголовок" required />
          <textarea name="body" placeholder="Текст поста" required rows="5" />
          <button type="submit" className="btn-primary">Опубликовать</button>
        </form>
      </Modal>
    </div>
  );
}

export default App;