import React from "react";
import "./Search.css";
import { BsSearch } from "react-icons/bs";

const Search = (props) => {
  return (
    <div className="search">
      <div className="search-bar" ref={props.ref}>
        <input
          data-testid="inputbox"
          className="input-box"
          type="text"
          placeholder="Enter subreddit name"
          onChange={props.getUserInput}
        />
        <div className="search-btn-container">
          {props.loading ? (
            <div
              className="spinner-border text-dark"
              role="status"
              style={{ width: "40px", height: "40px" }}
            >
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <BsSearch className="search-btn" onClick={props.sendUserInput} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
