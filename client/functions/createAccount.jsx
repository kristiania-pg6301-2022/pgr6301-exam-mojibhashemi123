import { FormInput } from "../lib/formInput";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export function CreateAccount() {
  const { createAccount } = useContext(UserContext);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    createAccount({ name, username, email, password });
    navigate("/login");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add new movie</h1>

      <FormInput label={"First Name:"} value={name} onChangeValue={setName} />
      <FormInput
        label={"Username:"}
        value={username}
        onChangeValue={setUsername}
      />
      <FormInput label={"Email:"} value={email} onChangeValue={setEmail} />
      <FormInput
        label={"Password:"}
        value={password}
        onChangeValue={setPassword}
      />

      <div>
        <button>Submit</button>
      </div>
    </form>
  );
}
