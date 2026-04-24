const Pill = ({ text, className }) => {
    const pillClasses = `${className} bg-pill-bg border border-pill-border text-pill-text rounded-xl flex justify-start items-center gap-1 py-1 px-2 text-sm`;
    return (
        <span className={pillClasses}>
            {text}
        </span>
    );
};

export default Pill;