import React, { useState } from "react";
import "../Styles/NavBar.css";

const NavBar = ({ boards, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Digital Wall</div>
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search boards..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </nav>
  );
};

export default NavBar;
