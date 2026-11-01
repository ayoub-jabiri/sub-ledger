import type { LucideIcon } from "lucide-react";

interface StatCardProps {
    icon: LucideIcon;
    label: string;
    value: string;
    detail: string;
    accent?: boolean;
}

export default function StatCard({
    icon: Icon,
    label,
    value,
    detail,
    accent = false,
}: StatCardProps) {
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
