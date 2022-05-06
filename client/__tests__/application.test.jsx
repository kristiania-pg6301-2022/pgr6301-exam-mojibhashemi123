import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { APIsContext } from "../apisContext";
import { Application } from "../application";

jest.mock("../css/application.css", () => jest.fn());
jest.mock("../css/loginWithLocalUser.css", () => jest.fn());

describe("fetch users", () => {
  describe("fetchlogin component", () => {
    it("shows loading screen", () => {
      const domElement = document.createElement("div");
      ReactDOM.render(<Application />, domElement);
      expect(domElement.innerHTML).toMatchSnapshot();
    });

    it("shows error message", async () => {
      const domElement = document.createElement("div");
      await act(async () => {
        const fetchLogin = () => {
          throw new Error("Something went wrong");
        };
        ReactDOM.render(
          <APIsContext.Provider value={{ fetchLogin }}>
            <Application />
          </APIsContext.Provider>,
          domElement
        );
      });

      expect(domElement.querySelector("#error-text").innerHTML).toEqual(
        "Error: Something went wrong"
      );
      expect(domElement.innerHTML).toMatchSnapshot();
    });
  });
});
