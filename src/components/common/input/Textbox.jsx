const Textbox = ({ id, name, label, value, onChange = () => undefined, onBlur = () => undefined, placeholder }) => {

    const handleOnChange = (e) => {
        onChange(e.target.value);
    }

    const handleOnBlur = (e) => {
        onBlur(e.target.value);
    }

    const labelClasses = "grid text-lg font-medium text-primary mb-1";
    const textareaClasses = "border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-normal resize-none dark:border-gray-700 dark:bg-gray-800 dark:text-primary";

    return (
        <label htmlFor={id || name} className={labelClasses}>
            {label}
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                placeholder={placeholder}
                className={textareaClasses}>
            </textarea>
        </label >

    )
}

export default Textbox;