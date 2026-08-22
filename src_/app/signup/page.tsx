

"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { 
  Code, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Github, 
  Chrome,
  Shield,
  ArrowRight,
  User
} from 'lucide-react';
import { useAuth, useFetch } from '../../../hooks';
import { APPNAME, GITHUBCALLBACKURL, GITHUBURL, GOOGLECALLBACKURL, GOOGLEURL, OTPTYPE, SIGNUPURL } from '../../../const';
// import { useRouter } from "next/router";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useAtom } from 'jotai';
import { authState } from '@/states';
import toast from "react-hot-toast";
export default function SignInPage({ onNavigate }:any) {
  const router = useRouter();

  const searchParams = useSearchParams();
  // const params = useParams()
  const [githubLoading,setGithubLoading] = useState(false)
  const code = searchParams.get("code");
  const authType = searchParams.get("authType");
  const ref = searchParams.get("ref")
  let refquery = ref?`ref=${ref}`:""
  const [showPassword, setShowPassword] = useState(false);
  const {apifetch}= useFetch()
  const {login} = useAuth()
    const [session, setSession] = useAtom(authState);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname:"",
    lastname:""
  });
  const [isLoading, setIsLoading] = useState(false);
  const clearandsavelst = ()=>{
    localStorage.removeItem("auth_info")
    localStorage.setItem("auth_info",JSON.stringify({ref}))
  }
  const handlegithubLogin = () => {
    clearandsavelst()
    setGithubLoading(true)
    window.location.href = GITHUBURL+(ref?`ref=${ref}`:""); // backend route
  };

    const loginWithGoogle = () => {
      clearandsavelst()
    window.location.href = GOOGLEURL+(ref?`ref=${ref}`:"");
  };



  const handleInputChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
  
    setIsLoading(true);
    try{

  let data =  await apifetch({url:SIGNUPURL+(ref?`?ref=${ref}`:""),options:{method:"POST",body:JSON.stringify(formData)}})

  if(data.success){
    let token = data.token
    let user = data.user
    login({token,user})

     setTimeout(()=>{
        router.push(`/otp?type=${OTPTYPE.emailVerification}&email=${formData.email}`)
     },1000)

  toast.success("Signup successful")
  }else{
      toast.error(data?.message||"An error occured")
  }
}catch(e:any){
  console.log(e)
        toast.error(e?.message||"An error occured")
}finally{
   setIsLoading(false);
}
    // Simulate API call

  };


  const handleSocialAuth = (provider:any) => {
    setIsLoading(true);
 
    console.log('Social auth with:', provider);
    setTimeout(() => setIsLoading(false), 1500);
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
          <p className="text-gray-300">Welcome back, developer!</p>
        </div>

        {/* Sign In Form */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Sign Up</h1>
            <p className="text-gray-400">Access your secure environment management dashboard</p>
          </div>

          {/* Social Auth Buttons */}
          <div className="space-y-3 mb-8">
            <button
              onClick={() => handlegithubLogin()}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-xl text-white bg-gray-800 hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <Github className="w-5 h-5 mr-3" />
              Continue with GitHub
            </button>
            <button
              onClick={() => loginWithGoogle()}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-xl text-white bg-gray-800 hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <Chrome className="w-5 h-5 mr-3" />
              Continue with Google
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-900 text-gray-400">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  placeholder="developer@company.com"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="firstname" className="block text-sm font-medium text-gray-300 mb-2">
                First name
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  placeholder="john"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-300 mb-2">
                Last name
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  placeholder="marcus"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-purple-500 bg-gray-800 border border-gray-600 rounded focus:ring-purple-500 focus:ring-2" />
                <span className="ml-2 text-sm text-gray-300">Remember me</span>
              </label>
              {/* <button
                type="button"
                onClick={() => router.push('forgot-password')}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                Forgot password?
              </button> */}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:transform-none flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign up
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => router.push("/login")}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Sign in 
              </button>
            </p>
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
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rotate-45 blur-3xl"></div>
      </div>
    </div>
  );
}
// "use client";




