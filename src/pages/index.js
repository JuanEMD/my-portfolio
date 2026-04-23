import { useRouter } from "next/router";

import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { useTranslation } from "next-i18next/pages";

import {
  navLinks,
  homeLink,
  projects,
  skills,
  experiences,
  education,
  certificates,
  personalInfo,
  languajes,
} from "@/constants/data";

import Header from "@/components/common/header";
import Projects from "@/features/projects";
import Skills from "@/features/skills";
import Experiences from "@/features/experiences";
import Education from "@/features/education";
import Contact from "@/features/contact";
import SectionContainer from "@/components/sectionContainer";
import Footer from "@/features/footer";
import Navbar from "@/features/navbar";
import PersonalInfo from "@/features/personalinfo";

const wrapperClasses =
  "h-full bg-gradient-to-b from-gray-100 to-slate-300 dark:from-gray-800 dark:to-slate-900";
const containerClasses =
  "w-full max-w-[900px] grid grid-rows-[auto_1fr_auto] mx-auto h-full";
const mainClasses = " p-5 sm:p-10";

export default function Home() {
  const { t } = useTranslation("translation");
  const router = useRouter();
  const currentLanguage = router.locale;

  const changeLanguage = () => {
    const nextLanguage = languajes.find((l) => l.code !== currentLanguage);
    router.push(router.pathname, router.asPath, { locale: nextLanguage.code });
  };

  return (
    <div id="home" className={wrapperClasses}>
      <div className={containerClasses}>
        <Navbar
          homeLink={homeLink}
          items={navLinks}
          onLanguageChange={changeLanguage}
          currentLanguage={currentLanguage}
        />
        <main className={mainClasses}>
          <SectionContainer className="pt-0!">
            <PersonalInfo info={personalInfo} />
          </SectionContainer>
          <SectionContainer id="projects">
            <Header title={t("sections.projects")} />
            <Projects projects={projects} />
          </SectionContainer>
          <SectionContainer id="skills">
            <Header title={t("sections.skills")} />
            <Skills skills={skills} />
          </SectionContainer>
          <SectionContainer id="experiences">
            <Header title={t("sections.experiences")} />
            <Experiences experiences={experiences} />
          </SectionContainer>
          <SectionContainer id="education">
            <Header title={t("sections.education")} />
            <Education education={education} certificates={certificates} />
          </SectionContainer>
          <SectionContainer id="contact">
            <Header title={t("sections.contact")} />
            <Contact />
          </SectionContainer>
        </main>
        <Footer personalInfo={personalInfo} />
      </div>
    </div>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["translation"])),
  },
});
