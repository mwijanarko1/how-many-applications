"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ROTATION_ANGLE_OPEN = 180;

export type DropdownItem = {
  id: string | number;
  label: string;
  icon?: React.ReactNode;
};

export type BasicDropdownProps = {
  label?: string;
  items: DropdownItem[];
  onChange?: (item: DropdownItem) => void;
  className?: string;
  showLabel?: boolean;
  icon?: React.ReactNode;
};

export default function BasicDropdown({
  label = "",
  items,
  onChange,
  className = "",
  showLabel = true,
  icon,
}: BasicDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleItemSelect = (item: DropdownItem) => {
    setSelectedItem(item);
    setIsOpen(false);
    onChange?.(item);
  };

  // Update button position when opening
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      setButtonRect(buttonRef.current.getBoundingClientRect());
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasCustomPadding = className.includes('p-0');
  const buttonClasses = `flex w-full items-center ${icon && !showLabel ? 'justify-center' : 'justify-between'} gap-2 rounded-lg border bg-background text-left transition-colors hover:bg-primary ${
    hasCustomPadding ? '' : 'px-4 py-2'
  }`;

  return (
    <>
      <div className={`relative inline-block flex flex-col ${className}`} style={{ height: '18px' }}>
        <button
          ref={buttonRef}
          className={`${buttonClasses} flex-wrap`}
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          style={{ position: 'static', transform: 'none' }}
        >
          {showLabel && (selectedItem?.label || label) && (
            <span className="block truncate">
              {selectedItem ? selectedItem.label : label}
            </span>
          )}
          {icon ? (
            icon
          ) : (
            <motion.div
              animate={{ rotate: isOpen ? ROTATION_ANGLE_OPEN : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          )}
        </button>
      </div>

      {isOpen && buttonRect && createPortal(
        <AnimatePresence>
          <motion.div
            ref={dropdownRef}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed z-50 min-w-[8rem] w-max max-w-xs origin-bottom rounded-md border bg-white shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            exit={{
              opacity: 0,
              scale: 0.95,
              transition: { duration: 0.15 },
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              bottom: window.innerHeight - buttonRect.top + 4,
              left: Math.max(8, Math.min(buttonRect.left, window.innerWidth - 200)),
            }}
          >
            <ul aria-labelledby="dropdown-button" className="py-2">
              {items.map((item) => (
                <motion.li
                  animate={{ opacity: 1, x: 0 }}
                  className="block"
                  exit={{ opacity: 0, x: -10 }}
                  initial={{ opacity: 0, x: -10 }}
                  key={item.id}
                  role="menuitem"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  whileHover={{ x: 5 }}
                >
                  <button
                    className={`flex w-full items-center px-4 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground ${
                      selectedItem?.id === item.id
                        ? "font-medium text-brand"
                        : ""
                    }`}
                    onClick={() => handleItemSelect(item)}
                    type="button"
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}

                    {selectedItem?.id === item.id && (
                      <motion.span
                        animate={{ scale: 1 }}
                        className="ml-auto"
                        initial={{ scale: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <svg
                          className="h-4 w-4 text-brand"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <title>Selected</title>
                          <path
                            d="M5 13l4 4L19 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                      </motion.span>
                    )}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
