import { Diamond, Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const focusRing =
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#7255D8]/40";

const inputClass =
    "block h-11 w-full rounded-lg border border-[#E4E7EF] bg-white px-3.5 text-[15px] text-[#171A2B] " +
    "focus:outline-none focus:border-[#7255D8] focus:ring-[3px] focus:ring-[#7255D8]/25";

/* Logo: lucide Diamond outline + filled core */
function LogoMark({ className = "", size = 20 }) {
    return (
        <span
            className={`relative inline-flex items-center justify-center ${className}`}
            aria-hidden="true"
        >
            <Diamond size={size} strokeWidth={1.75} />
            <Diamond
                size={size * 0.4}
                strokeWidth={0}
                fill="currentColor"
                className="absolute"
            />
        </span>
    );
}

/* Isometric card stack (desktop panel) */
function Slab({
    y,
    top,
    left,
    right,
    dot,
    bar,
}: {
    y: number;
    top: string;
    left: string;
    right: string;
    dot?: boolean;
    bar?: boolean;
}) {
    const round = { strokeLinejoin: "round", strokeWidth: 5 };
    return (
        <g transform={`translate(0 ${y})`}>
            <path
                d="M80 66 140 88v10L80 76Z"
                fill={left}
                stroke={left}
                {...round}
            />
            <path
                d="M200 66 140 88v10l60-22Z"
                fill={right}
                stroke={right}
                {...round}
            />
            <path
                d="M140 46 200 66 140 88 80 66Z"
                fill={top}
                stroke={top}
                {...round}
            />
            {dot && <circle cx="166" cy="68" r="5" fill="#7255D8" />}
            {bar && (
                <path
                    d="M114 68 146 57"
                    stroke="#fff"
                    strokeOpacity=".75"
                    strokeWidth="6"
                    strokeLinecap="round"
                />
            )}
        </g>
    );
}

function CardStack() {
    return (
        <svg
            viewBox="0 0 280 190"
            className="h-full w-full"
            fill="none"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid meet"
        >
            <defs>
                <radialGradient id="sl-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0" stopColor="#7255D8" stopOpacity=".55" />
                    <stop offset="1" stopColor="#7255D8" stopOpacity="0" />
                </radialGradient>
            </defs>
            <ellipse cx="140" cy="158" rx="80" ry="16" fill="url(#sl-glow)" />
            <Slab y={52} top="#EAE7F2" left="#C9C4DA" right="#B5AFCB" dot />
            <Slab y={26} top="#B9A9F0" left="#9886DD" right="#8470D0" bar />
            <Slab y={0} top="#F2F0F8" left="#D6D1E5" right="#C2BCD8" dot />
        </svg>
    );
}

export default function LoginPage() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <main className="flex min-h-[100dvh] bg-white text-[#171A2B] antialiased">
            {/* Brand panel (desktop) */}
            <aside className="hidden w-[39%] shrink-0 flex-col bg-[#171A2B] p-[clamp(32px,3.1vw,48px)] lg:flex">
                <div className="flex items-center gap-2 text-white">
                    <LogoMark className="text-[#B9A9F0]" size={18} />
                    <span className="text-[15px] font-semibold">SubLedger</span>
                </div>

                <div className="flex flex-1 flex-col justify-center py-10">
                    <h2 className="text-[clamp(32px,3.1vw,44px)] font-semibold leading-[1.4] text-white">
                        Less guessing.
                        <br />
                        More knowing.
                    </h2>
                    <p className="mt-4 max-w-[440px] text-[15px] leading-6 text-[#A9AEC4] xl:text-base">
                        One calm place for every recurring service, every
                        renewal and every dollar.
                    </p>

                    <div className="mt-8 aspect-[16/10] max-h-[320px] w-full rounded-2xl bg-black/20 p-4">
                        <CardStack />
                    </div>
                </div>

                <p className="text-xs text-[#8A8FA8]">
                    © {new Date().getFullYear()} SubLedger · Personal
                    subscription management
                </p>
            </aside>

            {/* Form */}
            <section className="flex min-w-0 flex-1 flex-col px-5 pb-8 pt-5 sm:px-10">
                {/* Logo (mobile / tablet) */}
                <div className="flex items-center justify-center gap-2 pt-1 lg:hidden">
                    <LogoMark className="text-[#7255D8]" size={24} />
                    <span className="text-xl font-semibold">SubLedger</span>
                </div>

                <div className="mx-auto flex w-full max-w-[400px] flex-1 flex-col pt-10 lg:justify-center lg:pt-0">
                    <h1 className="mt-4 text-[32px] font-semibold leading-[1.45]">
                        Good to see you again.
                    </h1>
                    <p className="mt-2 text-[15px] leading-6 text-[#6B7088]">
                        Sign in to your personal subscription workspace.
                    </p>

                    <form className="mt-6">
                        <div className="space-y-5">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-1.5 block text-sm font-semibold leading-5"
                                >
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className={inputClass}
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-1.5 block text-sm font-semibold leading-5"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={
                                            isPasswordVisible
                                                ? "text"
                                                : "password"
                                        }
                                        className={`${inputClass} pr-12`}
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        aria-label="Show password"
                                        className={`absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-lg text-[#6B7088] hover:text-[#171A2B] cursor-pointer ${focusRing}`}
                                        onClick={() =>
                                            setIsPasswordVisible(
                                                !isPasswordVisible
                                            )
                                        }
                                    >
                                        {isPasswordVisible ? (
                                            <EyeOff
                                                size={20}
                                                strokeWidth={1.75}
                                            />
                                        ) : (
                                            <Eye size={20} strokeWidth={1.75} />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-1 flex items-center justify-between">
                            <label className="flex h-11 cursor-pointer items-center gap-2.5 text-sm text-[#6B7088]">
                                <input
                                    type="checkbox"
                                    className={`h-[18px] w-[18px] rounded border-[#E4E7EF] accent-[#7255D8] ${focusRing}`}
                                />
                                Remember me
                            </label>
                            <a
                                href="#"
                                className={`flex h-11 items-center rounded text-sm font-medium text-[#7255D8] hover:text-[#5B40B8] hover:underline ${focusRing}`}
                            >
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className={`mt-2 flex h-11 w-full items-center justify-center rounded-lg bg-[#7255D8] text-[15px] font-medium text-white transition-colors hover:bg-[#5B40B8] active:bg-[#4F36A3] ${focusRing}`}
                        >
                            Sign in
                        </button>
                    </form>

                    <p className="mt-2 flex flex-wrap items-center justify-center gap-x-1.5 text-sm text-[#6B7088]">
                        <span>New to SubLedger?</span>
                        <Link
                            to="/register"
                            className={`flex h-11 items-center rounded hover:text-[#7255D8] hover:underline ${focusRing}`}
                        >
                            Create an account
                        </Link>
                    </p>

                    <div className="mt-2 border-t border-[#E4E7EF] pt-5">
                        <p className="flex items-center justify-center gap-2 text-center text-[13px] text-[#6B7088]">
                            <Lock
                                size={14}
                                strokeWidth={1.75}
                                className="shrink-0"
                            />
                            Your ledger is private. Your data stays yours.
                        </p>
                        <nav
                            aria-label="Legal and help"
                            className="mt-3 flex items-center justify-center text-xs text-[#6B7088]"
                        >
                            <a
                                href="#"
                                className={`flex h-11 items-center rounded px-2 hover:text-[#171A2B] hover:underline ${focusRing}`}
                            >
                                Privacy
                            </a>
                            <span aria-hidden="true">·</span>
                            <a
                                href="#"
                                className={`flex h-11 items-center rounded px-2 hover:text-[#171A2B] hover:underline ${focusRing}`}
                            >
                                Terms
                            </a>
                            <span aria-hidden="true">·</span>
                            <a
                                href="#"
                                className={`flex h-11 items-center rounded px-2 hover:text-[#171A2B] hover:underline ${focusRing}`}
                            >
                                Need help?
                            </a>
                        </nav>
                    </div>
                </div>
            </section>
        </main>
    );
}
