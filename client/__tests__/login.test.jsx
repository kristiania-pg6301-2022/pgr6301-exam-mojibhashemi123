import ReactDOM from "react-dom";
import React from "react";
import { LoginPage } from "../pages/loginPage";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { APIsContext } from "../apisContext";

jest.mock("../css/loginWithLocalUser.css", () => jest.fn());

describe("login page", () => {
  it("redirect to log in with google", async () => {
    //replace window.location to be able to detect redirects
    const location = new URL("https://www.example.com");
    delete window.location;
    window.location = new URL(location);

    const authorization_endpoint = `https://foo.example.com/auth`;
    const client_id = `test.apps.googleusercontent.com`;

    const domElement = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <LoginPage
          config={{
            google: { authorization_endpoint, client_id },
            client_id,
          }}
        />
      </MemoryRouter>,
      domElement
    );

    await act(async () => {
      await Simulate.click(domElement.querySelector("button"));
    });

    const redirect_uri = `${location.origin}/login/google/callback`;
    expect(window.location.origin + window.location.pathname).toEqual(
      authorization_endpoint
    );
    const params = Object.fromEntries(
      new URLSearchParams(window.location.search.substring(1))
    );
    expect(params).toMatchObject({ client_id, redirect_uri });
  });
});
