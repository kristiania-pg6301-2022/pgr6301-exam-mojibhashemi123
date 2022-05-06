import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { FrontPage } from "../pages/frontPage";

describe("FrontPage", () => {
  it("shows FrontPage", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <FrontPage />
      </MemoryRouter>,
      element
    );
    expect(element.querySelector("h1").innerHTML).toEqual("news article");
    expect(element.innerHTML).toMatchSnapshot();
  });
});
