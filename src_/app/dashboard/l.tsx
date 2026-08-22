

"use client";
import React, { useEffect, useRef, useState } from 'react';
import { 
  Code,
  Database,
  FileSpreadsheet, 
  Settings, 
  Users, 
  Headphones, 
  UserPlus, 
  FileText, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  User,
  Menu,
  X,
  LoaderCircle
} from 'lucide-react';
import { useAuth, useAuthHelpers, useFetch, useSettings } from '../../../hooks';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import LoginSecretCodePage from '../verify-secret-code/page';
import { authState, notsstate, } from '@/states';
import { atom, useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { APPNAME } from '../../../const';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {session} = useAuth()
  const {logout,logOutLoading} = useAuthHelpers()
  const [scPage,setScPage] = useState(false)
  const router = useRouter()
  const {getUserSettings}= useSettings()
  let [v,setv] = useState(1)
  const {apifetch} = useFetch()
    const [notstats, setNotStats] = useAtom(notsstate);
  const fetchnotstats = async ()=>{
  
        let data = await apifetch({ url: "/api/nots/stats" });
        if(data.success){
          setNotStats(data.data)
        }
  
  }
    useEffect(()=>{
      if(session?.token&&session?.authSignedToken){
  
        
  fetchnotstats()
      
      }
    },[session?.token,session?.authSignedToken])
// const [{ auth, hydrated }] = useAtom(derivedAuthAtom);
let t = useRef<any>(null)

useEffect(()=>{
  
  clearTimeout(t.current)
t.current =setTimeout(()=>{

if(session?.token){

  if(v>1 && !(!!session?.secretPhrase) ){
    toast("Session expired")
  }
  setv(v+1)

  if(!(!!session?.user?.secretPhrase)){
        router.push("/create-secret-code")
  }else{

    setScPage(!(!!session?.secretPhrase))
  }
}
},2000)

},[session])

useEffect(()=>{
if(session?.token && session?.authSignedToken){
  getUserSettings()
}

},[session?.token,session?.authSignedToken])
  const navigation = [
    { title: "Environments", href: "/dashboard/projects", Icon: Database, active: true },
    { title: "Billing", href: "/dashboard/billings", Icon: FileSpreadsheet },
    { title: "Settings", href: "/dashboard/settings", Icon: Settings },
  
    { title: "Support", href: "/contact", Icon: Headphones },
    { title: "Invite Friend", href: "/dashboard/invite", Icon: UserPlus },
    { title: "Documentation", href: "/dashboard/docs", Icon: FileText },
  ];

  const userMenu = [
    { title: "Logout",action:()=>{
      logout()
    },  Icon: !logOutLoading? <LogOut className="w-5 h-5" />:<LoaderCircle className="animate-spin " />, danger: true }
  ];

  return (
    <div className="h-screen w-full flex bg-gray-50">
      {/* Sidebar */}

   
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      } ${mobileMenuOpen ? 'fixed inset-y-0 left-0 z-50 w-64' : 'hidden'} lg:block`}>
        
        {/* Logo Section */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className={`flex items-center space-x-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-lg font-bold text-gray-900">{APPNAME} Pro</h1>
                <p className="text-sm text-gray-500">{session?.user?.firstname||"user"}'s Workspace</p>
              </div>
            )}
          </div>
          
          {/* Mobile close button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item, index) => (
            <Link
            onClick={()=>{
              setMobileMenuOpen(false)
            }}
              key={index}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors group ${
                item.active 
                  ? 'bg-gradient-to-r from-purple-50 to-cyan-50 text-purple-700 border border-purple-200' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              } ${sidebarCollapsed ? 'justify-center' : ''}`}
            >
              <item.Icon className={`w-5 h-5 ${item.active ? 'text-purple-600' : ''}`} />
              {!sidebarCollapsed && (
                <span className="font-medium">{item.title}</span>
              )}
              {sidebarCollapsed && (
                <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                  {item.title}
                </div>
              )}
            </Link>
          ))}
        </nav>

        {/* User Menu */}
        <div className="border-t border-gray-100 p-4">
          {userMenu.map((item:any, index) => (
            <div
              key={index}
              onClick={()=>{
                if(item.href){
                  router.push(item.href)
                }else if(item?.action){
                  item?.action()

                }
              }}
              // href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors group ${
                item.danger 
                  ? 'text-red-600 hover:text-red-700 hover:bg-red-50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              } ${sidebarCollapsed ? 'justify-center' : ''}`}
            >
             
              {item.Icon}
              {!sidebarCollapsed && (
                <span className="font-medium">{item.title}</span>
              )}
              {sidebarCollapsed && (
                <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                  {item.title}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Collapse Button - Desktop */}
        <div className="hidden lg:block p-4 border-t border-gray-100">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/500 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Environments</h1>
                <p className="text-gray-600">Manage your environment variables .</p>
                 <span className='text-[purple] text-[10px]'>Beta phase . No charges</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              {/* <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
                />
              </div> */}

              {/* Notifications */}
              <button onClick={()=>{
                router.push("/dashboard/notifications")
              }} className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              {((notstats?.new||0 )>0)?  <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notstats?.new||0}
                </span> :null}
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{session?.user?.firstname||"user"}</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
     {children}
        </main>
      </div>
   
      {

        scPage &&
        <div className='flex flex-1 absolute w-full h-full items-center  '>

          <LoginSecretCodePage redirect={false} />
        </div>
      }
    </div>
  );
}

// Usage example - replace the demo content with your actual children
// export default function ActualDashboardLayout({ children }: { children: React.ReactNode }) {
//   return <DashboardLayout>{children}</DashboardLayout>;
// }







// "use client";
// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// // import "./globals.css";
// // import Navbar from "../../components/navbar";
// import { usePathname } from "next/navigation";
// import Navbar from "../../../components/navbar";
// import { Footer } from "../../../components/footer";
// import { Dashboard } from "@mui/icons-material";
// import { title } from "process";
// import { File, FileSpreadsheet, Headset, LogOut, Settings, SquarePlus, Users } from "lucide-react";
// import Logo from "../../../components/logo";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
// // export const metadata: Metadata = {
// //   title: "Dotenv",
// //   description: "Secure vault for your env",
// // };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//    // @ts-ignore: for demonstration, you may need proper typing

// const pathname = usePathname();
// // app/layoutConfig.ts
// //  const pageFeatures = [
// //   { path: "/", mainHeader: false,},
// //   { path: "/about", header: true, hero: false },
// //   { path: "/contact", header: true, hero: false },
// //   { path: "/login", header: false, hero: false },
// // ];

// // const config = pageFeatures.find((p) => p.path === pathname) || {
// //    mainHeader:true
// //   };

//   const hideMainHeader = (children as any).type;

// console.log(hideMainHeader)
// let nav = [{title:"env",href:"/env",Icon:<Dashboard/>},{title:"billings",href:"/billings",Icon:<FileSpreadsheet/>},{title:"settings",href:"/settings",Icon:<Settings/>},{title:"team",href:"/team",Icon:<Users/>},{title:"contact support",href:"/contact-support",Icon:<Headset/>},{title:"invite a friend",href:"/invite-a-friend",Icon:<SquarePlus/>},{title:"docs",href:"/docs",Icon:<File/>},{title:"logout",href:"/logout",Icon:<LogOut/>},]
//   return (
  
//       <div
//         className={`h-screen  w-full flex flex-col bg-tertiary`}
//       >
//         <div className="flex px-5 py-4 items-center gap-5 border-b border-b-secondary">
//           <div className="flex items-center gap-3  border-b border-b-secondary">

//           <Logo height={20} width={20}/>
//           <p>Prince</p>
//           </div>
//           <p>Environments</p>
//         </div>
//         <div className="flex w-full h-full" >

// <div className="bg-white h-full min-h-screen   w-60  max-sm:w-fit pt-10  flex flex-col gap-4">
//   {
//     nav.map((e,index)=>{
//       return <div key={index} className="flex items-center  px-5 gap-3 h-[40px] hover:bg-primary hover:text-white rounded-md cursor-pointer" >
// { e.Icon}
//         <p className="max-sm:hidden">{e.title}</p>
//       </div>
//     })
//   }

// </div>
//         {/* <Navbar/> */}
//       <main className="flex-1 overflow-y-scroll   w-[calc(100%-60rem)] mx-5 ">
//         {children}
//       </main>
//         </div>
//         {/* <div className="mt-auto " ><Footer/></div> */}
//       </div>
  
//   );
// }
