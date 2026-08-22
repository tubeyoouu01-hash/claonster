"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button"; // shadcn/ui button (optional)
import { X } from "lucide-react";
import Button from "../ui/Button";
import { useProjects } from "../../hooks";

type DeleteModalProps = {
  isOpen: any;
  project:any;
  onClose: () => void;
  onDelete: () => Promise<void> | void;
};

export  function DeleteModal__({
  isOpen,
  onClose,
  onDelete,
}: DeleteModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
    const {createProjects,fetchProjects,deleteProjects} =useProjects()

  const handleDelete = async () => {
    try{

      setLoading(true);
      await onDelete();
      await  deleteProjects(isOpen)
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    }catch(e){

    }
  };

  return (
    <AnimatePresence>
      {!!isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-sm shadow-lg p-6 w-[350px] relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 text-gray-500 hover:text-black"
            >
              <X className="h-5 w-5" />
            </button>

            {!success ? (
              <>
                <h2 className="text-lg font-semibold mb-2">Delete Item?</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Are you sure you want to delete this item? This action cannot
                  be undone.
                </p>

                <div className="flex justify-end gap-3">
                  <Button
                  className="rounded-sm border border-gray-300 bg-white text-black hover:bg-gray-100"
                    variant="default"
                    onClick={onClose}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="danger"
                    className="rounded-sm "
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    ✅
                  </motion.div>
                </div>
                <h3 className="text-base font-semibold">
                  Deleted Successfully
                </h3>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}








export default function DeleteModal({
  isOpen,
  onClose,
  onDelete,
  project,
}: DeleteModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
    const {createProjects,fetchProjects,deleteProjects} =useProjects()

  const handleDelete = async () => {
    try{

      setLoading(true);
      await onDelete();
      await  deleteProjects(project?._id)
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    }catch(e){

    }
  };

  return (
   <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-[#161616] rounded-lg border border-white/10 max-w-md w-full shadow-xl">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold">Delete Project</h2>
        </div>

        <div className="p-6">
          <p className="text-gray-300 mb-4">
            Are you sure you want to delete <span className="font-semibold text-white">{project?.name}</span>?
          </p>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <p className="text-sm text-red-400">
              This action cannot be undone. All environment variables and branches will be permanently deleted.
            </p>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-end gap-3">
          {/* <button
            onClick={onClose}
            className="px-4 py-2 border border-white/10 hover:bg-white/5 rounded-lg transition-colors"
          >
            Cancel
          </button> */}

              {!success ? (
              <>
            

                <div className="flex justify-end gap-3">
                  <Button
                  className="rounded-sm border border-gray-300 bg-white text-black hover:bg-gray-100"
                    variant="default"
                    onClick={onClose}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="danger"
                    className="rounded-sm "
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center">
                {/* <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    ✅
                  </motion.div>
                </div> */}
                <h3 className="text-base font-semibold">
                  Deleted Successfully
                </h3>
              </div>
            )}
          {/* <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            Delete Project
          </button> */}
        </div>
      </div>
    </div>
  );
}



function DeleteModal_({ project, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-[#161616] rounded-lg border border-white/10 max-w-md w-full shadow-xl">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold">Delete Project</h2>
        </div>

        <div className="p-6">
          <p className="text-gray-300 mb-4">
            Are you sure you want to delete <span className="font-semibold text-white">{project?.name}</span>?
          </p>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <p className="text-sm text-red-400">
              This action cannot be undone. All environment variables and branches will be permanently deleted.
            </p>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-white/10 hover:bg-white/5 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            Delete Project
          </button>
        </div>
      </div>
    </div>
  );
}