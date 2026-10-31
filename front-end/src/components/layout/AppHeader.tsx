import { Plus } from "lucide-react";
import { Link } from "react-router";

interface AppHeaderProps {
    eyebrow: string;
    title: string;
    action?: {
        label: string;
        onClick?: () => void;
        to?: string;
    };
}

const actionClass =
    "hidden h-10 items-center gap-2 rounded-lg bg-[#7255D8] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#5B40B8] sm:flex";

export default function AppHeader({ eyebrow, title, action }: AppHeaderProps) {
    return (
        <header className="flex items-center justify-between border-b border-[#E8E8F0] bg-white px-6 py-5 lg:px-8">
            <div>
                <p className="text-xs font-medium text-[#8A8FA8]">{eyebrow}</p>
                <h1 className="mt-1 text-2xl font-semibold">{title}</h1>
            </div>
            {action &&
                (action.to ? (
                    <Link to={action.to} className={actionClass}>
                        <Plus size={16} /> {action.label}
                    </Link>
                ) : (
                    <button onClick={action.onClick} className={actionClass}>
                        <Plus size={16} /> {action.label}
                    </button>
                ))}
        </header>
    );
}