// import React, { useState } from 'react';
// import { 
//   Code, 
//   Mail, 
//   Lock, 
//   User, 
//   Eye, 
//   EyeOff, 
//   Github, 
//   Chrome,
//   Shield,
//   CheckCircle,
//   AlertCircle,
//   ArrowRight,
//   Building,
//   Sparkles,
//   Zap,
//   X,
//   RotateCcw,
//   Clock
// } from 'lucide-react';

// export default function AuthPages() {
//   const [currentPage, setCurrentPage] = useState('signin'); // 'signin' or 'signup'
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [showOtpModal, setShowOtpModal] = useState(true);
//   const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
//   const [otpTimer, setOtpTimer] = useState(60);
//   const [canResendOtp, setCanResendOtp] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//     firstName: '',
//     lastName: '',
//     company: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     // Simulate API call for email verification
//     setTimeout(() => {
//       setIsLoading(false);
//       setShowOtpModal(true);
//       startOtpTimer();
//     }, 2000);
//   };

//   const handleSocialAuth = (provider) => {
//     setIsLoading(true);
//     console.log('Social auth with:', provider);
//     setTimeout(() => setIsLoading(false), 1500);
//   };

//   const startOtpTimer = () => {
//     setOtpTimer(60);
//     setCanResendOtp(false);
//     const timer = setInterval(() => {
//       setOtpTimer((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           setCanResendOtp(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const handleOtpChange = (index, value) => {
//     if (value.length <= 1 && /^\d*$/.test(value)) {
//       const newOtp = [...otpCode];
//       newOtp[index] = value;
//       setOtpCode(newOtp);
      
//       // Auto-focus next input
//       if (value && index < 5) {
//         const nextInput = document.getElementById(`otp-${index + 1}`);
//         if (nextInput) nextInput.focus();
//       }
//     }
//   };

//   const handleOtpKeyDown = (index, e) => {
//     if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
//       const prevInput = document.getElementById(`otp-${index - 1}`);
//       if (prevInput) {
//         prevInput.focus();
//         const newOtp = [...otpCode];
//         newOtp[index - 1] = '';
//         setOtpCode(newOtp);
//       }
//     }
//   };

//   const handleOtpSubmit = () => {
//     const code = otpCode.join('');
//     if (code.length === 6) {
//       setIsLoading(true);
//       // Simulate OTP verification
//       setTimeout(() => {
//         setIsLoading(false);
//         setShowOtpModal(false);
//         console.log('OTP verified:', code);
//         // Redirect to dashboard or success page
//       }, 2000);
//     }
//   };

//   const handleResendOtp = () => {
//     if (canResendOtp) {
//       setOtpCode(['', '', '', '', '', '']);
//       startOtpTimer();
//       console.log('OTP resent to:', formData.email);
//     }
//   };

//   const OtpModal = () => (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//       <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700 p-8 w-full max-w-md mx-4 relative">
//         <button
//           onClick={() => setShowOtpModal(false)}
//           className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
//         >
//           <X className="w-6 h-6" />
//         </button>

//         <div className="text-center mb-8">
//           <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
//             <Mail className="w-8 h-8 text-white" />
//           </div>
//           <h2 className="text-3xl font-bold text-white mb-2">Verify Your Email</h2>
//           <p className="text-gray-400 mb-2">
//             We've sent a 6-digit code to
//           </p>
//           <p className="text-purple-400 font-medium">{formData.email}</p>
//         </div>

