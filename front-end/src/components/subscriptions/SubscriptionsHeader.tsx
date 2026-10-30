import { Plus } from "lucide-react";

interface SubscriptionsHeaderProps {
    onAddClick: () => void;
}

export default function SubscriptionsHeader({
    onAddClick,
}: SubscriptionsHeaderProps) {
    return (
        <header className="flex items-center justify-between border-b border-[#E8E8F0] bg-white px-6 py-5 lg:px-8">
            <div>
                <p className="text-xs text-[#8A8FA8]">Workspace / Subscriptions</p>
                <h1 className="mt-1 text-2xl font-semibold">Subscriptions</h1>
            </div>
            <button
                onClick={onAddClick}
                className="hidden h-10 items-center gap-2 rounded-lg bg-[#7255D8] px-4 text-sm font-semibold text-white sm:flex"
            >
                <Plus size={16} /> Add subscription
            </button>
        </header>
    );
}
