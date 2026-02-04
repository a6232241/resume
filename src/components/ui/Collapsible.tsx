"use client";

import { cn } from "@src/util";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface CollapsibleProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  badge?: string;
  className?: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function Collapsible({ title, children, icon, badge, className, isOpen, onToggle }: CollapsibleProps) {
  return (
    <div
      className={cn(
        "relative transform-gpu overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/50",
        isOpen ? "shadow-md ring-1 ring-purple-500/20" : "shadow-sm hover:border-gray-300 dark:hover:border-gray-700",
        className,
      )}>
      <button onClick={onToggle} className="flex w-full items-center gap-4 p-5 text-left focus:outline-none">
        <div className="flex flex-1 items-center gap-4">
          {icon && (
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                isOpen
                  ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                  : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
              )}>
              {icon}
            </div>
          )}
          <div className="flex flex-1 flex-col items-start gap-2 lg:flex-row lg:items-center">
            <h3 className="flex-1 text-lg font-bold text-gray-900 dark:text-white">{title}</h3>

            {badge && (
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                {badge}
              </span>
            )}
          </div>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-400 dark:text-gray-500">
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}>
            <div className="border-t border-gray-100 px-5 pt-4 pb-6 dark:border-gray-800">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
