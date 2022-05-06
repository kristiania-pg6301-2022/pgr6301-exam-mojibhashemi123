import React from "react";
import ReactDOM from "react-dom";
import { ListArticle } from "../pages/listArticle";

describe("ListArticle component", () => {
  it("shows loading screen", () => {
    const domElement = document.createElement("div");
    ReactDOM.render(<ListArticle />, domElement);
    expect(domElement.innerHTML).toMatchSnapshot();
  });
});
