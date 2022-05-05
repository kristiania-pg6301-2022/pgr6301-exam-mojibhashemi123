import { Router } from "express";

export function ArticleApi(mongoDatabase) {
  const router = new Router();

  router.post("/", (req, res) => {
    const { title, author, topic, text } = req.body;

    mongoDatabase
      .collection("article")
      .insertOne({ title, author, topic, text, date: new Date() });
    res.sendStatus(200);
  });

  return router;
}
