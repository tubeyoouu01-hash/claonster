// "use client";
// import React, { useCallback, useEffect, useState } from 'react';
// import { 
//   Plus,
//   Copy,
//   Trash2,
//   ArrowRight,
//   Calendar,
//   Key,
//   Folder,
//   Search,
//   Filter,
//   MoreVertical,
//   Eye,
//   GitBranch
// } from 'lucide-react';
// import { useAuth, useProjects } from '../../../../hooks';
// import { useAtom } from 'jotai';
// import { envsProjectstate } from '@/states';
// import CreateProjectModal from '../../../../components/modals/createenv';
// import DeleteModal from '../../../../components/modals/deleteenvmodal';
// import { getreadabledate } from '@/utils';
// import Link from 'next/link';

// export default function DarkProjectsPage() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   // const [deleteSelectedProject, setDeleteSelectedProject] = useState(null);
//   const [selectedProject, setSelectedProject] = useState(null);


//  const onClose = useCallback(() => {
//     setdeleteIsOpen(false);
//   }, []);

//   const {session} = useAuth()
//   const onProjectClose = useCallback(() => {
//     setcreateProjectIsOpen(false);
//   }, []);
//   const onDelete = useCallback((project) => {

//     // setDeleteSelectedProject(project);
//     // setShowDeleteModal(true)
//   }, []);
//   const onCreate = useCallback(() => {}, []);
//   // const o = useCallback(()=>{},[])
//   const [deleteIsOpen, setdeleteIsOpen] = useState<any>(false);
//   const [createProjectIsOpen, setcreateProjectIsOpen] = useState(false);
//   const [envsProjects, setEnvsProjects] = useAtom(envsProjectstate);
//   const {createProjects,fetchProjects,deleteProjects} =useProjects()
//   // useEffect(()=)
//   const [key,setKey]=useState<String|undefined>("")

//   useEffect(()=>{
// // PUBLICKEY

// if(session?.token &&session?.secretPhrase ){
//   // let key_ await  

//   fetchProjects()
// }else{
//   setEnvsProjects({hasMore:false,nextPage:1,data:[]})
// }
//   },[
//     session?.token ,  session?.secretPhrase
//   ])





//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text);
//     // Show toast notification
//   };

//   const handleDelete = (project) => {
//     setSelectedProject(project);
//     setShowDeleteModal(true);
//   };

//   return (
//     <div className="min-h-screen bg-[#0A0A0A] text-white">
//       <div className="max-w-7xl mx-auto px-6 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold mb-2">Projects</h1>
//           <p className="text-gray-400">Organize your environments and collaborate with your team</p>
//         </div>

//         {/* Actions Bar */}
//         <div className="flex items-center justify-between mb-8 gap-4">
//           {/* Search */}
//           <div className="relative flex-1 max-w-md">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search projects..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 outline-none focus:border-white/30 transition-colors"
//             />
//           </div>

//           <div className="flex items-center gap-3">
//             {/* Filter */}
//             <button className="px-3 py-2 border border-white/10 hover:bg-white/5 rounded-lg flex items-center gap-2 transition-colors">
//               <Filter className="w-4 h-4" />
//               <span className="text-sm">Filter</span>
//             </button>

//             {/* Create Project */}
//             <button
//               onClick={() => setShowCreateModal(true)}
//               className="px-4 py-2 bg-white text-black hover:bg-gray-200 rounded-lg flex items-center gap-2 font-medium transition-colors"
//             >
//               <Plus className="w-4 h-4" />
//               Create Project
//             </button>
//           </div>
//         </div>

//         {/* Projects List - Wide Layout */}
//         <div className="space-y-3">
//           {envsProjects.data.map((project) => (
//             <ProjectCard 
//               key={project.id}
//               project={project}
//               onCopy={handleCopy}
//               onDelete={handleDelete}
//             />
//           ))}
//         </div>

