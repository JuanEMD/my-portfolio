import { useTranslation } from "next-i18next/pages";

const NavLink = ({ href, label, children, onClick, className = "" }) => {
  const classes = `block py-1 text-primary font-bold border-b-3 border-transparent hover:border-b-3 hover:border-primary transition duration-300 ease-in-out ${className}`;

  return (
    <a href={href}
      className={classes}
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </a>
  )
}

export default NavLink;
