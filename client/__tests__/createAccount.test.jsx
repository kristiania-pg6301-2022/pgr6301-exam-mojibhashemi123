import { CreateAccount } from "../pages/createAccount";
import ReactDOM from "react-dom";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Simulate } from "react-dom/test-utils";
import { UserContext } from "../context/userContext";

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

  it("adds account on submit", () => {
    const createAccount = jest.fn();
    const name = "Samira";
    const element = document.createElement("div");
    const reload = jest.fn();
    ReactDOM.render(
      <UserContext.Provider value={{ createAccount }}>
        <MemoryRouter>
          <CreateAccount reload={reload} />
        </MemoryRouter>
      </UserContext.Provider>,
      element
    );
    Simulate.change(element.querySelector(".form-input input"), {
      target: { value: name },
    });

    Simulate.change(element.querySelector(".form-input:nth-of-type(2) input"), {
      target: { value: "Samira123" },
    });

    Simulate.change(element.querySelector(".form-input:nth-of-type(3) input"), {
      target: { value: "samira@hotmail.com" },
    });

    Simulate.change(element.querySelector(".form-input:nth-of-type(4) input"), {
      target: { value: "password123" },
    });

    Simulate.submit(element.querySelector("form"));
    expect(createAccount).toBeCalledWith({
      name,
      username: "Samira123",
      email: "samira@hotmail.com",
      password: "password123",
    });
  });
});
