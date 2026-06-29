import "dotenv/config";
import request from "supertest";
import app from "../app";
import mongoose from "mongoose";

let token = null;

beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/sub-ledger");

    const res = await request(app)
        .post("/users/register")
        .send({
            name: `name-${Date.now()}`,
            email: `name-${Date.now()}@gmail.com`,
            password: "123",
            role: "user",
        });

    token = res.body.accessToken;
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

    test("Update subscriptions", async () => {
        const newSubs = await request(app)
            .post("/subscriptions")
            .send(fakeSubscriptionData)
            .set("Authorization", `Bearer ${token}`);

        const res = await request(app)
            .put(`/subscriptions/${newSubs.body._id}`)
            .send(fakeSubscriptionData)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);

        expect(res.body).toHaveProperty("_id");
    });

    test("Delete subscriptions", async () => {
        const newSubs = await request(app)
            .post("/subscriptions")
            .send(fakeSubscriptionData)
            .set("Authorization", `Bearer ${token}`);

        const res = await request(app)
            .delete(`/subscriptions/${newSubs.body._id}`)
            .send(fakeSubscriptionData)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);

        expect(res.body).toHaveProperty(
            "message",
            "The subscription has been deleted successfully"
        );
    });
});
