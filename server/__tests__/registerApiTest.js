import request from "supertest";
import express from "express";
import { MongoClient } from "mongodb";
import { RegisterApi } from "../registerApi";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const mongoClient = new MongoClient(process.env.MONGODB_URL);
beforeAll(async () => {
  await mongoClient.connect();
  const database = mongoClient.db("test_database");
  await database.collection("movies").deleteMany({});
  app.use("/api/register", RegisterApi(database));
});
afterAll(() => {
  mongoClient.close();
});

describe("Register api", () => {
  it("adds a new account", async () => {
    const name = "Paul Jackson";
    const username = "Paul123";
    const email = "email@email.com";
    const password = "password";
    await request(app)
      .post("/api/register")
      .send({ name, username, email, password })
      .expect(200);
  });
});
