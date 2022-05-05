import React from "react";
import { fetchJSON } from "../lib/fetchJSON";
import { postJSON } from "../lib/postJSON";

export const articleContext = React.createContext({
  async fetchArticle() {
    return await fetchJSON("/api/article");
  },

  async createArticle(article) {
    return await postJSON("/api/article", article);
  },

  async updateArticle(update) {
    const res = await fetch("/api/article", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(update),
    });
    if (!res.ok) {
      throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
    }
  },
});
