const Button = ({ children, onClick = () => undefined, className, type = "button", disabled }) => {

    const defaultClasses = `bg-btn-bg text-btn-text border border-btn-border px-4 py-2 rounded-lg hover:bg-btn-bg/90 transition-colors duration-200 h-10 ${disabled ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"} ${className}`;

    return (
        <button onClick={onClick} className={defaultClasses} type={type} disabled={disabled}>
            {children}
        </button>
    )
}

export default Button;