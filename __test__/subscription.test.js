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

describe("Manage user subscription", () => {
    const fakeSubscriptionData = {
        name: `name-${Date.now()}`,
        price: 100,
        billingCycle: "monthly",
        role: "user",
    };

    test("Get user subscriptions", async () => {
        const res = await request(app)
            .get("/subscriptions")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);

        expect(Array.isArray(res.body)).toBe(true);
    });

    test("Add new subscriptions", async () => {
        const res = await request(app)
            .post("/subscriptions")
            .send(fakeSubscriptionData)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(201);

        expect(res.body).toHaveProperty("_id");
    });
});
