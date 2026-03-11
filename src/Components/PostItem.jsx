import React, { useState } from 'react';
import axios from 'axios';

const PostItem = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleComments = async () => {
    if (!showComments && comments.length === 0) {
      setLoading(true);
      try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
        setComments(res.data);
      } catch (err) {
        console.error("Ошибка при получении комментариев", err);
      } finally {
        setLoading(false);
      }
    }
    setShowComments(!showComments);
  };

  return (
    <article className="post">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <button onClick={toggleComments} className="btn-secondary">
        {showComments ? 'Скрыть комментарии' : `Показать комментарии (${comments.length || '?'})`}
      </button>

      {showComments && (
        <div className="comments-section">
          {loading ? <em>Загрузка...</em> : comments.map(c => (
            <div key={c.id} className="comment">
              <strong>{c.email}</strong>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
};

export default PostItem;