//         {/* OTP Input Fields */}
//         <div className="mb-8">
//           <label className="block text-sm font-medium text-gray-300 mb-4 text-center">
//             Enter verification code
//           </label>
//           <div className="flex justify-center space-x-3">
//             {otpCode.map((digit, index) => (
//               <input
//                 key={index}
//                 id={`otp-${index}`}
//                 type="text"
//                 maxLength="1"
//                 value={digit}
//                 onChange={(e) => handleOtpChange(index, e.target.value)}
//                 onKeyDown={(e) => handleOtpKeyDown(index, e)}
//                 className="w-12 h-12 bg-gray-800 border border-gray-600 rounded-lg text-white text-center text-xl font-semibold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
//               />
//             ))}
//           </div>
//         </div>

//         {/* Timer and Resend */}
//         <div className="text-center mb-8">
//           {otpTimer > 0 ? (
//             <div className="flex items-center justify-center text-gray-400">
//               <Clock className="w-4 h-4 mr-2" />
//               <span>Resend code in {otpTimer}s</span>
//             </div>
//           ) : (
//             <button
//               onClick={handleResendOtp}
//               className="text-purple-400 hover:text-purple-300 font-medium transition-colors flex items-center justify-center"
//             >
//               <RotateCcw className="w-4 h-4 mr-2" />
//               Resend Code
//             </button>
//           )}
//         </div>

//         {/* Verify Button */}
//         <button
//           onClick={handleOtpSubmit}
//           disabled={isLoading || otpCode.join('').length !== 6}
//           className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:transform-none flex items-center justify-center"
//         >
//           {isLoading ? (
//             <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//           ) : (
//             <>
//               Verify & Continue
//               <CheckCircle className="w-5 h-5 ml-2" />
//             </>
//           )}
//         </button>

//         <div className="mt-6 text-center">
//           <p className="text-gray-400 text-sm">
//             Didn't receive the email? Check your spam folder or{' '}
//             <button
//               onClick={() => setShowOtpModal(false)}
//               className="text-purple-400 hover:text-purple-300 transition-colors"
//             >
//               try a different email
//             </button>
//           </p>
//         </div>

//         {/* Security Note */}
//         <div className="mt-6 flex items-center justify-center text-xs text-gray-500">
//           <Shield className="w-3 h-3 mr-1" />
//           <span>This helps keep your account secure</span>
//         </div>
//       </div>
//     </div>
//   );

//   const SignInPage = () => (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
//       {/* OTP Modal */}
//       {showOtpModal && <OtpModal />}
      
//       <div className="w-full max-w-md">
//         {/* Logo */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center space-x-2 mb-4">
//             <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
//               <Code className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-3xl font-bold text-white">DotEnv Pro</span>
//           </div>
//           <p className="text-gray-300">Welcome back, developer!</p>
//         </div>

//         {/* Sign In Form */}
//         <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-white mb-2">Sign In</h1>
//             <p className="text-gray-400">Access your secure environment management dashboard</p>
//           </div>

//           {/* Social Auth Buttons */}
//           <div className="space-y-3 mb-8">
//             <button
//               onClick={() => handleSocialAuth('github')}
//               disabled={isLoading}
//               className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-xl text-white bg-gray-800 hover:bg-gray-700 transition-colors disabled:opacity-50"
//             >
//               <Github className="w-5 h-5 mr-3" />
//               Continue with GitHub
//             </button>
//             <button
//               onClick={() => handleSocialAuth('google')}
//               disabled={isLoading}
//               className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-xl text-white bg-gray-800 hover:bg-gray-700 transition-colors disabled:opacity-50"
//             >
//               <Chrome className="w-5 h-5 mr-3" />
//               Continue with Google
//             </button>
//           </div>

//           <div className="relative mb-8">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-600"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-4 bg-gray-900 text-gray-400">Or continue with email</span>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
//                   placeholder="developer@company.com"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className="w-full pl-12 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
//                   placeholder="Enter your password"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
//                 >
//                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <label className="flex items-center">
//                 <input type="checkbox" className="w-4 h-4 text-purple-500 bg-gray-800 border border-gray-600 rounded focus:ring-purple-500 focus:ring-2" />
//                 <span className="ml-2 text-sm text-gray-300">Remember me</span>
//               </label>
//               <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
//                 Forgot password?
//               </a>
//             </div>

