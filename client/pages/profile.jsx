import React from "react";
export function Profile({ user }) {
  if (user.google) {
    return (
      <div className={"card"}>
        <h1>You are signed with google account</h1>
        <ShowProfile
          name={user.google.name}
          picture={user.google.picture}
          email={user.google.email}
        />
      </div>
    );
  } else if (user.microsoft) {
    return (
      <div className={"card"}>
        <h1>You are signed with school account</h1>
        <ShowProfile
          name={user.microsoft.name}
          picture={user.microsoft.picture}
          email={user.microsoft.email}
        />
      </div>
    );
  } else if (user.email) {
    const name = user.email.map((u) => u.name);
    const email = user.email.map((u) => u.email);
    return (
      <div className={"card"}>
        <h1>You are signed with local account</h1>
        <ShowProfile name={name} email={email} />
      </div>
    );
  }
}

function ShowProfile({ name, picture, email }) {
  return (
    <main>
      <div className="row">
        <div className="column">
          <div className="card">
            <img src={picture} alt={"Profile picture"} />
          </div>
          <h3>Name: {name}</h3>
          <h4>Email: {email}</h4>
        </div>
      </div>
    </main>
  );
}
