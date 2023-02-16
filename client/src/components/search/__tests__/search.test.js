import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Search from "../Search";

afterEach(() => {
  cleanup();
});

it("Search component renders", () => {
  const div = document.createElement("div");
  render(<Search />, div);
});

it("Input box placeholder contains correct text", () => {
  render(<Search />);
  const inputBoxElement = screen.getByTestId("inputbox");
  expect(inputBoxElement).toHaveAttribute(
    "placeholder",
    "Enter subreddit name"
  );
});
