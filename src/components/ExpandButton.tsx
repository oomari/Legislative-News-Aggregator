import React, { useState } from "react";

/*
 * ExpandButton component
 */
function ExpandButton({ desc }: { desc?: string }) {
  // State to track whether the description is expanded or not
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle the click event and toggle the isOpen state
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={` rounded-lg active:bg-gray-300 ${
        isOpen ? "" : "hover:cursor-pointer"
      }`}
      onClick={handleClick}
    >
      <p
        // Paragraph element to display the description
        className={`text-sm font-bold md:text-base whitespace-pre-wrap break-words ${
          isOpen ? "" : "line-clamp-1"
        }`}
      >
        {desc}
      </p>
      <button
        // Button to toggle the description visibility
        onClick={handleClick}
        className="font-semibold text-sm"
      >
        ...{isOpen ? "show less" : "show more"}
      </button>
    </div>
  );
}

export default ExpandButton;
