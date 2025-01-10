import React, { useState } from "react";
import TabList from "./TabList";
import Terminal from "../terminal/Terminal";

interface TerminalState {
  input: string;
  output: React.ReactNode[];
}

interface TerminalTab {
  id: number;
  title: string;
}

const TerminalWindow: React.FC = () => {
  const [tabs, setTabs] = useState<TerminalTab[]>([
    { id: 1, title: "Terminal" },
  ]);
  const [activeTabId, setActiveTabId] = useState<number>(1);
  const [terminalStates, setTerminalStates] = useState<
    Record<number, TerminalState>
  >({
    1: { input: "", output: [] },
  });

  const addTab = () => {
    const newTabId = tabs.length > 0 ? tabs[tabs.length - 1].id + 1 : 1;
    setTabs([...tabs, { id: newTabId, title: `Terminal` }]);
    setTerminalStates((prev) => ({
      ...prev,
      [newTabId]: { input: "", output: [] },
    }));
    setActiveTabId(newTabId);
  };

  const closeTab = (tabId: number) => {
    const updatedTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(updatedTabs);
    setTerminalStates((prev) => {
      const newState = { ...prev };
      delete newState[tabId];
      return newState;
    });

    if (activeTabId === tabId && updatedTabs.length > 0) {
      setActiveTabId(updatedTabs[0].id);
    } else if (updatedTabs.length === 0) {
      setActiveTabId(-1);
    }
  };

  const updateTerminalInput = (
    tabId: number,
    value: React.SetStateAction<string>
  ) => {
    setTerminalStates((prev) => ({
      ...prev,
      [tabId]: {
        ...prev[tabId],
        input: typeof value === "function" ? value(prev[tabId].input) : value,
      },
    }));
  };

  const updateTerminalOutput = (
    tabId: number,
    value: React.SetStateAction<React.ReactNode[]>
  ) => {
    setTerminalStates((prev) => ({
      ...prev,
      [tabId]: {
        ...prev[tabId],
        output: typeof value === "function" ? value(prev[tabId].output) : value,
      },
    }));
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
        {activeTabId !== -1 && (
          <div className="absolute inset-0 transition-opacity duration-200">
            <Terminal
              input={terminalStates[activeTabId].input}
              output={terminalStates[activeTabId].output}
              setInput={(value) => updateTerminalInput(activeTabId, value)}
              setOutput={(value) => updateTerminalOutput(activeTabId, value)}
            />
          </div>
        )}
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
