export interface ActivityRow {
    id: string;
    time: string;
    event: string;
    workspace: string;
    details: string;
    status: string;
}

interface RecentActivityTableProps {
    title: string;
    dateLabel: string;
    rows: ActivityRow[];
}

export default function RecentActivityTable({
    title,
    dateLabel,
    rows,
}: RecentActivityTableProps) {
    return (
        <div className="rounded-xl border border-[#E8E8F0] bg-white p-5">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold">{title}</h2>
                <span className="text-xs text-[#8A8FA8]">{dateLabel}</span>
            </div>

            <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                    <thead>
                        <tr className="text-xs text-[#8A8FA8]">
                            <th className="pb-2 font-medium">Time</th>
                            <th className="pb-2 font-medium">Event</th>
                            <th className="pb-2 font-medium">Workspace</th>
                            <th className="pb-2 font-medium">Details</th>
                            <th className="pb-2 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0EFF6]">
                        {rows.map((row) => (
                            <tr key={row.id}>
                                <td className="py-3 text-xs text-[#8A8FA8]">
                                    {row.time}
                                </td>
                                <td className="py-3 font-medium">
                                    {row.event}
                                </td>
                                <td className="py-3 text-[#6B7088]">
                                    {row.workspace}
                                </td>
                                <td className="py-3 text-[#6B7088]">
                                    {row.details}
                                </td>
                                <td className="py-3">
                                    <span
                                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                                            row.status === "Recorded"
                                                ? "bg-[#E7F6EE] text-[#2E9E6B]"
                                                : "bg-[#EDEFF5] text-[#6B7088]"
                                        }`}
                                    >
                                        <span
                                            className={`h-1.5 w-1.5 rounded-full ${
                                                row.status === "Recorded"
                                                    ? "bg-[#2E9E6B]"
                                                    : "bg-[#8A8FA8]"
                                            }`}
                                        />
                                        {row.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
