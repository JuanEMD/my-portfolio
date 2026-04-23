import { useState } from "react";
import Languajes from "@/components/icons/Languajes";
import styles from "./navbar.module.css";
import ButtonWithIcon from "../../components/common/button/ButtonWithIcon";
import HomeLink from "./HomeLink";
import NavLink from "./NavLink";
import ThemeToggle from "@/components/ThemeToggle.jsx";
import { useTranslation } from "next-i18next/pages";

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const Navbar = ({ homeLink = null, items = [], onLanguageChange, currentLanguage }) => {
    const { t } = useTranslation("translation");
    const [menuOpen, setMenuOpen] = useState(false);

    const headerClasses = `${styles["navbar__scroll__border"]} px-3 py-3 sm:px-7 sm:py-4 sticky top-0 bg-gray-100 dark:bg-gray-800 rounded-2xl sm:rounded-lg z-10`;

    return (
        <header className={headerClasses}>
            <button
                className="sm:hidden flex items-center justify-center w-8 h-8 text-primary rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                onClick={() => setMenuOpen(prev => !prev)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            >
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
            <div className="hidden sm:flex items-center justify-between text-sm md:text-base">
                <nav aria-label={t("nav.main")}>
                    {homeLink && (
                        <HomeLink href={homeLink.href} label={homeLink.label}>
                            {homeLink.label}
                        </HomeLink>
                    )}
                </nav>

                <nav className={`hidden sm:flex gap-2 items-center ${styles["navbar__links"]}`} aria-label={t("nav.sections")}>
                    <ul className="flex gap-2 items-center list-none p-0 m-0">
                        {items.map((item) => (
                            <li key={item.title}>
                                <NavLink href={item.href} label={item.label}>
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center gap-2">
                    <ButtonWithIcon onClick={onLanguageChange} className="group" ariaLabel={t("nav.switchLanguage")}>
                        <Languajes className="w-4 h-4 text-primary group-hover:hidden" />
                        <span className="hidden group-hover:inline text-primary text-xs font-bold uppercase" aria-hidden="true">{currentLanguage}</span>
                    </ButtonWithIcon>
                    <ThemeToggle />
                </div>
            </div>

            {menuOpen && (
                <nav id="mobile-menu" aria-label={t("nav.sections")} className="sm:hidden mt-2 pb-1">
                    <ul className="flex flex-col list-none p-0 m-0">
                        {items.map((item) => (
                            <li className="flex justify-center py-3!" key={item.title}>
                                <NavLink className="" href={item.href} label={item.label} onClick={() => setMenuOpen(false)}>
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Navbar;