//             <button
//               type="button"
//               onClick={handleSubmit}
//               disabled={isLoading}
//               className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:transform-none flex items-center justify-center"
//             >
//               {isLoading ? (
//                 <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//               ) : (
//                 <>
//                   Sign In
//                   <ArrowRight className="w-5 h-5 ml-2" />
//                 </>
//               )}
//             </button>
//           </div>

//           <div className="mt-8 text-center">
//             <p className="text-gray-400">
//               Don't have an account?{' '}
//               <button
//                 onClick={() => setCurrentPage('signup')}
//                 className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
//               >
//                 Sign up for free
//               </button>
//             </p>
//           </div>
//         </div>

//         {/* Security Notice */}
//         <div className="mt-6 flex items-center justify-center text-sm text-gray-400">
//           <Shield className="w-4 h-4 mr-2" />
//           <span>Protected by enterprise-grade security</span>
//         </div>
//       </div>

//       {/* Background Effects */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rotate-45 blur-3xl"></div>
//       </div>
//     </div>
//   );

//   const SignUpPage = () => (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
//       {/* OTP Modal */}
//       {showOtpModal && <OtpModal />}
      
//       <div className="w-full max-w-md">
//         {/* Logo */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center space-x-2 mb-4">
//             <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
//               <Code className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-3xl font-bold text-white">DotEnv Pro</span>
//           </div>
//           <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30 mb-4">
//             <Sparkles className="w-3 h-3 text-green-400 mr-1" />
//             <span className="text-green-300 text-xs">Free 14-day trial</span>
//           </div>
//         </div>

//         {/* Sign Up Form */}
//         <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
//             <p className="text-gray-400">Start managing your environment variables securely</p>
//           </div>

//           {/* Social Auth Buttons */}
//           <div className="space-y-3 mb-8">
//             <button
//               onClick={() => handleSocialAuth('github')}
//               disabled={isLoading}
//               className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-xl text-white bg-gray-800 hover:bg-gray-700 transition-colors disabled:opacity-50"
//             >
//               <Github className="w-5 h-5 mr-3" />
//               Sign up with GitHub
//             </button>
//             <button
//               onClick={() => handleSocialAuth('google')}
//               disabled={isLoading}
//               className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-xl text-white bg-gray-800 hover:bg-gray-700 transition-colors disabled:opacity-50"
//             >
//               <Chrome className="w-5 h-5 mr-3" />
//               Sign up with Google
//             </button>
//           </div>

//           <div className="relative mb-8">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-600"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-4 bg-gray-900 text-gray-400">Or create with email</span>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
//                   First Name
//                 </label>
//                 <div className="relative">
//                   <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//                   <input
//                     type="text"
//                     id="firstName"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleInputChange}
//                     className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
//                     placeholder="John"
//                     required
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
//                   placeholder="Doe"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
//                 Work Email
//               </label>
//               <div className="relative">
//                 <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
//                   placeholder="john@company.com"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
//                 Company (Optional)
//               </label>
//               <div className="relative">
//                 <Building className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//                 <input
//                   type="text"
//                   id="company"
//                   name="company"
//                   value={formData.company}
//                   onChange={handleInputChange}
//                   className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
//                   placeholder="Your Company"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className="w-full pl-12 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
//                   placeholder="Create a strong password"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
//                 >
//                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
//             </div>

//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   className="w-full pl-12 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
//                   placeholder="Confirm your password"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
//                 >
//                   {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
//             </div>

