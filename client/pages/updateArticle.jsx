import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../lib/formInput";
import { articleContext } from "../context/articleContext";

export function UpdateArticle() {
  const { updateArticle } = useContext(articleContext);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [topic, setTopic] = useState("");
  const [text, setText] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    updateArticle({
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
        <h1>Update your article</h1>
        <FormInput
          label={"which article? Title:"}
          value={title}
          onChangeValue={setTitle}
        />
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
