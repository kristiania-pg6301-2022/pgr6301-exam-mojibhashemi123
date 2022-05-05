import React from "react";
import { postJSON } from "../lib/postJSON";

export const UserContext = React.createContext({
  async createAccount(account) {
    return await postJSON("/api/register", account);
  },

  async loginSession(token) {
    return await postJSON("/api/register/login", token);
  },
});
