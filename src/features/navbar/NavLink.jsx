import { useTranslation } from "next-i18next/pages";

const NavLink = ({ href, label, children }) => {
  const { t } = useTranslation("translation");
  const classes = "grid justify-center text-primary font-bold border-b-3 border-transparent  hover:border-b-3 hover:border-primary transition duration-300 ease-in-out";

  return (
    <a href={href}
      className={classes}
      aria-label={t(label)}
    >
      {t(children)}
    </a>
  )
}

export default NavLink;
