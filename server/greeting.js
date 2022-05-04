import { Router } from "express";

export function greeting() {
  const router = new Router();

  router.get("/", (req, res) => {
    res.send("Hello world");
  });

  return router;
}
