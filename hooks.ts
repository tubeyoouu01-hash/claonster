import toast from "react-hot-toast";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { authState, branchAtom, branchesAtom, commitAtom, commitsAtom, envsProjectAtom, envsProjectstate, IUser, notsstate, plansState, projectAtom, projectInitial, publicKeyAtom, sessioninitials } from "@/states";
import { useCallback, useEffect, useRef, useState } from "react";
import { ADDENVURL, CREATEPROJECTURL, CURRENTSUSCRIBTIONURL, DELETEENVURL, DELETEPROJECTURL, DOMAINAPI, FETCHENVURL, FETCHPROJECTURL, GETPLANSURL, GETPROJECTBYIDURL, GETSIGNEDKEYURL, GETTRANASCTIONSURL, GETUSERSETIINGSURL, GETUSERSURL, HISTPROJECTKEYROTATIONURL, LOGOUT, SIGNUPURL, SUSCRIBEURL, UPDATEBIOURL, UPDATEENVURL, UPDATEUSERSETIINGSURL, UPGRADEVERSIONURL, VERIFYSECRETPHRASEURL } from "./const";
import { encrypt, generateKey,  } from "@/utils";
import _, { method } from "lodash";
import { plansVar } from "@/more";
import { handleDecryptEnv ,handleEncryptEnv,handleEncrypt,handleDecrypt,handleEncryptKeyPairData, handleDecryptKeyPairData, getDeviceId} from "@/cryptic";
import { useResetAtom } from "jotai/utils";
// import { useVerifySecret } from "@/app/verify-secret-code/page";
// handleDecryptEnv
export const useFetch = () => {
  const {session} = useAuth()
  const [publicKey,setPublicKey] = useAtom(publicKeyAtom)
 const router = useRouter();
  let apifetch_ = async ({
    url,
    options,
    auth = false,
    authToast,
    reqdata,
  }: {
    url: string;
    options?: any;
    auth?: boolean;
    authToast?: string | undefined | null;
    reqdata?: boolean;
  }) => {
    // let token = localStorage.getItem("findtech_user_token") || "";

    let response: any = await fetch(url, {
      credentials: "include",
      ...options,
      headers: {
        "Content-Type": "application/json",

        authorization: `Bearer ${((session?.token||"") + "123456789"  + (session?.authSignedToken||"")) ||""}`,

        ...(options?.headers || {}),
      },
    });
    let data: any = {};
    try {
      data = await response.json();
    } catch (e) {}
    if (reqdata) {
      response.responseData = data;
      return response;
    }
    if (data?.auth && auth) {
      toast(authToast || "Please login to continue", {
        icon: "⚠️",
      });
    }
    if (data?.auth && auth) {
      router.push("/login");
    }
    return data;
  };



type ApiFetchProps = {
  url: string;
  options?: any;
  auth?: boolean;
  authToast?: string | undefined | null;
  reqdata?: boolean;
};


  // const [publicKey, setPublicKey] = useAtom(publicKeyAtom);

 
  //   useEffect(() => {

    
    
  // }, []);
let apifetch = async ({
  url,
  options,
  auth = false,
  authToast,
  reqdata,
}: ApiFetchProps) => {
try{

  let v =  await  fetch(DOMAINAPI+"/public-key")
  let cc = await v.json();
  if(cc.publicKey){
    setPublicKey(cc.publicKey)
  }
}catch(e){
console.log(e)
}
        // .then(res => res.json())
        // .then(data => {setPublicKey(data.publicKey)})
        // .catch(console.error);
  // --- Encrypt body if exists ---
    // console.log("hhh")
  if (options?.body) {


    let key = generateKey()
    let encryptedBody = await  handleEncrypt(   {data:   typeof options.body === "string" ? options.body : JSON.stringify(options.body),
    passphrase:key as string
    
  })
  //   const encryptedBody = await handleEncryptKeyPairData(
  //  {message:   typeof options.body === "string" ? options.body : JSON.stringify(options.body),
  //   publicKey:publicKey as string
    
  // }
    const encryptedKey = await handleEncryptKeyPairData(
   {message:   key,
    publicKey:publicKey as string
    
  }
  
  
);
// console.log("hhdddh")

    options.body = JSON.stringify({ erv:{encryptedBody: encryptedBody, encryptedKey:encryptedKey.encrypted}});
  }

  // --- Encrypt query params if exist ---
  try {
    const parsedUrl = new URL(url, typeof window !== "undefined" ? window.location.origin : undefined);

    if (parsedUrl.search) {
      const queryObj: Record<string, string> = {};
      parsedUrl.searchParams.forEach((value, key) => {
        queryObj[key] = value;
      });

      if (Object.keys(queryObj).length > 0) {
        const encryptedQuery =await  handleEncryptKeyPairData(
         {message: JSON.stringify(queryObj),
         publicKey}
        );

      

        // Replace query string with single encrypted param
        parsedUrl.search = `?erv=${encodeURIComponent(encryptedQuery.encrypted)}`;
      }
    }

    url = parsedUrl.toString();
  } catch (err) {
    console.warn("Failed to parse/encrypt query params:", err);
  }
// console.log("33")
  // --- Fetch request ---
  let response: any = await fetch(url, {
    credentials: "include",
    ...options,
    headers: {
      "x-device-id":getDeviceId(),
      "Content-Type": "application/json",
      // authorization: `Bearer ${session?.token || ""}`,
       authorization: `Bearer ${((session?.token||"") + "123456789"  + (session?.authSignedToken||"")) ||""}`,
      ...(options?.headers || {}),
    },
  });

  // --- Parse response ---
  let data: any = {};
  try {
    data = await response.json();
  } catch (e) {}

  if (reqdata) {
    response.responseData = data;
    return response;
  }

  if (data?.auth && auth) {
    toast(authToast || "Please login to continue", { icon: "⚠️" });
    router.push("/login");
  }

  return data;
};


  return { apifetch };
};
export interface ISettings {
     autoSync: boolean,
    notifications: boolean,
    twofactor: boolean,
    darkMode: boolean,
    emailUpdates: boolean
}
export const  useMediawQuery = (useMediaQuery:any)=>( {
     isMobileMicroDevice: useMediaQuery({
        query: "(max-device-width: 250px)",
      }),
     isMobileMicroPlusDevice: useMediaQuery({
        query: "(max-device-width: 290px)",
      }),
     isMobileMiniDevice: useMediaQuery({
        query: "(max-device-width: 350px)",
      }),
     isMobileMiniPlusDevice: useMediaQuery({
        query: "(max-device-width: 390px)",
      }),
     isMobileDevice: useMediaQuery({
        query: "(max-device-width: 480px)",
      }),
    
     isMobileDevicePlus: useMediaQuery({
        query: "(max-device-width: 550px)",
      }),
    
       isTabletDevice: useMediaQuery({
        query: "(max-device-width: 768px)",
      }),
       isTabletPlusDevice: useMediaQuery({
        query: "(max-device-width: 900px)",
      }),
  
       isLaptop : useMediaQuery({
        query: "(max-device-width: 1024px)",
    }),
    
     isDesktop :useMediaQuery({
        query: "(max-device-width: 1200px)",
      })
    
      , isBigScreen: useMediaQuery({
        query: "(max-device-width: 1201px )",
      })
})

