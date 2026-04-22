const ButtonWithIcon = ({ className = '', children, label, onClick }) => {

    const buttonClasses = `${className} flex gap-2 py-1.5 ${label ? "px-2" : "px-1.5"} bg-btn-bg text-btn-text border border-btn-border rounded-lg hover:bg-btn-bg/90 transition-colors duration-300 hover:cursor-pointer min-w-8 min-h-8 justify-center items-center`;
    const iconContainerClasses = "flex justify-center items-center min-w-6 min-h-6 rounded-full bg-white p-1";
    const labelClasses = "text-white text-2xl";

    return (
        <button
            className={buttonClasses}
            onClick={onClick}
        >
            <div className={iconContainerClasses} >
                {children}
            </div>
            {label && <span className={labelClasses}>{label}</span>}
        </button>
    );
}

export default ButtonWithIcon;