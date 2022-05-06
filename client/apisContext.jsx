import React from "react";
import { fetchJSON } from "./lib/fetchJSON";
import { postJSON } from "./lib/postJSON";

export const APIsContext = React.createContext({
  async fetchLogin() {
    return await fetchJSON("/api/login");
  },

  async registerLogin(provider, token) {
    return await postJSON(`/api/login/${provider}`, token);
  },

  async endSession() {
    const res = await fetch("/api/login", { method: "DELETE" });
    if (!res.ok) {
      throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
    }
  },
});
