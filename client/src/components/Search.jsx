import React from "react";
import "./Search.css";
import { BsSearch } from "react-icons/bs";

const Search = (props) => {
  return (
    <div className="search">
      <div className="search-bar" ref={props.ref}>
        <input
          className="input-box"
          type="text"
          placeholder="Enter subreddit name"
          onChange={props.getUserInput}
        />
        <div className="search-btn-container">
          <BsSearch className="search-btn" onClick={props.sendUserInput} />
        </div>

        {/* <button className="search-btn" onClick={props.sendUserInput}>
          Search
        </button> */}
      </div>
    </div>
  );
};

export default Search;
