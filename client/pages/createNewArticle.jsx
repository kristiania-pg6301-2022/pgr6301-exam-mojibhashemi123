import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../lib/formInput";
import { articleContext } from "../context/articleContext";

export function CreateNewArticle() {
  const { createArticle } = useContext(articleContext);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [topic, setTopic] = useState("");
  const [text, setText] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    createArticle({
      title,
      author,
      topic,
      text,
    });
    navigate("/");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Add new article</h1>
        <FormInput label={"Title:"} value={title} onChangeValue={setTitle} />
        <FormInput label={"Topics:"} value={topic} onChangeValue={setTopic} />
        <FormInput label={"Author:"} value={author} onChangeValue={setAuthor} />
        <strong>Text area:</strong>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}
