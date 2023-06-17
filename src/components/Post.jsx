import React, { useState } from "react";
import "../Styles/Post.css";

const Post = ({ post, onDeletePost, onEditPost }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(post.title);
  const [newContent, setNewContent] = useState(post.content);
  const [newImageUrl, setNewImageUrl] = useState(post.imageUrl);

  const handleDeletePost = () => {
    onDeletePost(post.id);
  };

  const handleEditPost = () => {
    onEditPost(post.id, newTitle, newContent, newImageUrl);
    setIsEditing(false);
  };

  return (
    <div className="post">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter title"
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Enter content"
          ></textarea>
          <input
            type="text"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="Enter image URL"
          />
          <button onClick={handleEditPost}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <img src={post.imageUrl} alt="Post" />
        </>
      )}
      <div className="post-buttons">
        {isEditing ? (
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDeletePost}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
