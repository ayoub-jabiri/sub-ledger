import type { SliceErrorResponse } from "./auth.types";

export type BillingCycle = "monthly" | "yearly";

export interface Subscription {
    _id: string;
    name: string;
    price: number;
    billingCycle: BillingCycle;
    createdAt: string;
    userId: string;
}

export interface SubscriptionPayload {
    name: string;
    price: number;
    billingCycle: BillingCycle;
}

export interface SubscriptionState {
    subscriptions: Subscription[];
    loading: boolean;
    error: SliceErrorResponse | null;
}
