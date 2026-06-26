import "dotenv/config";
import request from "supertest";
import app from "../app";
import mongoose from "mongoose";

beforeAll(async () => {
    // console.log(process.env.DB_URL);

    await mongoose.connect("mongodb://127.0.0.1:27017/sub-ledger");
});

afterAll(async () => {
    // console.log(process.env.DB_URL);

    await mongoose.disconnect();
});

describe("User Auth", () => {
    test("It should register the user successfully", async () => {
        const fakeRegisterData = {
            name: `name-${Date.now()}`,
            email: `name-${Date.now()}@gmail.com`,
            password: "123",
            role: "user",
        };

        const res = await request(app)
            .post("/users/register")
            .send(fakeRegisterData);

        expect(res.statusCode).toBe(201);
    });
});