//         {/* Empty State (if no projects) */}
//         {envsProjects.data.length === 0 && (
//           <div className="text-center py-20">
//             <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Folder className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
//             <p className="text-gray-400 mb-6">Get started by creating your first project</p>
//             <button
//               onClick={() => setShowCreateModal(true)}
//               className="px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-lg inline-flex items-center gap-2 font-medium"
//             >
//               <Plus className="w-4 h-4" />
//               Create Project
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Create Project Modal */}
//       {showCreateModal && (
//         <CreateProjectModal 
//         onClose={() => setShowCreateModal(false)}
//         isOpen={showCreateModal}
        
//           //  onClose={setShowCreateModal}
//           onCreate={onCreate}
//         />
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <DeleteModal
//         onDelete={()=>{}}
//         project={selectedProject}
//         isOpen={showDeleteModal}
//           // project={selectedProject}
//           onClose={() => setShowDeleteModal(false)


//           }
//           // onConfirm={() => {
//           //   // Handle delete
//           //   setShowDeleteModal(false);
//           // }}
//         />
//       )}
//     </div>
//   );
// }

// function ProjectCard({ project, onCopy, onDelete }) {
//   const [showMenu, setShowMenu] = useState(false);

//   return (
//     <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all group">
//       <div className="flex items-center gap-6">
//         {/* Icon */}
//         <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
//           <Folder className="w-6 h-6" />
//         </div>

//         {/* Project Info */}
//         <div className="flex-1 min-w-0">
//           <h3 className="font-semibold text-white mb-1">{project.name}</h3>
//           <p className="text-sm text-gray-400">{project.description}</p>
//         </div>

//         {/* Stats */}
//         {/* <div className="flex items-center gap-8 px-6">
//           <div className="text-center">
//             <div className="text-lg font-semibold">{project.variables}</div>
//             <div className="text-xs text-gray-400">Variables</div>
//           </div>
//           <div className="text-center">
//             <div className="text-lg font-semibold">{project.branches}</div>
//             <div className="text-xs text-gray-400">Branches</div>
//           </div>
//           <div className="text-center">
//             <div className="text-lg font-semibold">{project.team}</div>
//             <div className="text-xs text-gray-400">Team</div>
//           </div>
//         </div> */}

//         {/* Key */}
//         <div className="flex items-center gap-2 px-3 py-2 bg-black/30 rounded border border-white/10 min-w-[200px]">
//           <Key className="w-3 h-3 text-gray-400 flex-shrink-0" />
//           <code className="text-xs text-gray-400 flex-1 truncate max-w-30">{project.key}</code>
//           <button
//             onClick={() => onCopy(project.key)}
//             className="text-gray-400 hover:text-white transition-colors"
//           >
//             <Copy className="w-3 h-3" />
//           </button>
//         </div>

//         {/* Last Modified */}
//         <div className="flex items-center gap-2 text-xs text-gray-400 min-w-[100px]">
//           <Calendar className="w-3 h-3" />
//           <span>{getreadabledate(project.createdAt)}</span>
//         </div>

//         {/* Actions */}
//         <div className="flex items-center gap-2">
//           <Link
//             href={`/dashboard/projects/${project._id}`}
//             className="px-3 py-1.5 border border-white/10 hover:bg-white/5 rounded flex items-center gap-1 text-sm transition-colors"
//           >
//             <Eye className="w-4 h-4" />
//             <span>Open</span>
//           </Link>
          
//           <div className="relative">
//             <button
//               onClick={() => setShowMenu(!showMenu)}
//               className="p-1.5 hover:bg-white/10 rounded transition-colors"
//             >
//               <MoreVertical className="w-4 h-4" />
//             </button>

//             {showMenu && (
//               <div className="absolute right-0 mt-2 w-48 bg-[#161616] border border-white/10 rounded-lg shadow-xl z-10">
//                 <button
//                   onClick={() => {
//                     onDelete(project);
//                     setShowMenu(false);
//                   }}
//                   className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 flex items-center gap-2 text-red-400"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                   Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { 
  Plus,
  Copy,
  Trash2,
  ArrowRight,
  Calendar,
  Key,
  Folder,
  Search,
  Filter,
  MoreVertical,
  Eye,
  GitBranch
} from 'lucide-react';
import { useAuth, useProjects } from '../../../../hooks';
import { useAtom } from 'jotai';
import { envsProjectstate } from '@/states';
import CreateProjectModal from '../../../../components/modals/createenv';
import DeleteModal from '../../../../components/modals/deleteenvmodal';
import { getreadabledate } from '@/utils';
import Link from 'next/link';

