import {
    ArrowUpRight,
    CalendarDays,
    CircleDollarSign,
    CreditCard,
    TrendingUp,
    type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo } from "react";
import { Link } from "react-router";
import AppHeader from "../../components/layout/AppHeader";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getSubscriptions } from "../../store/slices/subscription.slice";
import type { Subscription } from "../../types/subscription.types";

const avatarColors = [
    "bg-[#F15A5A]",
    "bg-[#E50914]",
    "bg-[#171A2B]",
    "bg-[#7255D8]",
    "bg-[#2E9E6B]",
];

export default function DashboardPage() {
    const { subscriptions, loading } = useAppSelector(
        (state) => state.subscription
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getSubscriptions());
    }, [dispatch]);

    const monthlyTotal = useMemo(
        () =>
            subscriptions.reduce(
                (total, subscription) =>
                    total +
                    (subscription.billingCycle === "yearly"
                        ? subscription.price / 12
                        : subscription.price),
                0
            ),
        [subscriptions]
    );

    const monthlyCount = subscriptions.filter(
        (subscription) => subscription.billingCycle === "monthly"
    ).length;
    const yearlyCount = subscriptions.filter(
        (subscription) => subscription.billingCycle === "yearly"
    ).length;

    const averageCost = subscriptions.length
        ? monthlyTotal / subscriptions.length
        : 0;

    const recentlyAdded = useMemo(
        () =>
            [...subscriptions]
                .sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                )
                .slice(0, 5),
        [subscriptions]
    );

    const sortedByPrice = useMemo(
        () => [...subscriptions].sort((a, b) => b.price - a.price).slice(0, 5),
        [subscriptions]
    );

    return (
        <div className="min-h-screen bg-[#F7F7FA] text-[#171A2B]">
            <AppHeader
                eyebrow={new Date().toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
                title="Your subscriptions, in focus"
                action={{ label: "Add subscription", to: "/subscriptions" }}
            />

            <div className="space-y-5 p-6 lg:p-8">
                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        icon={CreditCard}
                        label="Active subscriptions"
                        value={loading ? "…" : String(subscriptions.length)}
                        detail={`${monthlyCount} monthly · ${yearlyCount} yearly`}
                    />
                    <SummaryCard
                        icon={CircleDollarSign}
                        label="Monthly spending"
                        value={loading ? "…" : `$${monthlyTotal.toFixed(2)}`}
                        detail="Based on current plans"
                        accent
                    />
                    <SummaryCard
                        icon={TrendingUp}
                        label="Yearly estimate"
                        value={
                            loading ? "…" : `$${(monthlyTotal * 12).toFixed(2)}`
                        }
                        detail="Based on current plans"
                    />
                    <SummaryCard
                        icon={CalendarDays}
                        label="Average cost"
                        value={loading ? "…" : `$${averageCost.toFixed(2)}`}
                        detail="Per subscription, per month"
                    />
                </section>

                {!loading && subscriptions.length === 0 ? (
                    <div className="flex items-center gap-3 rounded-lg border border-[#E3DDF8] bg-[#F0EDFC] px-4 py-3 text-sm text-[#5B40B8]">
                        <ArrowUpRight size={17} />
                        <span>
                            You don't have any subscriptions yet.{" "}
                            <Link
                                to="/subscriptions"
                                className="font-semibold underline"
                            >
                                Add your first one
                            </Link>
                            .
                        </span>
                    </div>
                ) : (
                    <section className="grid gap-5 lg:grid-cols-2">
                        <SubscriptionList
                            title="Recently added"
                            items={recentlyAdded}
                        />
                        <SubscriptionList
                            title="Highest spend"
                            items={sortedByPrice}
                        />
                    </section>
                )}
            </div>
        </div>
    );
}

function SummaryCard({
    icon: Icon,
    label,
    value,
    detail,
    accent = false,
}: {
    icon: LucideIcon;
    label: string;
    value: string;
    detail: string;
    accent?: boolean;
}) {
    return (
        <div className="rounded-xl border border-[#E8E8F0] bg-white p-5">
            <div className="flex items-center gap-2 text-xs text-[#8A8FA8]">
                <Icon size={15} />
                {label}
            </div>
            <p
                className={`mt-4 text-2xl font-semibold ${
                    accent ? "text-[#7255D8]" : ""
                }`}
            >
                {value}
            </p>
            <p className="mt-1 text-xs text-[#8A8FA8]">{detail}</p>
        </div>
    );
}

function SubscriptionList({
    title,
    items,
}: {
    title: string;
    items: Subscription[];
}) {
    return (
        <div className="rounded-xl border border-[#E8E8F0] bg-white p-5">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold">{title}</h2>
                <Link
                    to="/subscriptions"
                    className="text-xs font-semibold text-[#7255D8]"
                >
                    View all
                </Link>
            </div>
            <div className="mt-4 divide-y divide-[#F0EFF6]">
                {items.length === 0 && (
                    <p className="py-3 text-xs text-[#8A8FA8]">
                        Nothing to show yet.
                    </p>
                )}
                {items.map((item, index) => (
                    <div
                        key={item._id}
                        className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                    >
                        <span
                            className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white ${
                                avatarColors[index % avatarColors.length]
                            }`}
                        >
                            {item.name[0]}
                        </span>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                                {item.name}
                            </p>
                            <p className="text-xs capitalize text-[#8A8FA8]">
                                {item.billingCycle}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-semibold">
                                ${item.price.toFixed(2)}
                            </p>
                            <p className="text-xs text-[#8A8FA8]">
                                {new Date(item.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
