import { Schema, model } from "mongoose";

const subSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 1,
    },
    billingCycle: {
        type: String,
        enum: ["monthly", "yearly"],
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

export default model("Subscription", subSchema);
