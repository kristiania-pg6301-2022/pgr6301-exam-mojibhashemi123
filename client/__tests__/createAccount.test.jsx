import { CreateAccount } from "../pages/createAccount";
import ReactDOM from "react-dom";
import React from "react";
import { MemoryRouter } from "react-router-dom";

describe("add account component", () => {
  it("shows account form", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <CreateAccount />
      </MemoryRouter>,
      element
    );
    expect(element.innerHTML).toMatchSnapshot();
    expect(
      Array.from(element.querySelectorAll("form label strong")).map(
        (e) => e.innerHTML
      )
    ).toEqual(["First Name:", "Username:", "Email:", "Password:"]);
  });
});
