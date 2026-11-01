export interface StatusRow {
    label: string;
    value: string;
}

interface LastDayStatusCardProps {
    title: string;
    rows: StatusRow[];
    statusLabel: string;
    lastRefreshLabel: string;
}

export default function LastDayStatusCard({
    title,
    rows,
    statusLabel,
    lastRefreshLabel,
}: LastDayStatusCardProps) {
    return (
        <div className="flex h-full flex-col rounded-xl border border-[#E8E8F0] bg-white p-5">
            <h2 className="font-semibold">{title}</h2>

            <div className="mt-4 flex-1 space-y-3">
                {rows.map((row) => (
                    <div
                        key={row.label}
                        className="flex items-center justify-between text-sm"
                    >
                        <span className="text-[#8A8FA8]">{row.label}</span>
                        <span className="font-semibold">{row.value}</span>
                    </div>
                ))}
            </div>

            <div className="mt-4 space-y-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E7F6EE] px-2.5 py-1 text-xs font-semibold text-[#2E9E6B]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2E9E6B]" />
                    {statusLabel}
                </span>
                <p className="text-xs text-[#8A8FA8]">{lastRefreshLabel}</p>
            </div>
        </div>
    );
}
