import { AlertCircle, Diamond, Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import CardStack from "../../components/auth/CardStack";
import { userLogin } from "../../store/slices/auth.slice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import type { Credentials } from "../../types/auth.types";
import SubmitButton from "../../components/global/SubmitButton";

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

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);

    console.log("loading ", loading);
    console.log("error ", error);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [credentials, setCredentials] = useState<Credentials>({
        email: "",
        password: "",
    });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        dispatch(userLogin(credentials));
    }

    return (
        <main className="flex min-h-[100dvh] bg-white text-[#171A2B] antialiased">
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

                    <form className="mt-6" onSubmit={handleSubmit}>
                        {error && (
                            <div
                                role="alert"
                                className="mb-5 flex gap-3 rounded-lg bg-[#B83B4D]/[0.07] p-3.5"
                            >
                                <AlertCircle
                                    size={18}
                                    strokeWidth={1.75}
                                    className="mt-0.5 shrink-0 text-[#B83B4D]"
                                />
                                <div>
                                    <p className="text-sm font-semibold leading-5 text-[#B83B4D]">
                                        {error.statusCode === 401
                                            ? "Email or password doesn’t match"
                                            : `We couldn’t sign you in due to : ${error.message}`}
                                    </p>
                                </div>
                            </div>
                        )}
                        <div className="space-y-5">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-1.5 block text-sm font-semibold leading-5"
                                >
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className={inputClass}
                                    placeholder="Enter your email"
                                    value={credentials.email}
                                    onChange={(e) =>
                                        setCredentials({
                                            ...credentials,
                                            email: e.target.value,
                                        })
                                    }
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
                                        type={
                                            isPasswordVisible
                                                ? "text"
                                                : "password"
                                        }
                                        className={`${inputClass} pr-12`}
                                        placeholder="Enter your password"
                                        value={credentials.password}
                                        onChange={(e) =>
                                            setCredentials({
                                                ...credentials,
                                                password: e.target.value,
                                            })
                                        }
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
                        <SubmitButton
                            loading={loading}
                            formError={Boolean(error)}
                            label="Sign in"
                            loadingLabel="Signing in"
                        />
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