export const useAuthHelpers=  ()=>{
  const {apifetch} = useFetch()
  const {logout:lg} = useAuth()
  const [logOutLoading,setLogOutLoading] = useState(false)

  let logout = async ()=>{

    try {
  setLogOutLoading(true)
      await  apifetch({url:LOGOUT});
      await lg()
  
    }catch(e){
        toast.error(e?.message||"could not log out")
    }finally{
      setLogOutLoading(false)
    }
  }


  return {logout,logOutLoading}


}

export const useAuth=()=>{
let  router =   useRouter()
const timerRef = useRef<NodeJS.Timeout | null>(null);
// const {apifetch} =useFetch()
  const [session, setSession] = useAtom(authState);
  const [projects, setProjects] = useAtom(envsProjectstate);
  const [nots, setNots] = useAtom(notsstate);
    const [branch_ ,setBranch_] = useAtom(branchAtom)
    // const [commit ,setCommit] = useState<any>(null)
    const [commit_ ,setCommit_] = useAtom(commitAtom)
    // const [envsProject, setEnvsProject] = useState<any[]>([]);
    const [envsProject_, setEnvsProject_] = useAtom(envsProjectAtom);
    // const [branches, setBranches] = useState<any[]>([]);
    const [branches_, setBranches_] = useAtom(branchesAtom);
    const [project_,setProject_] = useAtom(projectAtom)
    const [commits_,setCommits_] = useAtom(commitsAtom)
  // const resetSession = useResetAtom(authState);
  // const resetProjects = useResetAtom(envsProjectstate);

const login =({user,token,password}:{user:IUser,token:string,password?:string|null})=>{

  setSession({user,token,password})

}
const updateUser =({user}:{user:IUser})=>{

  setSession((prev :any)=>{

    return {...prev,user:{...((prev||{})?.user||{}),...user}}


  })

}
const updateSettings =({settings}:{settings:Record<string,any>})=>{

  setSession((prev :any)=>{

    return {...prev,settings:{...((prev||{})?.settings||{}),...settings}}


  })

}

const updateKey = (secret:string)=>{
  
  setSession((prev :any)=>{

    return {...prev,secretPhrase:secret}


  })

  // if(secret){
  // setTimeout(()=>{
  // setSession((prev :any)=>{

  //   return {...prev,authSignedToken:null}


  // })
  // },1000*60 *5)
  // }
}

const updateAuthSignedToken = (token:string)=>{

  setSession((prev :any)=>{
    
    return {...prev,authSignedToken:token,authSignedEx:false}
    
    
  })
  
  if(token){
    clearTimeout(timerRef.current)
  timerRef.current =setTimeout(()=>{
  setSession((prev :any)=>{

    return {...prev,authSignedEx:true}


  })
  },1000 * 60 * 5)
  }
}
const logout =async ()=>{
try{

  // await apifetch({url:LOGOUT})
  setSession(sessioninitials)
  setProjects(projectInitial)
  setProject_({})
  setCommits_({})
  setProject_({})
  setBranches_({})
  setBranch_({})
  setEnvsProject_({})
  setCommit_({})
  
  setNots({})
  

  router.push("/")
}catch(e){
  toast.error(e?.message||"could not log out")
}


}


return {updateAuthSignedToken,setSession,updateSettings,updateKey,logout,updateUser,login,session,isAuthenticated:session?.user && session?.token}

}


