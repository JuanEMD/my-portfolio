import Languajes from "@/components/icons/Languajes";

import styles from "./navbar.module.css";

import ButtonWithIcon from "../../components/common/button/ButtonWithIcon";
import HomeLink from "./HomeLink";
import NavLink from "./NavLink";
import ThemeToggle from "@/components/ThemeToggle.jsx";

const Navbar = ({ homeLink = null, items = [], onLanguageChange, currentLanguage }) => {
    const headerClasses = "grid grid-cols-[1fr_auto] gap-4 px-7 py-4 sticky top-0 bg-gray-100 dark:bg-gray-800 rounded-full z-10";
    const navClasses = "flex justify-between w-full";
    const navLinksClasses = `${styles.navbar__links} gap-2 items-center w-full`;

    return (
        <header className={headerClasses}>
            <nav className={navClasses}>
                {homeLink && (
                    <HomeLink href={homeLink.href} label={homeLink.label}>
                        {homeLink.label}
                    </HomeLink>
                )}

                <div className={navLinksClasses}>
                    {items.map((item) => (
                        <NavLink key={item.title} href={item.href} label={item.label}>
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            </nav>

            <div className="flex items-center gap-4">
                <ButtonWithIcon onClick={onLanguageChange} className="group">
                    <Languajes className="w-4 h-4 text-primary group-hover:hidden" />
                    <span className="hidden group-hover:inline text-primary text-xs font-bold uppercase">{currentLanguage}</span>
                </ButtonWithIcon >
                <ThemeToggle />
            </div>
        </header>
    )
};

export default Navbar;