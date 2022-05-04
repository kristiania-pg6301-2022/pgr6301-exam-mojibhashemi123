import { Router } from "express";

export function RegisterApi(mongoDatabase) {
  const router = new Router();

  router.post("/", (req, res) => {
    const { name, username, email, password } = req.body;

    mongoDatabase
      .collection("users")
      .insertOne({ name, username, email, password });
    res.sendStatus(200);
  });

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const users = await mongoDatabase
      .collection("users")
      .find()
      .map(({ email, password }) => ({
        email,
        password,
      }))
      .limit(100)
      .toArray();

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      res.cookie("email_access_token", user.email, { signed: true });
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  });

  return router;
}
