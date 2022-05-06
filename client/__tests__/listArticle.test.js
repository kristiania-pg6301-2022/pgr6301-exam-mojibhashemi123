import React from "react";
import ReactDOM from "react-dom";
import { ArticleCard, ListArticle } from "../pages/listArticle";
import { articleContext } from "../context/articleContext";
import { act } from "react-dom/test-utils";

describe("ListArticle component", () => {
  it("shows loading screen", () => {
    const domElement = document.createElement("div");
    ReactDOM.render(<ListArticle />, domElement);
    expect(domElement.innerHTML).toMatchSnapshot();
  });

  it("shows error message", async () => {
    const domElement = document.createElement("div");
    await act(async () => {
      const fetchArticle = () => {
        throw new Error("Something went wrong");
      };
      ReactDOM.render(
        <articleContext.Provider value={{ fetchArticle }}>
          <ListArticle />
        </articleContext.Provider>,
        domElement
      );
    });

    expect(domElement.querySelector("#error-text").innerHTML).toEqual(
      "Error: Something went wrong"
    );
    expect(domElement.innerHTML).toMatchSnapshot();
  });

  it("shows article", async () => {
    const articles = [
      { title: "article1" },
      { author: "author1" },
      { topic: "topics" },
      { text: "text" },
      { date: "time" },
    ];
    const domElement = document.createElement("div");
    await act(async () => {
      ReactDOM.render(
        <articleContext.Provider value={{ fetchArticle: () => articles }}>
          <ArticleCard articles={articles} />
        </articleContext.Provider>,
        domElement
      );
    });
    expect(
      Array.from(domElement.querySelectorAll("h3")).map((e) => e.innerHTML)
    ).toEqual(["Title: "]);
    expect(domElement.innerHTML).toMatchSnapshot();

    expect(
      Array.from(domElement.querySelectorAll("h4")).map((e) => e.innerHTML)
    ).toEqual(["Author: "]);
    expect(domElement.innerHTML).toMatchSnapshot();

    expect(
      Array.from(domElement.querySelectorAll("div")).map((e) => e.innerHTML)
    ).toEqual(["Topic: "]);
    expect(domElement.innerHTML).toMatchSnapshot();

    expect(
      Array.from(domElement.querySelectorAll("h6")).map((e) => e.innerHTML)
    ).toEqual(["Date: "]);
    expect(domElement.innerHTML).toMatchSnapshot();
  });
});
