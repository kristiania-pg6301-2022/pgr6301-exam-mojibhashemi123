import request, { agent } from "supertest";
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser, { signedCookie } from "cookie-parser";
import { LoginApi } from "../LoginApi.js";
import { ArticleApi } from "../articleApi.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const mongoClient = new MongoClient(process.env.MONGODB_URL);
beforeAll(async () => {
  await mongoClient.connect();
  const database = mongoClient.db("test_database");
  await database.collection("movies").deleteMany({});
  app.use("/api/article", ArticleApi(database));
  app.use("/api/login", LoginApi());
  app.use(cookieParser());
});
afterAll(() => {
  mongoClient.close();
});

describe("article api", () => {
  beforeAll(async () => {
    await request.agent(app).post("/api/login/google").send({
      access_token: "s:ya29.A0ARrdaM9XGD_2aN1nBV",
    });
  });

  it("adds a new account with signedCookies", async () => {
    const title = "Some title";
    const author = "author";
    const topic = "Car";
    const text = "Text";
    const username = { username: "username" };

    await request.agent(app).post("/api/login/google").send({
      access_token: "s:ya29.A0ARrdaM9XGD_2aN1nBV",
    });

    expect(
      await request(app)
        .post("/api/article")
        .send({ title, author, topic, text, username })
        .set(
          "cookie",
          "google_access_token=s%3A%22s%3Aya29.A0ARrdaM9XGD_2aN1nBV%22.DZvs%2FPNxsJYlCbdFrqAC1%2FgEfjx%2B944L3%2BS7c4mr0Oo"
        )
        .expect(200)
    );
  });

  it("get token_endpoint and responds with json", async () => {
    const config = {
      config: {
        microsoft: {
          token_endpoint:
            "https://login.microsoftonline.com/organizations/oauth2/v2.0/token",
        },
      },
    };

    const response = await request
      .agent(app)
      .get("/api/login")
      .set("Accept", "application/json")
      .expect(200);

    expect(response.body.config.microsoft.token_endpoint).toEqual(
      config.config.microsoft.token_endpoint
    );
    expect(response.headers["content-type"]).toMatch(/json/);
  });
});
