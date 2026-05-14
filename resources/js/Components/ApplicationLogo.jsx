export default function ApplicationLogo(props) {
    return (
        <svg {...props} viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="56" height="56" rx="14" stroke="currentColor" strokeWidth="3" fill="none" />
            <circle cx="30" cy="30" r="14" stroke="currentColor" strokeWidth="3" fill="none" />
            <text x="62" y="42" fontFamily="Inter, system-ui, sans-serif" fontSize="34" fontWeight="700" fill="currentColor" letterSpacing="-0.5">OmniTask</text>
        </svg>
    );
}
