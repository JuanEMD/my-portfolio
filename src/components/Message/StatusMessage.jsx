const TYPE_CLASSES = {
    error: "text-red-500",
    success: "text-green-500",
};

const StatusMessage = ({ message, className = "", type = "error" }) => (
    <small className={`${TYPE_CLASSES[type] ?? TYPE_CLASSES.error} min-h-5 ${className}`}>
        {message}
    </small>
);

export default StatusMessage;