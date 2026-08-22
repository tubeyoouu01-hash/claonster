"use client"
import { teamsState } from "@/states";
import Button from "../../../../../../components/ui/Button"
import { useAtom } from "jotai";
import AddTeamMemberFlow from "../../../../../../components/modals/addTeamModal";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth, useFetch, useProjects } from "../../../../../../hooks";
import { GETTEAMMEMBERSURL, REMOVETEAMMEMBERSURL } from "../../../../../../const";
import RemoveMemberModal from "../../../../../../components/modals/removeTeamModal";
import { handleDecrypt } from "@/cryptic";

// Simple table components since we can't import the ui table
const Table = ({ children, className = "" }:any) => (
  <div className={`overflow-hidden border border-gray-200 dark:border-white/10 rounded-lg ${className}`}>
    <table className="w-full">{children}</table>
  </div>
);

const TableHeader = ({ children }:any) => <thead className="bg-gray-50 dark:bg-white/5">{children}</thead>;
const TableBody = ({ children }:any) => <tbody className="divide-y divide-gray-200">{children}</tbody>;
const TableRow = ({ children, className = "" }:any) => <tr className={className}>{children}</tr>;
const TableHead = ({ children, className = "" }:any) => (
  <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}>
    {children}
  </th>
);
const TableCell = ({ children, className = "" }:any) => (
  <td className={`px-6 py-4 whitespace-nowrap text-sm ${className}`}>
    {children}
  </td>
);

