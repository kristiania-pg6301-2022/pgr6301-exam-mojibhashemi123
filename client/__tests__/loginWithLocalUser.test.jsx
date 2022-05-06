import { LoginWithLocalUser } from "../pages/loginWithLocalUser";
import ReactDOM from "react-dom";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { UserContext } from "../context/userContext";
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

  it("on submit login", () => {
    const loginSession = jest.fn();
    const element = document.createElement("div");
    const reload = jest.fn();
    ReactDOM.render(
      <UserContext.Provider value={{ loginSession }}>
        <MemoryRouter>
          <LoginWithLocalUser reload={reload} />
        </MemoryRouter>
      </UserContext.Provider>,
      element
    );
    Simulate.change(element.querySelector(".form-input input"), {
      target: { value: "email@hotmail.com" },
    });

    Simulate.change(element.querySelector(".form-input:nth-of-type(2) input"), {
      target: { value: "password123" },
    });

    Simulate.submit(element.querySelector("form"));
    expect(loginSession).toBeCalledWith({
      email: "email@hotmail.com",
      password: "password123",
    });
  });
});
