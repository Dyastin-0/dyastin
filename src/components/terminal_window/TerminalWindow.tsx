import React, { useState } from "react";
import TabList from "./TabList";
import TerminalTabContent from "./TerminalTab";

export interface TerminalTab {
  id: number;
  title: string;
}

const TerminalWindow: React.FC = () => {
  const [tabs, setTabs] = useState<TerminalTab[]>([
    { id: 1, title: "Terminal" },
  ]);
  const [activeTabId, setActiveTabId] = useState<number>(1);

  const addTab = () => {
    const newTabId = tabs.length > 0 ? tabs[tabs.length - 1].id + 1 : 1;
    setTabs([...tabs, { id: newTabId, title: `Terminal` }]);
    setActiveTabId(newTabId);
  };

  const closeTab = (tabId: number) => {
    const updatedTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(updatedTabs);
    if (activeTabId === tabId && updatedTabs.length > 0) {
      setActiveTabId(updatedTabs[0].id);
    } else if (updatedTabs.length === 0) {
      setActiveTabId(-1);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <TabList
        tabs={tabs}
        activeTabId={activeTabId}
        onTabClick={setActiveTabId}
        onTabClose={closeTab}
        onAddTab={addTab}
      />
      <div className="flex-1 bg-secondary overflow-hidden relative">
        {tabs.map((tab) => (
          <TerminalTabContent
            key={tab.id}
            tabId={tab.id}
            activeTabId={activeTabId}
          />
        ))}
        {tabs.length === 0 && (
          <div className="flex items-center justify-center h-full text-primary-foreground">
            <span>No terminals open. Click </span>
            <span className="ml-1 mr-1 text-primary-highlight">+</span>
            <span> to open a new terminal.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TerminalWindow;
