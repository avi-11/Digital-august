import React, { useState } from "react";
import "../Styles/Board.css";
import Posts from "./Posts";
import { useNavigate } from "react-router-dom";

const Board = ({ board, onDeleteBoard, onEditBoard }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(board.title);
  const [newPage, setNewPage] = useState(false);
  let handlePost = (id) => {
    setNewPage(true);
  };
  const navigate = useNavigate(`/board/post/:id`);
  const handleEditBoard = () => {
    onEditBoard(board.id, newTitle);
    setIsEditingTitle(false);
  };

  const handleDeleteBoard = () => {
    onDeleteBoard(board.id);
  };

  return (
    <div className="board">
      <div className="board-header">
        {isEditingTitle ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleEditBoard}
            autoFocus
          />
        ) : (
          <h2 onClick={handlePost.bind(this, board.id)}>{board.title}</h2>
        )}
        <div className="board-buttons">
          <button onClick={() => setIsEditingTitle(true)}>Edit</button>
          <button onClick={handleDeleteBoard}>Delete</button>
        </div>
      </div>

      {newPage ? <Posts id={board.id} board={board} /> : null}
    </div>
  );
};

export default Board;
