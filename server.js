const axios = require("axios");
const express = require("express");
const cheerio = require("cheerio");
const jsonfile = require("jsonfile");
const result = require("./result.json");
const cors = require("cors");
const uniqid = require("uniqid");

const app = express();
app.use(cors());
app.use(express.json()); // parse content so we can access it in requests
let recievedUserInput = "";

const getSubredditData = async (sub) => {
  console.log("in getSubredditData function...");
  const user_url = baseUrl + sub + "/";
  console.log(user_url);
  try {
    const response = await axios.get(user_url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "axios 0.21.1",
        timeout: 5 * 1 * 10000, // after 5s
      },
    });

    const $ = cheerio.load(response.data);
    const subreddits = [];
    const user_subreddit = {
      name: "",
      url: "",
      about: "",
      img: "",
      dob: "",
      posts: [],
      rising_post_titles: [], // grabs titles of new posts recieving upvotes quickly
      discord: "",
    };

    // url
    user_subreddit.url = user_url;

    // name
    const sub_name = $("div#AppRouter-main-content h1");
    user_subreddit.name = sub_name.text();

    // about
    const sub_about = $(
      'div[data-testid="subreddit-sidebar"] div:first-child div:last-child div[data-testid="no-edit-description-block"]'
    );
    user_subreddit.about = sub_about.text();

    // creation date
    sub_dob = $(
      'div[data-testid="subreddit-sidebar"] > div:first-child > div:last-child > div:nth-child(2) > div:first-child'
    );
    user_subreddit.dob = sub_dob.text();

    // title of top hot posts
    $(
      'div[data-testid="post-container"] div[data-adclicklocation="title"] h3'
    ).each((i, val) => {
      user_subreddit.rising_post_titles.push($(val).text());
    });

    // top hot posts
    $('div[data-testid="post-container"]').each((i, val) => {
      const post = {};
      post.title = $(val).find("div[data-adclicklocation='title'] h3").text();
      post.upvotes = $(val).find("div[id^=vote-arrows] div").text();
      post.comments = $(val)
        .find('a[data-test-id="comments-page-link-num-comments"] span')
        .text();
      post.timestamp = $(val).find("span[data-testid='post_timestamp']").text();
      user_subreddit.posts.push(post);
    });

    // profile img
    const sub_img = $("div#AppRouter-main-content img");
    user_subreddit.img = sub_img.attr("src");

    // discord
    const sub_discord = $("a[href^='https://discord']");
    user_subreddit.discord = sub_discord.attr("href");

    console.log("backend data", user_subreddit);
    // jsonfile.writeFile("result.json", user_subreddit, (err) => {
    //   console.log(err);
    // });
    subreddits.push(user_subreddit);
    return subreddits;
  } catch (err) {
    if (err.response) {
      // request was made and the server responded with a status code that falls outside of the range 2xx
      console.log("error data: ", err.response.data);
      console.log("error status: ", err.response.status);
      console.log("error headers: ", err.response.headers);
    } else if (err.request) {
      // request was made but no response was received
      console.log("error request: ", err.request);
    } else {
      // something happened in setting up the request that triggered an error
      console.log("error: ", err.message);
    }
  }
};

