"use client";

import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Button from "../ui/Button";
import { Check } from "lucide-react";
import { useAuth, useFetch, useUsers } from "../../hooks";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { INVITECOLABURL } from "../../const";
import { method } from "lodash";
import { decrypt } from "@/utils";

import { permission } from "process";
import { handleDecrypt, handleEncryptKeyPairData } from "@/cryptic";

export default function AddTeamMemberFlow({
    step,onClose ,setStep ,project,secretPhrase
}:{step:number,onClose:any,setStep:any,project:any,secretPhrase:string}) {
    // const searchParams = useSearchParams();
    //  const id = searchParams.get("project");
//   const [step, setStep] = useState(1);
  const [search, setSearch] = useState("");
  const [members,setMembers] = useState([
    // { id: 1, name: "Alice Johnson", email: "alice@example.com" },
    // { id: 2, name: "Bob Smith", email: "bob@example.com" },
    // { id: 3, name: "Charlie Lee", email: "charlie@example.com" },
  ]);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [selectedPermission, setSelectedPermission] = useState("view");
  const {getUsers}=useUsers()

  const timeoutref = useRef<any>(null)
const searchFunc =async (value:string)=>{
  clearTimeout(timeoutref.current)
  setSearch(value)

  timeoutref.current= setTimeout(async () => {
    try{

      let data =   await getUsers({body:{title:search}})
      if(data.success){
        setMembers(data.data)
      }
    }catch(e){

    }
  }, 1000);
  // useUsers
}


const [loading,setLoading] = useState(false)
const {apifetch} = useFetch()
const {session} = useAuth()
const handleAdd = async()=>{
try{

  setLoading(true)

  let decryptedProjectKey    =await  handleDecrypt({encrypted:project.colab.key,passphrase:secretPhrase as string}) as string
  if(!selectedMember){
    toast.error("Please select a user")
    return 
  }
  // console.log(selectedMember)
let key = await handleEncryptKeyPairData({message:decryptedProjectKey,publicKey:selectedMember?.publicKey})

  let data = await  apifetch({url:INVITECOLABURL,options:{method:"POST",body:JSON.stringify({key:key.encrypted,colabId:selectedMember?._id,permission:selectedPermission,id:project._id})}})

if(data.success){
  setStep(3)

}else{
    toast.error(data?.message||"An error occured")
}

}catch(e:any){
  console.log(e)
  toast.error(e?.message||"An error occured")

}finally{
  setLoading(false)
}
}
  return (
    <div>
      {/* Step 1: Search + Select */}
      <Dialog open={ step === 1} onOpenChange={() => setStep(0)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Search member by email"
            value={search}
            onChange={(e) => searchFunc(e.target.value)}
          />

          <div className="mt-4 max-h-40 overflow-y-auto border rounded p-2">
            {members
              .filter((m:any) => m.email.includes(search))
              .map((m:any) => (
                <div
                  key={m._id}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded cursor-pointer"
                  onClick={() => {
                    setSelectedMember(m);
                    setStep(2);
                  }}
                >
                  <p className="font-medium">{m.firstname}</p>
                  <p className="text-sm text-gray-500">{m.email}</p>
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Step 2: Confirm + Permission */}
      <Dialog open={step === 2} onOpenChange={() => setStep(0)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Member</DialogTitle>
          </DialogHeader>

          {selectedMember && (
            <div className="space-y-4">
              <div className="p-3 border rounded-md bg-gray-50 dark:bg-white/5">
                <p className="">Project: <span className="text-primary">{project?.name||"Project"}</span></p>
                <p className="">Member: <span className="text-primary">{selectedMember.firstname}</span></p>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Permission</label>
                <Select value={selectedPermission} onValueChange={setSelectedPermission}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose permission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="edit">Edit</SelectItem>
                    <SelectItem value="view">View</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" className="dark:text-white" onClick={() => setStep(1)}>Back</Button>
            <Button loading={loading} onClick={() => handleAdd()}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Step 3: Success */}
      <Dialog open={ step === 3} onOpenChange={() => setStep(0)}>
        <DialogContent className="text-center">
          <DialogHeader>
            <DialogTitle className="text-green-600 text-center  flex justify-center "><Check className="rounded w-fit border-3 rounded-full border-[green]" width={50} height={50}/></DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 dark:text-white mt-2">
            {selectedMember?.firstname} has been successfully invited with <b>{selectedPermission}</b> permission.
          </p>
          <DialogFooter>
            <Button onClick={() => setStep(0)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
