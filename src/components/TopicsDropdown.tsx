import { useState } from "react";
import { topics } from "@/app/constants"; // Ensure this path is correct and the topics array is properly exported from the constants file
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

// Define the type for the Topic
type Topic = string | null;

/*
 * TopicDropdown component
 */
export default function TopicsDropdown({
  label,
  onSelect,
}: {
  label?: string;
  onSelect?: (topic: string) => void;
}) {
  // State to track the selected item
  const [selectedItem, setSelectedItem] = useState<Topic>(null);

  // Function to handle the selection of a topic
  const handleSelect = (topic: string) => {
    // Update the selected item topic
    setSelectedItem(topic);
    if (onSelect) {
      // Call the onSelect function if provided
      onSelect(topic);
    }
  };

  return (
    <div className="flex items-end w-full overflow-y">
      {/* Menu component from Headless UI */}
      <Menu as="div" className="w-full relative inline-block text-left">
        <MenuButton className="inline-flex w-5/6 h-10 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {/* Display the selected item or the label */}
          {selectedItem || label}
          <ChevronDownIcon
            aria-hidden="true"
            className="ml-auto size-5 text-gray-400"
          />
        </MenuButton>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in max-h-60 overflow-y-auto"
        >
          <div className="py-1">
            {/* MenuItem for the default option */}
            <MenuItem key="blank_option">
              <a
                className={`block px-4 py-2 text-sm bg-gray-100 text-gray-900 hover:bg-gray-500 hover:cursor-pointer"`}
                onClick={() => handleSelect("")}
              >
                --Select a Topic--
              </a>
            </MenuItem>
            {/* Map through the topics array and create a MenuItem for each topic */}
            {topics?.map((topic) => (
              <MenuItem key={topic.name}>
                <a
                  className={`block px-4 py-2 text-sm bg-gray-100 text-gray-900 hover:bg-gray-500 hover:cursor-pointer"`}
                  onClick={() => handleSelect(topic.name)}
                >
                  {topic.name}
                </a>
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}
