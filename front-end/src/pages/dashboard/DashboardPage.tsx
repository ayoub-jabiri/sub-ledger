import { useAppSelector } from "../../hooks";
import UserDashboard from "./UserDashboard";

export default function DashboardPage() {
    const user = useAppSelector((state) => state.auth.user);

    if (user?.role === "admin") {
        return null;
    } else if (user?.role === "user") {
        return <UserDashboard />;
    }

    return null;
}
