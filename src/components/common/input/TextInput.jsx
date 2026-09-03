const TextInput = ({ label, id, name, value, type = 'text', onChange = () => undefined, onBlur = () => undefined, placeholder, required, error, errorId, autoComplete }) => {

    const handleOnChange = (e) => {
        onChange(e.target.value);
    }

    const handleOnBlur = (e) => {
        onBlur(e.target.value);
    }

    const labelClasses = "block text-lg font-medium text-primary mb-1";
    const inputClasses = "block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-normal h-9 max-h-9 dark:border-gray-700 dark:bg-gray-800 dark:text-primary";

    return (
        <div>
            <label htmlFor={id || name} className={labelClasses}>
                {label}
                {required && <span aria-hidden="true"> *</span>}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                placeholder={placeholder}
                required={required}
                aria-required={required}
                aria-invalid={!!error}
                aria-describedby={error ? errorId : undefined}
                autoComplete={autoComplete}
                className={inputClasses}>
            </input>
        </div>
    )
}

export default TextInput;