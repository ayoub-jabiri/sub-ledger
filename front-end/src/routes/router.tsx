import { createBrowserRouter } from "react-router";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import AppLayout from "../components/layout/AppLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";

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
            <AppLayout allowedRole="admin" activeHref="/dashboard">
                <DashboardPage />
            </AppLayout>
        ),
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);

export default router;
