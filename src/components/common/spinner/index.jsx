const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-[3px]",
    lg: "w-12 h-12 border-4",
};

const Spinner = ({ size = "md", label, className = "", style = {} }) => {
    return (
        <div role="status" aria-label={label || "Loading"} className={className} style={style}>
            <div className={`${sizeClasses[size]} rounded-full border-primary/20 border-t-primary animate-spin`} />
            {label && <span className="sr-only">{label}</span>}
        </div>
    )
}

export default Spinner;