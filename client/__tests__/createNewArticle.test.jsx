import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { CreateNewArticle } from "../pages/createNewArticle";
import { articleContext } from "../context/articleContext";
import { Simulate } from "react-dom/test-utils";

describe("add article component", () => {
  const user = {
    microsoft: {
      name: "Kai Johnson",
    },
  };

  it("shows article form", () => {
    const element = document.createElement("div");
    const reload = jest.fn();

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

  it("adds article on submit", () => {
    const createArticle = jest.fn();
    const title = "Article1";
    const element = document.createElement("div");
    const reload = jest.fn();
    ReactDOM.render(
      <articleContext.Provider value={{ createArticle }}>
        <MemoryRouter>
          <CreateNewArticle user={user} reload={reload} />
        </MemoryRouter>
      </articleContext.Provider>,
      element
    );
    Simulate.change(element.querySelector(".form-input input"), {
      target: { value: title },
    });

    Simulate.change(element.querySelector(".form-input:nth-of-type(2) input"), {
      target: { value: "topic1" },
    });

    Simulate.change(element.querySelector(".form-input:nth-of-type(3) input"), {
      target: { value: "athor1" },
    });

    Simulate.change(element.querySelector("textarea"), {
      target: { value: "text1" },
    });

    Simulate.submit(element.querySelector("form"));
    expect(createArticle).toBeCalledWith({
      title,
      topic: "topic1",
      author: "athor1",
      text: "text1",
      username: "Kai Johnson",
    });
  });
});
