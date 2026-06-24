import supertest from "supertest";
// import app from "./server";

const sum = (num) => {
    return num;
};

describe("POST /users", () => {
    test("test", () => {
        expect(sum(10)).toBe(10);
    });
});
