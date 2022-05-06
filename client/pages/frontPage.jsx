import React from "react";
import { Link } from "react-router-dom";

export function FrontPage() {
  return (
    <div id="frontpage">
      <h1>news article</h1>
      <ul>
        <li>
          <Link to={"/"}>Show news article</Link>
        </li>
        <li>
          <Link to={"/article/new"}>Add new article</Link>
        </li>
        <li>
          <Link to={"/article/update"}>Update your Article</Link>
        </li>
      </ul>
    </div>
  );
}
