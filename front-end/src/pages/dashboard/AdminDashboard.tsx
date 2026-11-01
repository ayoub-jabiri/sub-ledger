import { CircleDollarSign, Layers, TrendingUp, Users } from "lucide-react";
import AppHeader from "../../components/layout/AppHeader";
import InfoBanner from "../../components/dashboard/InfoBanner";
import StatCard from "../../components/dashboard/StatCard";
import DailyTrendCard, {
    type TrendPoint,
} from "../../components/dashboard/DailyTrendCard";
import LastDayStatusCard from "../../components/dashboard/LastDayStatusCard";
import RecentActivityTable, {
    type ActivityRow,
} from "../../components/dashboard/RecentActivityTable";

const dailyTrend: TrendPoint[] = [
    { label: "Oct 8", value: 24 },
    { label: "Oct 9", value: 31 },
    { label: "Oct 10", value: 22 },
    { label: "Oct 11", value: 40 },
    { label: "Oct 12", value: 27 },
    { label: "Oct 13", value: 35 },
    { label: "Oct 14", value: 38 },
];

const recentActivity: ActivityRow[] = [
    {
        id: "1",
        time: "14:32 UTC",
        event: "Subscription added",
        workspace: "User ••• 4821",
        details: "+$12.00 / mo",
        status: "Recorded",
    },
    {
        id: "2",
        time: "14:26 UTC",
        event: "Billing cycle updated",
        workspace: "User ••• 1704",
        details: "Monthly → Yearly",
        status: "Recorded",
    },
    {
        id: "3",
        time: "14:18 UTC",
        event: "Subscription removed",
        workspace: "User ••• 3097",
        details: "-$9.99 / mo",
        status: "Recorded",
    },
    {
        id: "4",
        time: "14:05 UTC",
        event: "Account created",
        workspace: "User ••• 5910",
        details: "Personal workspace",
        status: "Recorded",
    },
    {
        id: "5",
        time: "13:57 UTC",
        event: "Subscription added",
        workspace: "User ••• 2188",
        details: "+$4.99 / mo",
        status: "Recorded",
    },
    {
        id: "6",
        time: "13:42 UTC",
        event: "Account export requested",
        workspace: "User ••• 4821",
        details: "Privacy request",
        status: "Queued",
    },
];

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-[#F7F7FA] text-[#171A2B]">
            <AppHeader
                eyebrow="Admin"
                title="Admin overview"
                description="A system-wide view of adoption, tracked spend and activity."
                action={{
                    label: "Export summary",
                    variant: "secondary",
                }}
            />

            <div className="space-y-5 p-6 lg:p-8">
                <InfoBanner
                    eyebrow="System administration · Aggregate data"
                    message="These metrics represent users' tracked subscriptions, not SubLedger revenue. Individual payment credentials are never collected."
                />

                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        icon={Layers}
                        label="Active subscriptions - global"
                        value="9,834"
                        detail="Across all personal workspaces"
                    />
                    <StatCard
                        icon={CircleDollarSign}
                        label="Tracked spend - monthly equiv"
                        value="$142,980.62"
                        detail="USD · yearly charges normalized * 12 · not revenue"
                        accent
                    />
                    <StatCard
                        icon={TrendingUp}
                        label="Annualized tracked run rate"
                        value="$1,715,767.44"
                        detail="Monthly equivalent * 12 · not revenue"
                    />
                    <StatCard
                        icon={Users}
                        label="Registered users"
                        value="2,416"
                        detail="18 new accounts in the last 24 hours"
                    />
                </section>

                <section className="grid gap-5 lg:grid-cols-2">
                    <DailyTrendCard
                        title="New subscriptions"
                        subtitle="Daily additions · Oct 8–14, 2026 · all users"
                        data={dailyTrend}
                    />
                    <LastDayStatusCard
                        title="Last 24 hours"
                        rows={[
                            { label: "Subscriptions added", value: "38" },
                            { label: "Subscriptions updated", value: "17" },
                            { label: "Subscriptions removed", value: "9" },
                        ]}
                        statusLabel="All systems operational"
                        lastRefreshLabel="Last refresh: Oct 14, 2026, 14:35 UTC"
                    />
                </section>

                <RecentActivityTable
                    title="Recent activity"
                    dateLabel="Oct 14, 2026 · UTC"
                    rows={recentActivity}
                />

                <p className="text-xs text-[#8A8FA8]">
                    Aggregate snapshot · Oct 14, 2026 · USD
                </p>
            </div>
        </div>
    );
}
