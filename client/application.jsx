import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import React, { useContext } from "react";
import { FrontPage } from "./pages/frontPage";
import { LoginPage } from "./pages/loginPage";
import { APIsContext } from "./apisContext";
import { useLoading } from "./useLoading";

import "./css/application.css";
import { Profile } from "./pages/profile";
import { CreateAccount } from "./functions/createAccount";

export function UserActions({ user }) {
  if (!user || Object.keys(user).length === 0) {
    return <Link to={"/login"}>Login</Link>;
  }

  if (user.google?.name) {
    return (
      <>
        <Link to={"/profile"}>{`Profile for ${user.google.name}`}</Link>
        <Link to={"/login/endsession"}>Log out</Link>
      </>
    );
  } else if (user.microsoft?.name) {
    return (
      <>
        <Link to={"/profile"}>{"Profile for " + user.microsoft.name}</Link>
        <Link to={"/login/endsession"}>Log out</Link>
      </>
    );
  } else if (user.email) {
    const name = user.email.map((u) => u.name);
    return (
      <>
        <Link to={"/profile"}>{"Profile for " + name}</Link>
        <Link to={"/login/endsession"}>Log out</Link>
      </>
    );
  }
}

function ListArticle() {
  return null;
}

function AddNewArticle() {
  return null;
}

export function Application() {
  const { fetchLogin } = useContext(APIsContext);

  const { data, error, loading, reload } = useLoading(fetchLogin);

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }
  if (loading) {
    return <div>Please wait...</div>;
  }

  return (
    <BrowserRouter>
      <header>
        <Link to={"/"}>Front Page</Link>
        <Link to={"/article"}>List article</Link>
        <div className="menu-divider" />
        <UserActions user={data?.user} />
      </header>

      <main>
        <Routes>
          <Route path={"/"} element={<FrontPage />} />
          <Route path={"/article"} element={<ListArticle />} />
          <Route path={"/article/new"} element={<AddNewArticle />} />

          <Route
            path={"/account/new"}
            element={<CreateAccount reload={reload} />}
          />
          <Route
            path={"/login/*"}
            element={<LoginPage config={data.config} reload={reload} />}
          />
          <Route path={"/profile"} element={<Profile user={data?.user} />} />
          <Route path={"*"} element={<h1>Not found</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
