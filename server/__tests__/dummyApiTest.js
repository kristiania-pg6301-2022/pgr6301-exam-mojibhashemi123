import request from "supertest";
import express from "express";
import { greeting } from "../greeting.js";

const app = express();

app.use("/api/greeting", greeting());

describe("api", () => {
  it("200", async () => {
    expect(await request(app).get("/api/greeting").expect(200));
  });

  it("response hello world", async () => {
    const response = await request(app).get("/api/greeting").expect(200);

    expect(response.text).toEqual("Hello world");
  });
});