export const useProjects = ()=>{

const {apifetch} = useFetch()
const [createProductLoading,setCreateProductLoading] = useState(false)
const [deleteProductLoading,setDeleteProductLoading] = useState(false)
const [getProductLoading,setGetProductLoading] = useState(false)
  const [envsProject, setEnvsProject] = useAtom(envsProjectstate);
  const {session} = useAuth()
 const  createProjects = async (body:Record<string,any>,projectSecretPhrase:string)=>{
try{
  if(!session?.secretPhrase){
    toast("You dont have authorization to perform this request")
  }
  let key = generateKey()

  let hashedKey =await  handleEncrypt({data:key,passphrase:projectSecretPhrase as string,stringify:true})

  
setCreateProductLoading(true)
  let data = await  apifetch({url:CREATEPROJECTURL,options:{method:"POST",body:JSON.stringify({...body,hashedKey})}})
  if(data.success){
    toast.success(data?.message||"project created")
    setEnvsProject((prev)=>{

      return {...prev,data:[...prev.data,{...data.data,...data.data.project,realData:data.data}]}
    })
  }else{
    toast.error(data?.message||"An error occured")

  }
}catch(e:any){
  throw(e)

      toast.error(e?.message||"An error occured")

}finally{
  setCreateProductLoading(false)
}

  }
 const  addEnv = async ({secretPhrase,project,body,key,update=false}:{project:String,body:{data:Record<string,any>[],branch:string,commit:string,commitId:string},key:Record<string,any>,update?:boolean,secretPhrase:string})=>{
try{
  if(!session?.secretPhrase){
    toast("You dont have authorization to perform this request")
  }
  // let key = generateKey()

  let deHashedKey =await  handleDecrypt({encrypted:key,passphrase:secretPhrase as string}) as string
  if(!deHashedKey){
     toast.error("An error occured")
     return
  }
 const hashedData = await Promise.all(
      body.data.map(async (item) => {
        // const key = Object.keys(item)[0];
        // const value = item[key];

        const encryptedKey = await handleEncryptEnv({
          data: item,
          passphrase: deHashedKey,
        });

        // const encryptedValue = await handleEncrypt({
        //   data: value,
        //   passphrase: deHashedKey,
        // });

        return { ...encryptedKey,item };
      })
    );
  
  
// console.log(hashedData,"hashedData")
//   return
setCreateProductLoading(true)
  let data = await  apifetch({url:(update?UPDATEENVURL:ADDENVURL)+`?id=${project}`,options:{method:"PUT",body:
    JSON.stringify ( {
      data:hashedData.map(e=>({..._.omit(e,["item"]), ...(e?.item?._id?{_id:e?.item?._id||""}:{})      }))
    ,branch:body.branch,commit:body.commit,commitId: body.commitId})
  
  }})
  if(data.success){
    toast.success(data?.message||"env added")
    let v =  data?.data||[]

   return {data: hashedData.map((e:any)=>{

      let c = v.find((ee:any)=>ee.title==e.title)
      if(c){
        return {...c,...e.item}
      }
      return e
    })
}

    // setEnvsProject((prev)=>{

    //   return {...prev,data:[...prev.data,{...data.data,...data.data.project,realData:data.data}]}
    // })
  }else{
    toast.error(data?.message||"An error occured")

  }
}catch(e:any){
  throw(e)
  toast.error(e?.message||"An error occured")


}finally{
  setCreateProductLoading(false)
}

  }
 const  deleteEnv = async ({project,id,branch,commit}:{project:string,id:string,commit:string,branch:string})=>{
try{
  if(!session?.secretPhrase){
    toast("You dont have authorization to perform this request")
  }


  

  let data = await  apifetch({url:(DELETEENVURL)+`?id=${id}&project=${project}&branch=${branch}&commit=${commit}`,options:{method:"DELETE"}})
  if(data.success){
    toast.success(data?.message||"env deleted")
return data

    // setEnvsProject((prev)=>{

    //   return {...prev,data:[...prev.data,{...data.data,...data.data.project,realData:data.data}]}
    // })
  }else{
    toast.error(data?.message||"An error occured")

  }
}catch(e:any){
  toast.error(e?.message||"An error occured")
  throw(e)


}finally{

}

  }
 const  getEnvs = async ({commit,project,key,branch="main",secretPhrase}:{commit?:string,project:String,key:Record<string,any>,branch?:string,secretPhrase:string})=>{
try{
  if(!session?.secretPhrase){
    toast("You dont have authorization to perform this request")
  }

    let deHashedKey =await  handleDecrypt({encrypted:key,passphrase:secretPhrase as string}) as string
  if(!deHashedKey){
     toast.error("An error occured")
     return
  }
  // console.log(deHashedKey,"projkey",secretPhrase)
  
// setCreateProductLoading(true)
  let data = await  apifetch({url:FETCHENVURL+`?id=${project}&branch=${branch}&commitId=${commit}`})
  if(data.success){
    // toast.success(data?.message||"env added")
       const decripted =  await Promise.all(
        data.data.map(async (item:any)=>{
          let c =    await handleDecryptEnv({
            encrypted: item,
            passphrase: deHashedKey,
          })

          return {...item,...c}
        })
      )

    
      return {decripted,branches:data?.branches,}  ;
    // setEnvsProject((prev)=>{

    //   return {...prev,data:[...prev.data,{...data.data,...data.data.project,realData:data.data}]}
    // })
  }else{
  

  }
}catch(e:any){
  console.log(e)
  throw(e)

    

}finally{
  // setCreateProductLoading(false)
}

  }
 const  deleteProjects = async (id:string)=>{
try{
  if(!session?.secretPhrase){
    toast("You dont have authorization to perform this request")
  }
 
  
setCreateProductLoading(true)
  let data = await  apifetch({url:DELETEPROJECTURL+`?id=${id}`,options:{method:"DELETE",
    // body:JSON.stringify({...body,hashedKey})
  }})
  if(data.success){
    toast.success(data?.message||"project deleted")
    setEnvsProject((prev)=>{

      return {...prev,data:prev.data.filter((e:any)=>{return e._id!=id})}
    })
  }else{
    toast.error(data?.message||"An error occured")

  }
}catch(e:any){
  throw(e)

      // toast.error(e?.message||"An error occured")

}finally{
  setCreateProductLoading(false)
}

  }
 const  getProjectById = async (id:string)=>{
try{
  if(!session?.secretPhrase){
    toast("You dont have authorization to perform this request")
  }
 
  
setCreateProductLoading(true)
  let data = await  apifetch({url:GETPROJECTBYIDURL+`?id=${id}`})
  if(data.success){
try{

  let data_ =  await upgradeVersion({colab:data.data})
  if(data_.success){
    data=data_
 
  }
}catch(e){
  console.log(e)

}
   
    // toast.success(data?.message||"project deleted")
    // setEnvsProject((prev)=>{

    //   return {...prev,data:prev.data.filter((e:any)=>{return e._id!=id})}
    // })
  }else{
    toast.error(data?.message||"An error occured")

  }
   return data
}catch(e:any){
  throw(e)

      // toast.error(e?.message||"An error occured")

}finally{
  setCreateProductLoading(false)
}

  }
 const  fetchProjects = async ()=>{
try{
setGetProductLoading(true)
  let data = await  apifetch({url:FETCHPROJECTURL})
 
  if(data.success){
      setEnvsProject((prev)=>{

      return {...prev,...data.data,data:_.uniqBy([...prev.data,...data.data.data],"_id")}
    })
    // toast.success(data?.message||"project created")
    
  }else{
    // toast.error(data?.message||"An error occured")

  }
}catch(e:any){

      // toast.error(e?.message||"An error occured")

}finally{
  setGetProductLoading(false)
}

  }


//    async function getHistForRotation({rotate=false,projectKey,id}){
// let data =  await  apifetch({
//     url:HISTPROJECTKEYROTATIONURL +`?id=${id}`

//   })
//  console.log(data,"daraaa")
//   if(data.success){

//     let histdata = data.data
//     let secretPhrase = session.secretPhrase
//     // let projectKey = session.
    
    
//     if(rotate){
//       let newProjectKey  = generateKey()
//       let rotatedata = {envs:[],collabs:[],encryptedKey:{}}
  
//       for (let val of histdata.envs){

//         let decryptedEnv = await  handleDecryptEnv({encrypted:val,passphrase:projectKey})
//         let encryptedEnv =await  handleEncryptEnv({data:decryptedEnv,passphrase:newProjectKey})


//         let obj = {...val,...encryptedEnv}

//         rotatedata.envs.push(obj)
//       }
//       for (let collab of histdata.collabs){

//         let key = await handleEncryptKeyPairData({message:newProjectKey  ,publicKey:collab.user.publicKey,})
// if(key?.encrypted){

//   let obj = {...collab,key:key?.encrypted}
//    rotatedata.collabs.push(obj)
// }

//         // let decryptedEnv = await  handleDecryptEnv({encrypted:val,passphrase:projectKey})
//         // let encryptedEnv =await  handleEncryptEnv({data:decryptedEnv,passphrase:newProjectKey})


//         // let obj = {...val,...encryptedEnv}

//         // rotatedata.envs.push(obj)


//       }
// let encryptedKey = await handleEncrypt({data:newProjectKey,passphrase:secretPhrase})
//   rotatedata.encryptedKey =encryptedKey
//   return rotatedata
  
//     }
  
//     return  histdata
//   }

//   return {}
// }
// 


 const upgradeVersion = async ({colab ,secretPhrase}:{colab:any,secretPhrase?:string})=>{
// toast("upgrading version")
// let savedProject =   sessionStore.getState().project
 secretPhrase =  secretPhrase ||await (async ()=>{
    let s = colab.secretPhrase
          let ds  =   await handleDecrypt({encrypted:s,passphrase:session?.secretPhrase})
          // setSecretPhrase(ds)

          return ds
              // console.log(ds,"dssssssssss")
 })()
//   if(force){

//   colab =    await getProjectById((colab||savedProject).project._id)
//   }

// console.log(colab,"colabssss",colab.colab.keyVersion != colab.project.keyVersion,colab.keyVersion,colab.project.keyVersion)
  if(colab.colab.keyVersion != colab.project.keyVersion){

// let key = colab.key
  //  let secretKey = await handleEncrypt({data:data_.privateKey,passphrase:fullCode})
let privateKey = await handleDecrypt({encrypted:colab.colab.privateKey,passphrase:secretPhrase})
// console.log(privateKey,"privateKey")
// let cc = await handleEncryptKeyPairData({message:"xcxc",publicKey:colab.user.publicKey})
// console.log(cc,"cc")
// let dd = await handleDecryptKeyPairData({encrypted:cc.encrypted,secretKey:privateKey})
// console.log(dd,"dd")
let decryptedKey = await handleDecryptKeyPairData({encrypted:colab.colab.key,secretKey:privateKey})
// console.log(decryptedKey,"decryptedKey")

let version = colab.project.keyVersion
let encryptedKey = await handleEncrypt({
  data:decryptedKey.decrypted,
  passphrase:secretPhrase,
  stringify:true
})
// console.log(encryptedKey,"encryptedKey")








    let v = apifetch({
      url:UPGRADEVERSIONURL,
      options:{
        
        body:{version,
          // ...encryptedKey,
          hashedkey:encryptedKey,
          id:colab.project._id},
        method:"POST"
      }
    

    })



    toast.promise(
      v,
      {
        loading: 'upgrading key version',
        success: 'key upgraded successfully! 🎉',
        error: 'Failed to upgrade key ❌',
      }
    );

    await v
//  let project =    await getProjectById(colab.project._id)
//  if(project.success){
// toast.success("Error in upgrading version")
//   // sessionStore.getState().setProject(project.data);

//   // await getEnvs({project:colab.project._id,write:true})
//  }else{
//   toast.error("Error in upgrading version")
//  }

   return v


  }

}


async function getHistForRotation({ rotate = false, projectKey, id ,secretPhrase}) {
  let data = await apifetch({
    url: HISTPROJECTKEYROTATIONURL + `?id=${id}`,
  });

  // console.log(data, "daraaa");

  if (!data.success) return {};

  let histdata = data.data;
  // let secretPhrase = session.secretPhrase;
  // console.log(secretPhrase)

  if (!rotate) return histdata;

  let newProjectKey = generateKey();
  // console.log(newProjectKey)
  let rotatedata = { envs: [], collabs: [], encryptedKey: {} };

  // ⚡ Run env decrypt/encrypt operations in parallel
  rotatedata.envs = await Promise.all(
    histdata.envs.map(async (val) => {
      const decryptedEnv = await handleDecryptEnv({
        encrypted: val,
        passphrase: projectKey,
      });

      const encryptedEnv = await handleEncryptEnv({
        data: decryptedEnv,
        passphrase: newProjectKey,
      });

      return { _id:val._id, ...encryptedEnv };
    })
  );

  // ⚡ Run collab key encryption in parallel
  rotatedata.collabs = await Promise.all(
    histdata.collabs.map(async (collab) => {
      // console.log(collab.user.publicKey)
      const key = await handleEncryptKeyPairData({
        message: newProjectKey,
        publicKey: collab.publicKey,
      });

      if (key?.encrypted) {
        return { ...collab, key: key.encrypted };
      }

      return null;
    })
  ).then((res) => res.filter(Boolean)); // filter out nulls

  // ⚡ Encrypt the new project key
  rotatedata.encryptedKey = await handleEncrypt({
    data: newProjectKey,
    passphrase: secretPhrase,
    stringify:true
  });

  return rotatedata;
}

return {
  fetchProjects,getHistForRotation,createProjects,deleteProjects,getProjectById,addEnv,getEnvs,deleteEnv,upgradeVersion
}
  

}


