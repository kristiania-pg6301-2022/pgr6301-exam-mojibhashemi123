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

  return router;
}
