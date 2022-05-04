import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { FormInput } from "../lib/formInput";

import "../css/loginWithLocalUser.css";

export function LoginWithLocalUser() {
  const { loginSession } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const result = loginSession({ email, password });

    try {
      await result;
      navigate("/");
    } catch (error) {
      console.error("ERROR: ", error);
      setError("Du har tastet feil eller må du registerere deg");
    }
  }

  return (
    <div className={"loginDiv"}>
      <form onSubmit={handleSubmit}>
        <FormInput label={"Email:"} value={email} onChangeValue={setEmail} />
        <FormInput
          label={"Password:"}
          value={password}
          onChangeValue={setPassword}
        />
        {error && <div>{error}</div>}
        <div>
          <button>Log in</button>
        </div>
      </form>
    </div>
  );
}
