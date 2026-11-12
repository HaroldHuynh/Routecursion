import request from "supertest";
import { describe, it, expect } from "vitest";

import app from "../src/app";

describe("GET /api/health", () => {
  it("returns a successful JSON health response", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toEqual({ status: "ok" });
  });
});
