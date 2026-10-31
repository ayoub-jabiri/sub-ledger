import {
    Bell,
    ChevronRight,
    LogOut,
    Mail,
    ShieldCheck,
    type LucideIcon,
} from "lucide-react";
import { useNavigate } from "react-router";
import AppHeader from "../../components/layout/AppHeader";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { userLogout } from "../../store/slices/auth.slice";
import { useEffect } from "react";

export default function AccountPage() {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [navigate, user]);
    return (
        <div className="min-h-screen bg-[#F7F7FA] text-[#171A2B]">
            <AppHeader eyebrow="Workspace / Account" title="Your account" />
            <div className="space-y-5 p-6 lg:p-8">
                <section className="grid gap-5 lg:grid-cols-[1fr_1.7fr]">
                    <div className="rounded-xl border border-[#E8E8F0] bg-white p-6 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EEEAFB] text-lg font-semibold text-[#7255D8]">
                            {user?.name?.slice(0, 2).toUpperCase() || "MC"}
                        </div>
                        <h2 className="mt-4 font-semibold">
                            {user?.name || "Maya Chen"}
                        </h2>
                        <p className="mt-1 text-sm text-[#8A8FA8]">
                            {user?.email || "maya.chen@email.com"}
                        </p>
                        <button className="mt-5 text-xs font-semibold text-[#7255D8]">
                            Change photo
                        </button>
                    </div>
                    <div className="rounded-xl border border-[#E8E8F0] bg-white p-6">
                        <h2 className="font-semibold">Personal information</h2>
                        <p className="mt-1 text-xs text-[#8A8FA8]">
                            Update your personal details and contact
                            information.
                        </p>
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <InfoField
                                label="Full name"
                                value={user?.name || "Maya Chen"}
                            />
                            <InfoField
                                label="Email address"
                                value={user?.email || "maya.chen@email.com"}
                            />
                        </div>
                        <button className="mt-5 rounded-lg border border-[#DAD9E5] px-4 py-2 text-xs font-semibold hover:bg-[#F7F7FA]">
                            Save changes
                        </button>
                    </div>
                </section>
                <section className="rounded-xl border border-[#E8E8F0] bg-white">
                    <SettingRow
                        icon={ShieldCheck}
                        title="Security"
                        detail="Password and account security"
                    />
                    <SettingRow
                        icon={Bell}
                        title="Notifications"
                        detail="Manage renewal reminders and updates"
                    />
                    <SettingRow
                        icon={Mail}
                        title="Email preferences"
                        detail="Choose what arrives in your inbox"
                    />
                    <button
                        onClick={() => dispatch(userLogout())}
                        className="flex w-full items-center gap-3 border-t border-[#F0EFF6] px-6 py-4 text-left text-sm font-semibold text-[#B83B4D] hover:bg-[#FFF8F8]"
                    >
                        <LogOut size={18} />
                        Sign out
                    </button>
                </section>
            </div>
        </div>
    );
}

function InfoField({ label, value }: { label: string; value: string }) {
    return (
        <label className="text-xs font-semibold">
            {label}
            <input
                className="mt-1.5 h-10 w-full rounded-lg border border-[#E4E7EF] px-3 text-sm font-normal outline-none focus:border-[#7255D8]"
                value={value}
                readOnly
            />
        </label>
    );
}
function SettingRow({
    icon: Icon,
    title,
    detail,
}: {
    icon: LucideIcon;
    title: string;
    detail: string;
}) {
    return (
        <button className="flex w-full items-center gap-3 px-6 py-4 text-left hover:bg-[#FAFAFC]">
            <Icon size={19} className="text-[#7255D8]" />
            <span className="flex-1">
                <span className="block text-sm font-semibold">{title}</span>
                <span className="mt-0.5 block text-xs text-[#8A8FA8]">
                    {detail}
                </span>
            </span>
            <ChevronRight size={17} className="text-[#8A8FA8]" />
        </button>
    );
}
