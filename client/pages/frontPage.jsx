import React from "react";
import { Link } from "react-router-dom";

export function FrontPage() {
  return (
    <div>
      <h1>news article</h1>
      <ul>
        <li>
          <Link to={"/article"}>Show news article</Link>
        </li>
        <li>
          <Link to={"/article/new"}>Add new article</Link>
        </li>
      </ul>
    </div>
  );
}
