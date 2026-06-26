import "dotenv/config";
import request from "supertest";
import app from "../app";
import mongoose from "mongoose";

const token = process.env.TESTING_TOKEN;

beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/sub-ledger");
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe("GET user subscription", () => {
    test("GET Subscriptions", async () => {
        const response = await request(app)
            .get("/subscriptions")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        expect(Array.isArray(response.body)).toBe(true);
    });
});
