"use client";
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { 
  GitBranch, 
  GitCommit, 
  GitMerge, 
  Plus, 
  Check, 
  X, 
  Copy, 
  Eye, 
  EyeOff,
  Clock,
  User,
  ChevronDown,
  Settings,
  Link2,
  Download,
  Upload,
  ArrowRight,
  Code,
  FileText,
  AlertCircle,
  Trash2,
  Edit,
  Users,
  Terminal,
  LoaderCircle,
  Loader2,
  MoreVertical
} from 'lucide-react';
import toast from 'react-hot-toast';
import { handleDoubleTap, useAuth, useFetch, useKeyedStateSetter, useProjects } from '../../../../../hooks';
import { GETBRANCHESURL, GETCOMMITSURL, GETCOMMITURL, GETPROJECTBYIDURL, PUBLICKEY } from '../../../../../const';
import { useParams, useRouter } from 'next/navigation';
import { downloadEnvFile, generateKey, getreadabledate, listToEnvString, parseEnvToList, updateQueryParam } from '@/utils';
import { handleDecrypt, handleEncryptKeyPairLongData } from '@/cryptic';
import PopupInfoToastBefore from '../../../../../components/PopupInfotoast';
import AddEnvModal from '../../../../../components/modals/addenvmodal';


// shadui
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// export default function GitHubStyleProject() {
//   const [activeTab, setActiveTab] = useState('envs');
//   // const [selectedBranch, setSelectedBranch] = useState('main');
//   const [showBranchDropdown, setShowBranchDropdown] = useState(false);
//   const [showAddDropdown, setShowAddDropdown] = useState(false);
//   const [showConnectDropdown, setShowConnectDropdown] = useState(false);
//   const [showCommitPanel, setShowCommitPanel] = useState(false);
//   const [commitMessage, setCommitMessage] = useState('');
//   const [selectedCommit, setSelectedCommit] = useState(null);
//   const [showMergePanel, setShowMergePanel] = useState(false);

//  const params = useParams();
//     const router = useRouter();
//   const id = params.id as string; 
//   // const poarambranch = params.branch as string; 
//   // const paramcommit = params.commit as string; 
//   const query = new URLSearchParams(window.location.search);
// const poarambranch = query.get("branch");
// const paramcommit = query.get("commit");
//     const {getProjectById,addEnv,getEnvs,deleteEnv} =useProjects()
//   const onClose = useCallback(() => {
//     setdeleteIsOpen(false);
//   }, []);
//   const onCreateEnvClose = useCallback(() => {
//     setEdit(false);
//     setCreateEnvIsOpen(false);
//   }, []);
//   const onConnectClose = useCallback(() => {
//     setConnect(false);
//     // setCreateEnvIsOpen(false);
//   }, []);
//   const onDelete = useCallback(() => {}, []);
//   const onCreate = async ({envs}:{envs:string}) => {

//     let data =  parseEnvToList(envs)
  
//   let dataa = await    addEnv({secretPhrase,update:true,project:project._id,body:{data,branch},key:project.key})
//   if(dataa?.data){

//     setEnvsProject(dataa.data)
//   }
//   };
//   // const o = useCallback(()=>{},[])
//   const [deleteIsOpen, setdeleteIsOpen] = useState(false);
//   const [createEnvIsOpen, setCreateEnvIsOpen] = useState(false);
//   const [envsProject, setEnvsProject] = useState<any[]>([]);
//   const [branches, setBranches] = useState<any[]>([]);
//   const [branch ,setBranch] = useState(poarambranch)
//   const [commit ,setCommit] = useState<any>(null)
//   const [loading ,setLoading] = useState(false)
//   const [secretPhrase ,setSecretPhrase] = useState("")
//   const [edit,setEdit] = useState(false)
//   const [reload,setreload] =useState("")
//   const {apifetch} = useFetch()
//   const [project,setProject] = useState<any>({})
//   const [connect,setConnect] = useState(false)
//   const [addLoading,setAddLoading] = useState<any>(false)
//   const [deleteLoading,setDeleteLoading] = useState<any>(false)
//   const [newBranchName, setNewBranchName] = useState("")
//   const [showNewBranchInput, setShowNewBranchInput] = useState(false)
//   const [creatingBranch, setCreatingBranch] = useState(false)
//   const [commits,setCommits] = useState({commits:[]})
//     const [key,setKey]=useState<string>("loading...")
//     const {session} = useAuth()


//     // useEffect(()=>{


//     //   if(paramcommit){

//     //   }
//     // },[

//     //   paramcommit
//     // ])


// useEffect(()=>{

//   let v= async()=>{

//     let commitsdata = await apifetch({url:GETCOMMITURL+`?id=${project?._id}&commit=${paramcommit}`}) 
// console.log(commitsdata,"comitttt")
//     if(commitsdata.success){
//       // setCommit(commitsdata.data)
//       let data =commitsdata.data
//       setCommit(data||{})
//        updateQueryParam("commit",data?.commitId)
//     }
//   }

//   if(session?.token,id&&session?.secretPhrase&&branch&&project?._id&&paramcommit){
//     v()
//   }


// },[session?.token,id,session?.secretPhrase,branch,project?._id,paramcommit])
  

//     useEffect(()=>{

//      let getkey = async ()=>{

//       try{

//         if(session?.token &&session?.secretPhrase &&project?._id  &&secretPhrase&&secretPhrase!=""){
//           let key_ = JSON.stringify(  {
//             projectKey:project?.key,
//             projectId:project._id,
//             colabId:project.colab._id,
//             userKey:secretPhrase,
//             userEmail:session?.user?.email,
//             salt : generateKey(15)
//           }  );
  
//       //  let   pk ="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC9wRqW73K4QsVc\nUcMYMgyeyXazbo/T3nfP1+NbdkPWO3xoskCHkbZPDSQWF6eQO1cZe/gZC4ZFKZM1\ncDasuq2Nd/mu3EQqnko8v3r6sguGeshbQ3CKshYKlEuCvdDws8ZItnMXbMWqI/dN\nD09yUrw8TUaHER+v8fR0HM8/2HwM9hB7jWLlesbw/ghwshpKbq4dK41sMjvqPCQ+\nS2YYliXGkGUcvdRKkd3lH9KBDlkFEyAM6kUGgSv0amaD+YPVUCGrVAKnK278HrHf\nskM/BW0n7bXmTFG4w8RU2uwImKbys8mN7EbHYJGS7UZ5exyiAM82XU1/TcASVvUe\nyvAFuMIDAgMBAAECggEAMMx2YBaYNBbH1qQYPiKw6Cz7X82xI1V1DniAucbCT1fg\n+LPOsI6iidXhT+UpbIg2MBGXjilOkH7OotGG3gjsFROjnHp89VDb2p+Lquka2ay9\n1eqUCLcfv/y/JpJWJ3C0L4LsOjv44XZ6ZNDpJ4drbT6aQqX+tirNKQc3rT2pOVOk\n1QqodOAElzH+R6AHRQtljrDiyx9iJRnz+7Y3oX1hxZIn/rGpyqIZt6Nc4Rq5pQ8G\n/N9nToVISg9PHierFJ6RoeNM4T6VOxDSK3fenjqGBllA1ZQgO2U5ayl8qnFEIKYy\n3nzey2y/bot4kktmOlv1mP0BSjqFiU3B/sun6KNscQKBgQDuoi+Ogqc9mGh0MlbS\nOvjpmHHwoo3AMzLe94yOD8Ya+0LK29uER8PDtqzq+fAzNpamMExIJR/y/OCafuyR\nycGaoQ5YHDhEjz9RDPZprBB16EGs2SplxPysIdr03cM+cy4pOof6JfqeY0DXony8\n8hLHL3yrrK2Wts0e1OOQYfSCzwKBgQDLkEiSgIeB0vh4HmyNpC7qbfb8JVKAsJBo\nhULwlbFmxBL6gpkXxpixA8+z9+ORBAiNAHU3kqj234uaDh8vKZN5sm7/7bf7KV7j\nehauMSapSLxcbYJQ0PjfYq4wZs1J2POS08aGKba2pwwrT9cGj2wDB8eYkaYWxMAD\nPZNOMq1qjQKBgF2iL8zYQSzvB1VIhz6YOyDVWyfTcJFQxY4tTe5UDCR8IHoeiGTA\nD/VUUUcl6PT/X184JkZMotuiE7MrSEHwC1JUDZ/O+tkT6AEyd+GAzTimeFaNI5Cp\nGYelBRf9h+WSJjOxLredfVf2k/PIYu90gJ+9Z0qpR7eSZKvLVrtJZDqLAoGATk3w\nPLrIZX48Kii55Tp0+aTXT2Mj+3Dv++TXPSi4Fynxiv/V2DmC3wTyTu5aUZxVlbfJ\nX1lBOcYAM4CfKks5+aRT4osVLL5bS/HY66TolFHwczWE3YWlVnjlPKUu7utPtvlT\n8qP1LwnPOpH5ywI8sGW7t8q/Mx74Jcb39Sq1XrkCgYBlsDdKNNCHZzh0Oc24G9SK\nQYIv0Nd0HJDHXXZaaQTZJ+RudZ+mJSRC/8M+QVCYF9XbJBgLlC+3Q/hJ4QyOEPvv\nvxybfLkFWZwL32qiuyYzhuQek+MMMy/0vlYNYYNvbN4Dixm1Gp9lb+TD9Nr1ejjT\nKDXPls/bDosPxNXGY9arvA==\n-----END PRIVATE KEY-----"
//           // let key_  =    project?.key+"_kk_"+project._id  + "__kk__"+ session?.secretPhrase+"_kk_"+session?.user?.email  + "_kk__" + generateKey(30).toString()
//           // console.log(key_,"key________emmmm");
//         let key__ =  await handleEncryptKeyPairLongData({message:`${key_}`,publicKey:PUBLICKEY})
//         // let key__x =  await decryptStringToJson({encryptedString:`${key__}`,privateKey:pk})
//         if(key__){

          
  
//           setKey(key__||"loading...")
//         }

//         // console.log(key__,"key________emmmm2222");
//         // console.log(key__x,"dcccckey________emmmm2222");
//       }
//       }catch(e){
//         console.log(e,"eeeeeeeee")
//       }
//     }

//     getkey()

//     },[project?._id,session?.token,session?.secretPhrase])




//   useEffect(()=>{

   


//     let v = async ()=>{
//       try{

//         let res =  await getProjectById(id)
//         if(res.success){
//           let d =  res.data
//           let s = d.secretPhrase
//           let ds  =   await handleDecrypt({encrypted:s,passphrase:session?.secretPhrase})
//           setSecretPhrase(ds)
//               // console.log(ds,"dssssssssss")
//           setProject(res.data)
//           // let setSecretPhrase

//               // c(res.data)
          
    
//         }
//       }catch(e){}
//     }
//     if(session?.token  && session.secretPhrase &&id){

//       v()
//     }else{
//       setEnvsProject([])
//     }


//   },[session?.token,id,session?.secretPhrase,])



//   useEffect(()=>{

   

//     let c = async  (project:any)=>{
//       setLoading(true)
// let data = await getEnvs({project:id,key:project.key,branch,secretPhrase,commit:commit?.commitId})
// // console.log(data,"branches")
// if(data?.decripted){
//   setEnvsProject(data.decripted)
  
  
// }
// // if(data?.branches){
// //   setBranches([...data?.branches])
// // }

