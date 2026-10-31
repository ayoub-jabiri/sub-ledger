import { Diamond, Layers, LayoutGrid, User } from "lucide-react";
import { NavLink } from "react-router";
import type { User as IUser } from "../../types/auth.types";

// Adjust the paths to match your router.
const NAV_ITEMS = [
    {
        to: "/dashboard",
        label: "Overview",
        icon: LayoutGrid,
        roles: ["admin", "user"],
    },
    {
        to: "/subscriptions",
        label: "Subscriptions",
        icon: Layers,
        roles: ["user"],
    },
    { to: "/account", label: "Account", icon: User, roles: ["admin", "user"] },
];

const focusRing =
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#B9A9F0]/60";

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

type SidebarProps = {
    user?: IUser;
    activeHref?: string;
};

export default function Sidebar({ user, activeHref }: SidebarProps) {
    const initials = user?.name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]!.toUpperCase())
        .join("");

    return (
        <aside
            aria-label="Primary"
            className="sticky top-0 hidden h-[100dvh] w-20 shrink-0 flex-col bg-[#171A2B] md:flex lg:w-[232px]"
        >
            {/* Brand */}
            <div className="flex h-16 items-center gap-2 px-5 text-white md:justify-center lg:justify-start">
                <LogoMark className="text-[#B9A9F0]" size={20} />
                <span className="hidden text-lg font-semibold lg:inline">
                    SubLedger
                </span>
            </div>

            {/* Navigation */}
            <nav className="mt-4 flex-1 px-4">
                <p className="hidden px-3 pb-2 text-[11px] font-medium uppercase tracking-wider text-[#8A8FA8] lg:block">
                    Workspace
                </p>
                <ul className="space-y-1">
                    {NAV_ITEMS.map(({ to, label, icon: Icon, roles }) => {
                        if (roles && !roles.includes(user?.role || ""))
                            return null;

                        return (
                            <li key={to}>
                                <NavLink
                                    to={to}
                                    title={label}
                                    className={`group flex h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors md:justify-center lg:justify-start ${focusRing} ${
                                        to === activeHref
                                            ? "bg-white/[0.07] font-semibold text-white"
                                            : "font-medium text-[#A9AEC4] hover:bg-white/5 hover:text-white"
                                    }`}
                                >
                                    <>
                                        <Icon
                                            size={20}
                                            strokeWidth={1.75}
                                            aria-hidden="true"
                                            className={
                                                to === activeHref
                                                    ? "text-white"
                                                    : "text-[#8A8FA8] group-hover:text-white"
                                            }
                                        />
                                        <span className="hidden lg:inline">
                                            {label}
                                        </span>
                                    </>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* User */}
            <div className="flex items-center gap-3 px-6 py-5 md:justify-center md:px-0 lg:justify-start lg:px-6">
                <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-xs font-semibold text-[#B9A9F0]"
                    aria-hidden="true"
                >
                    {initials}
                </span>
                <div className="hidden min-w-0 lg:block">
                    <p className="truncate text-[13px] font-semibold leading-4 text-white capitalize">
                        {user?.name || "Unknown User"}
                    </p>
                    <p
                        className="mt-0.5 truncate text-xs leading-4 text-[#8A8FA8]"
                        title={
                            user?.role == "admin"
                                ? "Administrator Workspace"
                                : "Personal Workspace"
                        }
                    >
                        {user?.role == "admin"
                            ? "Administrator Workspace"
                            : "Personal Workspace"}
                    </p>
                </div>
            </div>
        </aside>
    );
}