export const useSettings = ()=>{
const{session,updateUser,updateSettings}=useAuth()
let {apifetch} = useFetch()
  const updateBio = async ({body}:{body:Record<string,string>})=>{
    try{
let v =await apifetch({url:UPDATEBIOURL,options:{method:"POST",body:JSON.stringify(body)}})
if(v.success){

  toast.success(v?.message||"Bio updated successfully")
  updateUser({user:v?.data||{}})
  return v
}else{
  toast.error(v?.message||"An error occured")
}



    }catch(e:any){
       toast.error(e?.message||"An error occured")

    }
  }
  const updateUserSetting = async ({body}:{body:Record<string,any>})=>{
    try{
      updateSettings({settings:{[body.key as keyof ISettings]:body.value}})
let v =await apifetch({url:UPDATEUSERSETIINGSURL,options:{method:"POST",body:JSON.stringify({[body.key as keyof ISettings]:body.value})}})
if(v.success){

  toast.success(v?.message||"Settings updated successfully")
  return v
}else{
        updateSettings({settings:{[body.key as keyof ISettings]:body.prevalue}})
  toast.error(v?.message||"An error occured")
}


}catch(e:any){
      updateSettings({settings:{[body.key as keyof ISettings]:body.prevalue}})
       toast.error(e?.message||"An error occured")

    }
  }
  const getUserSettings = async ()=>{
    try{
      let v =await apifetch({url:GETUSERSETIINGSURL})
      if(v.success){

     
  updateSettings({settings:v.data||{}})

  // toast.success(v?.message||"Settings updated successfully")
  return v
}else{
        // updateSettings({settings:{[body.key as keyof ISettings]:body.prevalue}})
  toast.error(v?.message||"An error occured")
}


}catch(e:any){
      // updateSettings({settings:{[body.key as keyof ISettings]:body.prevalue}})
       toast.error(e?.message||"An error occured")

    }
  }

  return {updateBio,updateUserSetting,getUserSettings}
}


