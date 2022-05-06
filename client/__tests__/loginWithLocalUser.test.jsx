import { LoginWithLocalUser } from "../pages/loginWithLocalUser";
import ReactDOM from "react-dom";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { CreateAccount } from "../pages/createAccount";
import { Simulate } from "react-dom/test-utils";

jest.mock("../css/loginWithLocalUser.css", () => jest.fn());

describe("login component", () => {
  it("shows local login form", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <LoginWithLocalUser />
      </MemoryRouter>,
      element
    );
    expect(element.innerHTML).toMatchSnapshot();
    expect(
      Array.from(element.querySelectorAll("form label strong")).map(
        (e) => e.innerHTML
      )
    ).toEqual(["Email:", "Password:"]);
  });
});
