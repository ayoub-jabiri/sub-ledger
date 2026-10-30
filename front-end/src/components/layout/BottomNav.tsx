import { Layers, LayoutGrid, User } from "lucide-react";
import { NavLink } from "react-router";

// Mobile bottom tab bar: 3 destinations only (Admin overview is desktop/tablet only).
const NAV_ITEMS = [
    { to: "/dashboard", label: "Overview", icon: LayoutGrid },
    { to: "/subscriptions", label: "Subscriptions", icon: Layers },
    { to: "/account", label: "Account", icon: User },
];

const focusRing =
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#7255D8]/40";

type BottomNavProps = {
    activeHref?: string;
};

export default function BottomNav({ activeHref }: BottomNavProps) {
    return (
        <nav
            aria-label="Primary"
            className="fixed inset-x-0 bottom-0 z-40 flex h-16 border-t border-[#E4E7EF] bg-white md:hidden"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
                const isActive = to === activeHref;
                return (
                    <NavLink
                        key={to}
                        to={to}
                        className={`flex min-w-11 flex-1 flex-col items-center justify-center gap-1 text-[11px] font-medium ${focusRing} ${
                            isActive ? "text-[#7255D8]" : "text-[#8A8FA8]"
                        }`}
                    >
                        <Icon
                            size={22}
                            strokeWidth={1.75}
                            aria-hidden="true"
                            className={isActive ? "text-[#7255D8]" : "text-[#8A8FA8]"}
                        />
                        {label}
                    </NavLink>
                );
            })}
        </nav>
    );
}
