import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";

import { navLinks, homeLink, personalInfo, languajes, seo } from "@/constants/data";
import Navbar from "@/features/navbar";
import Footer from "@/features/footer";
import Head from "next/head";

const wrapperClasses =
    "h-full bg-gradient-to-b from-gray-100 to-slate-300 dark:from-gray-800 dark:to-slate-900";
const containerClasses =
    "w-full max-w-[900px] grid grid-rows-[auto_1fr_auto] mx-auto h-full";

const Layout = ({ children }) => {
    const { t } = useTranslation("translation");
    const router = useRouter();
    const currentLanguage = router.locale;

    const changeLanguage = () => {
        const nextLanguage = languajes.find((l) => l.code !== currentLanguage);
        router.push(router.pathname, router.asPath, { locale: nextLanguage.code });
    };

    return (
        <>
            <Head>
                <title>{`${personalInfo.name} — ${t("personalInfo.role")}`}</title>
                <meta name="description" content={t("personalInfo.description")} />
                {/* keywords */}
                <meta name="keywords" content={t(seo.keywords)} />
                <meta name="author" content={personalInfo.name} />

            </Head>
            <div id="home" className={wrapperClasses}>
                <div className={containerClasses}>
                    <Navbar
                        homeLink={homeLink}
                        items={navLinks}
                        onLanguageChange={changeLanguage}
                        currentLanguage={currentLanguage}
                    />
                    {children}
                    <Footer personalInfo={personalInfo} />
                </div>
            </div></>
    );
};

export default Layout;
