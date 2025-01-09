import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Tab from "./Tab";

interface TabListProps {
  tabs: { id: number; title: string }[];
  activeTabId: number;
  onTabClick: (id: number) => void;
  onTabClose: (id: number) => void;
  onAddTab: () => void;
}

const TabList: React.FC<TabListProps> = ({
  tabs,
  activeTabId,
  onTabClick,
  onTabClose,
  onAddTab,
}) => {
  return (
    <div
      className="flex bg-secondary gap-1 p-2 border-b border-secondary-accent overflow-auto
      scrollbar-thin scrollbar-thumb-secondary-accent scrollbar-track-secondary"
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          id={tab.id}
          title={tab.title}
          isActive={tab.id === activeTabId}
          onClick={onTabClick}
          onClose={onTabClose}
        />
      ))}
      <button
        onClick={onAddTab}
        className="flex justify-center items-center w-[40px] h-[40px] bg-secondary rounded-lg
        hover:bg-primary transition-colors duration-200 shadow-md"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default TabList;
