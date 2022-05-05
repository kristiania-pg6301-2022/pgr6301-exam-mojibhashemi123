import { useContext, useEffect, useState } from "react";
import { articleContext } from "../context/articleContext";
import { useLoading } from "../useLoading";
import { Link, Route, Routes } from "react-router-dom";
let articles = [];
export function ListArticle() {
  const { fetchArticle } = useContext(articleContext);

  const { data, error, loading, reload } = useLoading(fetchArticle);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div id="error-text">{error.toString()}</div>
      </div>
    );
  }

  function handleClick() {
    document.getElementById("sidebar").classList.toggle("active");
  }

  function ListSideBar(event) {
    document.getElementById("sidebar").classList.toggle("dd");
    if (event) {
      console.log(event);

      articles = [];

      data.map((article, index) => {
        if (article.topic === event) {
          document.getElementById("sidebar").classList.toggle("dd");
          console.log(article.title + " fra sidebar");
          articles.push(article);
          //return ShowMatch(articles);
        }
      });
    }
  }
  let listTopic = Array.from(new Set(data.map((t) => t.topic)));

  return (
    <div id="#container2">
      <div id="sidebar" onClick={({ target }) => handleClick(target)}>
        <h1>Articles</h1>
        <div className={"toggle-btn"}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul>
          {listTopic.map((topic, index) => (
            <li onClick={({ target }) => ListSideBar(topic)}>
              <Link to={"/ShowMatch"}>{topic}</Link>
            </li>
          ))}
        </ul>
      </div>
      <h1></h1>
    </div>
  );
}

export function ShowMatch() {
  return (
    <div id="container2">
      {articles.map((articles, index) => (
        //for feil meldinger i browser bruk index
        <ArticleCard key={index} articles={articles} />
      ))}
    </div>
  );
}

function ArticleCard({ articles: { title, author, topic, text, date } }) {
  return (
    <>
      <h3>Title: {title}</h3>
      <h4>Author: {author}</h4>
      <div>Topic: {topic}</div>
      <p>Text: {text}</p>
      <h6>Date: {date}</h6>
      <p>
        -------------------------------------------------------------------------------------------------------------------------------------------------------------
      </p>
    </>
  );
}
