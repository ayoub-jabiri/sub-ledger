import mongoose from "mongoose";

export const connectDb = async (dbUrl) => {
    try {
        const connection = await mongoose.connect(dbUrl);

        console.log(`Database connected successfully!`);
    } catch (e) {
        console.error(e);
    }
};
