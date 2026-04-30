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

    const ogLocale = { en: "en_US", es: "es_ES" };
    const canonicalUrl =
        currentLanguage === "en"
            ? seo.siteUrl
            : `${seo.siteUrl}/${currentLanguage}`;
    const ogImage = `${seo.siteUrl}${t("seo.ogImage")}`;

    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: personalInfo.name,
        jobTitle: t(personalInfo.role),
        url: seo.siteUrl,
        email: personalInfo.mail,
        sameAs: [personalInfo.linkedinUrl, personalInfo.githubUrl],
    };

    return (
        <>
            <Head>
                <title>{`${personalInfo.name} — ${t(personalInfo.role)}`}</title>
                <meta name="description" content={t(personalInfo.description)} />
                <meta name="keywords" content={t(seo.keywords)} />
                <meta name="author" content={personalInfo.name} />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

                {/* Canonical */}
                <link rel="canonical" href={canonicalUrl} />

                {/* Hreflang */}
                <link rel="alternate" hrefLang="en" href={seo.siteUrl} />
                <link rel="alternate" hrefLang="es" href={`${seo.siteUrl}/es`} />
                <link rel="alternate" hrefLang="x-default" href={seo.siteUrl} />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:site_name" content={personalInfo.name} />
                <meta property="og:locale" content={ogLocale[currentLanguage] ?? "en_US"} />
                <meta property="og:title" content={`${personalInfo.name} — ${t(personalInfo.role)}`} />
                <meta property="og:description" content={t(personalInfo.description)} />
                <meta property="og:image" content={ogImage} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content={`${personalInfo.name} — ${t(personalInfo.role)}`} />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={canonicalUrl} />
                <meta name="twitter:title" content={`${personalInfo.name} — ${t(personalInfo.role)}`} />
                <meta name="twitter:description" content={t(personalInfo.description)} />
                <meta name="twitter:image" content={ogImage} />
                <meta name="twitter:image:alt" content={`${personalInfo.name} — ${t(personalInfo.role)}`} />

                {/* JSON-LD */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
                />
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
