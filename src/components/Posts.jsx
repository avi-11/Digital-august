import React, { useState } from "react";
import Post from "./Post";

const Posts = ({ board }) => {
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

  const [posts, setPosts] = useState(board.posts);

  const handleAddPost = () => {
    if (
      newTitle.trim() !== "" &&
      newContent.trim() !== "" &&
      newImageUrl.trim() !== ""
    ) {
      const newPost = {
        id: posts.length + 1,
        title: newTitle,
        content: newContent,
        imageUrl: newImageUrl,
      };
      setPosts([...posts, newPost]);
      setNewTitle("");
      setNewContent("");
      setNewImageUrl("");
      setIsAddingPost(false);
    }
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  const handleEditPost = (postId, newTitle, newContent, newImageUrl) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            title: newTitle,
            content: newContent,
            imageUrl: newImageUrl,
          }
        : post
    );
    setPosts(updatedPosts);
  };

  // Filter posts based on the search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="posts">
      {/* Search bar */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search posts by title"
      />

      {/* Render filtered posts */}
      {filteredPosts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onDeletePost={handleDeletePost}
          onEditPost={handleEditPost}
        />
      ))}

      {isAddingPost ? (
        <form onSubmit={handleAddPost}>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Post Title"
            required
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Post Content"
            required
          ></textarea>
          <input
            type="text"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="Post Image URL"
            required
          />
          <button type="submit">Add Post</button>
          <button
            onClick={() => setIsAddingPost(false)}
            className="cancel-button"
          >
            Cancel
          </button>
        </form>
      ) : (
        <button onClick={() => setIsAddingPost(true)}>Add New Post</button>
      )}
    </div>
  );
};

export default Posts;
