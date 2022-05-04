import React from "react";
import { fetchJSON } from "../lib/fetchJSON";
import { postJSON } from "../lib/postJSON";

export const UserContext = React.createContext({
  async fetchLocalUser() {
    return await fetchJSON("/api/register");
  },

  async createAccount(account) {
    return await postJSON("/api/register", account);
  },

  async loginSession(token) {
    return await postJSON("/api/register/login", token);
  },

  async endLocalSession() {
    const res = await fetch("/api/register", { method: "DELETE" });
    if (!res.ok) {
      throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
    }
  },
});
