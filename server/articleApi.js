import { Router } from "express";

export function ArticleApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const article = await mongoDatabase
      .collection("article")
      .find()
      .map(({ title, author, topic, text }) => ({
        title,
        author,
        topic,
        text,
      }))
      .toArray();
    res.json(article);
  });

  router.post("/", (req, res) => {
    const { title, author, topic, text } = req.body;

    mongoDatabase
      .collection("article")
      .insertOne({ title, author, topic, text, date: new Date() });
    res.sendStatus(200);
  });

  return router;
}
