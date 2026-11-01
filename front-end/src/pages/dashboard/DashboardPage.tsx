import { useAppSelector } from "../../hooks";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

export default function DashboardPage() {
    const user = useAppSelector((state) => state.auth.user);

    if (user?.role === "admin") {
        return <AdminDashboard />;
    } else if (user?.role === "user") {
        return <UserDashboard />;
    }

    return null;
}
