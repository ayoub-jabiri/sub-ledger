import "dotenv/config";
import request from "supertest";
import app from "../app";
import mongoose from "mongoose";

const agent = request.agent(app);

beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/sub-ledger");

    await agent.post("/users/register").send({
        name: `name-${Date.now()}`,
        email: `name-${Date.now()}@gmail.com`,
        password: "123",
        role: "user",
    });
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
        const response = await agent.get("/subscriptions");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("Add new subscriptions", async () => {
        const response = await agent
            .post("/subscriptions")
            .send(fakeSubscriptionData);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("_id");
    });

    test("Accept decimal subscription prices", async () => {
        const response = await agent.post("/subscriptions").send({
            ...fakeSubscriptionData,
            name: `decimal-${Date.now()}`,
            price: 10.99,
        });

        expect(response.statusCode).toBe(201);
        expect(response.body.price).toBe(10.99);
    });

    test("Update subscriptions", async () => {
        const newSubscription = await agent
            .post("/subscriptions")
            .send(fakeSubscriptionData);

        const response = await agent
            .put(`/subscriptions/${newSubscription.body._id}`)
            .send(fakeSubscriptionData);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("_id");
    });

    test("Delete subscriptions", async () => {
        const newSubscription = await agent
            .post("/subscriptions")
            .send(fakeSubscriptionData);

        const response = await agent
            .delete(`/subscriptions/${newSubscription.body._id}`)
            .send(fakeSubscriptionData);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty(
            "message",
            "The subscription has been deleted successfully"
        );
    });
});
