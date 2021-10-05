process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let cereal = { name: "cheerios", price: 3.4 };

beforeEach(() => {
  items.push(cereal);
});

afterEach(() => {
  items.length = 0;
});

// GET/items
describe("GET /items", () => {
  test("renders a list of shopping items", async function () {
    const res = await request(app).get(`/items`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ items: [cereal] });
  });
});

// POST/items
describe("POST /items", () => {
  test("creates a new item", async function () {
    const res = await request(app).post(`/items`).send({
      name: "popsicle",
      price: 1.45,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      added: {
        name: "popsicle",
        price: 1.45,
      },
    });
  });
});

// PATCH /items/:name
describe("PATCH /items/:name", () => {
  test("updates a single item", async function () {
    const res = await request(app).patch(`/items/${cereal.name}`).send({
      name: "Honey Cheerios",
      price: 4.4,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      updated: {
        name: "Honey Cheerios",
        price: 4.4,
      },
    });
  });

  test("returns 404 if not found", async function () {
    const res = await request(app).patch(`/items/abc`);
    expect(res.statusCode).toBe(404);
  });
});

// DELETE /items/:name
describe("DELETE /items/:name", () => {
  test("delete a single item", async function () {
    const res = await request(app).delete(`/items/${cereal.name}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      message: "Deleted",
    });
  });
});