//             {/* Password Requirements */}
//             <div className="bg-gray-800/50 rounded-xl p-4 space-y-2">
//               <p className="text-sm font-medium text-gray-300 mb-2">Password must contain:</p>
//               <div className="space-y-1">
//                 <div className="flex items-center text-xs">
//                   <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
//                   <span className="text-gray-400">At least 8 characters</span>
//                 </div>
//                 <div className="flex items-center text-xs">
//                   <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
//                   <span className="text-gray-400">One uppercase letter</span>
//                 </div>
//                 <div className="flex items-center text-xs">
//                   <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
//                   <span className="text-gray-400">One number or special character</span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-start">
//               <input 
//                 type="checkbox" 
//                 className="w-4 h-4 mt-1 text-purple-500 bg-gray-800 border border-gray-600 rounded focus:ring-purple-500 focus:ring-2" 
//                 required
//               />
//               <span className="ml-3 text-sm text-gray-300">
//                 I agree to the{' '}
//                 <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Terms of Service</a>
//                 {' '}and{' '}
//                 <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Privacy Policy</a>
//               </span>
//             </div>

//             <button
//               type="button"
//               onClick={handleSubmit}
//               disabled={isLoading}
//               className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:transform-none flex items-center justify-center"
//             >
//               {isLoading ? (
//                 <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//               ) : (
//                 <>
//                   Create Account
//                   <Zap className="w-5 h-5 ml-2" />
//                 </>
//               )}
//             </button>
//           </div>

//           <div className="mt-8 text-center">
//             <p className="text-gray-400">
//               Already have an account?{' '}
//               <button
//                 onClick={() => setCurrentPage('signin')}
//                 className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
//               >
//                 Sign in here
//               </button>
//             </p>
//           </div>
//         </div>

//         {/* Features Preview */}
//         <div className="mt-6 grid grid-cols-3 gap-4 text-center">
//           <div className="text-xs text-gray-400">
//             <Shield className="w-4 h-4 mx-auto mb-1 text-green-400" />
//             <span>End-to-end Encryption</span>
//           </div>
//           <div className="text-xs text-gray-400">
//             <Zap className="w-4 h-4 mx-auto mb-1 text-yellow-400" />
//             <span>Real-time Sync</span>
//           </div>
//           <div className="text-xs text-gray-400">
//             <CheckCircle className="w-4 h-4 mx-auto mb-1 text-blue-400" />
//             <span>14-day Free Trial</span>
//           </div>
//         </div>
//       </div>

//       {/* Background Effects */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rotate-45 blur-3xl"></div>
//       </div>
//     </div>
//   );

//   return currentPage === 'signin' ? <SignInPage /> : <SignUpPage />;
// }


// // import React, { useState } from 'react';
// // import { 
// //   Code, 
// //   Mail, 
// //   Lock, 
// //   User, 
// //   Eye, 
// //   EyeOff, 
// //   Github, 
// //   Chrome,
// //   Shield,
// //   CheckCircle,
// //   AlertCircle,
// //   ArrowRight,
// //   Building,
// //   Sparkles,
// //   Zap
// // } from 'lucide-react';

// // export default function AuthPages() {
// //   const [currentPage, setCurrentPage] = useState('signin'); // 'signin' or 'signup'
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //   const [formData, setFormData] = useState({
// //     email: '',
// //     password: '',
// //     confirmPassword: '',
// //     firstName: '',
// //     lastName: '',
// //     company: ''
// //   });
// //   const [isLoading, setIsLoading] = useState(false);

// //   const handleInputChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value
// //     });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     setIsLoading(true);
// //     // Simulate API call
// //     setTimeout(() => {
// //       setIsLoading(false);
// //       console.log('Form submitted:', formData);
// //     }, 2000);
// //   };

// //   const handleSocialAuth = (provider) => {
// //     setIsLoading(true);
// //     console.log('Social auth with:', provider);
// //     setTimeout(() => setIsLoading(false), 1500);
// //   };

// //   const SignInPage = () => (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
// //       <div className="w-full max-w-md">
// //         {/* Logo */}
// //         <div className="text-center mb-8">
// //           <div className="flex items-center justify-center space-x-2 mb-4">
// //             <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
// //               <Code className="w-6 h-6 text-white" />
// //             </div>
// //             <span className="text-3xl font-bold text-white">DotEnv Pro</span>
// //           </div>
// //           <p className="text-gray-300">Welcome back, developer!</p>
// //         </div>

