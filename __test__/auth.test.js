import request from "supertest";
import app from "../app";
import mongoose from "mongoose";

beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/sub-ledger");
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe("POST user register", () => {
    const fakeRegisterData = {
        name: `name-${Date.now()}`,
        email: `name-${Date.now()}@gmail.com`,
        password: "123",
        role: "user",
    };

    test("User register", async () => {
        const res = await request(app)
            .post("/users/register")
            .send(fakeRegisterData);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty(
            "message",
            "The user has been registered successfully!"
        );
    });

    test("Email already exist", async () => {
        const response = await request(app)
            .post("/users/register")
            .send(fakeRegisterData);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty(
            "message",
            "The email is already taken!"
        );
    });
});

describe("POST user login", () => {
    const fakeUserData = {
        name: `name-${Date.now()}`,
        email: `name-${Date.now()}@gmail.com`,
        password: "123",
        role: "user",
    };

    beforeEach(async () => {
        await request(app).post("/users/register").send(fakeUserData);
    });

    test("User login", async () => {
        const response = await request(app).post("/users/login").send({
            email: fakeUserData.email,
            password: fakeUserData.password,
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("accessToken");
    });

    test("Wrong password", async () => {
        const response = await request(app).post("/users/login").send({
            email: fakeUserData.email,
            password: "wrongpassword",
        });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty(
            "message",
            "The password is not correct!"
        );
    });
});
