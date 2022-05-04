import React, { useContext, useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { APIsContext } from "../apisContext";
import { randomString } from "../lib/randomString";
import { sha256 } from "../lib/sha256";
import { LoginWithLocalUser } from "./loginWithLocalUser";

export function LoginCallback({ reload, config }) {
  const { provider } = useParams();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { registerLogin } = useContext(APIsContext);
  useEffect(async () => {
    const { access_token, error, error_description, state, code } =
      Object.fromEntries(
        new URLSearchParams(window.location.hash.substring(1))
      );

    const expected_state = window.sessionStorage.getItem("expected_state");
    if (!state || expected_state !== state) {
      setError("Unexpected state");
      return;
    }

    if (error || error_description) {
      setError(`Error: ${error} (${error_description})`);
      return;
    }

    if (code) {
      const { client_id, token_endpoint } = config[provider];
      const code_verifier = window.sessionStorage.getItem("code_verifier");

      let hostname =
        window.location.protocol +
        "//" +
        window.location.hostname +
        (window.location.port == "" ? "" : ":") +
        window.location.port;

      const payload = {
        grant_type: "authorization_code",
        code,
        client_id,
        redirect_uri: hostname + "/login/microsoft/callback",
        code_verifier,
      };
      const res = await fetch(token_endpoint, {
        method: "POST",
        body: new URLSearchParams(payload),
      });
      if (!res.ok) {
        setError(`Failed to fetch token ${res.status}: ${await res.text()}`);
        return;
      }
      const { access_token } = await res.json();
      await registerLogin(provider, { access_token });
      reload();
      navigate("/");
      return;
    }

    if (!access_token) {
      setError("Missing access_token");
      return;
    }

    await registerLogin(provider, { access_token });
    reload();
    navigate("/");
  }, []);

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div>{error.toString()}</div>
      </div>
    );
  }

  return <h1>Please wait...</h1>;
}

export function EndSession({ reload }) {
  const navigate = useNavigate();
  const { endSession } = useContext(APIsContext);
  useEffect(async () => {
    await endSession();
    reload();
    navigate("/");
  });
  return <h1>Please wait...</h1>;
}

function LoginButton({ config, label, provider }) {
  async function handleLogin() {
    const {
      authorization_endpoint,
      response_type,
      scope,
      client_id,
      code_challenge_method,
    } = config[provider];

    const state = randomString(50);
    window.sessionStorage.setItem("expected_state", state);

    const parameters = {
      response_type,
      response_mode: "fragment",
      client_id,
      state,
      scope,
      redirect_uri: `${window.location.origin}/login/${provider}/callback`,
    };

    if (code_challenge_method) {
      const code_verifier = randomString(50);
      window.sessionStorage.setItem("code_verifier", code_verifier);
      parameters.code_challenge_method = code_challenge_method;
      parameters.code_challenge = await sha256(code_verifier);
    }

    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(parameters);
  }

  return (
    <div>
      <button onClick={handleLogin}>{label}</button>
    </div>
  );
}

export function StartLogin({ config, reload }) {
  return (
    <div>
      <h1>Choice login</h1>
      <Link to={"/account/new"}>
        <h1>Sign up</h1>
      </Link>
      <LoginWithLocalUser reload={reload} />
      <LoginButton
        label={"Login with Google"}
        config={config}
        provider={"google"}
      />
      <LoginButton
        label={"Login with school account"}
        config={config}
        provider={"microsoft"}
      />
    </div>
  );
}

export function LoginPage({ config, reload }) {
  return (
    <Routes>
      <Route
        path={"/"}
        element={<StartLogin config={config} reload={reload} />}
      />
      <Route
        path={"/:provider/callback"}
        element={<LoginCallback config={config} reload={reload} />}
      />
      <Route path={"/endsession"} element={<EndSession reload={reload} />} />
      <Route path={"*"} element={<StartLogin config={config} />} />
    </Routes>
  );
}
