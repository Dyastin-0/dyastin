import React from "react";
import Terminal from "../terminal/Terminal";

interface TerminalTabContentProps {
  tabId: number;
  activeTabId: number;
}

const TerminalTabContent: React.FC<TerminalTabContentProps> = ({
  tabId,
  activeTabId,
}) => {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-200 ${
        tabId === activeTabId ? "opacity-100 z-10" : "opacity-0 z-0"
      }`}
      style={{ pointerEvents: tabId === activeTabId ? "auto" : "none" }}
    >
      <Terminal />
    </div>
  );
};

export default TerminalTabContent;
