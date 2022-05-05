import React from "react";
import { fetchJSON } from "../lib/fetchJSON";
import { postJSON } from "../lib/postJSON";

export const articleContext = React.createContext({
  async listArticle() {
    return await fetchJSON("/api/article");
  },

  async createArticle(article) {
    return await postJSON("/api/article", article);
  },
});