// setLoading(false)
//     }
    
    
//     if(session?.token  && session.secretPhrase &&id && commit){
//       if(project?._id){
//               setEnvsProject([])
//         c(project)
//       }

   
//     }else{
//       setEnvsProject([])
//     }


//   },[session?.token,id,session?.secretPhrase,branch,project?._id,reload,commit])



// useEffect(()=>{

//   let v= async()=>{

//     let commitsdata = await apifetch({url:GETCOMMITSURL+`?id=${project?._id}`}) 
// console.log(commitsdata,"comitttt")
//     if(commitsdata.success){
//       setCommits(commitsdata.data)
//       let data =commitsdata.data.commits[0]
//       console.log(paramcommit)
//       if(!paramcommit){

//         setCommit(data||{})
//         updateQueryParam("commit",data?.commitId)
//       }
//     }
//   }

//   if(session?.token&&id&&session?.secretPhrase&&branch&&project?._id ){
//     v()
//   }


// },[session?.token,id,session?.secretPhrase,branch,project?._id])
  
// useEffect(()=>{

//   let v= async()=>{

    

//     let branchdata = await apifetch({url:GETBRANCHESURL+`?id=${project?._id}`}) 
//     console.log(branchdata)

//     if(branchdata.success){
//       let list = [...(branchdata?.data||[]),{name:"main"}]
//       setBranches(list)
//       let data = poarambranch||list[0]?.name
//       // if(!!poarambranch){

//       // }
//       setBranch(data)
//         updateQueryParam("branch",data)
//       }else {
//         let data = poarambranch ||"main"
//       updateQueryParam("branch",data)
//             setBranches([{name:data}])
//             setBranch(data)
//     }
//   }

//   if(session?.token&&id&&session?.secretPhrase&&project?._id){
//     v()
//   }


// },[session?.token,id,session?.secretPhrase,project?._id])
  
//   const handleCreateBranch = async () => {
//     if (!newBranchName.trim()) {
//       toast.error("Please enter a branch name");
//       return;
//     }

//     if (branches.find(e=>e.name==newBranchName)) {
//       toast.error("Branch already exists");
//       return;
//     }

//     try {
//       setCreatingBranch(true);
      
//       // Create branch logic here - you might need to add this API call
//       // For now, we'll add it to the local state
//       // You should replace this with your actual API call
//       // const response = await createBranch({ project: id, branchName: newBranchName.trim() });
      
//       setBranches([...branches, {name:newBranchName.trim()}]);
//       setBranch(newBranchName.trim());
//       updateQueryParam("branch",newBranchName.trim())
//       setNewBranchName("");
//       setShowNewBranchInput(false);
//       toast.success("Branch created successfully");
//     } catch (e: any) {
//       toast.error(e?.message || "Failed to create branch");
//     } finally {
//       setCreatingBranch(false);
//     }
//   };




//   // Mock data
//   // const project = {
//   //   name: 'Production API',
//   //   description: 'Main production environment for API services',
//   //   gitUrl: 'https://github.com/username/project-name',
//   //   key: 'proj_abc123xyz789',
//   //   autoMerge: false
//   // };

//   // const branches = [
//   //   { name: 'main', ahead: 0, behind: 0, lastCommit: '2 hours ago' },
//   //   { name: 'development', ahead: 3, behind: 1, lastCommit: '5 minutes ago' },
//   //   { name: 'staging', ahead: 1, behind: 2, lastCommit: '1 day ago' }
//   // ];

//   // const commits = [
//   //   {
//   //     id: 'abc123',
//   //     message: 'Update API keys for production',
//   //     author: 'John Doe',
//   //     date: '2 hours ago',
//   //     changes: { added: 2, modified: 1, deleted: 0 }
//   //   },
//   //   {
//   //     id: 'def456',
//   //     message: 'Add database credentials',
//   //     author: 'Jane Smith',
//   //     date: '1 day ago',
//   //     changes: { added: 3, modified: 0, deleted: 0 }
//   //   },
//   //   {
//   //     id: 'ghi789',
//   //     message: 'Remove deprecated endpoints',
//   //     author: 'John Doe',
//   //     date: '2 days ago',
//   //     changes: { added: 0, modified: 2, deleted: 1 }
//   //   }
//   // ];

//   // const envs = [
//   //   { 
//   //     key: 'DATABASE_URL', 
//   //     value: 'postgres://localhost:5432/db',
//   //     status: 'modified',
//   //     lastModified: '2 hours ago',
//   //     commit: 'abc123',
//   //     commitMessage: 'Update API keys for production'
//   //   },
//   //   { 
//   //     key: 'API_KEY', 
//   //     value: 'sk_live_abc123',
//   //     status: 'added',
//   //     lastModified: '2 hours ago',
//   //     commit: 'abc123',
//   //     commitMessage: 'Update API keys for production'
//   //   },
//   //   { 
//   //     key: 'STRIPE_SECRET', 
//   //     value: 'sk_live_xyz789',
//   //     status: 'unchanged',
//   //     lastModified: '1 day ago',
//   //     commit: 'def456',
//   //     commitMessage: 'Add database credentials'
//   //   }
//   // ];

//   const pendingChanges = [
//     // { key: 'NEW_API_URL', value: 'https://api.example.com', action: 'add' },
//     // { key: 'DATABASE_URL', value: 'postgres://prod:5432/db', action: 'modify' }
//   ];

//   return (
//     <div className="min-h-screen bg-[#0A0A0A] text-white">
//        <AddEnvModal edit={edit} onClose={onCreateEnvClose} secretPhrase={secretPhrase} initialText={listToEnvString(envsProject)} isOpen={createEnvIsOpen} onCreate={onCreate} />
//       {/* Header */}
//       <div className="border-b border-white/10 bg-[#0A0A0A] px-6 py-4">
//         <div className="max-w-7xl mx-auto">
//           {/* Project name and git URL */}
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded bg-white flex items-center justify-center">
//                 <Code className="w-5 h-5 text-black" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-semibold">{project?.name||"Project loading..."}</h1>
//                 {project?.gitUrl && (
//                   <a 
//                     href={project?.gitUrl||"#"}
//                     target="_blank"
//                     className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
//                   >
//                     <Link2 className="w-3 h-3" />
//                     {project?.gitUrl||"giturl not connected"}
//                   </a>
//                 )}
//               </div>
//             </div>
//             {/* <button className="px-3 py-1.5 border border-white/10 hover:bg-white/5 rounded text-sm flex items-center gap-2">
//               <Settings className="w-4 h-4" />
//               Settings
//             </button> */}
//           </div>

//           {/* Description */}
//           <p className="text-sm text-gray-400 mb-4">{project.description}</p>

//           {/* Project key */}
//           <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded border border-white/10 w-fit">
//             <code className="text-xs text-gray-400 max-w-40 truncate">{key}</code>
//             <button className="text-gray-400 hover:text-white">
//               <Copy onClick={()=>{
// if(project?.key){

//   toast.success("copied to clipboard")
//   navigator.clipboard.writeText(key)
// }else{
//   toast.success("Key not yet loaded")

// }
//                     }} className="w-3 h-3" />
//             </button>
//           </div>
//           <div className="flex items-center gap-2 px-3 py-2  rounded  w-fit">
//             <code className="text-xs text-gray-400 max-w-20 truncate">{commit?.commitId||"no commit"} </code>
//             <code className="text-xs text-gray-400 max-w-40 truncate">.  {getreadabledate(commit?.updatedAt)} </code>
           
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-6">
//         {/* Branch selector and actions */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-3">
//             {/* Branch dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowBranchDropdown(!showBranchDropdown)}
//                 className="flex items-center gap-2 px-3 py-1.5 border border-white/10 hover:bg-white/5 rounded text-sm font-medium"
//               >
//                 <GitBranch className="w-4 h-4" />
//                 <span>{branch}</span>
//                 <ChevronDown className="w-4 h-4" />
//               </button>

//               {showBranchDropdown && (
//                 <div className="absolute top-full mt-2 w-80 bg-[#161616] rounded border border-white/10 shadow-xl z-10">
//                   <div className="p-2 border-b border-white/10">
//                     <input
//                       type="text"
//                       placeholder="Find or create a branch..."
//                       className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm outline-none focus:border-white/30"
//                     />
//                   </div>
//                   <div className="max-h-96 overflow-y-auto">
//                     {branches.map((branch) => (
//                       <button
//                         key={branch.name}
//                         onClick={() => {
//                             updateQueryParam("branch",branch?.name)
//                           setBranch(branch.name);
//                           setShowBranchDropdown(false);
//                         }}
//                         className="w-full px-4 py-3 hover:bg-white/5 flex items-center justify-between"
//                       >
//                         <div className="flex items-center gap-3">
//                           <GitBranch className="w-4 h-4 text-gray-400" />
//                           <div className="text-left">
//                             <div className="font-medium text-sm">{branch?.name}</div>
//                             <div className="text-xs text-gray-500">{getreadabledate(branch.updatedAt)}</div>
//                           </div>
//                         </div>
//                         {(branch?.ahead > 0 || branch?.behind > 0) && (
//                           <div className="flex items-center gap-2 text-xs text-gray-500">
//                             {branch.ahead > 0 && <span>↑{branch.ahead}</span>}
//                             {branch.behind > 0 && <span>↓{branch.behind}</span>}
//                           </div>
//                         )}
//                       </button>
//                     ))}
//                   </div>
//                   <div className="p-2 border-t border-white/10">
//                     <button onClick={()=>
//                       { setShowNewBranchInput(true)
//                         setShowBranchDropdown(false)
//                       }
//                        } className="w-full px-3 py-2 text-left text-sm hover:bg-white/5 rounded flex items-center gap-2">
//                       <Plus className="w-4 h-4" />
//                       Create new branch
//                     </button>
//                   </div>
//                 </div>
//               )}
//                {showNewBranchInput && (
//       <div className="flex gap-2 items-center my-1">
//         <input
//           type="text"
//           placeholder="Branch name"
//           value={newBranchName}
//           onChange={(e) => setNewBranchName(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') {
//               handleCreateBranch();
//             } else if (e.key === 'Escape') {
//               setShowNewBranchInput(false);
//               setNewBranchName("");
//             }
//           }}
//           className="border rounded px-2 py-1 outline-none focus:border-white/5"
//           autoFocus
//         />
//         {creatingBranch ? (
//           <LoaderCircle className="animate-spin" width={16} />
//         ) : (
//           <>
//             <Check
//               onClick={handleCreateBranch}
//               className="cursor-pointer hover:text-green-600"
//               width={16}
//             />
//             <Copy
//               onClick={() => {
//                 setShowNewBranchInput(false);
//                 setNewBranchName("");
//               }}
//               className="cursor-pointer hover:text-red-600 rotate-45"
//               width={16}
//             />
//           </>
//         )}
//       </div>
//     )}
//             </div>

