"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import { useAuth, useProjects } from "../../hooks";
import { generateKeyPair, handleEncrypt } from "@/cryptic";
import { generateKey } from "@/utils";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: { name: string; description: string }) => void;
}

export default function CreateProjectModal({ isOpen, onClose, onCreate }: ProjectModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
    const {createProjects} =useProjects()
    const {session} = useAuth()
const [loading,setLoading] =useState(false)
  const handleSubmit = async (e: React.FormEvent) => {

    try {

      e.preventDefault();
      if (!name.trim()) return;
      setLoading(true)

      let projectSecretKey = generateKey(40)
            let data_ =  await generateKeyPair()
           
      
            if(!data_.publicKey){
              throw("key could not be generated")
      
            }
      
            // let newFullCode = await handleEncrypt({data:fullCode,passphrase:data_.privateKey})
            let privateKey = await handleEncrypt({data:data_.privateKey,passphrase:projectSecretKey,stringify:true})
            let secretPhrase =   await handleEncrypt({data:projectSecretKey,passphrase:session?.secretPhrase,stringify:true})
          
      await createProjects({name,description,secretPhrase,privateKey,publicKey:data_.publicKey},projectSecretKey)
      onCreate({ name, description });
      setName("");
      setDescription("");
      onClose();
    }catch(e){
    
      // toast
    }finally{
setLoading(false)
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-[#161616] rounded-lg border border-white/10 max-w-md w-full shadow-xl">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold">Create New Project</h2>
          <p className="text-sm text-gray-400 mt-1">Set up a new environment project</p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Project Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Production API"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-white/30 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Main production environment..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-white/30 resize-none transition-colors"
              rows={3}
            />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h4 className="text-sm font-medium mb-2">What you'll get:</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                Secure environment variables
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                Multiple branches support
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                Team collaboration
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                Version control & rollback
              </li>
            </ul>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-white/10 hover:bg-white/5 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <Button
          loading={loading}
          onClick={handleSubmit}
            disabled={!name.trim()}
            className="px-4 py-2 bg-white text-black hover:bg-gray-200 disabled:bg-white/10 disabled:text-gray-500 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            Create Project
          </Button>
        </div>
      </div>
    </div>
  );
}




function CreateProjectModal_({ onClose }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-[#161616] rounded-lg border border-white/10 max-w-md w-full shadow-xl">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold">Create New Project</h2>
          <p className="text-sm text-gray-400 mt-1">Set up a new environment project</p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Project Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Production API"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-white/30 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Main production environment..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-white/30 resize-none transition-colors"
              rows={3}
            />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h4 className="text-sm font-medium mb-2">What you'll get:</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                Secure environment variables
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                Multiple branches support
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                Team collaboration
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                Version control & rollback
              </li>
            </ul>
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
            disabled={!name.trim()}
            className="px-4 py-2 bg-white text-black hover:bg-gray-200 disabled:bg-white/10 disabled:text-gray-500 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
}