export default function PrimaryButton({ className = '', disabled, children, loading = false, ...props }) {
    return (
        <button
            {...props}
            className={`btn-gradient inline-flex items-center justify-center gap-2 ${className}`}
            disabled={disabled || loading}
        >
            {loading && <span className="spinner" />}
            {children}
        </button>
    );
}