const axios = require("axios");
const express = require("express");
const cheerio = require("cheerio");
const jsonfile = require("jsonfile");
const cors = require("cors");
const uniqid = require("uniqid");

const app = express();
app.use(cors());
app.use(express.json()); // parse content so we can access it in requests
let recievedUserInput = "";

const baseUrl = "https://old.reddit.com/r/";
const subredditData = async (sub) => {
  const user_url = baseUrl + sub + "/";
  const user_rising_url = baseUrl + sub + "/rising/";
  const user_new_url = baseUrl + sub + "/new/";
  const user_controversial_url = baseUrl + sub + "/controversial/";
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
      controversial_posts: [],
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

    // controversial
    response = await axios.get(user_controversial_url);
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
      user_subreddit.controversial_posts.push(post);
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

// app.listen(5000, () => {
//   console.log("listening");
// });

app.listen(process.env.PORT || 5000, () => {
  console.log("listening");
});