export const useUsers = ()=>{



  let {apifetch} = useFetch()
  const getUsers = async ({body}:{body:Record<string,any>})=>{
        try{
      let v =await apifetch({url:GETUSERSURL,options:{method:"POST",body:JSON.stringify(body)}})
      if(v.success){

  // toast.success(v?.message||"Settings updated successfully")
  return v
}else{
        // updateSettings({settings:{[body.key as keyof ISettings]:body.prevalue}})
  toast.error(v?.message||"An error occured")
}


}catch(e:any){
      // updateSettings({settings:{[body.key as keyof ISettings]:body.prevalue}})
       toast.error(e?.message||"An error occured")

    }
  }


  return {getUsers}


}




export const usePayment =()=>{
const {apifetch}= useFetch()
const [plans,setplans]= useAtom(plansState)
 const fetchPlans = async ()=>{
  let response = await apifetch({url:GETPLANSURL})

  if(response.success){
    setplans(()=>{
return response.data

    })

  }
 }

 const plansmemo = useCallback((annually=false)=>{
  let v = plansVar.map(e=>{
let d = plans.find((ee:any)=>ee.title.toLowerCase() == e.name.toLowerCase() && ee.interval==(annually?"annually":"monthly"))
if(d){
  // let obj = {
  //   annually?
  // }
return {...e,...d}
}



return {...e,title:e.name}
  })

  return v
 },[plans])

 const getcheckoutUrl = async ({plan_code}:{plan_code:string})=>{
   let response = await apifetch({url:SUSCRIBEURL,options:{body:JSON.stringify({plan_code}),method:"POST"}})
 
if(response.success){
    //  const data = await res.json();
    window.location.href = response.data.authorization_url;
}
   return response

 }

 const getcurrentsubscription= async ()=>{

  // let plans = plansmemo()

  try{

    let response = await apifetch({url:CURRENTSUSCRIBTIONURL})
  
    if(response.success && response.data){
      let data = response.data

      if(data.interval=="annually"){

        let v = plansmemo(true).find(e=>e.title.toLowerCase()==data.title.toLowerCase())
        return {...v,...data}

      }

      let v = plansmemo(false).find(e=>e.title.toLowerCase()==data.title.toLowerCase())
        return {...v,...data}

    }else{
      return plansVar[0]
    }
  }catch(e){
       return plansVar[0]
}
 }

 const gettransactions = async ()=>{
  try{

    let response = await apifetch({url:GETTRANASCTIONSURL})

    return response
  }catch(e){

  }
 }


 return {fetchPlans,getcheckoutUrl,plansmemo,getcurrentsubscription,gettransactions}
}

