function Slab({
    y,
    top,
    left,
    right,
    dot,
    bar,
}: {
    y: number;
    top: string;
    left: string;
    right: string;
    dot?: boolean;
    bar?: boolean;
}) {
    const round = { strokeLinejoin: "round", strokeWidth: 5 };
    return (
        <g transform={`translate(0 ${y})`}>
            <path
                d="M80 66 140 88v10L80 76Z"
                fill={left}
                stroke={left}
                {...round}
            />
            <path
                d="M200 66 140 88v10l60-22Z"
                fill={right}
                stroke={right}
                {...round}
            />
            <path
                d="M140 46 200 66 140 88 80 66Z"
                fill={top}
                stroke={top}
                {...round}
            />
            {dot && <circle cx="166" cy="68" r="5" fill="#7255D8" />}
            {bar && (
                <path
                    d="M114 68 146 57"
                    stroke="#fff"
                    strokeOpacity=".75"
                    strokeWidth="6"
                    strokeLinecap="round"
                />
            )}
        </g>
    );
}

export default function CardStack() {
    return (
        <svg
            viewBox="0 0 280 190"
            className="h-full w-full"
            fill="none"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid meet"
        >
            <defs>
                <radialGradient id="sl-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0" stopColor="#7255D8" stopOpacity=".55" />
                    <stop offset="1" stopColor="#7255D8" stopOpacity="0" />
                </radialGradient>
            </defs>
            <ellipse cx="140" cy="158" rx="80" ry="16" fill="url(#sl-glow)" />
            <Slab y={52} top="#EAE7F2" left="#C9C4DA" right="#B5AFCB" dot />
            <Slab y={26} top="#B9A9F0" left="#9886DD" right="#8470D0" bar />
            <Slab y={0} top="#F2F0F8" left="#D6D1E5" right="#C2BCD8" dot />
        </svg>
    );
}
