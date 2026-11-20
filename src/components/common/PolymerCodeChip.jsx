import Image from "next/image";
import polymercodeLogo from "../../../public/images/polymercode-logo.png";
import ArrowUpRight from "@/components/icons/ArrowUpRight";

const PolymerCodeChip = ({ url, id, ariaLabel, className, style }) => {
    return (
        <a
            id={id}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            className={`
                ${className}
                group inline-flex items-center gap-2
                rounded-full
                border border-pill-border/40
                bg-white dark:bg-gray-100
                shadow-sm
                px-3 py-1.5
                text-sm font-medium text-pill-bg
                transition-all duration-200 ease-in-out
                hover:scale-[1.03] hover:shadow-md hover:border-pill-border hover:bg-gray-100 dark:hover:bg-gray-200
                focus:outline-none focus:ring-2 focus:ring-pill-border/60 focus:ring-offset-1
            `}
            style={style}
        >
            <div className="relative w-5 h-5 rounded-full overflow-hidden flex-shrink-0 animate-header-logo-spin">
                <Image
                    src={polymercodeLogo}
                    alt="PolymerCode"
                    fill
                    className="object-cover"
                    sizes="20px"
                />
            </div>
            <span className="whitespace-nowrap">PolymerCode</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-pill-bg transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
    );
};

export default PolymerCodeChip;
