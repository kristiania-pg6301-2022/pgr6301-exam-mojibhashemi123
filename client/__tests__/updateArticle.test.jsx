import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { UpdateArticle } from "../pages/updateArticle";
import { articleContext } from "../context/articleContext";
import { Simulate } from "react-dom/test-utils";
import { CreateNewArticle } from "../pages/createNewArticle";

describe("update article", () => {
  const user = {
    microsoft: {
      name: "Kai Johnson",
    },
  };

  it("shows update article form", () => {
    const element = document.createElement("div");
    const reload = jest.fn();

    ReactDOM.render(
      <MemoryRouter>
        <UpdateArticle user={user} reload={reload} />
      </MemoryRouter>,
      element
    );
    expect(element.innerHTML).toMatchSnapshot();
    expect(
      Array.from(element.querySelectorAll("form label strong")).map(
        (e) => e.innerHTML
      )
    ).toEqual(["which article? Title:", "Topics:", "Author:"]);

    expect(
      Array.from(element.querySelectorAll("textarea")).map((e) => e.innerHTML)
    ).toEqual([""]);
  });

  it("update article on submit", () => {
    const updateArticle = jest.fn();
    const title = "title";
    const element = document.createElement("div");
    const reload = jest.fn();
    ReactDOM.render(
      <articleContext.Provider value={{ updateArticle }}>
        <MemoryRouter>
          <UpdateArticle user={user} reload={reload} />
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
    expect(updateArticle).toBeCalledWith({
      title,
      topic: "topic1",
      author: "athor1",
      text: "text1",
      username: "Kai Johnson",
    });
  });
});
