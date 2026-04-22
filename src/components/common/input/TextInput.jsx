const TextInput = ({ label, id, name, value, type = 'text', onChange = () => undefined, onBlur = () => undefined, placeholder }) => {

    const handleOnChange = (e) => {
        onChange(e.target.value);
    }

    const handleOnBlur = (e) => {
        onBlur(e.target.value);
    }

    const labelClasses = "grid text-lg font-medium text-primary mb-1";
    const inputClasses = "border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-normal h-9 max-h-9 dark:border-gray-700 dark:bg-gray-800 dark:text-primary";

    return (
        <label htmlFor={id || name} className={labelClasses}>
            {label}
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                placeholder={placeholder}
                className={inputClasses}>
            </input>
        </label>
    )
}

export default TextInput;