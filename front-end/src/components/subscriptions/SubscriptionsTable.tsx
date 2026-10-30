import type { Subscription } from "../../types/subscription.types";
import SubscriptionRow from "./SubscriptionRow";

interface SubscriptionsTableProps {
    subscriptions: Subscription[];
    totalCount: number;
    monthlyTotal: number;
    loading: boolean;
    onEdit: (subscription: Subscription) => void;
    onDelete: (id: string) => void;
}

export default function SubscriptionsTable({
    subscriptions,
    totalCount,
    monthlyTotal,
    loading,
    onEdit,
    onDelete,
}: SubscriptionsTableProps) {
    return (
        <>
            <div className="hidden grid-cols-[2fr_1fr_1fr_1fr_0.5fr] px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#8A8FA8] md:grid">
                <span>Service</span>
                <span>Billing</span>
                <span>Price</span>
                <span>Added on</span>
                <span />
            </div>
            {loading && subscriptions.length === 0 ? (
                <div className="px-5 py-10 text-center text-sm text-[#8A8FA8]">
                    Loading subscriptions…
                </div>
            ) : subscriptions.length === 0 ? (
                <div className="px-5 py-10 text-center text-sm text-[#8A8FA8]">
                    No subscriptions found. Add your first one to get started.
                </div>
            ) : (
                <div className="divide-y divide-[#F0EFF6]">
                    {subscriptions.map((subscription) => (
                        <SubscriptionRow
                            key={subscription._id}
                            subscription={subscription}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
            <div className="flex items-center justify-between border-t border-[#E8E8F0] px-5 py-4 text-xs text-[#8A8FA8]">
                <span>
                    Showing {subscriptions.length} of {totalCount} subscriptions
                </span>
                <span className="font-semibold text-[#171A2B]">
                    Total <span className="ml-4">${monthlyTotal.toFixed(2)} / month</span>
                </span>
            </div>
        </>
    );
}
