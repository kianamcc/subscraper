import React from "react";
import { screen, cleanup, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SubredditDisplay from "../SubredditDisplay";
import { after } from "cheerio/lib/api/manipulation";

const data = {
  name: "Cats",
  url: "cats.com",
  about: "A community for cat lovers",
  members: "10,000",
  online_members: "1,342",
  img: "",
  age: "Created 2012",
  posts: [
    {
      id: 123,
      number: 1,
      title: "Benny's adoption",
      upvotes: 19,
      comments: 2,
      timestamp: "6 months ago",
    },
    {
      id: 62,
      number: 2,
      title: "Is Meow Mix good for cats?",
      upvotes: 421,
      comments: 59,
      timestamp: "8 months ago",
    },
  ],
  new_posts: [
    {
      id: 19,
      number: 1,
      title: "What does this mean?",
      upvotes: 1,
      comments: "no comments yet",
      timestamp: "1 minute ago",
    },
  ],
  rising_posts: [
    {
      id: 20,
      number: 1,
      title: "Meet Oreo the tuxedo!",
      upvotes: 28,
      comments: 59,
      timestamp: "2 seconds ago",
    },
  ],
  controversial_posts: [
    {
      id: 22,
      number: 1,
      title: "Some controversial topic",
      upvotes: 3,
      comments: 22,
      timestamp: "3 hours ago",
    },
  ],
  discord: "cats.discord",
};

describe("Display tests", () => {
  afterEach(() => {
    cleanup();
  });

  it("Component renders with given data", () => {
    const div = document.createElement("div");
    render(<SubredditDisplay data={data} />, div);
  });

  describe("Test dropdown", () => {
    it("Dropdown should render", () => {
      render(<SubredditDisplay data={data} />);
      const dropdownElement = screen.getByTestId("dropdown");
      expect(dropdownElement).toBeInTheDocument();
    });

    it("Dropdown contains correct options", () => {
      render(<SubredditDisplay data={data} />);
      expect(screen.getByText("Hot Posts")).toBeTruthy();
      expect(screen.getByText("New Posts")).toBeTruthy();
      expect(screen.getByText("Rising Posts")).toBeTruthy();
      expect(screen.getByText("Controversial Posts")).toBeTruthy();
    });

    it("Should correctly set default option", () => {
      render(<SubredditDisplay data={data} />);
      const dropdownElement = screen.getByTestId("dropdown");
      userEvent.selectOptions(dropdownElement, "hot");
    });
  });
});
