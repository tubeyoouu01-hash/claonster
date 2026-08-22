"use client";
import { useRecoilState } from "recoil";
import Button from "../../../../components/ui/Button";
import { envsProjectstate, envsstate } from "@/states";
import { useAtom } from "jotai";

import { getreadabledate, handleEncryptKeyPairData } from "@/utils";
import Link from "next/link";
import { ChevronDown, Copy, Delete, Trash } from "lucide-react";
import toast from "react-hot-toast";
import DeleteModal from "../../../../components/modals/deleteenvmodal";
import { useCallback, useEffect, useState } from "react";
import ProjectModal from "../../../../components/modals/createenv";
import { useAuth, useProjects } from "../../../../hooks";
import { PUBLICKEY } from "../../../../const";

const Projects = () => {
  
    const onClose = useCallback(() => {
    setdeleteIsOpen(false);
  }, []);

  const {session} = useAuth()
  const onProjectClose = useCallback(() => {
    setcreateProjectIsOpen(false);
  }, []);
  const onDelete = useCallback(() => {}, []);
  const onCreate = useCallback(() => {}, []);
  // const o = useCallback(()=>{},[])
  const [deleteIsOpen, setdeleteIsOpen] = useState<any>(false);
  const [createProjectIsOpen, setcreateProjectIsOpen] = useState(false);
  const [envsProject, setEnvsProject] = useAtom(envsProjectstate);
  const {createProjects,fetchProjects,deleteProjects} =useProjects()
  // useEffect(()=)
  const [key,setKey]=useState<String|undefined>("")

  useEffect(()=>{
// PUBLICKEY

if(session?.token &&session?.secretPhrase ){
  // let key_ await  

  fetchProjects()
}else{
  setEnvsProject({hasMore:false,nextPage:1,data:[]})
}
  },[
    session?.token ,  session?.secretPhrase
  ])

  // let key = session?.secretPhrase+"_kk_"+session?.user?.email
  return (
    <>
      <div className="w-full">
        <DeleteModal
        project={{}}
          isOpen={deleteIsOpen}
          onClose={onClose}
          onDelete={onDelete}
        />
        <ProjectModal
          isOpen={createProjectIsOpen}
          onClose={onProjectClose}
          onCreate={onCreate}
        //   onDelete={onDelete}
        />
        <div className="bg-white p-primarypad max-sm:px-mprimarypad rounded-md  ">
          <div className="mb-10 flex flex-col gap-2">
            <h1 className="font-bold text-2xl">Get organized with Projects</h1>
            <p>
              An easier way to organize your resources and collaborate with team
              members.
            </p>
            <div className="flex justify-between items-center mb-10">
                {/* <div className="flex flex gap-2">
                    <h1>{"AuthPhrase **"}</h1>
                    <div className="flex items-center gap-2 ">
                  
                      <p className="truncate min-md:max-w-[400px] max-w-[200px]">{!key?"loading...":""}
                      </p><Copy className="hover:text-primary" onClick={()=>{
if(key){

  toast.success("copied to clipboard")
  navigator.clipboard.writeText(key)
}else{
  toast.success("Key not yet loaded")

}
                    }} width={12}/></div>
                </div> */}

                {/* <div onClick={()=>{setConnect(true)}} className="flex items-center gap-2 border p-2 rounded-md hover:cursor-pointer hover:bg-gray-100">
                    <h3>Connect</h3>
                    <ChevronDown width={12}/>
                </div> */}
            </div>
          </div>
          <Button onClick={()=>{  setcreateProjectIsOpen(true);}} title="Create env" className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:bg-black/80" />
        </div>

        <div className="overflow-scroll      ">
          <div className=" ">
            <div className="flex  px-3  gap-3 w-fit  items-center mt-10 mb-5">
              <h2 className="w-50">Name</h2>
              <h2 className="w-30">Key</h2>
              <h2 className="w-40">Date</h2>
            </div>
            {envsProject.data.map((e, index) => {
              return (
                <div className="" key={index}>
                  <div className="px-3 rounded-md flex gap-3    hover:bg-[green]/4 w-full items-center">
                    <div>
                      <h1 className="w-50 truncate ">{e.name}</h1>
                    </div>
                    <div className="flex items-center">
                      <h1 className="truncate w-30 ">{e.key}</h1>
                      <Copy
                        onClick={() => {
                          toast.success("copied to clipboard");
                          navigator.clipboard.writeText(e.key+"_kk_"+e._id);
                        }}
                        className="hover:text-primary"
                        width={12}
                      />
                    </div>
                    <div>
                      <h1 className=" truncate  w-40 ">
                        {getreadabledate(e.createdAt)}
                      </h1>
                    </div>
                    <div className="w-10">
                    <Trash
                      onClick={() => {
                        setdeleteIsOpen(e?._id);
                      }}
                      width={15}
                      className="cursor-pointer  text-[1px]"
                    />
                        </div>
                    {/* <div> */}
                    {/* <Button variant={outl} title="View" className="bg-primary hover:bg-black/80"/> */}
                    <Link
                      className=" p-2 rounded-md text-primary hover:text-black/80 ml-auto"
                      href={`/dashboard/projects/${e._id}`}
                    >
                      View
                    </Link>
                    {/* </div> */}
                  </div>{" "}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