const baseUrl = "https://old.reddit.com/r/";
const subredditData = async (sub) => {
  const user_url = baseUrl + sub + "/";
  const user_rising_url = baseUrl + sub + "/rising/";
  const user_new_url = baseUrl + sub + "/new/";
  try {
    let response = await axios.get(user_url);
    let $ = cheerio.load(response.data);

    const subreddits = [];
    const user_subreddit = {
      name: "",
      url: "",
      about: "",
      members: "",
      online_members: "",
      img: "",
      age: "",
      posts: [],
      new_posts: [],
      rising_posts: [],
      discord: "",
    };

    // url
    user_subreddit.url = user_url;

    // name
    const sub_name = $("h1.redditname").text();
    user_subreddit.name = sub_name;

    // about
    const sub_about = $("div.md p:first-child").text();
    user_subreddit.about = sub_about;

    // header image
    const sub_img = $("img#header-img").attr("src");
    user_subreddit.img = "https:" + sub_img;

    // members
    const sub_members = $("span.subscribers > span.number").text();
    user_subreddit.members = sub_members;

    // online members
    const sub_online_members = $("p.users-online > span.number").text();
    user_subreddit.online_members = sub_online_members;

    // age
    const sub_age = $("span.age > time").text();
    user_subreddit.age = sub_age;

    // discord
    const sub_discord = $("div.md a[href^='https://discord']");
    user_subreddit.discord = sub_discord.attr("href");

    // hot posts
    $("div.thing").each((i, val) => {
      const post = {};
      post.id = uniqid();
      post.number = $(val).find("span.rank").text();
      post.title = $(val).find("div.top-matter > p.title > a.title").text();
      post.upvotes = $(val).find("div.score.unvoted").text();
      if (post.upvotes === "•") {
        post.upvotes = "No upvotes yet";
      }
      post.comments = $(val)
        .find("ul.flat-list.buttons a[data-event-action='comments']")
        .text();
      const parseComment = parseInt(post.comments);
      if (isNaN(parseComment)) {
        post.comments = "No comments yet";
      }
      post.timestamp = $(val).find("p.tagline > time").text();
      user_subreddit.posts.push(post);
    });

    // new posts
    response = await axios.get(user_new_url);
    $ = cheerio.load(response.data);

    $("div.thing").each((i, val) => {
      const post = {};
      post.id = uniqid();
      post.number = $(val).find("span.rank").text();
      post.title = $(val).find("div.top-matter > p.title > a.title").text();
      post.upvotes = $(val).find("div.score.unvoted").text();
      if (post.upvotes === "•") {
        post.upvotes = "No upvotes yet";
      }
      post.comments = $(val)
        .find("ul.flat-list.buttons a[data-event-action='comments']")
        .text();
      const parseComment = parseInt(post.comments);
      if (isNaN(parseComment)) {
        post.comments = "No comments yet";
      }
      post.timestamp = $(val).find("p.tagline > time").text();
      user_subreddit.new_posts.push(post);
    });

    // rising posts
    response = await axios.get(user_rising_url);
    $ = cheerio.load(response.data);

    $("div.thing").each((i, val) => {
      const post = {};
      post.id = uniqid();
      post.number = $(val).find("span.rank").text();
      post.title = $(val).find("div.top-matter > p.title > a.title").text();
      post.upvotes = $(val).find("div.score.unvoted").text();
      if (post.upvotes === "•") {
        post.upvotes = "No upvotes yet";
      }
      post.comments = $(val)
        .find("ul.flat-list.buttons a[data-event-action='comments']")
        .text();
      const parseComment = parseInt(post.comments);
      if (isNaN(parseComment)) {
        post.comments = "No comments yet";
      }
      post.timestamp = $(val).find("p.tagline > time").text();
      user_subreddit.rising_posts.push(post);
    });

    console.log("backend data", user_subreddit);

    subreddits.push(user_subreddit);
    return subreddits;
  } catch (err) {
    console.log(err.message);
  }
};

app.get("/", (req, res) => {
  console.log("home");
  // axios
  //   .get("https://www.reddit.com")
  //   .then((response) => {
  //     res.json(response);
  //   })
  //   .catch((err) => console.log(err));
});

// retrieve user input from frontend
app.post("/post", (req, res) => {
  const body = req.body;
  recievedUserInput = body.userInput;
});

app.get("/api", (req, res) => {
  const response = res;
  console.log("In server-side get request");
  subredditData(recievedUserInput)
    .then((res) => {
      response.json(res);
    })
    .catch((err) => {
      console.log(err.message);
    });
  // getSubredditData(recievedUserInput)
  //   .then((res) => {
  //     response.json(res);
  //   })
  //   .catch((err) => {
  //     console.log(
  //       "Server: In get post. Failed to get data using userInput",
  //       err
  //     );
  //     response.status(403).send(err.message);
  //   });
});

app.listen(5000, () => {
  console.log("listening");
});
