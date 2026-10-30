import { Plus, Search } from "lucide-react";

interface SubscriptionsToolbarProps {
    search: string;
    onSearchChange: (value: string) => void;
    onAddClick: () => void;
}

export default function SubscriptionsToolbar({
    search,
    onSearchChange,
    onAddClick,
}: SubscriptionsToolbarProps) {
    return (
        <div className="flex flex-col gap-3 border-b border-[#E8E8F0] p-5 md:flex-row md:items-center">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 text-[#8A8FA8]" size={17} />
                <input
                    className="h-10 w-full rounded-lg border border-[#E4E7EF] pl-9 pr-3 text-sm outline-none focus:border-[#7255D8]"
                    placeholder="Search your subscriptions"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <button
                onClick={onAddClick}
                className="flex h-10 items-center gap-2 rounded-lg bg-[#7255D8] px-3 text-sm font-semibold text-white sm:hidden"
            >
                <Plus size={15} /> Add
            </button>
        </div>
    );
}