const Teams = () => {
  const [teams, setTeams] = useAtom(teamsState);
  const { getProjectById,getHistForRotation } = useProjects();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [project, setProject] = useState<any>({});
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
 const [secretPhrase ,setSecretPhrase] = useState("")
  const { session } = useAuth();
  let {apifetch} = useFetch()
//   let sd = async ()=>{
//     let deHashedKey =await  handleDecrypt({encrypted:{...project,encrypted:project.key,},passphrase:session?.secretPhrase as string}) as string
// // console.log(deHashedKey)
//   }

  // sd()
useEffect(()=>{


  let v = async ()=>{

      try{
      
        // setLoading(true)
      
    
    
        let data = await  apifetch({url:GETTEAMMEMBERSURL,options:{method:"POST",body:
            JSON.stringify
            ({id})}})
      
      if(data.success){
    // return data
    setTeams(data.data)
      
      }else{
        //   toast.error(data?.message||"An error occured")
          // return { success: false, error: 'Failed to fetch invite details' };
      }
      
      }catch(e:any){
        // toast.error(e?.message||"An error occured")
          // return { success: false, error: 'Failed to fetch invite details' };
      
      }finally{
        // setLoading(false)
      }
  }
  if(session?.token&&session?.secretPhrase){
    v()
    // onRemoveModalConfirm()
  }
},[session?.token,session?.secretPhrase])
  const onClose = () => {
    setStep(0);
  };
  const [removemodal,setremovemodal] = useState(false)
  const [removemodalLoading ,setRemoveModalLoading] = useState(false)
  const onRemoveModalClose = ()=>{
    setRemoveMember(null)
    setremovemodal(false)
  }
  // const onRemoveModalConfirm = ()=>{

      const onRemoveModalConfirm =async  () => {




      try{
        setRemoveModalLoading(true);
        // setLoading(true)
let deHashedKey =await  handleDecrypt({encrypted:project.colab.key,passphrase:secretPhrase as string}) as string
      
  let rotation =   await getHistForRotation({rotate:true,projectKey:deHashedKey,id,secretPhrase})
  // console.log(rotation)
  // let deHashedKey_ =await  handleDecrypt({encrypted:{...rotation.encryptedKey,encrypted:rotation.encryptedKey.ciphertext,},passphrase:session?.secretPhrase as string}) as string
      // console.log(deHashedKey_)
    // return
        let data = await  apifetch({url:REMOVETEAMMEMBERSURL,options:{method:"POST",body:
            JSON.stringify
            ({id,teamId:removeMember?.user?._id,rotation})}})
      
      if(data.success){
          setTeams(teams.filter((m:any) => m?._id !== removeMember?._id));
          onRemoveModalClose()
      }else{
              setError(data?.message || 'Failed to decline invite');
        //   toast.error(data?.message||"An error occured")
        //   return { success: false, error: 'Failed to fetch invite details' };
      }
      
      }catch(e:any){
        console.log(e)
        // toast.error(e?.message||"An error occured")
        //   return { success: false, error: 'Failed to fetch invite details' };
         setError(e?.message || 'Failed to decline invite');
      
      }finally{
          setRemoveModalLoading(false);
        // setLoading(false)
      }
  };

  const [removeMember,setRemoveMember] = useState<any>(null)
  const handleRemoveMember = ( member: any) => {
setRemoveMember(member)
setremovemodal(true)
  };

  const handleEditMember = (member: any) => {
    // You can implement edit functionality here
 
    // For now, just show an alert
    alert(`Edit functionality for ${member.name} - implement as needed`);
  };

  const getPermissionBadgeColor = (permission: string) => {
    switch (permission?.toLowerCase()) {
      case 'admin':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'editor':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'viewer':
        return 'bg-green-100 text-green-800 border border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      if (!session?.token || !session.secretPhrase || !id) return;
      
      setIsLoading(true);
      setError('');
      
      try {
        const res = await getProjectById(id);
        if (res.success) {

             let d =  res.data
          let s = d.secretPhrase
          let ds  =   await handleDecrypt({encrypted:s,passphrase:session?.secretPhrase})
      
          setSecretPhrase(ds)
          
          setProject(res.data);
        } else {
          setError('Failed to load project data');
        }
      } catch (e) {
        setError('An error occurred while loading the project');
   
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [session?.token, id, session?.secretPhrase]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        <span className="ml-2">Loading project...</span>
      </div>
    );
  }



  return (

    <div className="space-y-6">
      <RemoveMemberModal isRemoving={removemodalLoading} isOpen={removemodal} onClose={onRemoveModalClose} onConfirm={onRemoveModalConfirm} member={removeMember}/>
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Team Members</h1>
          {project.name && (
            <p className="text-gray-600 mt-1 dark:text-white">Managing collaborators for "{project.name}"</p>
          )}
        </div>
        <Button 
          title="Add Team Member" 
          onClick={() => setStep(1)}
          className="bg-gradient-to-r  from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Add Team Member Modal */}
      <AddTeamMemberFlow {...{ step, setStep, onClose, project ,secretPhrase}} />

      {/* Team Members Table */}
      <div className="bg-white dark:bg-white/5 rounded-lg shadow-sm">
        {teams.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-gray-400 dark:text-white mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.196-2.121M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.196-2.121M7 20v-2m5-8a3 3 0 11-6 0 3 3 0 016 0zM15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No team members yet</h3>
            <p className="text-gray-500 dark:text-white mb-4">Get started by adding your first team member</p>
            <Button 
              title="Add Team Member" 
              onClick={() => setStep(1)}
              className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
            />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Permission</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((member:any) => (
                <TableRow key={member._id} className="hover:bg-gray-50 dark:hover:bg-white/10">
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm mr-3">
                        {member?.user?.firstname?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      {member?.user?.firstname}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-white">{member?.user?.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPermissionBadgeColor(member.permission)}`}>
                      {member?.permission}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                         <span className={`px-2 py-1 rounded-full text-xs font-medium  dark:text-white`}>
                      {member?.accepted?"accepted":"Pending"}
                    </span>
                      {/* <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditMember(member)}
                        className="hover:bg-blue-50 hover:border-blue-300"
                      >
                        Edit
                      </Button> */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveMember(member)}
                        className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 dark:text-white"
                      >
                        Remove
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Team Stats */}
      {teams.length > 0 && (
        <div className="bg-gray-50 dark:bg-white/5  rounded-lg p-4">
          <div className="flex justify-between text-sm dark:text-white text-gray-600">
            <span>Total team members: <strong>{teams.length}</strong></span>
            <span>

              Editors: <strong>{teams.filter(t => t.permission?.toLowerCase() === 'edit').length}</strong> | 
              Viewers: <strong>{teams.filter(t => t.permission?.toLowerCase() === 'view').length}</strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;