//             {/* Tabs */}
//             <div className="flex items-center gap-1 border border-white/10 rounded p-0.5">
//               <button
//                 onClick={() => setActiveTab('envs')}
//                 className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
//                   activeTab === 'envs'
//                     ? 'bg-white/10'
//                     : 'text-gray-400 hover:text-white'
//                 }`}
//               >
//                 Variables
//               </button>
//               <button
//                 onClick={() => setActiveTab('commits')}
//                 className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
//                   activeTab === 'commits'
//                     ? 'bg-white/10'
//                     : 'text-gray-400 hover:text-white'
//                 }`}
//               >
//                 Commits
//               </button>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             {/* Teams button */}
//             <button onClick={()=>{
//                  router.push(`/dashboard/projects/${id}/teams`)
//             }} className="px-3 py-1.5 border border-white/10 hover:bg-white/5 rounded text-sm flex items-center gap-2">
//               <Users className="w-4 h-4" />
//               Teams
//             </button>

//             {/* Connect dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowConnectDropdown(!showConnectDropdown)}
//                 className="px-3 py-1.5 border border-white/10 hover:bg-white/5 rounded text-sm flex items-center gap-2"
//               >
//                 <Terminal className="w-4 h-4" />
//                 Connect
//                 <ChevronDown className="w-3 h-3" />
//               </button>

//               {showConnectDropdown && (
//                 <div className="absolute top-full right-0 mt-2 w-96 bg-[#161616] rounded border border-white/10 shadow-xl z-10">
//                   <div className="p-4 space-y-4">
//                     <div>
//                       <h3 className="text-sm font-medium mb-2">Install package</h3>
//                       <div className="bg-black/40 rounded p-3 font-mono text-xs">
//                         <code className="text-gray-300">npm install xavren</code>
//                         <button className="float-right text-gray-400 hover:text-white">
//                           <Copy className="w-3 h-3" />
//                         </button>
//                       </div>
//                     </div>
//                     <div>
//                       <h3 className="text-sm font-medium mb-2">Add to your code</h3>
//                       <div className="bg-black/40 rounded p-3 font-mono text-xs space-y-1">
//                         <div className="text-purple-400">import</div>
//                         <div className="text-gray-300">dotenv from 'xavren'</div>
//                         <div className="mt-2 text-gray-300">dotenv.config(key:"process.env.PROJECT_KEY")</div>
//                         <button className="float-right text-gray-400 hover:text-white -mt-8">
//                           <Copy className="w-3 h-3" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Edit button */}
//             <button onClick={()=>{  
//             setCreateEnvIsOpen(true);
//             setEdit(true);
            
//             }} className="px-3 py-1.5 border border-white/10 hover:bg-white/5 rounded text-sm flex items-center gap-2">
//               <Edit className="w-4 h-4" />
//               Edit
//             </button>

//             <button className="px-3 py-1.5 border border-white/10 hover:bg-white/5 rounded text-sm flex items-center gap-2">
//               <Download className="w-4 h-4" />
//               Export
//             </button>
//             {!project.autoMerge && (
//               <button
//                 onClick={
//                   // () => setShowMergePanel(true)
//                  ()=> toast("coming soon")
                  
//                 }
//                 className="px-3 py-1.5 bg-white text-black hover:bg-gray-200 rounded text-sm flex items-center gap-2"
//               >
//                 <GitMerge className="w-4 h-4" />
//                 Merge
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Pending changes alert */}
//         {pendingChanges.length > 0 && (
//           <div className="mb-6 bg-white/5 border border-white/10 rounded p-4">
//             <div className="flex items-start gap-3">
//               <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
//               <div className="flex-1">
//                 <h3 className="font-medium mb-1">
//                   {pendingChanges.length} uncommitted changes
//                 </h3>
//                 <p className="text-sm text-gray-400 mb-3">
//                   You have unsaved changes that need to be committed
//                 </p>
//                 <button
//                   onClick={() => setShowCommitPanel(true)}
//                   className="px-3 py-1.5 bg-white text-black hover:bg-gray-200 rounded text-sm"
//                 >
//                   Commit changes
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Main content */}
//         {activeTab === 'envs' && (
//           <div className="bg-[#0A0A0A] rounded border border-white/10">
//             {/* Add env dropdown - moved to top */}
//             <div className="px-6 py-3 border-b border-white/10 flex items-center justify-between">
//             <div className='flex items-center gap-3'>
// <h2 className="font-medium">Environment Variables</h2>
//               {loading?

// <Loader2   className="animate-spin w-4 h-4 text-gray"/>:
// <Loader2 onClick={()=>{
//   setreload(Math.random().toString())
// }}   className="w-4 h-4 text-gray"/>
// }
//               </div>
//               <div className="relative">
//                 <button
//                   onClick={() => setShowAddDropdown(!showAddDropdown)}
//                   className="px-3 py-1.5 bg-white text-black hover:bg-gray-200 rounded text-sm flex items-center gap-2"
//                 >
//                   <Plus className="w-4 h-4" />
//                   Add variable
//                   <ChevronDown className="w-3 h-3" />
//                 </button>

//                 {showAddDropdown && (
//                   <div className="absolute top-full right-0 mt-2 w-48 bg-[#161616] rounded border border-white/10 shadow-xl z-10">
//                     <button onClick={()=>{

//             setEnvsProject([...envsProject,{title:"",value:"",edit:true,id:Math.random()}])
//         }} className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 flex items-center gap-2">
//                       <Plus className="w-4 h-4" />
//                       Add variable
//                     </button>
//                     <button onClick={()=>{  setCreateEnvIsOpen(true);}} className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 flex items-center gap-2">
//                       <FileText className="w-4 h-4" />
//                       Add from .env file
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Table header */}
//             <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/10 text-sm font-medium text-gray-400">
//               <div className="col-span-3">Key</div>
//               <div className="col-span-3">Value</div>
//               <div className="col-span-3">Commit</div>
//               <div className="col-span-2">Modified</div>
//               <div className="col-span-1">Actions</div>
//             </div>

//             {/* Table rows */}
//             <div className="divide-y divide-white/5">
//               {envsProject.map((env, index) => (
//                 // <EnvRow key={index} env={env}  {...{index,setEnvsProject,envsProject}}/>

//                     <div
    
//     onDoubleClick={()=>{
//                     const newArr = [...envsProject];
//                     // newArr[index].new = false
//                     newArr[index].edit = true
//                     setEnvsProject(newArr)
//                 }}
//     className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-white/5 group">

//               <div className="col-span-3 flex items-center gap-2">
//                     {
//                             env.edit ? <input placeholder="NEW_KEY" value={env?.title} onChange={(event)=>{
                        
//                                 const newArr = [...envsProject];
//                                 // newArr[index].new = false
//                                 newArr[index].title = event.target.value.trim()
//                                 setEnvsProject(newArr)
//                             }} className="bg-transparent border-b  w-30 outline-none" defaultValue={env.title}/> :
                            
//         <code className="text-sm font-mono">{env?.title}</code>
//                             }
     
//       </div>
//       <div className="col-span-3 flex items-center gap-2">
//         {
//                             env.edit ? 
                          
//     <input placeholder="NEW_VALUE" value={env.value} onChange={(event)=>{
//                                 const newArr = [...envsProject];
//                                 // newArr[index].new = false
//                                 newArr[index].value = event.target.value.trim()
//                                 setEnvsProject(newArr)
//                             }} className="bg-transparent border-b  w-50 outline-none" defaultValue={env.title}/>
        
//         :
//          <PopupInfoToastBefore text={env.title}>

//         <code className="text-sm font-mono text-gray-400 flex-1 truncate">
//           {env.view ? env.value : '•'.repeat(20)}
//         </code>
//          </PopupInfoToastBefore>
//                           }
//         <button
//         disabled={ env.edit}
//         onClick={()=>{
//                                 const newArr = [...envsProject];
//                                 // newArr[index].new = false
//                                 newArr[index].view = !env.view
//                                 setEnvsProject(newArr)
//                             }}
//           className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
//         >
//           {env.view ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//         </button>
//       </div>
//       <div className="col-span-3 flex items-center gap-2">
//         <code className="text-xs bg-white/5 px-2 py-0.5 rounded max-w-20 truncate text-gray-400">
//           {env?.commit?.commit||env?.commit}
//         </code>
//         <span className="text-xs text-gray-500 max-w-10 truncate">{env?.commit?.commitId||env?.commit}</span>
//       </div>
//       <div className="col-span-2 flex items-center text-sm text-gray-400">
//         {getreadabledate(env.updatedAt)}
//       </div>
//       <div className="col-span-1 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//         {/* <button  className="text-gray-400 hover:text-white">
//           <Copy     onClick={() => {
//                                     toast.success("copied to clipboard");
//                                     navigator.clipboard.writeText(`${env.title}=${env.value}`);
//                                   }} className="w-4 h-4" />
//         </button> */}


//          {
//                             env.edit?

//                             <>
//                          { addLoading == Number(index+1)? <LoaderCircle className="animate-spin " />:
                          
//                           <Check onClick={async ()=>{
//                               try{
//                                 setAddLoading(Number(index+1))

//       let t = envsProject.find((ee,indexxx)=>ee.title==env.title && indexxx!=index)
//                               if(t && env.title.trim()!=""){
//                                 toast.error("env already exist")
//                                 return
//                               }
//                               if(env.title.trim()=="" || env.value.trim()==""){
//                                      toast.error("Please add a value")
//                                 return

//                               }


//  let data = await    addEnv({secretPhrase,project:project._id,body:{data:[env],branch},key:project.key})
// //  console.log(data,"dataaaaabbbbbbbb")
// if(data?.data){

//   const newArr = [...envsProject];
  
  
//                                   // newArr[index].new = false
//                                   // newArr[index].value = event.target.value
//                                   newArr[index] ={...data.data[0], ...newArr[index],edit:false}
//                                   setEnvsProject(newArr)
// }
//                               }catch(e:any){
//                               toast.error(e?.message||"An error occured")

//                               }finally{
//                                 setAddLoading(false)
//                               }
//                             }} width={12} />}
//                             </>
//                             :
//                     <div className="w-10">
//                      <Copy
//                         onClick={() => {
//                           toast.success("copied to clipboard");
//                           navigator.clipboard.writeText(`${env.title}=${env.value}`);
//                         }}
//                         className="hover:text-primary"
//                         width={12}
//                       />
//                         </div>
//                         }

//                   {                env.edit?<>
                  
//                   <X onClick={()=>{
//                       const newArr = [...envsProject];
//                             // newArr[index].new = false
//                             newArr[index].edit = false
//                             setEnvsProject(newArr)
//                   }}/>
//                   </> :<>
                  
//               {  deleteLoading == Number(index+1)? <LoaderCircle className="animate-spin " />: 

//         <button  onClick={async () => {

                     
                        
//                         try{
//                           setDeleteLoading(Number(index+1))

//                           if(env._id){
  
//                             await deleteEnv({project:id,id:env._id})
  
//                           }
//                           setEnvsProject(envsProject.filter((item,i)=>i!==index))
//                         }catch(e){

//                         }finally{
//                                   setDeleteLoading(false)
//                         }
//                       }} className="text-gray-400 hover:text-red-400">
//           <Trash2 className="w-4 h-4" />
//         </button>
//                   }
//                   </>
                  
                  
//                   }
//       </div>
//     </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === 'commits' && (
//           <div className="space-y-3">
//             {(commits.commits||[]).map((commit_) => (
//               <CommitCard
//                 key={commit_._id}
//                 commit={commit_}
//                 onClick={() => {
                  
