import { Router } from "express";
import { signedCookie } from "cookie-parser";

export function ArticleApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const article = await mongoDatabase
      .collection("article")
      .find()
      .map(({ title, author, topic, text, date }) => ({
        title,
        author,
        topic,
        text,
        date,
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

  router.put("/", (req, res) => {
    const { title, author, topic, text } = req.body;
    const { microsoft_access_token } = signedCookie;

    const query = {
      title: title,
    };

    mongoDatabase
      .collection("article")
      .update(query, { $set: { author, topic, text, date: new Date() } });
  });

  return router;
}
