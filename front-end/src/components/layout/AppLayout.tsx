import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import NotFoundPage from "../../pages/NotFoundPage";
import { getUserProfile } from "../../store/slices/auth.slice";
import PageError from "../global/PageError";
import PageLoading from "../global/PageLoading";
import BottomNav from "./BottomNav";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
    allowedRole: string[];
    activeHref?: string;
    children: React.ReactNode;
}

export default function AppLayout({
    allowedRole,
    activeHref,
    children,
}: AppLayoutProps) {
    const { user, loading, error } = useAppSelector((state) => state.auth);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user === null) {
            dispatch(getUserProfile());
        }
    }, []);

    if ((loading || !user) && !error) {
        return <PageLoading />;
    }

    if (error) {
        return <PageError message={error.message} />;
    }

    const isAllowed = allowedRole.includes(user?.role || "");

    if (!isAllowed) {
        return <NotFoundPage />;
    }

    return (
        <>
            <div className="flex w-full">
                <Sidebar user={user!} activeHref={activeHref} />
                <div className="min-w-0 flex-1">
                    <main className="pb-16 md:pb-0">{children}</main>
                </div>
            </div>
            <BottomNav activeHref={activeHref} />
        </>
    );
}