// //         {/* Sign In Form */}
// //         <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
// //           <div className="mb-8">
// //             <h1 className="text-3xl font-bold text-white mb-2">Sign In</h1>
// //             <p className="text-gray-400">Access your secure environment management dashboard</p>
// //           </div>

// //           {/* Social Auth Buttons */}
// //           <div className="space-y-3 mb-8">
// //             <button
// //               onClick={() => handleSocialAuth('github')}
// //               disabled={isLoading}
// //               className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-xl text-white bg-gray-800 hover:bg-gray-700 transition-colors disabled:opacity-50"
// //             >
// //               <Github className="w-5 h-5 mr-3" />
// //               Continue with GitHub
// //             </button>
// //             <button
// //               onClick={() => handleSocialAuth('google')}
// //               disabled={isLoading}
// //               className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-xl text-white bg-gray-800 hover:bg-gray-700 transition-colors disabled:opacity-50"
// //             >
// //               <Chrome className="w-5 h-5 mr-3" />
// //               Continue with Google
// //             </button>
// //           </div>

// //           <div className="relative mb-8">
// //             <div className="absolute inset-0 flex items-center">
// //               <div className="w-full border-t border-gray-600"></div>
// //             </div>
// //             <div className="relative flex justify-center text-sm">
// //               <span className="px-4 bg-gray-900 text-gray-400">Or continue with email</span>
// //             </div>
// //           </div>

// //           <div className="space-y-6">
// //             <div>
// //               <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
// //                 Email Address
// //               </label>
// //               <div className="relative">
// //                 <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
// //                 <input
// //                   type="email"
// //                   id="email"
// //                   name="email"
// //                   value={formData.email}
// //                   onChange={handleInputChange}
// //                   className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
// //                   placeholder="developer@company.com"
// //                   required
// //                 />
// //               </div>
// //             </div>

// //             <div>
// //               <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
// //                 Password
// //               </label>
// //               <div className="relative">
// //                 <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
// //                 <input
// //                   type={showPassword ? "text" : "password"}
// //                   id="password"
// //                   name="password"
// //                   value={formData.password}
// //                   onChange={handleInputChange}
// //                   className="w-full pl-12 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
// //                   placeholder="Enter your password"
// //                   required
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowPassword(!showPassword)}
// //                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
// //                 >
// //                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
// //                 </button>
// //               </div>
// //             </div>

// //             <div className="flex items-center justify-between">
// //               <label className="flex items-center">
// //                 <input type="checkbox" className="w-4 h-4 text-purple-500 bg-gray-800 border border-gray-600 rounded focus:ring-purple-500 focus:ring-2" />
// //                 <span className="ml-2 text-sm text-gray-300">Remember me</span>
// //               </label>
// //               <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
// //                 Forgot password?
// //               </a>
// //             </div>

// //             <button
// //               type="button"
// //               onClick={handleSubmit}
// //               disabled={isLoading}
// //               className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:transform-none flex items-center justify-center"
// //             >
// //               {isLoading ? (
// //                 <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
// //               ) : (
// //                 <>
// //                   Sign In
// //                   <ArrowRight className="w-5 h-5 ml-2" />
// //                 </>
// //               )}
// //             </button>
// //           </div>

// //           <div className="mt-8 text-center">
// //             <p className="text-gray-400">
// //               Don't have an account?{' '}
// //               <button
// //                 onClick={() => setCurrentPage('signup')}
// //                 className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
// //               >
// //                 Sign up for free
// //               </button>
// //             </p>
// //           </div>
// //         </div>

// //         {/* Security Notice */}
// //         <div className="mt-6 flex items-center justify-center text-sm text-gray-400">
// //           <Shield className="w-4 h-4 mr-2" />
// //           <span>Protected by enterprise-grade security</span>
// //         </div>
// //       </div>