//                      updateQueryParam("commit",commit_?.commitId)
//                      updateQueryParam("branch",commit_?.branch.name)
//                   setCommit(commit_)
//                 setActiveTab('envs')
//                 }}
//                 isSelected={commit_._Id === commit._id}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Commit panel */}
//       {showCommitPanel && (
//         <CommitPanel
//           changes={pendingChanges}
//           onClose={() => setShowCommitPanel(false)}
//           onCommit={(message) => {
//             console.log('Committing:', message);
//             setShowCommitPanel(false);
//           }}
//         />
//       )}

//       {/* Merge panel */}
//       {showMergePanel && (
//         <MergePanel
//           branches={branches}
//           currentBranch={branch}
//           onClose={() => setShowMergePanel(false)}
//         />
//       )}
//     </div>
//   );
// }

// // function EnvRow({ env ,setEnvsProject,envsProject,index}) {
// //   const [showValue, setShowValue] = useState(false);
// //   const [addLoading,setAddLoading] = useState<any>(false)
// //     const [deleteLoading,setDeleteLoading] = useState<any>(false)
// //         const {getProjectById,addEnv,getEnvs,deleteEnv} =useProjects()
// //   return (
// //     <div
    
// //     onDoubleClick={()=>{
// //                     const newArr = [...envsProject];
// //                     // newArr[index].new = false
// //                     newArr[index].edit = true
// //                     setEnvsProject(newArr)
// //                 }}
// //     className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-white/5 group">

// //               <div className="col-span-3 flex items-center gap-2">
// //                     {
// //                             env.edit ? <input placeholder="NEW_KEY" value={env?.title} onChange={(event)=>{
                        
// //                                 const newArr = [...envsProject];
// //                                 // newArr[index].new = false
// //                                 newArr[index].title = event.target.value.trim()
// //                                 setEnvsProject(newArr)
// //                             }} className="bg-transparent border-b  w-30 outline-none" defaultValue={env.title}/> :
                            
// //         <code className="text-sm font-mono">{env?.title}</code>
// //                             }
     
// //       </div>
// //       <div className="col-span-3 flex items-center gap-2">
// //         {
// //                             env.edit ? 
                          
// //     <input placeholder="NEW_VALUE" value={env.value} onChange={(event)=>{
// //                                 const newArr = [...envsProject];
// //                                 // newArr[index].new = false
// //                                 newArr[index].value = event.target.value.trim()
// //                                 setEnvsProject(newArr)
// //                             }} className="bg-transparent border-b  w-50 outline-none" defaultValue={env.title}/>
        
// //         :
// //          <PopupInfoToastBefore text={env.title}>

// //         <code className="text-sm font-mono text-gray-400 flex-1 truncate">
// //           {showValue ? env.value : '•'.repeat(20)}
// //         </code>
// //          </PopupInfoToastBefore>
// //                           }
// //         <button
// //         disabled={ env.edit}
// //           onClick={() => setShowValue(!showValue)}
// //           className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
// //         >
// //           {showValue ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// //         </button>
// //       </div>
// //       <div className="col-span-3 flex items-center gap-2">
// //         <code className="text-xs bg-white/5 px-2 py-0.5 rounded text-gray-400">
// //           {env.commit}
// //         </code>
// //         <span className="text-xs text-gray-500 truncate">{env.commit||env.commitId}</span>
// //       </div>
// //       <div className="col-span-2 flex items-center text-sm text-gray-400">
// //         {getreadabledate(env.updatedAt)}
// //       </div>
// //       <div className="col-span-1 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
// //         {/* <button  className="text-gray-400 hover:text-white">
// //           <Copy     onClick={() => {
// //                                     toast.success("copied to clipboard");
// //                                     navigator.clipboard.writeText(`${env.title}=${env.value}`);
// //                                   }} className="w-4 h-4" />
// //         </button> */}


// //          {
// //                             env.edit?

// //                             <>
// //                          { addLoading == Number(index+1)? <LoaderCircle className="animate-spin " />:
                          
// //                           <Check onClick={async ()=>{
// //                               try{
// //                                 setAddLoading(Number(index+1))

// //       let t = envsProject.find((ee,indexxx)=>ee.title==e.title && indexxx!=index)
// //                               if(t && env.title.trim()!=""){
// //                                 toast.error("env already exist")
// //                                 return
// //                               }
// //                               if(env.title.trim()=="" || e.value.trim()==""){
// //                                      toast.error("Please add a value")
// //                                 return

// //                               }


// //  let data = await    addEnv({secretPhrase,project:project._id,body:{data:[e],branch},key:project.key})
// // //  console.log(data,"dataaaaabbbbbbbb")
// // if(data?.data){

// //   const newArr = [...envsProject];
  
  
// //                                   // newArr[index].new = false
// //                                   // newArr[index].value = event.target.value
// //                                   newArr[index] ={...data.data[0], ...newArr[index],edit:false}
// //                                   setEnvsProject(newArr)
// // }
// //                               }catch(e:any){
// //                               toast.error(e?.message||"An error occured")

// //                               }finally{
// //                                 setAddLoading(false)
// //                               }
// //                             }} width={12} />}
// //                             </>
// //                             :
// //                     <div className="w-10">
// //                      <Copy
// //                         onClick={() => {
// //                           toast.success("copied to clipboard");
// //                           navigator.clipboard.writeText(`${e.title}=${e.value}`);
// //                         }}
// //                         className="hover:text-primary"
// //                         width={12}
// //                       />
// //                         </div>
// //                         }

// //                   {                env.edit?<>
                  
// //                   <X onClick={()=>{
// //                       const newArr = [...envsProject];
// //                             // newArr[index].new = false
// //                             newArr[index].edit = false
// //                             setEnvsProject(newArr)
// //                   }}/>
// //                   </> :<>
                  
// //               {  deleteLoading == Number(index+1)? <LoaderCircle className="animate-spin " />: 

// //         <button  onClick={async () => {

                     
                        
// //                         try{
// //                           setDeleteLoading(Number(index+1))

// //                           if(e._id){
  
// //                             await deleteEnv({project:id,id:e._id})
  
// //                           }
// //                           setEnvsProject(envsProject.filter((item,i)=>i!==index))
// //                         }catch(e){

// //                         }finally{
// //                                   setDeleteLoading(false)
// //                         }
// //                       }} className="text-gray-400 hover:text-red-400">
// //           <Trash2 className="w-4 h-4" />
// //         </button>
// //                   }
// //                   </>
                  
                  
// //                   }
// //       </div>
// //     </div>
// //   );
// // }

// function CommitCard({ commit, onClick, isSelected }) {
//   return (
//     <div
//       onClick={onClick}
//       className={`bg-[#0A0A0A] rounded border p-4 cursor-pointer transition-all ${
//         isSelected
//           ? 'border-white/30'
//           : 'border-white/10 hover:border-white/20'
//       }`}
//     >
//       <div className="flex items-start gap-4">
//         <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-sm font-medium">
//           {commit.createdBy.firstname.charAt(0)}{commit.createdBy.firstname.charAt(1)}
//         </div>
//         <div className="flex-1 min-w-0">
//           <div className="flex items-start justify-between gap-4 mb-2">
//             <div>
//               <h3 className="font-medium mb-1">{commit.commit}</h3>
//               <div className="flex items-center gap-3 text-sm text-gray-400">
//                 <span>{commit.createdBy.firstname}</span>
//                 <span>•</span>
//                 <span>{getreadabledate(commit.createdAt)}</span>
//                 <span>•</span>
//                 <code className="text-xs bg-white/5 px-2 py-0.5 rounded">
//                   {commit?.commitId || commit?.commit}
//                 </code>
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center gap-4 text-sm text-gray-400">
//             {commit?.changes?.added > 0 && (
//               <span>+{commit.changes.added}</span>
//             )}
//             {commit?.changes?.modified > 0 && (
//               <span>~{commit.changes.modified}</span>
//             )}
//             {commit?.changes?.deleted > 0 && (
//               <span>-{commit.changes.deleted}</span>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function CommitPanel({ changes, onClose, onCommit }) {
//   const [message, setMessage] = useState('');

//   return (
//     <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
//       <div className="bg-[#161616] rounded border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
//         <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
//           <h2 className="text-lg font-semibold">Commit changes</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-white">
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto p-6">
//           <div className="mb-6">
//             <label className="block text-sm font-medium mb-2">Commit message</label>
//             <textarea
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Update environment variables..."
//               className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded outline-none focus:border-white/30 resize-none"
//               rows={3}
//             />
//           </div>

//           <div className="space-y-2">
//             <h3 className="text-sm font-medium mb-3">Changes to be committed</h3>
//             {changes.map((change, index) => (
//               <div key={index} className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded border border-white/10">
//                 <span className="px-2 py-0.5 rounded text-xs font-medium bg-white/10">
//                   {change.action}
//                 </span>
//                 <code className="text-sm flex-1">{change.key}</code>
//                 <code className="text-sm text-gray-400">{change.value}</code>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="px-6 py-4 border-t border-white/10 flex items-center justify-end gap-3">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 border border-white/10 hover:bg-white/5 rounded"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => onCommit(message)}
//             disabled={!message.trim()}
//             className="px-4 py-2 bg-white text-black hover:bg-gray-200 disabled:bg-white/10 disabled:text-gray-500 disabled:cursor-not-allowed rounded flex items-center gap-2"
//           >
//             <GitCommit className="w-4 h-4" />
//             Commit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function MergePanel({ branches, currentBranch, onClose }) {
//   const [targetBranch, setTargetBranch] = useState('');
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');

//   return (
//     <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
//       <div className="bg-[#161616] rounded border border-white/10 max-w-2xl w-full shadow-xl">
//         <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
//           <h2 className="text-lg font-semibold">Create merge request</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-white">
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <div className="p-6 space-y-6">
//           <div className="flex items-center gap-4">
//             <div className="flex-1">
//               <label className="block text-sm font-medium mb-2">From</label>
//               <div className="px-4 py-3 bg-white/5 border border-white/10 rounded">
//                 <code className="text-sm">{currentBranch}</code>
//               </div>
//             </div>
//             <ArrowRight className="w-5 h-5 text-gray-400 mt-8" />
//             <div className="flex-1">
//               <label className="block text-sm font-medium mb-2">To</label>
//               <select
//                 value={targetBranch}
//                 onChange={(e) => setTargetBranch(e.target.value)}
//                 className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded outline-none focus:border-white/30"
//               >
//                 <option value="">Select branch...</option>
//                 {branches
//                   .filter((b) => b.name !== currentBranch)
//                   .map((branch) => (
//                     <option key={branch.name} value={branch.name}>
//                       {branch.name}
//                     </option>
//                   ))}
//               </select>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Title</label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Merge development into main"
//               className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded outline-none focus:border-white/30"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Description</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Describe the changes..."
//               className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded outline-none focus:border-white/30 resize-none"
//               rows={4}
//             />
//           </div>
//         </div>

//         <div className="px-6 py-4 border-t border-white/10 flex items-center justify-end gap-3">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 border border-white/10 hover:bg-white/5 rounded"
//           >
//             Cancel
//           </button>
//           <button
//             disabled={!targetBranch || !title}
//             className="px-4 py-2 bg-white text-black hover:bg-gray-200 disabled:bg-white/10 disabled:text-gray-500 disabled:cursor-not-allowed rounded flex items-center gap-2"
//           >
//             <GitMerge className="w-4 h-4" />
//             Create request
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { motion, AnimatePresence } from "framer-motion";
import { branchAtom, branchesAtom, commitAtom, commitsAtom, envsProjectAtom, projectAtom } from '@/states';
import { useAtom } from 'jotai';
import Link from 'next/link';

