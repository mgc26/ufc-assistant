"use client";

import { useRef } from "react";

interface TabNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "how-it-works", label: "How It Works" },
  { id: "weekly-rhythm", label: "Weekly Rhythm" },
  { id: "escalations", label: "Escalations" },
  { id: "faq", label: "FAQ" },
  { id: "support", label: "Support" },
];

export default function TabNav({ activeTab, onTabChange }: TabNavProps) {
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    let nextIndex: number | null = null;

    switch (e.key) {
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % tabs.length;
        break;
      case "ArrowLeft":
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    onTabChange(tabs[nextIndex].id);

    const tabListEl = tabListRef.current;
    if (tabListEl) {
      const buttons = tabListEl.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]'
      );
      buttons[nextIndex]?.focus();
    }
  };

  return (
    <nav className="bg-ufc-charcoal">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={tabListRef}
          role="tablist"
          className="flex gap-1 overflow-x-auto scrollbar-hide tab-scroll-fade"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onTabChange(tab.id)}
                onKeyDown={handleKeyDown}
                className={`
                  whitespace-nowrap px-4 py-3 uppercase font-semibold tracking-tight text-sm
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-ufc-red
                  ${
                    isActive
                      ? "text-ufc-white border-b-2 border-ufc-red"
                      : "text-ufc-muted-gray hover:text-ufc-white border-b-2 border-transparent"
                  }
                `}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
