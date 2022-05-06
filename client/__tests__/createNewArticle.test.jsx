import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { CreateNewArticle } from "../pages/createNewArticle";

describe("add article component", () => {
  it("shows movies form", () => {
    const element = document.createElement("div");
    const reload = jest.fn();
    const user = {
      name: "Kai Johnson",
    };

    ReactDOM.render(
      <MemoryRouter>
        <CreateNewArticle user={user} reload={reload} />
      </MemoryRouter>,
      element
    );
    expect(element.innerHTML).toMatchSnapshot();
    expect(
      Array.from(element.querySelectorAll("form label strong")).map(
        (e) => e.innerHTML
      )
    ).toEqual(["Title:", "Topics:", "Author:"]);
  });
});
