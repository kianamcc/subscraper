import React from "react";
import "./Banner.css";

const Banner = (props) => {
  return (
    <section className="banner">
      <div className="banner-container">
        <div className="column-1">
          <h1 data-testid="bannerheading" className="banner-heading">
            Subscraper
          </h1>
          <p data-testid="bannerdescription" className="banner-description">
            Subscraper provides a quick and easy way to view a subreddit's data.
            <br />
            Type in your subreddit of interest and view it's information!
            <br />
            Whether it's the hot posts, the new posts, or the rising posts of a
            subreddit, see what kind of posts are on the rise!
            <br />
            <br />
            Scroll down or click the button below to start:
          </p>
          <button
            data-testid="bannerbtn"
            className="banner-btn"
            onClick={props.handleStartBtnClick}
          >
            Start
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
