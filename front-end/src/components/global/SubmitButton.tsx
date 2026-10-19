import { Loader2 } from "lucide-react";

interface InputButtonProps {
    loading: boolean;
    formError: boolean;
    label: string;
    loadingLabel: string;
}

const focusRing =
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#7255D8]/40";

export default function SubmitButton({
    loading,
    formError,
    label,
    loadingLabel,
}: InputButtonProps) {
    return (
        <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className={`mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#7255D8] text-[15px] font-medium text-white transition-colors hover:bg-[#5B40B8] active:bg-[#4F36A3] cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-[#7255D8] ${focusRing}`}
        >
            {loading ? (
                <>
                    <Loader2
                        size={16}
                        strokeWidth={2}
                        className="animate-spin"
                    />
                    {loadingLabel}
                </>
            ) : formError ? (
                `Try ${loadingLabel} again`
            ) : (
                label
            )}
        </button>
    );
}
