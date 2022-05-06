import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../lib/formInput";
import { articleContext } from "../context/articleContext";

export function UpdateArticle({ user, reload }) {
  const { updateArticle } = useContext(articleContext);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [topic, setTopic] = useState("");
  const [text, setText] = useState("");
  const [username, setUsername] = useState(user.microsoft?.name);
  const [error, setError] = useState();

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const result = updateArticle({
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
      reload();
      navigate("/");
    } catch (error) {
      console.error("ERROR: ", error);
      setError("Bare han som har skrevet articlen kan endre");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Update your article (Only School account)</h1>
        <FormInput
          label={"which article? Title:"}
          value={title}
          onChangeValue={setTitle}
        />
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
