export interface TrendPoint {
    label: string;
    value: number;
}

interface DailyTrendCardProps {
    title: string;
    subtitle: string;
    data: TrendPoint[];
}

export default function DailyTrendCard({
    title,
    subtitle,
    data,
}: DailyTrendCardProps) {
    const maxValue = Math.max(1, ...data.map((point) => point.value));
    const lastIndex = data.length - 1;

    return (
        <div className="rounded-xl border border-[#E8E8F0] bg-white p-5">
            <h2 className="font-semibold">{title}</h2>
            <p className="mt-1 text-xs text-[#8A8FA8]">{subtitle}</p>

            <div className="mt-6 flex items-end justify-between gap-2">
                {data.map((point, index) => (
                    <div
                        key={point.label}
                        className="flex flex-1 flex-col items-center gap-2"
                    >
                        <span className="text-xs font-medium text-[#8A8FA8]">
                            {point.value}
                        </span>
                        <div className="flex h-24 w-full items-end">
                            <div
                                className={`w-full rounded-t-md ${
                                    index === lastIndex
                                        ? "bg-[#7255D8]"
                                        : "bg-[#D9D1F5]"
                                }`}
                                style={{
                                    height: `${Math.max(
                                        6,
                                        (point.value / maxValue) * 100
                                    )}%`,
                                }}
                            />
                        </div>
                        <span className="text-[11px] text-[#8A8FA8]">
                            {point.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
