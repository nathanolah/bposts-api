const request = require("supertest");
const app = require("../src/app");

describe("GET /api/ping", () => {
  describe('should respond with 200 status code and JSON response body: { "success": true }', () => {
    test("responds to /api/ping", async () => {
      const res = await request(app).get("/ping");
      expect(res.statusCode).toBe(200);
      expect(res.header["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(res.text).toEqual({ success: true });
    });
  });
});

describe("GET /api/posts", () => {
  describe("should respond with 400 status code and JSON response error of 'Tags parameter required'", () => {
    test("responds to /api/posts?tags=", async () => {
      const res = await request(app).get("/posts?tags=");
      expect(res.statusCode).toBe(400);
    });
  });

  describe("should respond with 400 status code and JSON response error of tags and sortBy parameter required", () => {
    test("responds to /api/posts?tags=tech&sortBy=", async () => {
      const res = await request(app).get("/posts?tags=tech&sortBy=");
      expect(res.statusCode).toBe(400);
    });
  });

  describe("should respond with 400 status code and JSON response error of all 3 error messages", () => {
    test("responds to /api/posts?tags=&sortBy=&direction=", async () => {
      const res = await request(app).get("/posts?tags=&sortBy=&direction=");
      expect(res.statusCode).toBe(400);
    });
  });

  describe("should respond with 200 status code and JSON response body: of posts containing tech tag", () => {
    test("responds to /api/posts?tags=tech", async () => {
      const res = await request(app).get("/posts?tags=tech");
      expect(res.statusCode).toBe(200);
      expect(res.header["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    });
  });

  describe("should respond with 200 status code and JSON response body: of posts containing tech and startups tags", () => {
    test("responds to /api/posts?tags=tech,startups", async () => {
      const res = await request(app).get("/posts?tags=tech,startups");
      expect(res.statusCode).toBe(200);
      expect(res.header["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    });
  });

  describe("should respond with 200 status code and JSON response body: of posts containing multiple tags and sorted by id asc", () => {
    test("responds to /api/posts?tags=tech,health&sortBy=id", async () => {
      const res = await request(app).get("/posts?tags=tech,health&sortBy=id");
      expect(res.statusCode).toBe(200);
      expect(res.header["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    });
  });

  describe("should respond with 200 status code and JSON response body: of posts containing multiple tags and sorted by likes desc order", () => {
    test("responds to /api/posts?tags=tech,health,history&sortBy=likes&direction=desc", async () => {
      const res = await request(app).get(
        "/posts?tags=tech,health,history&sortBy=likes&direction=desc"
      );
      expect(res.statusCode).toBe(200);
      expect(res.header["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    });
  });

  describe("should respond with 200 status code and JSON response body: of posts containing multiple tags and sorted by reads asc order", () => {
    test("responds to /api/posts?tags=tech,health,history&sortBy=reads&direction=asc", async () => {
      const res = await request(app).get(
        "/posts?tags=tech,health,history&sortBy=reads&direction=asc"
      );
      expect(res.statusCode).toBe(200);
      expect(res.header["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
    });
  });
});
