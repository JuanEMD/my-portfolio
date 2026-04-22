const StatusMessage = ({ message, className = "", type = "error" }) => {

    const defaultClasses = `text-${type === "error" ? "red" : "green"}-500 min-h-5 ${className}`;
    return (
        <small className={defaultClasses}>
            {message}
        </small>
    )
}

export default StatusMessage;