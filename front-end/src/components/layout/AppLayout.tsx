import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import NotFoundPage from "../../pages/NotFoundPage";
import { getUserProfile } from "../../store/slices/auth.slice";
import PageError from "../global/PageError";
import PageLoading from "../global/PageLoading";
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
            <div className="flex max-w-screen">
                <Sidebar user={user!} activeHref={activeHref} />
                <div className="flex-1 max-w-full">
                    {/* <Header
                        user={user}
                        openSidebar={() => setIsSidebarOpen(true)}
                    /> */}
                    <main className="md:max-w-[calc(100vw-280px)]">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
