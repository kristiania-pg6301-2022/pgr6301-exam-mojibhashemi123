import request from "supertest";
import { LoginApi } from "../LoginApi";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/api/login", LoginApi());

describe("test get login", () => {
  it("get 200 on google", async () => {
    await request.agent(app).post("/api/login/google").send({
      access_token: "s:ya29.A0ARrdaM9XGD_2aN1nBV",
    });

    expect(
      await request(app)
        .get("/api/login")
        .set(
          "cookie",
          "google_access_token=s%3A%22s%3Aya29.A0ARrdaM9XGD_2aN1nBV%22.DZvs%2FPNxsJYlCbdFrqAC1%2FgEfjx%2B944L3%2BS7c4mr0Oo"
        )
        .expect(200)
    );
  });

  it("get 200 on microsoft", async () => {
    await request.agent(app).post("/api/login/microsoft").send({
      access_token: "s:ya29.A0ARrdaM9XGD_2aN1nBV",
    });

    expect(
      await request(app)
        .get("/api/login")
        .set(
          "cookie",
          "microsoft_access_token=s%3A%22s%3Aya29.A0ARrdaM9XGD_2aN1nBV%22.DZvs%2FPNxsJYlCbdFrqAC1%2FgEfjx%2B944L3%2BS7c4mr0Oo"
        )
        .expect(200)
    );
  });
});
