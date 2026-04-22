const Tooltip = ({ text, children }) => {

    const containerClasses = "relative group";
    const tooltipClasses = "absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10 transition-opacity duration-200";

    return (
        <div className={containerClasses}>
            {children}
            {text && (
                <span className={tooltipClasses}>
                    {text}
                </span>
            )}
        </div>
    )
}

export default Tooltip;