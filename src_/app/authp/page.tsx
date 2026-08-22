"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Code, 
  Github, 
  Chrome,
  CheckCircle,
  Loader,
  Shield,
  Zap,
  User,
  Mail,
  X
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAtom } from 'jotai';
import { authState } from '@/states';
import { useAuth, useFetch } from '../../../hooks';
import toast from "react-hot-toast";
import { APPNAME, GITHUBCALLBACKURL, GOOGLECALLBACKURL } from '../../../const';
export default function AuthLoaderPage({ 
//   provider = 'github', // 'github' or 'google'
  authType = 'signin', // 'signin' or 'signup'

}) { 
   const searchParams = useSearchParams();
  const provider = searchParams.get("authType");
 const router = useRouter();
      const code = searchParams.get("code");
      const [showPassword, setShowPassword] = useState(false);
      const {apifetch}= useFetch()
      const {login} = useAuth()
    //   const [step,setStep] =useState(1)
        // const [session, setSession] = useAtom(authState);
  const [currentStep, setCurrentStep] = useState(2);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState(null);
const callback = useCallback(async ()=>{
if(code){
try{
   let d = JSON.parse(localStorage.getItem("auth_info")||"{}")
     const ref = d?.ref
  let refquery = ref?`&ref=${ref}`:""
  let data =  await apifetch({url:(provider=="github"? GITHUBCALLBACKURL:GOOGLECALLBACKURL)+`?code=${code}${refquery}`})

  if(data.success){
    let token = data.token
    let user = data.user
    login({token,user})
    localStorage.removeItem("auth_info")
    setCurrentStep(2)
     setIsComplete(true);
     setTimeout(()=>{
      if(user.secretPhrase){
    router.push("/verify-secret-code")
        // router.push("/dashboard/projects")
      }else{
            router.push("/create-secret-code")
      }
     },1000)

  toast.success("Login successful")
  }else{
      toast.error(data?.message||"An error occured")
  }
}catch(e:any){
  
        toast.error(e?.message||"An error occured")
}
}
},[code])
  useEffect(()=>{

    callback()
  },[
code
  ])
  const steps = [
    {
      id: 'authenticating',
      title: `Authenticating with ${provider === 'github' ? 'GitHub' : 'Google'}`,
      subtitle: 'Verifying your credentials...',
      duration: 2000
    },
    {
      id: 'fetching-profile',
      title: 'Fetching your profile',
      subtitle: 'Getting your account information...',
      duration: 1500
    },
    {
      id: 'setting-up',
      title: authType === 'signup' ? 'Setting up your account' : 'Signing you in',
      subtitle: authType === 'signup' 
        ? `Creating your ${APPNAME} Pro workspace...`
        : 'Preparing your dashboard...',
      duration: 2000
    }
  ];

//   useEffect(() => {
//     const processAuth = async () => {
//       try {
//         for (let i = 0; i < steps.length; i++) {
//           setCurrentStep(i);
//           await new Promise(resolve => setTimeout(resolve, steps[i].duration));
//         }
        
//         setIsComplete(true);
        
//         // Simulate final completion
//         setTimeout(() => {
//           if (onComplete) {
//             onComplete({
//               provider,
//               authType,
//               user: {
//                 name: 'John Doe',
//                 email: 'john@example.com',
//                 avatar: null
//               }
//             });
//           }
//         }, 1000);
        
//       } catch (err) {
//         setError(err.message);
//         if (onError) {
//           onError(err);
//         }
//       }
//     };

//     processAuth();
//   }, []);

  const getProviderIcon = () => {
    return provider === 'github' ? (
      <Github className="w-8 h-8 text-white" />
    ) : (
      <Chrome className="w-8 h-8 text-white" />
    );
  };

  const getProviderColor = () => {
    return provider === 'github' 
      ? 'from-gray-700 to-gray-900' 
      : 'from-blue-500 to-red-500';
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-red-500/30 p-8 text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <X className="w-8 h-8 text-red-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">Authentication Failed</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            
            <button
              onClick={() => window.history.back()}
              className="w-full bg-gray-800 border border-gray-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }
// dark:bg-none dark:bg-[#0A0A0A]
// bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800
// 
  return (
    <div className="min-h-screen  dark:bg-none dark:bg-[#0A0A0A] bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800

 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">{APPNAME} Pro</span>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
          {/* Provider Icon */}
          <div className="text-center mb-8">
            <div className={`w-20 h-20 bg-gradient-to-r ${getProviderColor()} rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse`}>
              {getProviderIcon()}
            </div>
            
            {isComplete ? (
              <>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {authType === 'signup' ? 'Account Created!' : 'Welcome Back!'}
                </h2>
                <p className="text-gray-400">
                  {authType === 'signup' 
                    ? 'Your account has been set up successfully.'
                    : 'You have been signed in successfully.'
                  }
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {steps[currentStep]?.title}
                </h2>
                <p className="text-gray-400 mb-6">
                  {steps[currentStep]?.subtitle}
                </p>
              </>
            )}
          </div>

          {!isComplete && (
            <>
              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  {steps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                          index <= currentStep
                            ? 'bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white'
                            : 'bg-gray-700 text-gray-400'
                        }`}
                      >
                        {index < currentStep ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : index === currentStep ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      
                      {index < steps.length - 1 && (
                        <div
                          className={`h-0.5 flex-1 mx-2 transition-all duration-300 ${
                            index < currentStep
                              ? 'bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800'
                              : 'bg-gray-700'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Loading Animation */}
              <div className="mb-8">
                <div className="flex justify-center space-x-1 mb-4">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                </div>
                
                <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
                  <div 
                    className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ 
                      width: `${((currentStep + 1) / steps.length) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>

              {/* Status Information */}
              <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <User className="w-4 h-4" />
                    <span>Provider:</span>
                    <span className="text-white font-medium capitalize">{provider}</span>
                  </div>
                  <div className="w-px h-4 bg-gray-600"></div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Mail className="w-4 h-4" />
                    <span>Action:</span>
                    <span className="text-white font-medium capitalize">
                      {authType === 'signup' ? 'Sign Up' : 'Sign In'}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {isComplete && (
            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>Redirecting to dashboard...</span>
                </div>
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="mt-6 flex items-center justify-center text-xs text-gray-500">
            <Shield className="w-3 h-3 mr-1" />
            <span>Secured by enterprise-grade encryption</span>
          </div>
        </div>

        {/* Feature Highlights */}
        {!isComplete && (
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="text-xs text-gray-400">
              <Zap className="w-4 h-4 mx-auto mb-1 text-yellow-400" />
              <span>Fast Setup</span>
            </div>
            <div className="text-xs text-gray-400">
              <Shield className="w-4 h-4 mx-auto mb-1 text-green-400" />
              <span>Secure Auth</span>
            </div>
            <div className="text-xs text-gray-400">
              <CheckCircle className="w-4 h-4 mx-auto mb-1 text-blue-400" />
              <span>Ready to Go</span>
            </div>
          </div>
        )}
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rotate-45 blur-3xl"></div>
      </div>
    </div>
  );
}