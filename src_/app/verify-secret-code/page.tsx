"use client";

import React, { useState } from 'react';
import { 
  Code, 
  Shield, 
  ArrowRight,
  Key,
  Lock
} from 'lucide-react';
import toast from "react-hot-toast";
import { useAuth, useFetch, useVerifySecret } from '../../../hooks';
import { APPNAME, GETSIGNEDKEYURL, VERIFYSECRETPHRASEURL } from '../../../const';
import { useRouter } from 'next/navigation';
import { handleDecrypt, handleDecryptKeyPairData } from '@/cryptic';




export default function LoginSecretCodePage({redirect=true}) {
  const [secretCode, setSecretCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
   const {apifetch}= useFetch()
    const router = useRouter();
    const {session}=useAuth()
    const {handleLogin} =useVerifySecret()
    const {login,updateKey,updateUser,updateAuthSignedToken} = useAuth()

  const handleCodeChange = (index:number, value:any) => {
    if (value.length <= 1 && 
      // /^\d*$/.test(value)
      /^[A-Za-z0-9@#$%_&*]*$/.test(value)
    ) {
      const newCode = [...secretCode];
      newCode[index] = value;
      setSecretCode(newCode);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index:number, e:any) => {
    if (e.key === 'Backspace' && !secretCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
        const newCode = [...secretCode];
        newCode[index - 1] = '';
        setSecretCode(newCode);
      }
    }
  };

  const handleLogin_ =async () => {
    const code = secretCode.join('');
//     if (code.length === 6) {
//       setIsLoading(true);

//     try{

//   let keydata =  await apifetch({url:GETSIGNEDKEYURL})

//   let decryptedkeydata ;
//   if(keydata.success)
//   {

//     let secretKey  =  await handleDecrypt({encrypted:{...keydata?.data?.user,encrypted:keydata?.data?.user?.privateKey},passphrase:code})
//    decryptedkeydata = await handleDecryptKeyPairData({encrypted:keydata?.data.signedData,secretKey})
//   }


//   else{
//     toast.error(keydata?.message||"An error occured")
//     return 
    
//   }

//   let data =  await apifetch({url:VERIFYSECRETPHRASEURL,options:{method:"POST",body:JSON.stringify({secret:decryptedkeydata?.decrypted})}})

//   if(data.success){

//     updateKey(code)
//     updateAuthSignedToken(data.data.authKey)
//     updateUser({user:data.data.user})


//      setTimeout(()=>{
//    if(redirect){

//        router.push(`/dashboard/projects`)
//    }
//      },1000)

//   toast.success("Login successful")
//   }else{
//       toast.error(data?.message||"An error occured")
//   }
// }catch(e:any){
//   console.log(e)

//         toast.error(e?.message||"An error occured")
// }finally{
//    setIsLoading(false);
// }
//       // Simulate API call
//       setTimeout(() => {
//         setIsLoading(false);
      
//         // Redirect to dashboard
//       }, 2000);
//     }


handleLogin({secretCode:code,setIsLoading,redirect})
  };

  const isCodeComplete = secretCode.every(digit => digit !== '');

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">{APPNAME} Pro</span>
          </div>
          <p className="text-gray-300">Enter your secret code to continue</p>
        </div>

        {/* Login with Secret Code Form */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Enter Secret Code</h1>
            <p className="text-gray-400">Use the 6-digit code you saved during account setup</p>
          </div>

          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4 text-center">
                Enter your 6-digit secret code
              </label>
              <div className="flex justify-center space-x-3">
                {secretCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 bg-gray-800 border border-gray-600 rounded-lg text-white text-center text-xl font-semibold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    inputMode="text"
               pattern="^[A-Za-z0-9@#$%_&*]*$"
               
                    // pattern="\d*"
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleLogin_}
              disabled={isLoading || !isCodeComplete}
              className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:transform-none flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Verify & Access Account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-gray-800/30 rounded-xl p-4 border border-gray-600">
            <div className="flex items-start">
              <Lock className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-blue-300 font-medium mb-1">Can't find your secret code?</p>
                <p className="text-gray-400">
                  Check your secure notes or password manager where you saved the 6-digit code during account setup.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 flex items-center justify-center text-sm text-gray-400">
          <Shield className="w-4 h-4 mr-2" />
          <span>Protected by enterprise-grade security</span>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rotate-45 blur-3xl"></div>
      </div>
    </div>
  );
}