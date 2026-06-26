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

describe("POST User Register", () => {
    const fakeRegisterData = {
        name: `name-${Date.now()}`,
        email: `name-${Date.now()}@gmail.com`,
        password: "123",
        role: "user",
    };

    test("User Register", async () => {
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
        // Essayer de créer un deuxième avec le même email
        const response = await request(app)
            .post("/users/register")
            .send(fakeRegisterData);

        // Code HTTP
        expect(response.statusCode).toBe(400);

        // Structure de la réponse
        expect(response.body).toHaveProperty(
            "message",
            "The email is already taken!"
        );
    });
});