// doubleTap.js
const tapTracker = new WeakMap();

export function handleDoubleTap(target, callback, delay = 300) {
  const now = Date.now();
  const lastTap = tapTracker.get(target);

  if (lastTap && now - lastTap < delay) {
    callback();
  }

  tapTracker.set(target, now);
}



export function useDarkMode() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const key = "theme";

  useEffect(() => {
    const stored = localStorage.getItem(key) as "light" | "dark" | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    } else {
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }

    // listen for OS changes
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(key)) { // only apply if user hasn't chosen
        document.documentElement.classList.toggle("dark", e.matches);
        setTheme(e.matches ? "dark" : "light");
      }
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const toggle = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem(key, next);
  }, [theme]);

  return { theme, toggle };
}





// export function useInactivityTimer({
//   duration = 1000 *60 *3, // s
//   onExpireWhileActive,
//   onExpireWhileAway,
//   secretPhrase,
//   deflt,
// }: {
//   duration?: number;
//   onExpireWhileActive?: () => void;
//   onExpireWhileAway?: () => void;
//   secretPhrase?: string | null;
//   deflt?:boolean;
// }) {
//   const {handleLogin} =useVerifySecret()
//   const{session,setSession} = useAuth()
//   const [isAway, setIsAway] = useState(false);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const awayRef = useRef(false); // mirror state to access inside timer
//   const [rest,setRest]= useState(null)
//   if(deflt){



//     secretPhrase = session?.secretPhrase
//     onExpireWhileAway = ()=>{
//         setSession((prev :any)=>{

//     return {...prev,secretPhrase:null}


//   })
//     }
// onExpireWhileActive = async ()=>{

//   if(secretPhrase){

//    await  handleLogin({secretCode:secretPhrase,redirect:false})
//     // setRest(Math.random)
//   }
// }
//   }


// // if(secret){
// //   setTimeout(()=>{
// //   setSession((prev :any)=>{

// //     return {...prev,secretPhrase:null}


// //   })
// //   },1000*60 *8)
// //   }
//   // --------------------------
//   // TIMER CONTROL
//   // --------------------------
//   const startTimer = () => {
//     clearTimer();
//     timerRef.current = setTimeout(async () => {
//       if (awayRef.current) {
//        await  onExpireWhileAway?.();
//       } else {
//         await onExpireWhileActive?.();
       
//       }
//       // startTimer(); // auto-restart timer
//     }, duration);
//   };

//   const clearTimer = () => {
//     if (timerRef.current) {
//       clearTimeout(timerRef.current);
//     }
//   };

//   // --------------------------
//   // WHEN SECRET-PHRASE CHANGES
//   // --------------------------
//   useEffect(() => {
//     clearTimer();
//     // if (!secretPhrase) {
//     //   return;
//     // }
//     console.log("timerrrrr",secretPhrase)
//     if(secretPhrase){
//       console.log("timerrrrrddd")

//       startTimer();
//     }
//   }, [session?.authSignedToken,rest]);

//   // --------------------------
//   // VISIBILITY + FOCUS LISTENERS
//   // --------------------------
//   useEffect(() => {
//     const handleFocus = () => {
//       setIsAway(false);
//       awayRef.current = false;
//       startTimer();
//     };

