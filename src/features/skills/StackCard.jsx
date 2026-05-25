const cardClasses = "relative bg-white/80 dark:bg-white/[0.04] border border-black/[0.07] dark:border-white/[0.07] rounded-xl pt-4 px-3.5 pb-3.5 overflow-hidden flex flex-col gap-[0.15rem] transition-[transform,box-shadow,border-color] duration-200 animate-fade-up cursor-default hover:-translate-y-1 hover:[border-color:var(--accent)] hover:[box-shadow:0_8px_24px_color-mix(in_srgb,var(--accent)_25%,transparent)]";
const accentBarClasses = "absolute top-0 left-0 right-0 h-[3px] [background:var(--accent)] rounded-t-xl";
const contentClasses = "flex flex-row justify-center items-center gap-2";
const letterClasses = "text-[1.4rem] leading-none [color:var(--accent)] mb-[0.3rem] block";
const nameClasses = "text-[0.825rem] font-bold text-[#1a2f45] dark:text-[#c8dff0] leading-tight block";

const StackCard = ({ name, color, letter, animationDelay }) => (
    <div className={cardClasses} style={{ "--accent": color, animationDelay }}>
        <div className={accentBarClasses} />
        <div className={contentClasses}>
            <span className={letterClasses}>{letter}</span>
            <span className={nameClasses}>{name}</span>
        </div>
    </div>
);

export default StackCard;
