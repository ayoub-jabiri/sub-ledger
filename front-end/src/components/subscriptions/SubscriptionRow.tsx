import { CalendarDays } from "lucide-react";
import type { Subscription } from "../../types/subscription.types";

interface SubscriptionRowProps {
    subscription: Subscription;
    onEdit: (subscription: Subscription) => void;
    onDelete: (id: string) => void;
}

export default function SubscriptionRow({
    subscription,
    onEdit,
    onDelete,
}: SubscriptionRowProps) {
    return (
        <div className="grid gap-2 px-5 py-4 md:grid-cols-[2fr_1fr_1fr_1fr_0.5fr] md:items-center">
            <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEEAFB] text-xs font-bold text-[#7255D8]">
                    {subscription.name.slice(0, 1).toUpperCase()}
                </span>
                <span className="text-sm font-medium">{subscription.name}</span>
            </div>
            <span className="text-xs capitalize text-[#6B7088]">
                {subscription.billingCycle}
            </span>
            <span className="text-sm font-semibold">
                ${subscription.price.toFixed(2)}{" "}
                <small className="font-normal text-[#8A8FA8]">
                    / {subscription.billingCycle === "monthly" ? "mo" : "yr"}
                </small>
            </span>
            <span className="flex items-center gap-1 text-xs text-[#6B7088]">
                <CalendarDays size={13} />
                {new Date(subscription.createdAt).toLocaleDateString()}
            </span>
            <div className="flex gap-3 text-left text-xs font-semibold md:justify-end md:text-right">
                <button onClick={() => onEdit(subscription)} className="text-[#7255D8]">
                    Edit
                </button>
                <button
                    onClick={() => onDelete(subscription._id)}
                    className="text-[#B83B4D]"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
