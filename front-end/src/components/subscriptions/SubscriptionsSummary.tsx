interface SubscriptionsSummaryProps {
    subscriptionCount: number;
    monthlyTotal: number;
}

export default function SubscriptionsSummary({
    subscriptionCount,
    monthlyTotal,
}: SubscriptionsSummaryProps) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-[#E3DDF8] bg-[#F0EDFC] p-5">
            <div>
                <p className="text-sm font-semibold text-[#5B40B8]">Your subscription total</p>
                <p className="mt-1 text-xs text-[#6B7088]">
                    {subscriptionCount} active service
                    {subscriptionCount === 1 ? "" : "s"} · $
                    {monthlyTotal.toFixed(2)} per month
                </p>
            </div>
            <p className="text-2xl font-semibold text-[#7255D8]">
                ${(monthlyTotal * 12).toFixed(2)}
                <span className="ml-1 text-xs font-normal text-[#6B7088]">/ year</span>
            </p>
        </div>
    );
}
