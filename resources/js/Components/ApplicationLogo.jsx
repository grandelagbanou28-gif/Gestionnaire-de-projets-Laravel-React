export default function ApplicationLogo(props) {
    return (
        <svg {...props} viewBox="0 0 200 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="omniGrad" x1="0" y1="0" x2="56" y2="56">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
            </defs>
            <rect x="2" y="2" width="52" height="52" rx="14" stroke="url(#omniGrad)" strokeWidth="3" fill="none" />
            <circle cx="28" cy="28" r="13" stroke="url(#omniGrad)" strokeWidth="3" fill="none" />
            <circle cx="28" cy="28" r="5" fill="url(#omniGrad)" />
            <text x="66" y="38" fontFamily="Inter, system-ui, sans-serif" fontSize="32" fontWeight="800" fill="currentColor" letterSpacing="-0.5">OmniTask</text>
        </svg>
    );
}
