import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../lib/formInput";
import { articleContext } from "../context/articleContext";

export function CreateNewArticle({ user }) {
  const { createArticle } = useContext(articleContext);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [topic, setTopic] = useState("");
  const [text, setText] = useState("");
  const [username, setUsername] = useState(user.microsoft?.name);
  const [error, setError] = useState();

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const result = createArticle({
      title,
      author,
      topic,
      text,
      username,
    });

    try {
      if (title === "" || author === "" || topic === "" || text === "") {
        setError("Du må fylle");
        return;
      }
      await result;
      navigate("/");
    } catch (error) {
      console.error("ERROR: ", error);
      setError("Du er ikke pålogget");
    }
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
        {error && <div>{error}</div>}
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}