// //       {/* Background Effects */}
// //       <div className="fixed inset-0 overflow-hidden pointer-events-none">
// //         <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rotate-45 blur-3xl"></div>
// //       </div>
// //     </div>
// //   );

// //   const SignUpPage = () => (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
// //       <div className="w-full max-w-md">
// //         {/* Logo */}
// //         <div className="text-center mb-8">
// //           <div className="flex items-center justify-center space-x-2 mb-4">
// //             <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
// //               <Code className="w-6 h-6 text-white" />
// //             </div>
// //             <span className="text-3xl font-bold text-white">DotEnv Pro</span>
// //           </div>
// //           <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30 mb-4">
// //             <Sparkles className="w-3 h-3 text-green-400 mr-1" />
// //             <span className="text-green-300 text-xs">Free 14-day trial</span>
// //           </div>
// //         </div>

// //         {/* Sign Up Form */}
// //         <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
// //           <div className="mb-8">
// //             <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
// //             <p className="text-gray-400">Start managing your environment variables securely</p>
// //           </div>

// //           {/* Social Auth Buttons */}
// //           <div className="space-y-3 mb-8">
// //             <button
// //               onClick={() => handleSocialAuth('github')}
// //               disabled={isLoading}
// //               className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-xl text-white bg-gray-800 hover:bg-gray-700 transition-colors disabled:opacity-50"
// //             >
// //               <Github className="w-5 h-5 mr-3" />
// //               Sign up with GitHub
// //             </button>
// //             <button
// //               onClick={() => handleSocialAuth('google')}
// //               disabled={isLoading}
// //               className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-xl text-white bg-gray-800 hover:bg-gray-700 transition-colors disabled:opacity-50"
// //             >
// //               <Chrome className="w-5 h-5 mr-3" />
// //               Sign up with Google
// //             </button>
// //           </div>

// //           <div className="relative mb-8">
// //             <div className="absolute inset-0 flex items-center">
// //               <div className="w-full border-t border-gray-600"></div>
// //             </div>
// //             <div className="relative flex justify-center text-sm">
// //               <span className="px-4 bg-gray-900 text-gray-400">Or create with email</span>
// //             </div>
// //           </div>

// //           <div className="space-y-6">
// //             <div className="grid grid-cols-2 gap-4">
// //               <div>
// //                 <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
// //                   First Name
// //                 </label>
// //                 <div className="relative">
// //                   <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
// //                   <input
// //                     type="text"
// //                     id="firstName"
// //                     name="firstName"
// //                     value={formData.firstName}
// //                     onChange={handleInputChange}
// //                     className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
// //                     placeholder="John"
// //                     required
// //                   />
// //                 </div>
// //               </div>
// //               <div>
// //                 <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
// //                   Last Name
// //                 </label>
// //                 <input
// //                   type="text"
// //                   id="lastName"
// //                   name="lastName"
// //                   value={formData.lastName}
// //                   onChange={handleInputChange}
// //                   className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
// //                   placeholder="Doe"
// //                   required
// //                 />
// //               </div>
// //             </div>

// //             <div>
// //               <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
// //                 Work Email
// //               </label>
// //               <div className="relative">
// //                 <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
// //                 <input
// //                   type="email"
// //                   id="email"
// //                   name="email"
// //                   value={formData.email}
// //                   onChange={handleInputChange}
// //                   className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
// //                   placeholder="john@company.com"
// //                   required
// //                 />
// //               </div>
// //             </div>

// //             <div>
// //               <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
// //                 Company (Optional)
// //               </label>
// //               <div className="relative">
// //                 <Building className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
// //                 <input
// //                   type="text"
// //                   id="company"
// //                   name="company"
// //                   value={formData.company}
// //                   onChange={handleInputChange}
// //                   className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
// //                   placeholder="Your Company"
// //                 />
// //               </div>
// //             </div>

