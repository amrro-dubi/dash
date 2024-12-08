import React, { useEffect, useRef } from "react";
import useCustomSelect from "../hooks/useCustomSelect.js";

interface SelectComponentProps {
  options: string[]; // Array of string options for the dropdown
  placeholder: string; // Placeholder text when no option is selected
  open?: boolean; // Initial open state (optional)
  customClass?: string; // Optional custom class for styling
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  options,
  placeholder,
  open = false,
  customClass,
}) => {
  const {
    isOpen,
    selectedOption,
    openDropdown,
    closeDropdown,
    toggleDropdown,
    selectOption,
  } = useCustomSelect(options, open);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      // Click is outside the dropdown, close it
      closeDropdown();
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Add event listener for outside clicks
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      // Cleanup event listener when component unmounts or `isOpen` changes
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const dropdownClassName = `nice-select ${customClass || ""} ${
    isOpen ? "open" : ""
  }`;

  return (
    <div
      className={dropdownClassName}
      tabIndex={0}
      onClick={toggleDropdown}
      ref={dropdownRef}
    >
      <span className="current">
        {selectedOption || placeholder}
      </span>
      <ul className="list">
        {options.map((option, index) => (
          <li
            key={index}
            className={`option${
              selectedOption === option ? " selected focus" : ""
            }`}
            data-value={index}
            onClick={(e) => {
              e.stopPropagation(); // Prevent parent `onClick`
              selectOption(option);
              openDropdown(); // Open the next dropdown
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectComponent;
