import ReactDOM from "react-dom";
import React from "react";
import { Profile } from "../pages/profile";
import { MemoryRouter } from "react-router-dom";

describe("profile", () => {
  it("show profile for google", () => {
    const user = {
      user: {
        google: {
          name: "NameTest",
          picture:
            "https://lh3.googleusercontent.com/a-/AOh14Ghh70gSuO_xtuhlK-4jZkflx-T6oHibukhQX7ul=s96-c",
          email: "test@test.com",
        },
      },
    };

    const domElement = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <Profile user={user?.user} />
      </MemoryRouter>,
      domElement
    );

    expect(
      Array.from(domElement.querySelectorAll("h1")).map((e) => e.innerHTML)
    ).toEqual(["You are signed with google account"]);

    expect(domElement.innerHTML).toMatchSnapshot();
  });

  it("show profile for microsoft", () => {
    const user = {
      user: {
        microsoft: {
          name: "testName2",
          picture:
            "https://lh3.googleusercontent.com/a-/AOh14Ghh70gSuO_xtuhlK-4jZkflx-T6oHibukhQX7ul=s96-c",
          email: "test@hotmail.com",
        },
      },
    };

    const domElement = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <Profile user={user?.user} />
      </MemoryRouter>,
      domElement
    );

    expect(
      Array.from(domElement.querySelectorAll("h3")).map((e) => e.innerHTML)
    ).toEqual(["Name: testName2"]);

    expect(domElement.innerHTML).toMatchSnapshot();
  });
});
