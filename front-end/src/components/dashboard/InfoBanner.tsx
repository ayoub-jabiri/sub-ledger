import { Sparkles } from "lucide-react";

interface InfoBannerProps {
    eyebrow: string;
    message: string;
}

export default function InfoBanner({ eyebrow, message }: InfoBannerProps) {
    return (
        <div className="rounded-xl border border-[#E3DDF8] bg-[#F0EDFC] p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#5B40B8]">
                <Sparkles size={15} />
                {eyebrow}
            </div>
            <p className="mt-1 text-xs text-[#6B7088]">{message}</p>
        </div>
    );
}
