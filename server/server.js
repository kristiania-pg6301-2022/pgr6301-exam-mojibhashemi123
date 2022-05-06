import express from "express";
import * as path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import cookieParser from "cookie-parser";
import { LoginApi } from "./LoginApi.js";
import { RegisterApi } from "./registerApi.js";
import { ArticleApi } from "./articleApi.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const mongoClient = new MongoClient(process.env.MONGODB_URL);

mongoClient.connect().then(async () => {
  console.log("Connected to mongodb");
  app.use(
    "/api/register",
    RegisterApi(mongoClient.db(process.env.MONGODB_DATABASE_USERS))
  );

  app.use(
    "/api/login",
    LoginApi(mongoClient.db(process.env.MONGODB_DATABASE_USERS))
  );

  app.use(
    "/api/article",
    ArticleApi(mongoClient.db(process.env.MONGODB_DATABASE_ARTICLE))
  );
});

app.use(express.static("../client/dist/"));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
});