// //             <div>
// //               <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
// //                 Password
// //               </label>
// //               <div className="relative">
// //                 <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
// //                 <input
// //                   type={showPassword ? "text" : "password"}
// //                   id="password"
// //                   name="password"
// //                   value={formData.password}
// //                   onChange={handleInputChange}
// //                   className="w-full pl-12 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
// //                   placeholder="Create a strong password"
// //                   required
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowPassword(!showPassword)}
// //                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
// //                 >
// //                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
// //                 </button>
// //               </div>
// //             </div>

// //             <div>
// //               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
// //                 Confirm Password
// //               </label>
// //               <div className="relative">
// //                 <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
// //                 <input
// //                   type={showConfirmPassword ? "text" : "password"}
// //                   id="confirmPassword"
// //                   name="confirmPassword"
// //                   value={formData.confirmPassword}
// //                   onChange={handleInputChange}
// //                   className="w-full pl-12 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
// //                   placeholder="Confirm your password"
// //                   required
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
// //                 >
// //                   {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Password Requirements */}
// //             <div className="bg-gray-800/50 rounded-xl p-4 space-y-2">
// //               <p className="text-sm font-medium text-gray-300 mb-2">Password must contain:</p>
// //               <div className="space-y-1">
// //                 <div className="flex items-center text-xs">
// //                   <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
// //                   <span className="text-gray-400">At least 8 characters</span>
// //                 </div>
// //                 <div className="flex items-center text-xs">
// //                   <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
// //                   <span className="text-gray-400">One uppercase letter</span>
// //                 </div>
// //                 <div className="flex items-center text-xs">
// //                   <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
// //                   <span className="text-gray-400">One number or special character</span>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="flex items-start">
// //               <input 
// //                 type="checkbox" 
// //                 className="w-4 h-4 mt-1 text-purple-500 bg-gray-800 border border-gray-600 rounded focus:ring-purple-500 focus:ring-2" 
// //                 required
// //               />
// //               <span className="ml-3 text-sm text-gray-300">
// //                 I agree to the{' '}
// //                 <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Terms of Service</a>
// //                 {' '}and{' '}
// //                 <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Privacy Policy</a>
// //               </span>
// //             </div>

// //             <button
// //               type="button"
// //               onClick={handleSubmit}
// //               disabled={isLoading}
// //               className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:transform-none flex items-center justify-center"
// //             >
// //               {isLoading ? (
// //                 <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
// //               ) : (
// //                 <>
// //                   Create Account
// //                   <Zap className="w-5 h-5 ml-2" />
// //                 </>
// //               )}
// //             </button>
// //           </div>

// //           <div className="mt-8 text-center">
// //             <p className="text-gray-400">
// //               Already have an account?{' '}
// //               <button
// //                 onClick={() => setCurrentPage('signin')}
// //                 className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
// //               >
// //                 Sign in here
// //               </button>
// //             </p>
// //           </div>
// //         </div>

// //         {/* Features Preview */}
// //         <div className="mt-6 grid grid-cols-3 gap-4 text-center">
// //           <div className="text-xs text-gray-400">
// //             <Shield className="w-4 h-4 mx-auto mb-1 text-green-400" />
// //             <span>End-to-end Encryption</span>
// //           </div>
// //           <div className="text-xs text-gray-400">
// //             <Zap className="w-4 h-4 mx-auto mb-1 text-yellow-400" />
// //             <span>Real-time Sync</span>
// //           </div>
// //           <div className="text-xs text-gray-400">
// //             <CheckCircle className="w-4 h-4 mx-auto mb-1 text-blue-400" />
// //             <span>14-day Free Trial</span>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Background Effects */}
// //       <div className="fixed inset-0 overflow-hidden pointer-events-none">
// //         <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rotate-45 blur-3xl"></div>
// //       </div>
// //     </div>
// //   );

// //   return currentPage === 'signin' ? <SignInPage /> : <SignUpPage />;
// // }