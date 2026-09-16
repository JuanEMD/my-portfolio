// import { useRouter } from "next/router";
// import Head from "next/head";

import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { useTranslation } from "next-i18next/pages";

import {
  projects,
  skills,
  experiences,
  education,
  certificates,
  personalInfo,
} from "@/constants/data";

import { useAnimationObserver } from "@/hooks/useAnimationObserver";
import Header from "@/components/common/header";
import Projects from "@/features/projects";
import Skills from "@/features/skills";
import Experiences from "@/features/experiences";
import Education from "@/features/education";
import Contact from "@/features/contact";
import SectionContainer from "@/components/sectionContainer";
import PersonalInfo from "@/features/personalinfo";
import Layout from "@/layouts";
import { DELAY_BASE } from "@/constants/animation";

const mainClasses = " p-5 sm:p-10";

const targetAnimationElements = [
  {
    element: "skills-section-title",
    identificatorType: "id",
    animation: "animate-fade-right",
  },
  {
    element: "projects-section-title",
    identificatorType: "id",
    animation: "animate-fade-right",
  },
  {
    element: "experiences-section-title",
    identificatorType: "id",
    animation: "animate-fade-right",
  },
  {
    element: "education-section-title",
    identificatorType: "id",
    animation: "animate-fade-right",
  },
  {
    element: "contact-section-title",
    identificatorType: "id",
    animation: "animate-fade-right",
  },
];

export default function Home() {
  const { t } = useTranslation("translation");

  useAnimationObserver({ targetElements: targetAnimationElements });

  return (
    <Layout>
      <main className={mainClasses}>
        <SectionContainer id="personal-info" className="pt-0!">
          <PersonalInfo info={personalInfo} />
        </SectionContainer>
        <SectionContainer id="skills">
          <Header
            title={t("sections.skills")}
            id="skills-section-title"
            className="opacity-0"
            style={{ animationDelay: `${DELAY_BASE * 2}ms` }}
          />
          <Skills skills={skills} />
        </SectionContainer>
        <SectionContainer id="projects">
          <Header
            title={t("sections.projects")}
            id="projects-section-title"
            className="opacity-0"
            style={{ animationDelay: `${DELAY_BASE * 2}ms` }}
          />
          <Projects projects={projects} />
        </SectionContainer>
        <SectionContainer id="experiences">
          <Header
            title={t("sections.experiences")}
            id="experiences-section-title"
            className="opacity-0"
            style={{ animationDelay: `${DELAY_BASE * 2}ms` }}
          />
          <Experiences experiences={experiences} />
        </SectionContainer>
        <SectionContainer id="education">
          <Header
            title={t("sections.education")}
            id="education-section-title"
            className="opacity-0"
            style={{ animationDelay: `${DELAY_BASE * 2}ms` }}
          />
          <Education education={education} certificates={certificates} />
        </SectionContainer>
        <SectionContainer id="contact">
          <Header
            title={t("sections.contact")}
            id="contact-section-title"
            className="opacity-0"
            style={{ animationDelay: `${DELAY_BASE * 2}ms` }}
          />
          <Contact />
        </SectionContainer>
      </main>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["translation"])),
  },
});