export default function GitHubStyleProject() {
  const [activeTab, setActiveTab] = useState('envs');
  // const [selectedBranch, setSelectedBranch] = useState('main');
  const [showBranchDropdown, setShowBranchDropdown] = useState(false);
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [showConnectDropdown, setShowConnectDropdown] = useState(false);
  const [showCommitPanel, setShowCommitPanel] = useState(false);
  const [commitMessage, setCommitMessage] = useState('');
  const [selectedCommit, setSelectedCommit] = useState(null);
  const [showMergePanel, setShowMergePanel] = useState(false);

 const params = useParams();
    const router = useRouter();
  const id = params.id as string; 
  // const poarambranch = params.branch as string; 
  // const paramcommit = params.commit as string; 
  const query = new URLSearchParams(window.location.search);
const poarambranch = query.get("branch");
const paramcommit = query.get("commit");
    const {getProjectById,addEnv,getEnvs,deleteEnv} =useProjects()
  const onClose = useCallback(() => {
    setdeleteIsOpen(false);
  }, []);
  const onCreateEnvClose = useCallback(() => {
    setEdit(false);
    setCreateEnvIsOpen(false);
  }, []);
  const onConnectClose = useCallback(() => {
    setConnect(false);
    // setCreateEnvIsOpen(false);
  }, []);
  const onDelete = useCallback(() => {}, []);
  const onCreate = async ({envs}:{envs:string}) => {

    let data =  parseEnvToList(envs)
  
  let dataa = await    addEnv({secretPhrase,update:true,project:project._id,body:{data,branch,commit:commit.commit,commitId:commit.commitId},key:project.key})
  if(dataa?.data){

    setEnvsProject(dataa.data)
  }
  };
  // const o = useCallback(()=>{},[])
  const [deleteIsOpen, setdeleteIsOpen] = useState(false);
  const [createEnvIsOpen, setCreateEnvIsOpen] = useState(false);
  const [loading ,setLoading] = useState(false)
  const [secretPhrase ,setSecretPhrase] = useState("")
  const [edit,setEdit] = useState(false)
  const [reload,setreload] =useState("")
  const {apifetch} = useFetch()
  
  // const [branch ,setBranch] = useState(poarambranch)
  const [branch_ ,setBranch_] = useAtom(branchAtom)
  // const [commit ,setCommit] = useState<any>(null)
  const [commit_ ,setCommit_] = useAtom(commitAtom)
  // const [envsProject, setEnvsProject] = useState<any[]>([]);
  const [envsProject_, setEnvsProject_] = useAtom(envsProjectAtom);
  // const [branches, setBranches] = useState<any[]>([]);
  const [branches_, setBranches_] = useAtom(branchesAtom);
  const [project_,setProject_] = useAtom(projectAtom)
  const [commits_,setCommits_] = useAtom(commitsAtom)


 const  branch = useMemo(()=>{

    return branch_[id]||poarambranch

  },[branch_,id])

  // const setBranch = useCallback((data)=>{

  //   setBranch_({...branch_,[`${id}`]:data})

  // },[branch_,id])
  const setBranch = useKeyedStateSetter({state:branch_,setState:setBranch_,id})

 const  commit = useMemo(()=>{

    return commit_[id]||null

  },[commit_,id])

  // const setCommit = useCallback((data)=>{

  //   setCommit_({...commit_,[`${id}`]:data})

  // },[commit_,id])
  const setCommit = useKeyedStateSetter({state:commit_,setState:setCommit_,id})

 const  envsProject = useMemo(()=>{

    return envsProject_[id]||[]

  },[envsProject_,id])

  // const setEnvsProject = useCallback((data)=>{

  //   setEnvsProject_({...envsProject_,[`${id}`]:data})

  // },[envsProject_,id])

   const setEnvsProject = useKeyedStateSetter({state:envsProject_,setState:setEnvsProject_,id})


 const  branches = useMemo(()=>{

    return branches_[id]||[]

  },[branches_,id])

  // const setBranches = useCallback((data)=>{

  //   setBranches_({...branches_,[`${id}`]:data})

  // },[branches_,id])
   const setBranches = useKeyedStateSetter({state:branches_,setState:setBranches_,id})

 const  project = useMemo(()=>{

    return project_[id]||{ }

  },[project_,id])

  // const setProject = useCallback((data)=>{

  //   setProject_({...project_,[`${id}`]:data})

  // },[project_,id])

     const setProject = useKeyedStateSetter({state:project_,setState:setProject_,id})

 const  commits = useMemo(()=>{

    return commits_[id]||{ commits: [] }

  },[commits_,id])

  // const setCommits = useCallback((data)=>{

  //   setCommits_({...commits_,[`${id}`]:data})

  // },[commits_,id])

    const setCommits = useKeyedStateSetter({state:commits_,setState:setCommits_,id})



useEffect(()=>{
  setBranch(poarambranch)
},[])
  const [connect,setConnect] = useState(false)
  const [addLoading,setAddLoading] = useState<any>(false)
  const [deleteLoading,setDeleteLoading] = useState<any>(false)
  const [newBranchName, setNewBranchName] = useState("")
  const [showNewBranchInput, setShowNewBranchInput] = useState(false)
  const [creatingBranch, setCreatingBranch] = useState(false)
    const [key,setKey]=useState<string>("loading...")
    const {session} = useAuth()


    // useEffect(()=>{


    //   if(paramcommit){

    //   }
    // },[

    //   paramcommit
    // ])


useEffect(()=>{

  let v= async()=>{

    let commitsdata = await apifetch({url:GETCOMMITURL+`?id=${project?._id}&commit=${paramcommit}`}) 

    if(commitsdata.success){
      // setCommit(commitsdata.data)
      let data =commitsdata.data
      setCommit(data||{})
       updateQueryParam("commit",data?.commitId)
    }
  }

  if(session?.token,id&&session?.secretPhrase&&branch&&project?._id&&paramcommit){
    v()
  }


},[session?.token,id,session?.secretPhrase,branch,project?._id,paramcommit])
  

    useEffect(()=>{

     let getkey = async ()=>{

      try{

        if(session?.token &&session?.secretPhrase &&project?._id  &&secretPhrase&&secretPhrase!=""){
          let key_ = JSON.stringify(  {
            projectKey:project?.key,
            projectId:project._id,
            colabId:project.colab._id,
            userKey:secretPhrase,
            userEmail:session?.user?.email,
            salt : generateKey(15)
          }  );
  
      //  let   pk ="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC9wRqW73K4QsVc\nUcMYMgyeyXazbo/T3nfP1+NbdkPWO3xoskCHkbZPDSQWF6eQO1cZe/gZC4ZFKZM1\ncDasuq2Nd/mu3EQqnko8v3r6sguGeshbQ3CKshYKlEuCvdDws8ZItnMXbMWqI/dN\nD09yUrw8TUaHER+v8fR0HM8/2HwM9hB7jWLlesbw/ghwshpKbq4dK41sMjvqPCQ+\nS2YYliXGkGUcvdRKkd3lH9KBDlkFEyAM6kUGgSv0amaD+YPVUCGrVAKnK278HrHf\nskM/BW0n7bXmTFG4w8RU2uwImKbys8mN7EbHYJGS7UZ5exyiAM82XU1/TcASVvUe\nyvAFuMIDAgMBAAECggEAMMx2YBaYNBbH1qQYPiKw6Cz7X82xI1V1DniAucbCT1fg\n+LPOsI6iidXhT+UpbIg2MBGXjilOkH7OotGG3gjsFROjnHp89VDb2p+Lquka2ay9\n1eqUCLcfv/y/JpJWJ3C0L4LsOjv44XZ6ZNDpJ4drbT6aQqX+tirNKQc3rT2pOVOk\n1QqodOAElzH+R6AHRQtljrDiyx9iJRnz+7Y3oX1hxZIn/rGpyqIZt6Nc4Rq5pQ8G\n/N9nToVISg9PHierFJ6RoeNM4T6VOxDSK3fenjqGBllA1ZQgO2U5ayl8qnFEIKYy\n3nzey2y/bot4kktmOlv1mP0BSjqFiU3B/sun6KNscQKBgQDuoi+Ogqc9mGh0MlbS\nOvjpmHHwoo3AMzLe94yOD8Ya+0LK29uER8PDtqzq+fAzNpamMExIJR/y/OCafuyR\nycGaoQ5YHDhEjz9RDPZprBB16EGs2SplxPysIdr03cM+cy4pOof6JfqeY0DXony8\n8hLHL3yrrK2Wts0e1OOQYfSCzwKBgQDLkEiSgIeB0vh4HmyNpC7qbfb8JVKAsJBo\nhULwlbFmxBL6gpkXxpixA8+z9+ORBAiNAHU3kqj234uaDh8vKZN5sm7/7bf7KV7j\nehauMSapSLxcbYJQ0PjfYq4wZs1J2POS08aGKba2pwwrT9cGj2wDB8eYkaYWxMAD\nPZNOMq1qjQKBgF2iL8zYQSzvB1VIhz6YOyDVWyfTcJFQxY4tTe5UDCR8IHoeiGTA\nD/VUUUcl6PT/X184JkZMotuiE7MrSEHwC1JUDZ/O+tkT6AEyd+GAzTimeFaNI5Cp\nGYelBRf9h+WSJjOxLredfVf2k/PIYu90gJ+9Z0qpR7eSZKvLVrtJZDqLAoGATk3w\nPLrIZX48Kii55Tp0+aTXT2Mj+3Dv++TXPSi4Fynxiv/V2DmC3wTyTu5aUZxVlbfJ\nX1lBOcYAM4CfKks5+aRT4osVLL5bS/HY66TolFHwczWE3YWlVnjlPKUu7utPtvlT\n8qP1LwnPOpH5ywI8sGW7t8q/Mx74Jcb39Sq1XrkCgYBlsDdKNNCHZzh0Oc24G9SK\nQYIv0Nd0HJDHXXZaaQTZJ+RudZ+mJSRC/8M+QVCYF9XbJBgLlC+3Q/hJ4QyOEPvv\nvxybfLkFWZwL32qiuyYzhuQek+MMMy/0vlYNYYNvbN4Dixm1Gp9lb+TD9Nr1ejjT\nKDXPls/bDosPxNXGY9arvA==\n-----END PRIVATE KEY-----"
          // let key_  =    project?.key+"_kk_"+project._id  + "__kk__"+ session?.secretPhrase+"_kk_"+session?.user?.email  + "_kk__" + generateKey(30).toString()
          // console.log(key_,"key________emmmm");
        let key__ =  await handleEncryptKeyPairLongData({message:`${key_}`,publicKey:PUBLICKEY})
        // let key__x =  await decryptStringToJson({encryptedString:`${key__}`,privateKey:pk})
        if(key__){
   

          
  
          setKey(key__||"loading...")
        }

        // console.log(key__,"key________emmmm2222");
        // console.log(key__x,"dcccckey________emmmm2222");
      }
      }catch(e){
        console.log(e)
      }
    }

    getkey()

    },[project?._id,session?.token,session?.secretPhrase,secretPhrase])


useEffect(()=>{

let c = async()=>{

  let s = project?.secretPhrase
       if(s){
      
  
         let ds  =   await handleDecrypt({encrypted:s,passphrase:session?.secretPhrase})

         setSecretPhrase(ds)
             // console.log(ds,"dssssssssss")
        
       }
}

c()

}


,[project?.id])

  useEffect(()=>{

   


    let v = async ()=>{
      try{

        let res =  await getProjectById(id)
        if(res.success){
          let d =  res.data
          let s = d?.secretPhrase
          if(s){

            let ds  =   await handleDecrypt({encrypted:s,passphrase:session?.secretPhrase})
            setSecretPhrase(ds)
                // console.log(ds,"dssssssssss")
            setProject(res.data)
          }
          // let setSecretPhrase

              // c(res.data)
          
    
        }
      }catch(e){}
    }
    if(session?.token  && session.secretPhrase &&id){

      v()
    }else{
      setEnvsProject([])
    }


  },[session?.token,id,session?.secretPhrase,])


useEffect(()=>{

  // if()
},[])
  useEffect(()=>{

   

    let c = async  (project:any)=>{
      setLoading(true)
let data = await getEnvs({project:id,key:project.key,branch,secretPhrase,commit:commit?.commitId})
// console.log(data,"branches")
if(data?.decripted){
  setEnvsProject(data.decripted)
  
  
}
// if(data?.branches){
//   setBranches([...data?.branches])
// }

setLoading(false)
    }
    
    
    if(session?.token  && session.secretPhrase &&id && commit &&secretPhrase){
      if(project?._id){
              // setEnvsProject([])
        c(project)
      }

   
    }
    // else{
    //   setEnvsProject([])
    // }


  },[session?.token,id,session?.secretPhrase,branch,project?._id,reload,commit,secretPhrase])



useEffect(()=>{

  let v= async()=>{

    let commitsdata = await apifetch({url:GETCOMMITSURL+`?id=${project?._id}&branch=${branch}`}) 

    if(commitsdata.success){
      setCommits(commitsdata.data)
      let data =commitsdata.data.commits[0]

      if(!paramcommit){

        setCommit(data||{})
        updateQueryParam("commit",data?.commitId)
      }
    }
  }

  if(session?.token&&id&&session?.secretPhrase&&branch&&project?._id ){
    v()
  }


},[session?.token,id,session?.secretPhrase,branch,project?._id])
  
useEffect(()=>{

  let v= async()=>{

    

    let branchdata = await apifetch({url:GETBRANCHESURL+`?id=${project?._id}`}) 
   

    if(branchdata.success){
      let list = [...(branchdata?.data||[]),{name:"main"}]
      setBranches(list)
      let data = poarambranch||list[0]?.name
      // if(!!poarambranch){

      // }
      setBranch(data)
        updateQueryParam("branch",data)
      }else {
        let data = poarambranch ||"main"
      updateQueryParam("branch",data)
            setBranches([{name:data}])
            setBranch(data)
    }
  }

  if(session?.token&&id&&session?.secretPhrase&&project?._id){
    v()
  }


},[session?.token,id,session?.secretPhrase,project?._id])
  
  const handleCreateBranch = async () => {
    if (!newBranchName.trim()) {
      toast.error("Please enter a branch name");
      return;
    }

    if (branches.find(e=>e.name==newBranchName)) {
      toast.error("Branch already exists");
      return;
    }

    try {
      setCreatingBranch(true);
      
      // Create branch logic here - you might need to add this API call
      // For now, we'll add it to the local state
      // You should replace this with your actual API call
      // const response = await createBranch({ project: id, branchName: newBranchName.trim() });
      
      setBranches([...branches, {name:newBranchName.trim()}]);
      setBranch(newBranchName.trim());
      updateQueryParam("branch",newBranchName.trim())
      setNewBranchName("");
      setShowNewBranchInput(false);
      toast.success("Branch created successfully");
    } catch (e: any) {
      toast.error(e?.message || "Failed to create branch");
    } finally {
      setCreatingBranch(false);
    }
  };




  // Mock data
  // const project = {
  //   name: 'Production API',
  //   description: 'Main production environment for API services',
  //   gitUrl: 'https://github.com/username/project-name',
  //   key: 'proj_abc123xyz789',
  //   autoMerge: false
  // };

  // const branches = [
  //   { name: 'main', ahead: 0, behind: 0, lastCommit: '2 hours ago' },
  //   { name: 'development', ahead: 3, behind: 1, lastCommit: '5 minutes ago' },
  //   { name: 'staging', ahead: 1, behind: 2, lastCommit: '1 day ago' }
  // ];

  // const commits = [
  //   {
  //     id: 'abc123',
  //     message: 'Update API keys for production',
  //     author: 'John Doe',
  //     date: '2 hours ago',
  //     changes: { added: 2, modified: 1, deleted: 0 }
  //   },
  //   {
  //     id: 'def456',
  //     message: 'Add database credentials',
  //     author: 'Jane Smith',
  //     date: '1 day ago',
  //     changes: { added: 3, modified: 0, deleted: 0 }
  //   },
  //   {
  //     id: 'ghi789',
  //     message: 'Remove deprecated endpoints',
  //     author: 'John Doe',
  //     date: '2 days ago',
  //     changes: { added: 0, modified: 2, deleted: 1 }
  //   }
  // ];

  // const envs = [
  //   { 
  //     key: 'DATABASE_URL', 
  //     value: 'postgres://localhost:5432/db',
  //     status: 'modified',
  //     lastModified: '2 hours ago',
  //     commit: 'abc123',
  //     commitMessage: 'Update API keys for production'
  //   },
  //   { 
  //     key: 'API_KEY', 
  //     value: 'sk_live_abc123',
  //     status: 'added',
  //     lastModified: '2 hours ago',
  //     commit: 'abc123',
  //     commitMessage: 'Update API keys for production'
  //   },
  //   { 
  //     key: 'STRIPE_SECRET', 
  //     value: 'sk_live_xyz789',
  //     status: 'unchanged',
  //     lastModified: '1 day ago',
  //     commit: 'def456',
  //     commitMessage: 'Add database credentials'
  //   }
  // ];

  const pendingChanges = [
    // { key: 'NEW_API_URL', value: 'https://api.example.com', action: 'add' },
    // { key: 'DATABASE_URL', value: 'postgres://prod:5432/db', action: 'modify' }
  ];


  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
       <AddEnvModal edit={edit} onClose={onCreateEnvClose} secretPhrase={secretPhrase} initialText={listToEnvString(envsProject)} isOpen={createEnvIsOpen} onCreate={onCreate} />
      
       {showConnectDropdown && (
                // <div className="absolute top-full right-0 mt-2 w-96 bg-[#161616] rounded border border-white/10 shadow-xl z-10">
                  <AnimatePresence >
                       {/* {isOpen && ( */}
                         <motion.div 
                           className="fixed max-md:hidden inset-0 z-50 flex  items-center justify-center bg-black/40 backdrop-blur-sm"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                         >
                           <motion.div
                             initial={{ scale: 0.9, opacity: 0 }}
                             animate={{ scale: 1, opacity: 1 }}
                             exit={{ scale: 0.9, opacity: 0 }}
                             transition={{ duration: 0.2 }}
                             className="bg-[#161616]  shadow-xl w-full max-w-md p-6"
                           >
                    <X onClick={()=>{
                          setShowConnectDropdown(false)
                         }} className='w-4 h-4 ml-auto'/>
                  <div className="p-4 space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Install package</h3>
                      <div className="bg-black/40 rounded p-3 font-mono text-xs">
                        <code className="text-gray-300">npm install xavren</code>
                        <button className="float-right text-gray-400 hover:text-white">
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Add to your code</h3>
                      <div className="bg-black/40 rounded p-3 font-mono text-xs space-y-1">
                        <div className="text-purple-400">import</div>
                        <div className="text-gray-300">dotenv from 'xavren'</div>
                        <div className="mt-2 text-gray-300">dotenv.config(key:"process.env.PROJECT_KEY")</div>
                        <button className="float-right text-gray-400 hover:text-white -mt-8">
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

</motion.div>
</motion.div>
</AnimatePresence>

                // {/* </div> */}
              )}
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0A0A0A] px-3 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto">
          {/* Project name and git URL */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-white flex items-center justify-center flex-shrink-0">
                <Code className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-base sm:text-xl font-semibold truncate">{project?.name || "Project loading..."}</h1>
                {project?.gitUrl && (
                  <Link
                    href={project?.gitUrl || "#"}
                    target="_blank"
                    className="text-xs sm:text-sm text-gray-400 hover:text-white flex items-center gap-1 truncate"
                  >
                    <Link2 className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{project?.gitUrl || "giturl not connected"}</span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-gray-400 mb-4 line-clamp-2">{project.description}</p>

          {/* Project key and commit info */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded border border-white/10 w-full sm:w-auto">
              <code className="text-xs text-gray-400 truncate flex-1 sm:flex-none sm:max-w-[200px]">{key}</code>
              <button
                onClick={() => {
                  if (project?.key) {
                    navigator.clipboard.writeText(key);
                    toast.success("Copied to clipboard");
                  }
                }}
                className="text-gray-400 hover:text-white flex-shrink-0"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
            {/* <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded border border-white/10 w-full sm:w-auto"> */}
            <div className="flex items-center gap-2 px-3 py-2  w-full sm:w-auto ">
              <code className="text-xs text-gray-400 truncate max-w-40">{commit?.commitId || "no commit"}</code>
              <span className="text-xs text-gray-400">•</span>
              <code className="text-xs text-gray-400 truncate">{getreadabledate(commit?.updatedAt)}</code>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {/* Branch selector and actions */}
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            {/* Branch dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center justify-between sm:justify-start gap-2 px-3 py-2 border border-white/10 hover:bg-white/5 rounded text-sm font-medium w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4" />
                    <span className="truncate">{branch}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[280px] sm:w-80 bg-[#161616] border-white/10">
                <div className="p-2 border-b border-white/10">
                  <input
                    type="text"
                    placeholder="Find or create a branch..."
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm outline-none focus:border-white/30 text-white"
                  />
                </div>
                <div className="max-h-60 sm:max-h-96 overflow-y-auto">
                  {branches.map((branchItem) => (
                    <DropdownMenuItem
                      key={branchItem.name}
                      onClick={() => 
                      {  setBranch(branchItem.name)
                            updateQueryParam("branch",branchItem?.name)}
                      }
                      className="px-4 py-3 text-white hover:bg-white/5 cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <GitBranch className="w-4 h-4 text-gray-400" />
                          <div className="text-left">
                            <div className="font-medium text-sm">{branchItem?.name}</div>
                            <div className="text-xs text-gray-500">{getreadabledate(branchItem.updatedAt)}</div>
                          </div>
                        </div>
                        {(branchItem?.ahead > 0 || branchItem?.behind > 0) && (
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            {branchItem.ahead > 0 && <span>↑{branchItem.ahead}</span>}
                            {branchItem.behind > 0 && <span>↓{branchItem.behind}</span>}
                          </div>
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem
                  onClick={() => setShowNewBranchInput(true)}
                  className="px-3 py-2 text-white hover:bg-white/5 cursor-pointer"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create new branch
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {showNewBranchInput && (
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Branch name"
                  value={newBranchName}
                  onChange={(e) => setNewBranchName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCreateBranch();
                    else if (e.key === 'Escape') {
                      setShowNewBranchInput(false);
                      setNewBranchName("");
                    }
                  }}
                  className="border border-white/10 bg-white/5 rounded px-3 py-2 outline-none focus:border-white/30 text-sm text-white flex-1"
                  autoFocus
                />
                {creatingBranch ? (
                  <LoaderCircle className="animate-spin w-4 h-4" />
                ) : (
                  <>
                    <Check
                      onClick={handleCreateBranch}
                      className="cursor-pointer hover:text-green-600 w-4 h-4"
                    />
                    <X
                      onClick={() => {
                        setShowNewBranchInput(false);
                        setNewBranchName("");
                      }}
                      className="cursor-pointer hover:text-red-600 w-4 h-4"
                    />
                  </>
                )}
              </div>
            )}

            {/* Tabs */}
            <div className="flex items-center gap-1 border border-white/10 rounded p-0.5 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('envs')}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors flex-1 sm:flex-none ${
                  activeTab === 'envs' ? 'bg-white/10' : 'text-gray-400 hover:text-white'
                }`}
              >
                Variables
              </button>
              <button
                onClick={() => setActiveTab('commits')}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors flex-1 sm:flex-none ${
                  activeTab === 'commits' ? 'bg-white/10' : 'text-gray-400 hover:text-white'
                }`}
              >
                Commits
              </button>
            </div>
          </div>

          {/* Action buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-2 flex-wrap">
            <button          onClick={()=>{
                 router.push(`/dashboard/projects/${id}/teams`)
            }} className="px-3 py-1.5 border border-white/10 hover:bg-white/5 rounded text-sm flex items-center gap-2">
              <Users className="w-4 h-4" />
              Teams
            </button>

            {/* Connect dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button onClick={() => setShowConnectDropdown(!showConnectDropdown)} className="px-3 py-1.5 border border-white/10 hover:bg-white/5 rounded text-sm flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  Connect
                  <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-96 bg-[#161616] border-white/10">
                <div className="p-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Install package</h3>
                    <div className="bg-black/40 rounded p-3 font-mono text-xs">
                      <code className="text-gray-300">npm install xavren</code>
                      <button className="float-right text-gray-400 hover:text-white">
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Add to your code</h3>
                    <div className="bg-black/40 rounded p-3 font-mono text-xs space-y-1">
                      <div className="text-purple-400">import</div>
                      <div className="text-gray-300">dotenv from 'xavren'</div>
                      <div className="mt-2 text-gray-300">dotenv.config(key:"process.env.PROJECT_KEY")</div>
                      <button className="float-right text-gray-400 hover:text-white -mt-8">
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <button 
            
            onClick={()=>{  
            setCreateEnvIsOpen(true);
            setEdit(true);
            
            }}
            
            className="px-3 py-1.5 border border-white/10 hover:bg-white/5 rounded text-sm flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Edit
            </button>

            <button onClick={()=>{
                        downloadEnvFile(envsProject)
                      }} className="px-3 py-1.5 border border-white/10 hover:bg-white/5 rounded text-sm flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>

            {!project.autoMerge && (
              <button onClick={()=>{
                setShowMergePanel(true)
                toast("coming soon")
              }} className="px-3 py-1.5 bg-white text-black hover:bg-gray-200 rounded text-sm flex items-center gap-2">
                <GitMerge className="w-4 h-4" />
                Merge
              </button>
            )}
          </div>

          {/* Action buttons - Mobile/Tablet (Dropdown Menu) */}
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="px-3 py-2 border border-white/10 hover:bg-white/5 rounded text-sm flex items-center gap-2 w-full sm:w-auto justify-center">
                  <MoreVertical className="w-4 h-4" />
                  <span>Actions</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-[#161616] text-white border-white/10">
                <DropdownMenuItem 
                
                onClick={()=>{
                 router.push(`/dashboard/projects/${id}/teams`)
            }}
                className="cursor-pointer">
                  <Users className="w-4 h-4 mr-2" />
                  Teams
                </DropdownMenuItem>
                <DropdownMenuItem    onClick={() => setShowConnectDropdown(!showConnectDropdown)} className="cursor-pointer">
                  <Terminal className="w-4 h-4 mr-2" />
                  Connect
                  
                </DropdownMenuItem>
                
                <DropdownMenuItem           onClick={()=>{  
            setCreateEnvIsOpen(true);
            setEdit(true);
            
            }} className="cursor-pointer">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>{
            downloadEnvFile(envsProject)
          }} className="cursor-pointer">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </DropdownMenuItem>
                {/* {!project.autoMerge && (
                  <>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem className="cursor-pointer">
                      <GitMerge className="w-4 h-4 mr-2" />
                      Merge
                    </DropdownMenuItem>
                  </>
                )} */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Pending changes alert */}
        {pendingChanges.length > 0 && (
          <div className="mb-6 bg-white/5 border border-white/10 rounded p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium mb-1">{pendingChanges.length} uncommitted changes</h3>
                <p className="text-sm text-gray-400 mb-3">You have unsaved changes that need to be committed</p>
                <button
                  onClick={() => setShowCommitPanel(true)}
                  className="px-3 py-1.5 bg-white text-black hover:bg-gray-200 rounded text-sm"
                >
                  Commit changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        {activeTab === 'envs' && (
          <div className="bg-[#0A0A0A] rounded border border-white/10 overflow-hidden">
            {/* Add env dropdown - moved to top */}
            <div className="px-3 sm:px-6 py-3 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <h2 className="font-medium text-sm sm:text-base">Environment Variables</h2>
                {loading ? (
                  <Loader2 className="animate-spin w-4 h-4 text-gray-400" />
                ) : (
                  <Loader2
                    onClick={() => setLoading(!loading)}
                    className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white"
                  />
                )}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="px-3 py-1.5 bg-white text-black hover:bg-gray-200 rounded text-sm flex items-center gap-2 w-full sm:w-auto justify-center">
                    <Plus className="w-4 h-4" />
                    Add variable
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-[#161616] text-white border-white/10">
                  <DropdownMenuItem onClick={()=>{

            setEnvsProject([...envsProject,{title:"",value:"",edit:true,id:Math.random()}])
        }} className="cursor-pointer">
                    <Plus className="w-4 h-4 mr-2" />
                    Add variable
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={()=>{  setCreateEnvIsOpen(true);}} className="cursor-pointer">
                    <FileText className="w-4 h-4 mr-2" />
                    Add from .env file
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Table header - Hidden on mobile */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/10 text-sm font-medium text-gray-400">
              <div className="col-span-3">Key</div>
              <div className="col-span-3">Value</div>
              <div className="col-span-3">Commit</div>
              <div className="col-span-2">Modified</div>
              <div className="col-span-1">Actions</div>
            </div>

            {/* Table rows - Responsive cards on mobile */}
            <div className="divide-y divide-white/5">
             { (envsProject.length==0 && loading)?    <div className="flex items-center justify-center py-10">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-500"></div>
        <span className="ml-2">Loading envs...</span>
      </div>
    :  
    <>
              {envsProject.length === 0 ? (
                <div className="px-6 py-12 text-center text-gray-400">
                  <p className="text-sm">No environment variables yet</p>
                  <p className="text-xs mt-1" onClick={()=>{
                    setShowAddDropdown(true)
                  }}>Click "Add variable" to get started</p>
                </div>
              ) : (
                envsProject.map((env, index) => (
                  <div
                  
                      onClick={(e)=>handleDoubleTap(e.currentTarget,()=>{
                    const newArr = [...envsProject];
                    // newArr[index].new = false
                    newArr[index].edit = true
                    setEnvsProject(newArr)
                })}

                
                  key={index} className="md:grid md:grid-cols-12 gap-4 px-3 sm:px-6 py-4 hover:bg-white/5 group">
                    {/* Mobile card layout */}
                    <div className="md:hidden space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-gray-400 mb-1">Key</div>
                                     {
                            env.edit ? <input placeholder="NEW_KEY" value={env?.title} onChange={(event)=>{
                        
                                const newArr = [...envsProject];
                                // newArr[index].new = false
                                newArr[index].title = event.target.value.trim()
                                setEnvsProject(newArr)
                            }} className="bg-transparent border-b  w-30 outline-none" defaultValue={env.title}/> :
                            
                          <code className="text-sm font-mono break-all">{env?.title}</code>
                            }
                        </div>
                             <button
        disabled={ env.edit}
        onClick={()=>{
                                const newArr = [...envsProject];
                                // newArr[index].new = false
                                newArr[index].view = !env.view
                                setEnvsProject(newArr)
                            }}
          className="text-gray-400 ml-2"
        >
          {env.view ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Value</div>
                                                 {
                            env.edit ? 
                          
    <input placeholder="NEW_VALUE" value={env.value} onChange={(event)=>{
                                const newArr = [...envsProject];
                                // newArr[index].new = false
                                newArr[index].value = event.target.value.trim()
                                setEnvsProject(newArr)
                            }} className="bg-transparent border-b max-w-[80%]  font-mono text-gray-400 flex-1 outline-none text-sm" defaultValue={env.title}/>
        
        :
        
                        <code className="text-sm font-mono text-gray-400 break-all">{'•'.repeat(20)}</code>
        }
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <span className="text-gray-400">Modified: </span>
                          <span className="text-gray-500">{getreadabledate(env.updatedAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {/* <Copy className="w-4 h-4 cursor-pointer hover:text-white" />
                          <Trash2 className="w-4 h-4 cursor-pointer hover:text-red-400" /> */}

                                   {
                            env.edit?

                            <>
                         { addLoading == Number(index+1)? <LoaderCircle className="animate-spin " />:
                          
                          <Check onClick={async ()=>{
                              try{
                                setAddLoading(Number(index+1))

      let t = envsProject.find((ee,indexxx)=>ee.title==env.title && indexxx!=index)
                              if(t && env.title.trim()!=""){
                                toast.error("env already exist")
                                return
                              }
                              if(env.title.trim()=="" || env.value.trim()==""){
                                     toast.error("Please add a value")
                                return

                              }


 let data = await    addEnv({secretPhrase,project:project._id,body:{data:[env],branch,commit:commit.commit,commitId:commit.commitId},key:project.key})
//  console.log(data,"dataaaaabbbbbbbb")
if(data?.data){

  const newArr = [...envsProject];
  
  
                                  // newArr[index].new = false
                                  // newArr[index].value = event.target.value
                                  newArr[index] ={...data.data[0], ...newArr[index],edit:false}
                                  setEnvsProject(newArr)
}
                              }catch(e:any){
                              toast.error(e?.message||"An error occured")

                              }finally{
                                setAddLoading(false)
                              }
                            }} width={12} />}
                            </>
                            :
                    <div className="px-2">
                     <Copy
                        onClick={() => {
                          toast.success("copied to clipboard");
                          navigator.clipboard.writeText(`${env.title}=${env.value}`);
                        }}
                        className="h-4 w-4 text-white"
                        width={12}
                      />
                        </div>
                        }

                  {                env.edit?<>
                  
                  <X onClick={()=>{
                      const newArr = [...envsProject];
                            // newArr[index].new = false
                            newArr[index].edit = false
                            setEnvsProject(newArr)
                  }}/>
                  </> :<>
                  
              {  deleteLoading == Number(index+1)? <LoaderCircle className="animate-spin " />: 

        <button  onClick={async () => {

                     
                        
                        try{
                          setDeleteLoading(Number(index+1))

                          if(env._id){
  
                            await deleteEnv({project:id,id:env._id,branch,commit:commit.commitId})
  
                          }
                          setEnvsProject(envsProject.filter((item,i)=>i!==index))
                        }catch(e){

                        }finally{
                                  setDeleteLoading(false)
                        }
                      }} className="text-white hover:text-red-400">
          <Trash2 className="w-4 h-4" />
        </button>
                  }
                  </>
                  
                  
                  }
                        </div>
                      </div>
                    </div>

                    {/* Desktop table layout */}
                    <div className="hidden md:contents">
                      <div className="col-span-3 flex items-center gap-2">

                 {
                            env.edit ? <input placeholder="NEW_KEY" value={env?.title} onChange={(event)=>{
                        
                                const newArr = [...envsProject];
                                // newArr[index].new = false
                                newArr[index].title = event.target.value.trim()
                                setEnvsProject(newArr)
                            }} className="bg-transparent border-b  w-30 outline-none" defaultValue={env.title}/> :
                            
        // <code className="text-sm font-mono">{env?.title}</code>
        <div className="text-sm font-mono text-gray-400     flex-1 max-w-[80%] truncate">

          <code className="text-sm font-mono truncate">{env?.title}</code>
        </div>
                            }

                        
                      </div>
                      <div className="col-span-3 flex items-center gap-2">

                         {
                            env.edit ? 
                          
    <input placeholder="NEW_VALUE" value={env.value} onChange={(event)=>{
                                const newArr = [...envsProject];
                                // newArr[index].new = false
                                newArr[index].value = event.target.value.trim()
                                setEnvsProject(newArr)
                            }} className="bg-transparent border-b max-w-[80%]  font-mono text-gray-400 flex-1 outline-none text-sm" defaultValue={env.title}/>
        
        :
<div className="text-sm font-mono text-gray-400     flex-1 max-w-[80%] truncate">
  <PopupInfoToastBefore text={env.title}>

        <code className="text-sm font-mono text-gray-400    w-full  truncate">
          {env.view ? env.value : '•'.repeat(20)}
        </code>
         </PopupInfoToastBefore>
</div>
                         }
                        {/* <code className="text-sm font-mono text-gray-400 flex-1 truncate">
                          {'•'.repeat(20)}
                        </code> */}
                     



       <button
        disabled={ env.edit}
        onClick={()=>{
                                const newArr = [...envsProject];
                                // newArr[index].new = false
                                newArr[index].view = !env.view
                                setEnvsProject(newArr)
                            }}
          className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {env.view ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
                      </div>
                      <div className="col-span-3 flex items-center gap-2">
                        <code className="text-xs bg-white/5 px-2 py-0.5 rounded max-w-20 truncate text-gray-400">
                          {env?.commit?.commit || env?.commit}
                        </code>
                        <span className="text-xs text-gray-500 max-w-10 truncate">
                          {env?.commit?.commitId || env?.commit}
                        </span>
                      </div>
                      <div className="col-span-2 flex items-center text-sm text-gray-400">
                        {getreadabledate(env.updatedAt)}
                      </div>
                      {/* <div className="col-span-1 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Copy className="w-4 h-4 cursor-pointer hover:text-white" />
                        <Trash2 className="w-4 h-4 cursor-pointer hover:text-red-400" />
                      </div> */}



      <div className="col-span-1 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* <button  className="text-gray-400 hover:text-white">
          <Copy     onClick={() => {
                                    toast.success("copied to clipboard");
                                    navigator.clipboard.writeText(`${env.title}=${env.value}`);
                                  }} className="w-4 h-4" />
        </button> */}


         {
                            env.edit?

                            <>
                         { addLoading == Number(index+1)? <LoaderCircle className="animate-spin " />:
                          
                          <Check onClick={async ()=>{
                              try{
                                setAddLoading(Number(index+1))

      let t = envsProject.find((ee,indexxx)=>ee.title==env.title && indexxx!=index)
                              if(t && env.title.trim()!=""){
                                toast.error("env already exist")
                                return
                              }
                              if(env.title.trim()=="" || env.value.trim()==""){
                                     toast.error("Please add a value")
                                return

                              }


 let data = await    addEnv({secretPhrase,project:project._id,body:{data:[env],branch,commit:commit.commit,commitId:commit.commitId},key:project.key})
//  console.log(data,"dataaaaabbbbbbbb")
if(data?.data){

  const newArr = [...envsProject];
  
  
                                  // newArr[index].new = false
                                  // newArr[index].value = event.target.value
                                  newArr[index] ={...data.data[0], ...newArr[index],edit:false}
                                  setEnvsProject(newArr)
}
                              }catch(e:any){
                              toast.error(e?.message||"An error occured")

                              }finally{
                                setAddLoading(false)
                              }
                            }} width={12} />}
                            </>
                            :
                    <div className="w-10">
                     <Copy
                        onClick={() => {
                          toast.success("copied to clipboard");
                          navigator.clipboard.writeText(`${env.title}=${env.value}`);
                        }}
                        className="hover:text-white"
                        width={12}
                      />
                        </div>
                        }

                  {                env.edit?<>
                  
                  <X onClick={()=>{
                      const newArr = [...envsProject];
                            // newArr[index].new = false
                            newArr[index].edit = false
                            setEnvsProject(newArr)
                  }}/>
                  </> :<>
                  
              {  deleteLoading == Number(index+1)? <LoaderCircle className="animate-spin " />: 

        <button  onClick={async () => {

                     
                        
                        try{
                          setDeleteLoading(Number(index+1))

                          if(env._id){
  
                            await deleteEnv({project:id,id:env._id,branch,commit:commit.commitId})
  
                          }
                          setEnvsProject(envsProject.filter((item,i)=>i!==index))
                        }catch(e){

                        }finally{
                                  setDeleteLoading(false)
                        }
                      }} className="text-gray-400 hover:text-red-400">
          <Trash2 className="w-4 h-4" />
        </button>
                  }
                  </>
                  
                  
                  }
      </div>
    {/* </div> */}
              {/* ))}
                  </div>
          </div>
        )} */}






                      
                    </div>
                  </div>
                ))
              )}
    </>
    }
            </div>
          </div>
        )}

        {activeTab === 'commits' && (
          <div className="space-y-3">
            {(commits.commits || []).map((commit_) => (
              <CommitCard
                key={commit_._id}
                commit={commit_}
                onClick={() => {
                  setActiveTab('envs');
                     updateQueryParam("commit",commit_?.commitId)
                     updateQueryParam("branch",commit_?.branch.name)
                  setCommit(commit_)

                }}
                isSelected={false}
                getreadabledate={getreadabledate}
              />
            ))}
          </div>
        )}
      </div>

      {/* Commit panel */}
      {showCommitPanel && (
        <CommitPanel changes={pendingChanges} onClose={() => setShowCommitPanel(false)} onCommit={() => {}} />
      )}

      {/* Merge panel */}
      {showMergePanel && (
        <MergePanel branches={branches} currentBranch={branch} onClose={() => setShowMergePanel(false)} />
      )}
    </div>
  );
}

function CommitCard({ commit, onClick, isSelected, getreadabledate }) {
  return (
    <div
      onClick={onClick}
      className={`bg-[#0A0A0A] rounded border p-3 sm:p-4 cursor-pointer transition-all ${
        isSelected ? 'border-white/30' : 'border-white/10 hover:border-white/20'
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-xs sm:text-sm font-medium">
          {commit.createdBy.firstname.charAt(0)}{commit.createdBy.lastname.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-2">
            <div className="min-w-0 flex-1">
              <h3 className="font-medium mb-1 text-sm sm:text-base break-words">{commit.commit}</h3>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400">
                <span className="truncate">{commit.createdBy.firstname}</span>
                <span>•</span>
                <span className="whitespace-nowrap">{getreadabledate(commit.createdAt)}</span>
                <span className="hidden sm:inline">•</span>
                <code className="text-xs bg-white/5 px-2 py-0.5 rounded truncate max-w-[120px]">
                  {commit?.commitId || commit?.commit}
                </code>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
            {commit?.changes?.added > 0 && <span className="text-green-400">+{commit.changes.added}</span>}
            {commit?.changes?.modified > 0 && <span className="text-yellow-400">~{commit.changes.modified}</span>}
            {commit?.changes?.deleted > 0 && <span className="text-red-400">-{commit.changes.deleted}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

function CommitPanel({ changes, onClose, onCommit }) {
  const [message, setMessage] = useState('');

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#161616] rounded border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        <div className="px-4 sm:px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-semibold">Commit changes</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Commit message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Update environment variables..."
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded outline-none focus:border-white/30 resize-none text-white text-sm"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium mb-3">Changes to be committed</h3>
            {changes.map((change, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 bg-white/5 rounded border border-white/10">
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-white/10 w-fit">
                  {change.action}
                </span>
                <code className="text-sm flex-1 break-all">{change.key}</code>
                <code className="text-sm text-gray-400 break-all">{change.value}</code>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 sm:px-6 py-4 border-t border-white/10 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 border border-white/10 hover:bg-white/5 rounded text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => onCommit(message)}
            disabled={!message.trim()}
            className="w-full sm:w-auto px-4 py-2 bg-white text-black hover:bg-gray-200 disabled:bg-white/10 disabled:text-gray-500 disabled:cursor-not-allowed rounded flex items-center justify-center gap-2 text-sm"
          >
            <GitCommit className="w-4 h-4" />
            Commit
          </button>
        </div>
      </div>
    </div>
  );
}

function MergePanel({ branches, currentBranch, onClose }) {
  const [targetBranch, setTargetBranch] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#161616] rounded border border-white/10 max-w-2xl w-full shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="px-4 sm:px-6 py-4 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#161616] z-10">
          <h2 className="text-base sm:text-lg font-semibold">Create merge request</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">From</label>
              <div className="px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded">
                <code className="text-sm break-all">{currentBranch}</code>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 self-center sm:mt-8 rotate-90 sm:rotate-0" />
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">To</label>
              <select
                value={targetBranch}
                onChange={(e) => setTargetBranch(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded outline-none focus:border-white/30 text-white text-sm"
              >
                <option value="">Select branch...</option>
                {branches
                  .filter((b) => b.name !== currentBranch)
                  .map((branch) => (
                    <option key={branch.name} value={branch.name}>
                      {branch.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Merge development into main"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded outline-none focus:border-white/30 text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the changes..."
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded outline-none focus:border-white/30 resize-none text-white text-sm"
              rows={4}
            />
          </div>
        </div>

        <div className="px-4 sm:px-6 py-4 border-t border-white/10 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sticky bottom-0 bg-[#161616]">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 border border-white/10 hover:bg-white/5 rounded text-sm"
          >
            Cancel
          </button>
          <button
            disabled={!targetBranch || !title}
            className="w-full sm:w-auto px-4 py-2 bg-white text-black hover:bg-gray-200 disabled:bg-white/10 disabled:text-gray-500 disabled:cursor-not-allowed rounded flex items-center justify-center gap-2 text-sm"
          >
            <GitMerge className="w-4 h-4" />
            Create request
          </button>
        </div>
      </div>
    </div>
  );
}