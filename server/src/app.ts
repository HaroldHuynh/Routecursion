import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.get("/api/health", (_request, response) => {
  response.status(200).json({ status: "ok" });
});

export default app;