//     const handleBlur = () => {
//       setIsAway(true);
//       awayRef.current = true;
//       clearTimer();
//     };

//     const handleVisibility = () => {
//       if (document.hidden) {
//         setIsAway(true);
//         awayRef.current = true;
//         clearTimer();
//       } else {
//         setIsAway(false);
//         awayRef.current = false;
//         startTimer();
//       }
//     };

//     window.addEventListener("focus", handleFocus);
//     window.addEventListener("blur", handleBlur);
//     document.addEventListener("visibilitychange", handleVisibility);

//     return () => {
//       clearTimer();
//       window.removeEventListener("focus", handleFocus);
//       window.removeEventListener("blur", handleBlur);
//       document.removeEventListener("visibilitychange", handleVisibility);
//     };
//   }, []);

//   return { isAway };
// }


// export function useInactivityTimer({
//   duration = 1000 * 3,
//   onExpireWhileActive,
//   onExpireWhileAway,
//   secretPhrase,
//   deflt,
// }: {
//   duration?: number;
//   onExpireWhileActive?: () => Promise<void>;
//   onExpireWhileAway?: () => Promise<void>;
//   secretPhrase?: string | null;
//   deflt?: boolean;
// }) {
//   const { handleLogin } = useVerifySecret();
//   const { session, setSession } = useAuth();

//   const [isAway, setIsAway] = useState(false);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const awayRef = useRef(false);

//   // Falling back to default behaviour mode
//   const isDefaultMode = deflt === true;

//   // computed secretPhrase (controlled)
//   const activeSecretPhrase = isDefaultMode
//     ? session?.secretPhrase
//     : secretPhrase;

//   // computed expire handlers
//   const expireAway = isDefaultMode
//     ? async () => {
//         setSession((prev: any) => ({
//           ...prev,
//           secretPhrase: null,
//         }));
//       }
//     : onExpireWhileAway;

//   const expireActive = isDefaultMode
//     ? async () => {
//         if (activeSecretPhrase) {
//           await handleLogin({
//             secretCode: activeSecretPhrase,
//             redirect: false,
//             toastmsg:false
//           });
//         }
//       }
//     : onExpireWhileActive;

//   // --------------------------
//   // TIMER CONTROL
//   // --------------------------
//   const clearTimer = () => {
//     if (timerRef.current) clearTimeout(timerRef.current);
//   };

//   const startTimer = () => {
//     clearTimer();

//     timerRef.current = setTimeout(async () => {
//       // NEW RULE: If authTokenEx is null → expire immediately
    

//       if (awayRef.current ) {
//         await expireAway?.();
//       } else {
//         await expireActive?.();
//       }
//     }, duration);
//   };
// let timerRef2 = useRef<NodeJS.Timeout | null>(null);

//   useEffect(()=>{
  
//     const tokenExpired = session?.authSignedEx;
//     console.log("excheck",tokenExpired,session)
//       clearTimeout(timerRef2.current)
//       if(session?.secretPhrase){
// if(tokenExpired){

//   timerRef2.current=  setTimeout(async ( ) => {
//   //token xpire inside timer
//         await expireAway?.();
      
//     }, duration+10);
// }

//       }


//   },[
// session?.authSignedEx,session?.secretPhrase

//   ])
//   // --------------------------
//   // START / STOP TIMER WHEN secretPhrase or login session changes
//   // --------------------------
//   useEffect(() => {
//     clearTimer();

//     if (activeSecretPhrase) {
//       startTimer();
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [activeSecretPhrase, session?.authSignedToken]);

//   // --------------------------
//   // VISIBILITY + FOCUS LISTENERS
//   // --------------------------
//   useEffect(() => {
//     const onFocus = () => {
//       setIsAway(false);
//       awayRef.current = false;
//       if (activeSecretPhrase) startTimer();
//     };

//     const onBlur = () => {
//       setIsAway(true);
//       awayRef.current = true;
//       clearTimer();
//     };

//     const onVisibility = () => {
//       if (document.hidden) {
//         setIsAway(true);
//         awayRef.current = true;
//         clearTimer();
//       } else {
//         setIsAway(false);
//         awayRef.current = false;
//         if (activeSecretPhrase) startTimer();
//       }
//     };

//     window.addEventListener("focus", onFocus);
//     window.addEventListener("blur", onBlur);
//     document.addEventListener("visibilitychange", onVisibility);

//     return () => {
//       clearTimer();
//       window.removeEventListener("focus", onFocus);
//       window.removeEventListener("blur", onBlur);
//       document.removeEventListener("visibilitychange", onVisibility);
//     };
//   }, [activeSecretPhrase]);

//   return { isAway };
// }


