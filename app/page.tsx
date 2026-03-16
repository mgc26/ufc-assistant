"use client";

import { useState } from "react";
import Header from "@/components/Header";
import TabNav from "@/components/TabNav";
import Footer from "@/components/Footer";
import Overview from "@/components/tabs/Overview";
import HowItWorks from "@/components/tabs/HowItWorks";
import WeeklyRhythm from "@/components/tabs/WeeklyRhythm";
import Escalations from "@/components/tabs/Escalations";
import FAQ from "@/components/tabs/FAQ";
import Support from "@/components/tabs/Support";

const tabs: Record<string, React.ComponentType> = {
  overview: Overview,
  "how-it-works": HowItWorks,
  "weekly-rhythm": WeeklyRhythm,
  escalations: Escalations,
  faq: FAQ,
  support: Support,
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview");
  const ActivePanel = tabs[activeTab];

  return (
    <div className="min-h-screen flex flex-col bg-ufc-near-black">
      <Header />
      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1" role="tabpanel" id={`panel-${activeTab}`}>
        <ActivePanel />
      </main>
      <Footer />
    </div>
  );
}
