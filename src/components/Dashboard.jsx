import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Board from "./Board";
// import pic2 from "../assets/pic2.jpg";
const dummyBoards = [
  {
    id: 1,
    title: "Board 1",
    posts: [
      {
        title: "Post 1",
        content: "Post 1 content",
        imageUrl: "https://picsum.photos/200",
      },
      {
        title: "Post 2",
        content: "Post 2 content",
        imageUrl: "https://picsum.photos/200",
      },
    ],
  },
  {
    id: 2,
    title: "Board 2",
    posts: [
      {
        title: "Post 1",
        content: "Post 1 content",
        imageUrl: "https://picsum.photos/200",
      },
      {
        title: "Post 2",
        content: "Post 2 content",
        imageUrl: "https://picsum.photos/200",
      },
    ],
  },
];
const Dashboard = () => {
  const [boards, setBoards] = useState(dummyBoards);
  const [isNewBoardFormOpen, setIsNewBoardFormOpen] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");

  const handleAddBoard = () => {
    if (newBoardTitle.trim() !== "") {
      const newBoard = {
        id: boards.length + 1,
        title: newBoardTitle,
        posts: [],
      };
      setBoards([...boards, newBoard]);
      setNewBoardTitle("");
      setIsNewBoardFormOpen(false);
    }
  };

  const handleCancelAddBoard = () => {
    setIsNewBoardFormOpen(false);
    setNewBoardTitle("");
  };

  const handleDeleteBoard = (boardId) => {
    const updatedBoards = boards.filter((board) => board.id !== boardId);
    setBoards(updatedBoards);
  };

  const handleEditBoard = (boardId, newTitle) => {
    const updatedBoards = boards.map((board) => {
      if (board.id === boardId) {
        return { ...board, title: newTitle };
      }
      return board;
    });
    setBoards(updatedBoards);
  };

  const handleSearch = (searchQuery) => {
    const filteredBoards = dummyBoards.filter((board) =>
      board.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setBoards(filteredBoards);
  };

  return (
    <div>
      <NavBar boards={boards} onSearch={handleSearch} />
      {isNewBoardFormOpen ? (
        <div className="add-board-form">
          <input
            type="text"
            placeholder="Enter board title"
            value={newBoardTitle}
            onChange={(e) => setNewBoardTitle(e.target.value)}
          />
          <div>
            <button onClick={handleAddBoard}>Add Board</button>
            <button onClick={handleCancelAddBoard}>Cancel</button>
          </div>
        </div>
      ) : (
        <button
          className="new-board-button"
          onClick={() => setIsNewBoardFormOpen(true)}
        >
          Add New Board
        </button>
      )}
      <div className="board-container">
        {boards.map((board) => (
          <Link to={"/board/post/:id"}>
            <Board
              key={board.id}
              board={board}
              onDeleteBoard={handleDeleteBoard}
              onEditBoard={handleEditBoard}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
