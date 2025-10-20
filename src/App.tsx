import React, { useState } from "react";
import Shell from "./components/Shell";
import Hero from "./components/Hero";
import WhyUs from "./components/WhyUs";
import ProjectsSlides from "./components/ProjectsSlides";
import BundlesSection from "./components/BundlesSection";
import ProcessSection from "./components/ProcessSection";
import ContactSection from "./components/ContactSection";
import QuestionnairePage from "./components/QuestionnairePage";

export default function App() {
  const [view, setView] = useState<"main" | "questionnaire">("main");
  const [selectedProjectKey, setSelectedProjectKey] = useState<string | null>(null);

  const openQuestionnaire = (key: string) => {
    setSelectedProjectKey(key);
    setView("questionnaire");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backToMain = () => {
    setView("main");
    setSelectedProjectKey(null);
  };

  return (
    <Shell>
      {view === "main" ? (
        <>
          <Hero />
          <WhyUs />
          <ProjectsSlides onRequestSOW={openQuestionnaire} />
          <BundlesSection />
          <ProcessSection />
          <ContactSection />
        </>
      ) : (
        selectedProjectKey && (
          <QuestionnairePage
            projectKey={selectedProjectKey}
            onDone={() => {}}
            onBackToMain={backToMain}
          />
        )
      )}
    </Shell>
  );
}
