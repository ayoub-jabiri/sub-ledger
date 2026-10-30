import api from "../api/axios.instance";
import type { SubscriptionPayload } from "../../types/subscription.types";

export const getSubscriptionsService = () => api.get("/subscriptions");

export const addSubscriptionService = (subscriptionData: SubscriptionPayload) =>
    api.post("/subscriptions", subscriptionData);

export const updateSubscriptionService = (
    id: string,
    subscriptionData: SubscriptionPayload
) => api.put(`/subscriptions/${id}`, subscriptionData);

export const deleteSubscriptionService = (id: string) =>
    api.delete(`/subscriptions/${id}`);
