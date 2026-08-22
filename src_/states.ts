// atoms/counterAtom.ts
// import { atom } from "recoil"
import { atom } from "jotai";;

import { atomWithStorage } from 'jotai/utils';
import { ISettings } from "../hooks";
interface IEnv{
    title:string,
    id?:string|number
    value:string
    edit?:boolean
    view?:boolean
 
}

interface IPagination{
    nextPage:number
    hasMore:false
    data:any[]
}
interface IEnvProject{
    name:string,
    id:string
    _id:string
    key:string
    createdAt:string
}
interface ITeam{
    permission:string,
    id:string
    email:string
    name:string
    createdAt:string
}
export interface IUser{

_id?:string
    email:string
    username?:string
    lastname?:string
    firstname?:string
    name:string
    createdAt:string
    secretPhrase?:string
}
export const envsstate = atom<IEnv[]>([{
  

    title:"secret",id:"",value:"qwersdgtfhgggfxdzsxczxczxczxczxczxczxczxc"
   ,
}]);


export const notsstate = atom<any>({
  

    // title:"secret",id:"",value:"qwersdgtfhgggfxdzsxczxczxczxczxczxczxczxc"
   
});


export const plansState = atom<any>([]);

interface IEnvProjectPag extends IPagination{
    data:IEnvProject[]
}

export const projectInitial:IEnvProjectPag ={hasMore:false,nextPage:1,data:[
//     {
  

//     name:"secret",id:"",_id:"",key:"qwersdgtfhgggfxdzsxczxczxczxczxczxczxczxc",createdAt:new Date().toISOString()
//    ,
// }
]}
export const envsProjectstate = atom<IEnvProjectPag>(projectInitial);
export const teamsState = atom<ITeam[]>([
//     {
  

//     name:"john",email:"princewillasotibe123@gmail.com",id:"",createdAt:new Date().toISOString(),permission:"edit"
//    ,
// }
]);
export const sessioninitials ={
    user:
    null,
token:null,
password:null,
secretPhrase:null,
settings:null,
authSignedToken:null,
authSignedEx:false,

  

   
}


const selectiveStorage = {
  getItem: (key: string) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: any) => {
    try {
      // omit fields you don’t want to persist
      const { password, secretPhrase,authSignedToken,authSignedEx,...rest } = value || {};
      localStorage.setItem(key, JSON.stringify(rest));
    } catch {}
  },
  removeItem: (key: string) => localStorage.removeItem(key),
};

// 🟢 atom that only saves selective fields
export const authState = atomWithStorage<{
  user?: IUser | null;
  token?: string | null;
  authSignedToken?: string | null;
  password?: string | null;
  authSignedEx?: boolean | null;
  secretPhrase?: string | null;
  settings?: ISettings | null;
} | null>("auth", sessioninitials, selectiveStorage);
// export const authState = atomWithStorage<{user?:IUser|null,token?:string|null,password?:string|null,secretPhrase?:string|null,settings?:ISettings|null}|null>("auth",sessioninitials);






export const publicKeyAtom = atom<string | null>( null as string | null);










////////single product
// Selected branch (nullable string)
export const branchAtom = atom<any>({});

// Selected commit (any type, nullable)
export const commitAtom = atom<any>({});

// Project environment variables (array)
export const envsProjectAtom = atom<{}>({});

// All branches (array)
export const branchesAtom = atom<{}>({});

// Project object
export const projectAtom = atom<any>({});

// Commits object
export const commitsAtom = atom<any>({});