// shadcn/ui dropdown
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DarkProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const onClose = useCallback(() => {
    setdeleteIsOpen(false);
  }, []);

  const {session} = useAuth()
  const onProjectClose = useCallback(() => {
    setcreateProjectIsOpen(false);
  }, []);
  const onDelete = useCallback((project) => {
    // setDeleteSelectedProject(project);
    // setShowDeleteModal(true)
  }, []);
  const onCreate = useCallback(() => {}, []);
  const [deleteIsOpen, setdeleteIsOpen] = useState<any>(false);
  const [createProjectIsOpen, setcreateProjectIsOpen] = useState(false);
  const [envsProjects, setEnvsProjects] = useAtom(envsProjectstate);
  const {createProjects,fetchProjects,deleteProjects} =useProjects()
  const [key,setKey]=useState<String|undefined>("")

  useEffect(()=>{
    if(session?.token &&session?.secretPhrase ){
      fetchProjects()
    }else{
      setEnvsProjects({hasMore:false,nextPage:1,data:[]})
    }
  },[
    session?.token ,  session?.secretPhrase
  ])

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleDelete = (project) => {
    setSelectedProject(project);
    setShowDeleteModal(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] dark:bg-[#0A0A0A] bg-gray-50 text-white dark:text-white text-gray-900">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Projects</h1>
          <p className="text-gray-400 dark:text-gray-400 text-gray-600">Organize your environments and collaborate with your team</p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
          {/* Search */}
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-400 text-gray-600" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 dark:bg-white/5 bg-white border border-white/10 dark:border-white/10 border-gray-200 rounded-lg text-white dark:text-white text-gray-900 placeholder-gray-500 outline-none focus:border-white/30 dark:focus:border-white/30 focus:border-gray-400 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Filter */}
            <button className="flex-1 sm:flex-none px-3 py-2 border border-white/10 dark:border-white/10 border-gray-300 hover:bg-white/5 dark:hover:bg-white/5 hover:bg-gray-100 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>

            {/* Create Project */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex-1 sm:flex-none px-4 py-2 bg-white dark:bg-white bg-gray-900 text-black dark:text-black text-white hover:bg-gray-200 dark:hover:bg-gray-200 hover:bg-gray-800 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Create Project</span>
            </button>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-3">
          {envsProjects.data.map((project) => (
            <ProjectCard 
              key={project.id}
              project={project}
              onCopy={handleCopy}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Empty State */}
        {envsProjects.data.length === 0 && (
          <div className="text-center py-12 sm:py-20">
            <div className="w-16 h-16 bg-white/5 dark:bg-white/5 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Folder className="w-8 h-8 text-gray-400 dark:text-gray-400 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
            <p className="text-gray-400 dark:text-gray-400 text-gray-600 mb-6 text-sm sm:text-base">Get started by creating your first project</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-white dark:bg-white bg-gray-900 text-black dark:text-black text-white hover:bg-gray-200 dark:hover:bg-gray-200 hover:bg-gray-800 rounded-lg inline-flex items-center gap-2 font-medium text-sm sm:text-base"
            >
              <Plus className="w-4 h-4" />
              Create Project
            </button>
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <CreateProjectModal 
          onClose={() => setShowCreateModal(false)}
          isOpen={showCreateModal}
          onCreate={onCreate}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteModal
          onDelete={()=>{}}
          project={selectedProject}
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}

function ProjectCard({ project, onCopy, onDelete }) {
  return (
    <div className="bg-white/5 dark:bg-white/5 bg-white border border-white/10 dark:border-white/10 border-gray-200 rounded-lg p-4 sm:p-6 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-gray-50 transition-all group">
      {/* Mobile Layout */}
      <div className="block lg:hidden space-y-4">
        {/* Top Row: Icon + Name + Menu */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 dark:bg-white/10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Folder className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white dark:text-white text-gray-900 mb-1 break-words">{project.name}</h3>
            <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-400 text-gray-600 line-clamp-2">{project.description}</p>
          </div>

          {/* Mobile Actions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1.5 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-gray-100 rounded transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-[#161616] dark:bg-[#161616] bg-white border-white/10 dark:border-white/10 border-gray-200">
              <DropdownMenuItem asChild>
                <Link
                  href={`/dashboard/projects/${project._id}`}
                  className="cursor-pointer"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Open Project
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onCopy(project.key)}
                className="cursor-pointer"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Key
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10 dark:bg-white/10 bg-gray-200" />
              <DropdownMenuItem
                onClick={() => onDelete(project)}
                className="cursor-pointer text-red-400"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Key */}
        <div className="flex items-center gap-2 px-3 py-2 bg-black/30 dark:bg-black/30 bg-gray-50 rounded border border-white/10 dark:border-white/10 border-gray-200">
          <Key className="w-3 h-3 text-gray-400 dark:text-gray-400 text-gray-600 flex-shrink-0" />
          <code className="text-xs text-gray-400 dark:text-gray-400 text-gray-600 flex-1 truncate">{project.key}</code>
          <button
            onClick={() => onCopy(project.key)}
            className="text-gray-400 dark:text-gray-400 text-gray-600 hover:text-white dark:hover:text-white hover:text-gray-900 transition-colors"
          >
            <Copy className="w-3 h-3" />
          </button>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-400 text-gray-600">
          <Calendar className="w-3 h-3" />
          <span>{getreadabledate(project.createdAt)}</span>
        </div>

        {/* Open Button - Mobile Only */}
        <Link
          href={`/dashboard/projects/${project._id}`}
          className="w-full px-3 py-2 border border-white/10 dark:border-white/10 border-gray-200 hover:bg-white/5 dark:hover:bg-white/5 hover:bg-gray-50 rounded flex items-center justify-center gap-2 text-sm transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span>Open Project</span>
        </Link>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center gap-6">
        {/* Icon */}
        <div className="w-12 h-12 bg-white/10 dark:bg-white/10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Folder className="w-6 h-6" />
        </div>

        {/* Project Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white dark:text-white text-gray-900 mb-1">{project.name}</h3>
          <p className="text-sm text-gray-400 dark:text-gray-400 text-gray-600 truncate">{project.description}</p>
        </div>

        {/* Key */}
        <div className="flex items-center gap-2 px-3 py-2 bg-black/30 dark:bg-black/30 bg-gray-50 rounded border border-white/10 dark:border-white/10 border-gray-200 min-w-[200px]">
          <Key className="w-3 h-3 text-gray-400 dark:text-gray-400 text-gray-600 flex-shrink-0" />
          <code className="text-xs text-gray-400 dark:text-gray-400 text-gray-600 flex-1 truncate max-w-30">{project.key}</code>
          <button
            onClick={() => onCopy(project.key)}
            className="text-gray-400 dark:text-gray-400 text-gray-600 hover:text-white dark:hover:text-white hover:text-gray-900 transition-colors"
          >
            <Copy className="w-3 h-3" />
          </button>
        </div>

        {/* Last Modified */}
        <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-400 text-gray-600 min-w-[100px]">
          <Calendar className="w-3 h-3" />
          <span>{getreadabledate(project.createdAt)}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/projects/${project._id}`}
            className="px-3 py-1.5 border border-white/10 dark:border-white/10 border-gray-200 hover:bg-white/5 dark:hover:bg-white/5 hover:bg-gray-100 rounded flex items-center gap-1 text-sm transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Open</span>
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1.5 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-gray-100 rounded transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-[#161616] dark:bg-[#161616] bg-white border-white/10 dark:border-white/10 border-gray-200">
              <DropdownMenuItem
                onClick={() => onDelete(project)}
                className="cursor-pointer text-red-400"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}