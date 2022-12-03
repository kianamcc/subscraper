import React, { useState } from "react";
import "./SubredditDisplay.css";

/* Dummy test */
const SubredditDisplay = (props) => {
  const [dropDownValue, setDropDownValue] = useState("hot");

  // post display depends on dropdown value -> default hot, new, rising
  const dropDownDisplayHandler = () => {
    switch (dropDownValue) {
      case "hot":
        return props.data.posts.map((item) => (
          <div className="post" key={item.id}>
            <h5 className="post-title">{item.title}</h5>
            <p className="post-upvotes">Upvotes: {item.upvotes}</p>
            <p className="post-age">{item.timestamp}</p>
            <p className="post-comments">{item.comments}</p>
          </div>
        ));
      case "rising":
        return props.data.rising_posts.map((item) => (
          <div className="post" key={item.id}>
            <h5 className="post-title">{item.title}</h5>
            <p className="post-upvotes">Upvotes: {item.upvotes}</p>
            <p className="post-age">{item.timestamp}</p>
            <p className="post-comments">{item.comments}</p>
          </div>
        ));
      case "new":
        return props.data.new_posts.map((item) => (
          <div className="post" key={item.id}>
            <h5 className="post-title">{item.title}</h5>
            <p className="post-upvotes">Upvotes: {item.upvotes}</p>
            <p className="post-age">{item.timestamp}</p>
            <p className="post-comments">{item.comments}</p>
          </div>
        ));
      default:
        return;
    }
  };

  const dropDown = dropDownDisplayHandler();

  const dropDownValueHandler = (event) => {
    console.log(event.target.value);
    setDropDownValue(event.target.value);
  };

  const display = (
    <div className="subreddit">
      <div className="subreddit-container">
        <div className="sub-main">
          <div className="name">
            {props.data.name ? <h1>{props.data.name}</h1> : null}
          </div>
          {props.data.url ? (
            <a
              className="url"
              href={props.data.url}
              target="_blank"
              rel="noreferrer"
            >
              {props.data.url}
            </a>
          ) : null}
          <div className="members-container">
            <p className="members-subheading">Members:</p>
            {props.data.members ? (
              <p className="member-count">{props.data.members}</p>
            ) : null}
            <p className="members-subheading">Online Members:</p>
            {props.data.members ? (
              <p className="member-count">{props.data.members}</p>
            ) : null}
          </div>
          {props.data.age ? (
            <p className="dob">Community for {props.data.age}</p>
          ) : null}
        </div>

        {props.data.about ? (
          <div className="about">
            <h3>About</h3>
            <p className="about-text">{props.data.about}</p>
          </div>
        ) : null}

        <div className="rising-posts">
          <h3 className="section-title">Top Hot Posts</h3>

          <p className="section-description">
            Posts with an overwhelming amount of upvotes
          </p>
          <select className="dropdown" onChange={dropDownValueHandler}>
            <option value="hot">Hot Posts</option>
            <option value="new">New Posts</option>
            <option value="rising">Rising Posts</option>
          </select>
          {/* make conditional post display, could be hot, new, or rising */}
          <div className="posts">{dropDown}</div>
        </div>
        <div className="discord">
          {props.data.discord ? (
            <div>
              <h3>Discord</h3>
              <a
                href={props.data.discord}
                alt=""
                target="_blank"
                rel="noreferrer"
              >
                {props.data.discord}
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
  return (
    <div className="subreddit-display-container">
      {props.data.name ? (
        display
      ) : (
        <p className="subreddit-dne">
          Subreddit does not exist... Try another one.
        </p>
      )}
    </div>
  );
};

export default SubredditDisplay;

// import React from "react";
// import "./SubredditDisplay.css";

// /* Dummy test */
// const SubredditDisplay = (props) => {
//   return (
//     <div className="subreddit">
//       <div className="subreddit-container">
//         <div className="sub-main">
//           {/* <div className="sub-img-container">
//             {props.data.img ? (
//               <img className="sub-img" src={props.data.img} alt="" />
//             ) : null}
//           </div> */}
//           <div className="name">
//             {props.data.name ? <h1>{props.data.name}</h1> : null}
//           </div>
//           {props.data.url ? (
//             <a
//               className="url"
//               href={props.data.url}
//               target="_blank"
//               rel="noreferrer"
//             >
//               {props.data.url}
//             </a>
//           ) : null}
//           <div className="members-container">
//             <p className="members-subheading">Members:</p>
//             {props.data.members ? (
//               <p className="member-count">{props.data.members}</p>
//             ) : null}
//             <p className="members-subheading">Online Members:</p>
//             {props.data.members ? (
//               <p className="member-count">{props.data.members}</p>
//             ) : null}
//           </div>
//           {props.data.age ? (
//             <p className="dob">Community for {props.data.age}</p>
//           ) : null}
//         </div>

//         {props.data.about ? (
//           <div className="about">
//             <h3>About</h3>
//             <p className="about-text">{props.data.about}</p>
//           </div>
//         ) : null}

//         <div className="rising-posts">
//           <h3 className="section-title">Top Hot Posts: </h3>
//           <p className="section-description">
//             Posts with an overwhelming amount of upvotes
//           </p>
//           <div className="posts">
//             {props.data.posts
//               ? props.data.posts.map((item) => (
//                   <div className="post" key={item.id}>
//                     <h5 className="post-title">{item.title}</h5>
//                     <p className="post-upvotes">Upvotes: {item.upvotes}</p>
//                     <p className="post-age">{item.timestamp}</p>
//                     <p className="post-comments">{item.comments}</p>
//                   </div>
//                 ))
//               : null}
//           </div>
//         </div>
//         <div className="discord">
//           {props.data.discord ? (
//             <div>
//               <h3>Discord</h3>
//               <a href={props.data.discord} alt="">
//                 {props.data.discord}
//               </a>
//             </div>
//           ) : null}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubredditDisplay;
