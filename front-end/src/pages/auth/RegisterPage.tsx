import { Diamond, Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import CardStack from "../../components/auth/CardStack";

const focusRing =
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#7255D8]/40";

const inputClass =
    "block h-11 w-full rounded-lg border border-[#E4E7EF] bg-white px-3.5 text-[15px] text-[#171A2B] " +
    "focus:outline-none focus:border-[#7255D8] focus:ring-[3px] focus:ring-[#7255D8]/25";

const labelClass = "mb-1.5 block text-sm font-semibold leading-5";

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

export default function RegisterPage() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
        useState(false);

    return (
        <main className="flex min-h-[100dvh] bg-white font-[Inter,system-ui,sans-serif] text-[#171A2B] antialiased">
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

                <div className="mx-auto flex w-full max-w-[400px] flex-1 flex-col pt-10 lg:justify-center lg:py-8">
                    <h1 className="mt-4 text-[32px] font-semibold leading-[1.45]">
                        Make room for clarity.
                    </h1>
                    <p className="mt-2 text-[15px] leading-6 text-[#6B7088]">
                        Create your free account to start tracking recurring
                        services.
                    </p>

                    <form className="mt-6">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="name" className={labelClass}>
                                    Full name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className={inputClass}
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className={labelClass}>
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    className={inputClass}
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className={labelClass}
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
                                <p
                                    id="password-hint"
                                    className="mt-1.5 text-xs leading-4 text-[#6B7088]"
                                >
                                    Use 12+ characters with a mix of letters and
                                    numbers.
                                </p>
                            </div>

                            <div>
                                <label htmlFor="confirm" className={labelClass}>
                                    Confirm password
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirm"
                                        type={
                                            isConfirmPasswordVisible
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
                                            setIsConfirmPasswordVisible(
                                                !isConfirmPasswordVisible
                                            )
                                        }
                                    >
                                        {isConfirmPasswordVisible ? (
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

                        <label className="mt-1 flex min-h-11 cursor-pointer items-center gap-2.5 text-[13px] leading-5 text-[#6B7088]">
                            <input
                                type="checkbox"
                                className={`h-[18px] w-[18px] shrink-0 rounded border-[#E4E7EF] accent-[#7255D8] ${focusRing}`}
                            />
                            <span>
                                I agree to the{" "}
                                <a
                                    href="#"
                                    className="rounded underline-offset-2 hover:text-[#7255D8] hover:underline"
                                >
                                    Terms of Service
                                </a>{" "}
                                and{" "}
                                <a
                                    href="#"
                                    className="rounded underline-offset-2 hover:text-[#7255D8] hover:underline"
                                >
                                    Privacy Policy
                                </a>
                                .
                            </span>
                        </label>

                        <button
                            type="submit"
                            className={`mt-2 flex h-11 w-full items-center justify-center rounded-lg bg-[#7255D8] text-[15px] font-medium text-white transition-colors hover:bg-[#5B40B8] active:bg-[#4F36A3] ${focusRing}`}
                        >
                            Create account
                        </button>
                    </form>

                    <p className="mt-2 flex flex-wrap items-center justify-center gap-x-1.5 text-sm text-[#6B7088]">
                        <span>Already have an account?</span>
                        <Link
                            to="/login"
                            className={`flex h-11 items-center rounded hover:text-[#7255D8] hover:underline ${focusRing}`}
                        >
                            Sign in
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
