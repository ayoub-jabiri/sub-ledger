import { Download, Plus, type LucideIcon } from "lucide-react";
import { Link } from "react-router";

interface AppHeaderProps {
    eyebrow: string;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick?: () => void;
        to?: string;
        variant?: "primary" | "secondary";
        icon?: LucideIcon;
    };
}

const variantClass = {
    primary: "bg-[#7255D8] text-white hover:bg-[#5B40B8]",
    secondary:
        "border border-[#E8E8F0] bg-white text-[#171A2B] hover:bg-[#F7F7FA]",
};

const defaultIcon = { primary: Plus, secondary: Download };

const actionBaseClass =
    "hidden h-10 items-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors sm:flex";

export default function AppHeader({
    eyebrow,
    title,
    description,
    action,
}: AppHeaderProps) {
    const variant = action?.variant ?? "primary";
    const Icon = action?.icon ?? defaultIcon[variant];
    const actionClass = `${actionBaseClass} ${variantClass[variant]}`;

    return (
        <header className="flex items-center justify-between border-b border-[#E8E8F0] bg-white px-6 py-5 lg:px-8">
            <div>
                <p className="text-xs font-medium text-[#8A8FA8]">{eyebrow}</p>
                <h1 className="mt-1 text-2xl font-semibold">{title}</h1>
                {description && (
                    <p className="mt-1 text-sm text-[#8A8FA8]">{description}</p>
                )}
            </div>
            {action &&
                (action.to ? (
                    <Link to={action.to} className={actionClass}>
                        <Icon size={16} /> {action.label}
                    </Link>
                ) : (
                    <button onClick={action.onClick} className={actionClass}>
                        <Icon size={16} /> {action.label}
                    </button>
                ))}
        </header>
    );
}
