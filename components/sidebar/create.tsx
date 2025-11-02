"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      {/* Floating Create Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 150 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 shadow-lg shadow-blue-400/40 flex items-center justify-center"
        >
          <Plus className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} size={26} />
        </Button>
      </motion.div>

      {/* Modal / Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-neutral-900 rounded-2xl p-6 w-[90%] max-w-md shadow-2xl relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Create New Event
              </h2>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Event title"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="datetime-local"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <textarea
                  placeholder="Description"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Create
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
