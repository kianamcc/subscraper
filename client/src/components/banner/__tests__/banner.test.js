import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Banner from "../Banner";

afterEach(() => {
  cleanup();
});

it("Banner component renders", () => {
  // create div element and render the component at div
  const div = document.createElement("div");
  render(<Banner />, div);
});

describe("Banner component contains correct text", () => {
  it("Banner heading contains correct text", () => {
    render(<Banner />);
    const headingElement = screen.getByTestId("bannerheading");
    expect(headingElement).toHaveTextContent("Subscraper");
  });

  it("Banner description contains correct text", () => {
    render(<Banner />);
    const descriptionElement = screen.getByTestId("bannerdescription");
    expect(descriptionElement).toHaveTextContent(
      "Subscraper provides a quick and easy way to view a subreddit's data."
    );

    expect(descriptionElement).toHaveTextContent(
      "Type in your subreddit of interest and view it's information!"
    );

    expect(descriptionElement).toHaveTextContent(
      "Whether it's the hot posts, the new posts, or the rising posts of a subreddit, see what kind of posts are on the rise!"
    );

    expect(descriptionElement).toHaveTextContent(
      "Scroll down or click the button below to start:"
    );
  });
});

describe("Banner button tests", () => {
  const handleStartBtnClick = jest.fn();

  it("Banner button contains correct text", () => {
    render(<Banner />);
    const btnElement = screen.getByTestId("bannerbtn");
    expect(btnElement).toHaveTextContent("Start");
  });

  it("Banner button calls handleStartBtnClick function upon click", () => {
    render(<Banner handleStartBtnClick={handleStartBtnClick} />);
    const bannerBtn = screen.getByTestId("bannerbtn");
    fireEvent.click(bannerBtn);
    expect(handleStartBtnClick).toHaveBeenCalledTimes(1);
  });
});
