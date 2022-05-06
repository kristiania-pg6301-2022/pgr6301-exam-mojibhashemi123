import { Router } from "express";

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
    const { title, author, topic, text, username } = req.body;

    const { google_access_token, microsoft_access_token } = req.signedCookies;

    if (google_access_token || microsoft_access_token) {
      mongoDatabase.collection("article").insertOne({
        title,
        author,
        topic,
        text,
        date: new Date(),
        username: username,
      });
      res.sendStatus(200);
    } else {
      return res.status(401).send("Unauthorized");
    }
  });

  router.put("/", async (req, res) => {
    const { title, author, topic, text, username } = req.body;

    const query = {
      title: title,
    };

    const validation = await mongoDatabase
      .collection("article")
      .find()
      .map(({ title, username }) => ({
        title,
        username,
      }))
      .toArray();

    const user = validation.find(
      (v) => v.title === title && v.username === username
    );

    if (user) {
      mongoDatabase
        .collection("article")
        .update(query, { $set: { author, topic, text, date: new Date() } });

      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  });

  return router;
}
