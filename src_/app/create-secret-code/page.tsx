"use client";

import React, { useState } from 'react';
import { 
  Code, 
  Shield, 
  ArrowRight,
  Key,
  AlertTriangle,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth, useFetch } from '../../../hooks';
import { useRouter } from 'next/navigation';
import { APPNAME, CREATESECRETPHRASEURL } from '../../../const';
import toast from "react-hot-toast";
import { generateKeyPair, handleEncrypt } from '@/cryptic';
// import { generateKeyPair, handleEncrypt } from '@/utils';

export default function AddSecretCodePage() {
  const [secretCode, setSecretCode] = useState(['', '', '', '', '', '']);
  const [confirmCode, setConfirmCode] = useState(['', '', '', '', '', '']);
  const [showCode, setShowCode] = useState(false);
  const [showConfirmCode, setShowConfirmCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [codeConfirmed, setCodeConfirmed] = useState(false);
  const {apifetch} = useFetch();
  const router = useRouter();
  const {login, updateKey,updateUser,updateAuthSignedToken} = useAuth();

  const handleCodeChange = (index:number, value:any, isConfirm = false) => {
    if (value.length <= 1 && 
      // /^\d*$/.test(value)
      /^[A-Za-z0-9@#$%_&*]*$/.test(value)
    )
       {
      const targetArray = isConfirm ? confirmCode : secretCode;
      const setTargetArray = isConfirm ? setConfirmCode : setSecretCode;
      const newCode = [...targetArray];
      newCode[index] = value;
      setTargetArray(newCode);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`${isConfirm ? 'confirm-' : ''}code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index:number, e:any, isConfirm = false) => {
    if (e.key === 'Backspace' && !secretCode[index] && index > 0) {
      const prevInput = document.getElementById(`${isConfirm ? 'confirm-' : ''}code-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
        const targetArray = isConfirm ? confirmCode : secretCode;
        const setTargetArray = isConfirm ? setConfirmCode : setSecretCode;
        const newCode = [...targetArray];
        newCode[index - 1] = '';
        setTargetArray(newCode);
      }
    }
  };

  const isCodeComplete = secretCode.every(digit => digit !== '');
  const isConfirmCodeComplete = confirmCode.every(digit => digit !== '');
  const codesMatch = secretCode.join('') === confirmCode.join('');
  const fullCode = secretCode.join('');

  const handleSaveSecretCode = async () => {
    if (codeConfirmed && isCodeComplete && isConfirmCodeComplete && codesMatch) {
      setIsLoading(true);


      try {


      let data_ =  await generateKeyPair()
     

      if(!data_.publicKey){
        throw("key could not be generated")

      }

      // let newFullCode = await handleEncrypt({data:fullCode,passphrase:data_.privateKey})
      let secretKey = await handleEncrypt({data:data_.privateKey,passphrase:fullCode}) as any
    
        let data = await apifetch({
          url: CREATESECRETPHRASEURL,
          options: {
            method: "POST",
            body: JSON.stringify({secret: "true",publicKey:data_.publicKey,...secretKey,secretKey:secretKey.ciphertext})
          }
        });
        
  
        
        if (data.success) {
          updateKey(fullCode);
             updateAuthSignedToken(data.data.authKey)
          updateUser({user:data.data.user})
          
          
          setTimeout(() => {
            
            router.push(`dashboard/projects`);
          }, 1000);

          toast.success("Secret code saved successfully");
        } else {
          toast.error(data?.message || "An error occurred");
        }
      } catch (e:any) {
        console.log(e)
     
        toast.error(e?.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">{APPNAME} Pro</span>
          </div>
          <p className="text-gray-300">Create your secret code</p>
        </div>

        {/* Add Secret Code Form */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create Secret Code</h1>
            <p className="text-gray-400">Choose a 6-digit code that will be used as an additional security layer for login</p>
          </div>

          {/* Secret Code Input */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Enter your 6-digit secret code
              </label>
              <button
                onClick={() => setShowCode(!showCode)}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700"
                title={showCode ? "Hide code" : "Show code"}
              >
                {showCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex justify-center space-x-3">
              {secretCode.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type={showCode ? "text" : "password"}
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 bg-gray-800 border border-gray-600 rounded-lg text-white text-center text-xl font-semibold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      inputMode="text"
               pattern="^[A-Za-z0-9@#$%_&*]*$"
                />
              ))}
            </div>
          </div>

          {/* Confirm Secret Code Input */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Confirm your 6-digit secret code
              </label>
              <button
                onClick={() => setShowConfirmCode(!showConfirmCode)}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700"
                title={showConfirmCode ? "Hide code" : "Show code"}
              >
                {showConfirmCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex justify-center space-x-3">
              {confirmCode.map((digit, index) => (
                <input
                  key={index}
                  id={`confirm-code-${index}`}
                  type={showConfirmCode ? "text" : "password"}
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value, true)}
                  onKeyDown={(e) => handleKeyDown(index, e, true)}
                  className="w-12 h-12 bg-gray-800 border border-gray-600 rounded-lg text-white text-center text-xl font-semibold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        inputMode="text"
               pattern="^[A-Za-z0-9@#$%_&*]*$"
                />
              ))}
            </div>
            {isConfirmCodeComplete && !codesMatch && (
              <p className="text-red-400 text-sm mt-2 text-center">Codes do not match</p>
            )}
            {isConfirmCodeComplete && codesMatch && (
              <p className="text-green-400 text-sm mt-2 text-center">Codes match</p>
            )}
          </div>

          {/* Security Warning */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-amber-300 font-medium mb-1">Important Security Notice</p>
                <p className="text-amber-200/80">
                  Remember this 6-digit code and store it securely. You'll need it to access your account. 
                  We cannot recover this code if you forget it.
                </p>
              </div>
            </div>
          </div>

          {/* Confirmation Checkbox */}
          <div className="mb-8">
            <label className="flex items-start">
              <input 
                type="checkbox" 
                checked={codeConfirmed}
                onChange={(e) => setCodeConfirmed(e.target.checked)}
                className="w-4 h-4 mt-1 text-purple-500 bg-gray-800 border border-gray-600 rounded focus:ring-purple-500 focus:ring-2" 
                required
              />
              <span className="ml-3 text-sm text-gray-300">
                I have securely saved my 6-digit secret code and understand that I'll need it to access my account
              </span>
            </label>
          </div>

          <button
            onClick={handleSaveSecretCode}
            disabled={isLoading || !codeConfirmed || !isCodeComplete || !isConfirmCodeComplete || !codesMatch}
            className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:transform-none flex items-center justify-center"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                Confirm & Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </div>

        {/* Security Notice */}
        <div className="mt-6 flex items-center justify-center text-sm text-gray-400">
          <Shield className="w-4 h-4 mr-2" />
          <span>Protected by enterprise-grade security</span>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rotate-45 blur-3xl"></div>
      </div>
    </div>
  );
}