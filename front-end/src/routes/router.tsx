import { createBrowserRouter } from "react-router";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import AppLayout from "../components/layout/AppLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import SubscriptionsPage from "../pages/subscriptions/SubscriptionsPage";
import AccountPage from "../pages/account/AccountPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "login",
        element: <LoginPage />,
    },
    {
        path: "register",
        element: <RegisterPage />,
    },
    {
        path: "dashboard",
        element: (
            <AppLayout allowedRole={["admin", "user"]} activeHref="/dashboard">
                <DashboardPage />
            </AppLayout>
        ),
    },
    {
        path: "subscriptions",
        element: (
            <AppLayout allowedRole={["admin", "user"]} activeHref="/subscriptions">
                <SubscriptionsPage />
            </AppLayout>
        ),
    },
    {
        path: "account",
        element: (
            <AppLayout allowedRole={["admin", "user"]} activeHref="/account">
                <AccountPage />
            </AppLayout>
        ),
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);

export default router;