export function useInactivityTimer({
  duration = 1000 * 60 * 4,
  onExpireWhileActive,
  onExpireWhileAway,
  secretPhrase,
  deflt,
}: {
  duration?: number;
  onExpireWhileActive?: (signal?: AbortSignal) => Promise<void>;
  onExpireWhileAway?: (signal?: AbortSignal) => Promise<void>;
  secretPhrase?: string | null;
  deflt?: boolean;
}) {
  const { handleLogin } = useVerifySecret();
  const { session, setSession } = useAuth();

  const [isAway, setIsAway] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const awayRef = useRef(false);
  const controllerRef = useRef<AbortController | null>(null); // NEW: single abort controller

  const isDefaultMode = deflt === true;
  const activeSecretPhrase = isDefaultMode ? session?.secretPhrase : secretPhrase;
const timerRef2 = useRef<NodeJS.Timeout | null>(null);
  const expireAway = async (signal?: AbortSignal) => {
    // if (controllerRef.current?.signal.aborted) return;
    if (isDefaultMode) {
      setSession((prev: any) => ({ ...prev, secretPhrase: null }));
    }
    await onExpireWhileAway?.(signal);
  };

  const expireActive = async (signal?: AbortSignal) => {
    if (controllerRef.current?.signal.aborted) return;
    if (isDefaultMode && activeSecretPhrase) {
      await handleLogin({
        secretCode: activeSecretPhrase,
        redirect: false,
        toastmsg: false,
        signal,
      });
    }
    await onExpireWhileActive?.(signal);
  };

  // --------------------------
  // TIMER CONTROL
  // --------------------------
  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (controllerRef.current) controllerRef.current.abort(); // cancel running request
  };

  const startTimer = () => {
    clearTimer();
    controllerRef.current = new AbortController(); // NEW: create new signal for this timer

    timerRef.current = setTimeout(async () => {
      if (awayRef.current) {
        await expireAway(controllerRef.current?.signal);
      } else {
        await expireActive(controllerRef.current?.signal);
      }
    }, duration);
  };


    useEffect(()=>{
  
    const tokenExpired = session?.authSignedEx;
  
      clearTimeout(timerRef2.current)
      if(session?.secretPhrase){
if(tokenExpired){

  timerRef2.current=  setTimeout(async ( ) => {
   
     if (controllerRef.current) {controllerRef.current.abort()}
  //token xpire inside timer
        await expireAway?.();
      
    }, (1000 * 60 * 4));
}

      }


  },[
session?.authSignedEx

  ])
  // --------------------------
  // START / STOP TIMER WHEN SECRET PHRASE OR SESSION CHANGES
  // --------------------------
  useEffect(() => {
    clearTimer();
    if (activeSecretPhrase) startTimer();
  }, [ session?.authSignedToken]);
// activeSecretPhrase,
  // --------------------------
  // VISIBILITY + FOCUS LISTENERS
  // --------------------------
  useEffect(() => {
    const onFocus = () => {
      setIsAway(false);
      awayRef.current = false;
      if (activeSecretPhrase) startTimer();
    };

    const onBlur = () => {
      setIsAway(true);
      awayRef.current = true;
      clearTimer();
    };

    const onVisibility = () => {
      if (document.hidden) {
        setIsAway(true);
        awayRef.current = true;
        clearTimer();
      } else {
        setIsAway(false);
        awayRef.current = false;
        if (activeSecretPhrase) startTimer();
      }
    };

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearTimer();
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [activeSecretPhrase]);

  return { isAway };
}



type StateObject = Record<string, any>;

export function useKeyedStateSetter(
 {state,setState,id}:{ state: StateObject,
  setState: (value: StateObject) => void,
  id: string}
) {
  const setKeyedState = useCallback(
    (value: any | ((prev: any) => any)) => {
      const newValue =
        typeof value === "function" ? (value as (prev: any) => any)(state[id]) : value;

      setState({
        ...state,
        [id]: newValue,
      });
    },
    [state, id, setState]
  );

  return setKeyedState;
}


export const useVerifySecret =()=>{
let {apifetch}= useFetch()
let router = useRouter()
  const {login,updateKey,updateUser,updateAuthSignedToken} = useAuth()
  const [_,setLoading] = useState(false)
    const handleLogin =async ({signal,toastmsg=true,secretCode,redirect=true,setIsLoading}:{signal?:any,toastmsg?:boolean,secretCode?:string,redirect?:boolean,setIsLoading?:any}) => {
    const code = secretCode;
    setIsLoading = setIsLoading ||setLoading
    if (code.split("").length === 6) {
      setIsLoading(true);

    try{

      let obj :any= {url:GETSIGNEDKEYURL}

      if(signal){
        obj.options = {signal}
      }
  let keydata =  await apifetch(obj)

  let decryptedkeydata ;
  if(keydata.success)
  {

    let secretKey  =  await handleDecrypt({encrypted:{...keydata?.data?.user,encrypted:keydata?.data?.user?.privateKey},passphrase:code})
   decryptedkeydata = await handleDecryptKeyPairData({encrypted:keydata?.data.signedData,secretKey})
  }


  else{
    if(toastmsg){

      toast.error(keydata?.message||"An error occured")
    }
    return 
    
  }

  let data =  await apifetch({url:VERIFYSECRETPHRASEURL,options:{signal,method:"POST",body:JSON.stringify({secret:decryptedkeydata?.decrypted})}})

  if(data.success){

    updateKey(code)
    updateAuthSignedToken(data.data.authKey)
    updateUser({user:data.data.user})


     setTimeout(()=>{
   if(redirect){

       router.push(`/dashboard/projects`)
   }
     },1000)
if(toastmsg){

  toast.success("Login successful")
}
  }else{
    if(toastmsg){

      toast.error(data?.message||"An error occured")
    }
  }
}catch(e:any){
  console.log(e)
if(toastmsg){

  toast.error(e?.message||"An error occured")
}
}finally{
   setIsLoading(false);
}
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
      
        // Redirect to dashboard
      }, 2000);
    }
  };

  return {handleLogin}
}