import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface TabProps {
  id: number;
  title: string;
  isActive: boolean;
  onClick: (id: number) => void;
  onClose: (id: number) => void;
}

const Tab: React.FC<TabProps> = ({ id, title, isActive, onClick, onClose }) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 p-2 cursor-pointer rounded-lg transition-colors duration-200
        text-primary-foreground text-xs
        ${isActive ? "bg-primary" : "bg-secondary hover:bg-primary"}`}
    >
      <span className="truncate">{title}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose(id);
        }}
        className="transition-colors duration-300 w-[24px] h-[24px] rounded-md hover:bg-secondary-accent"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default Tab;
