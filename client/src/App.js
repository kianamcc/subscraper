import logo from "./logo.svg";
import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Search from "./components/Search";
import axios from "axios";
import SubredditDisplay from "./components/SubredditDisplay";
import Banner from "./components/Banner";
import Loading from "./components/Loading";

function App() {
  const [data, setData] = useState([]);
  const [userInput, setUserInput] = useState(""); // should be in search component
  const [btnClicked, setBtnClicked] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [loading, setLoading] = useState(false);

  // Passed into Search component which will update this value
  const getUserInput = (e) => {
    setUserInput(e.target.value);
  };

  // Passed into Search component and will fire when search button is clicked
  const sendUserInput = async (e) => {
    if (userInput !== "") {
      try {
        setBtnClicked(true);
        await axios.post("/post", {
          userInput,
        });
      } catch (err) {
        if (err.response) {
          console.log(
            "Client: sendUserInput function. Could not send userinput data",
            err.response.data
          );
        }
      }
    }
  };

  // After user input is sent to backend, retrieve subreddit data from backend
  const getSubredditInfo = async (e) => {
    setLoading(true);
    setBtnClicked(false);
    try {
      await axios
        .get("/api", {
          headers: {
            Accept: "application/json",
            timeout: 2000,
          },
        })
        .then((res) => {
          setData(res.data);
          setDataReady(true);
        });
    } catch (err) {
      if (err.response) {
        console.log(
          "Client: In getSubredditInfo function. Could not retrieve data from backend",
          err.response.data
        );
      }
    }
  };

  const displayData = () => {
    console.log("data name", data[0].name);
    setDataReady(true);
  };

  // When user input is sent through a search button click, call the getSubredditInfo function to make a GET request to backend
  useEffect(() => {
    if (btnClicked) {
      getSubredditInfo();
    }
  }, [btnClicked]);

  const ref = useRef(null);

  const handleStartBtnClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="App">
      <Banner handleStartBtnClick={handleStartBtnClick} />
      <div className="main-container" ref={ref}>
        <Search getUserInput={getUserInput} sendUserInput={sendUserInput} />
        {/* {console.log("data", data)} */}
        {dataReady ? <SubredditDisplay data={data[0]} /> : null}
      </div>
    </div>
  );
}

export default App;
