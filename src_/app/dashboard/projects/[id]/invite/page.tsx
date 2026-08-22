"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth, useFetch, useProjects } from '../../../../../../hooks';
import { ACCEPTCOLABURL, DECLINECOLABINVITEURL, GETCOLABURL } from '../../../../../../const';
// import { handleDecrypt, handleDecryptKeyPairData, handleEncrypt } from '@/utils';

import Button from '../../../../../../components/ui/Button';
import { generateKeyPair, handleDecrypt, handleDecryptKeyPairData, handleEncrypt } from '@/cryptic';
import { generateKey } from '@/utils';

const InvitePage = () => {
  const [inviteData, setInviteData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [declineProcessing, setDeclineProcessing] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState<any>(null);
     const {getProjectById,addEnv,getEnvs,deleteEnv} =useProjects()
    const [project, setProject] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);
     const [secretPhrase ,setSecretPhrase] = useState("")
  const searchParams = useSearchParams();
  const router = useRouter();
  const {apifetch}= useFetch()
  
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const colab = searchParams.get('colab');
    const params = useParams();
//   const id = searchParams.get('id');
  const id = params.id as string;
//   const [loading,setLoading] = useState(false)
const {session} = useAuth()
  // Mock function to fetch invite details - replace with your API call
//   const fetchInviteDetails = async (token) => {
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Mock data - replace with actual API response
//       return {
//         success: true,
//         data: {
//           projectName: "AI Dashboard Project",
//           inviterName: "John Smith",
//           inviterEmail: "john@company.com",
//           role: "Editor",
//           invitedEmail: email || "invited@example.com",
//           projectDescription: "A comprehensive dashboard for managing AI workflows and analytics",
//           companyName: "Tech Solutions Inc",
//           expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
//           isExpired: false
//         }
//       };
//     } catch (error) {
//       return { success: false, error: 'Failed to fetch invite details' };
//     }
//   };



  const fetchInviteDetails = async()=>{
  try{
  
    // setLoading(true)
  


    let data = await  apifetch({url:GETCOLABURL,options:{method:"POST",body:
        JSON.stringify
        ({id})}})
  
  if(data.success){
return data
  
  }else{
    //   toast.error(data?.message||"An error occured")
      return { success: false, error: 'Failed to fetch invite details' };
  }
  
  }catch(e:any){
    // toast.error(e?.message||"An error occured")
      return { success: false, error: 'Failed to fetch invite details' };
  
  }finally{
    // setLoading(false)
  }
  }

  // Mock function to handle invite response - replace with your API call
  const handleInviteResponse = async (accepted:boolean) => {
    setProcessing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response - replace with actual API call
      return {
        success: true,
        message: accepted ? 'Invite accepted successfully!' : 'Invite declined successfully.'
      };
    } catch (error) {
      return { success: false, error: 'Failed to process your response' };
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    const loadInviteDetails = async () => {
    //   if (!token) {
    //     setError('Invalid invite link. Token is missing.');
    //     setLoading(false);
    //     return;
    //   }

      const result = await fetchInviteDetails();
      
      if (result.success) {
        if (result.data.inviteDate < new Date()) {
          setError('This invite has expired. Please request a new invitation.');
        } else {
          setInviteData(result.data);
        }
      } else {
        setError(result.error || 'Failed to load invite details');
      }
      
      setLoading(false);
    };

if(session?.token&&session?.secretPhrase ){

    loadInviteDetails();
}
  }, [id,session?.token,session?.secretPhrase,secretPhrase]);

  const handleAccept = async () => {




  try{
    setProcessing(true);
    // setLoading(true)
  

    let secretKey = await handleDecrypt({encrypted:{...inviteData.user,encrypted:inviteData?.user?.privateKey},passphrase:session?.secretPhrase||""})

let key = await handleDecryptKeyPairData({encrypted:inviteData?.key,secretKey})


      let projectSecretKey = generateKey(12)
            let data_ =  await generateKeyPair()
           
      
            if(!data_.publicKey){
              throw("key could not be generated")
      
            }
      
            // let newFullCode = await handleEncrypt({data:fullCode,passphrase:data_.privateKey})
            let privateKey = await handleEncrypt({data:data_.privateKey,passphrase:projectSecretKey,stringify:true})
            let secretPhrase =   await handleEncrypt({data:projectSecretKey,passphrase:session?.secretPhrase,stringify:true})
          
let newencryptedkey =  await handleEncrypt({data:key?.decrypted,passphrase:projectSecretKey||"",stringify:true})

// return
    let data = await  apifetch({url:ACCEPTCOLABURL,options:{method:"POST",body:
        JSON.stringify
        ({id,privateKey,secretPhrase,hashedkey:newencryptedkey,publicKey:data_.publicKey})}})
  
  if(data.success){
    setResponse({ type: 'success', message: data?.message||"Invited accepted", accepted: true });
        setTimeout(() => {
        router.push('/dashboard/projects'); // Adjust route as needed
      }, 3000);
  }else{
          setError(data?.message || 'Failed to accept invite');
    //   toast.error(data?.message||"An error occured")
    //   return { success: false, error: 'Failed to fetch invite details' };
  }
  
  }catch(e:any){
    // toast.error(e?.message||"An error occured")
    //   return { success: false, error: 'Failed to fetch invite details' };
     setError(e?.message || 'Failed to accept invite');
  
  }finally{
      setProcessing(false);
    // setLoading(false)
  }




    // const result = await handleInviteResponse(true);
    
    // if (result.success) {
    //   setResponse({ type: 'success', message: result.message, accepted: true });
    //   // Redirect to dashboard or login after 3 seconds
    //   setTimeout(() => {
    //     router.push('/dashboard'); // Adjust route as needed
    //   }, 3000);
    // } else {
    //   setError(result.error || 'Failed to accept invite');
    // }
  };

  const handleDecline = async () => {



  try{
    setDeclineProcessing(true);
    // setLoading(true)
  


// return
    let data = await  apifetch({url:DECLINECOLABINVITEURL,options:{method:"POST",body:
        JSON.stringify
        ({id})}})
  
  if(data.success){
    setResponse({ type: 'declined', message: data?.message||"Invited declined", accepted: false });
        setTimeout(() => {
        router.push('/dashboard/projects'); // Adjust route as needed
      }, 3000);
  }else{
          setError(data?.message || 'Failed to decline invite');
    //   toast.error(data?.message||"An error occured")
    //   return { success: false, error: 'Failed to fetch invite details' };
  }
  
  }catch(e:any){
    // toast.error(e?.message||"An error occured")
    //   return { success: false, error: 'Failed to fetch invite details' };
     setError(e?.message || 'Failed to decline invite');
  
  }finally{
      setDeclineProcessing(false);
    // setLoading(false)
  }





  };

  //  useEffect(() => {
  //   const fetchProject = async () => {
  //     if (!session?.token || !session.secretPhrase || !id) return;
      
  //     setIsLoading(true);
  //     setError('');
      
  //     try {
  //       const res = await getProjectById(id);
  //       if (res.success) {

  //            let d =  res.data
  //         let s = d.secretPhrase
  //         let ds  =   await handleDecrypt({encrypted:s,passphrase:session?.secretPhrase})
  //         console.log(ds,"dssss")
  //         setSecretPhrase(ds)
          
  //         setProject(res.data);
  //       } else {
  //         setError('Failed to load project data');
  //       }
  //     } catch (e) {
  //       setError('An error occurred while loading the project');
   
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   // fetchProject();
  // }, [session?.token, id, session?.secretPhrase]);

  const formatExpiryDate = (dateString:any) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRoleColor = (role:string) => {
    switch (role?.toLowerCase()) {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="bg-black/70 text-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading invitation details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
        <div className="bg-black/70 text-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.084 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Invitation Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => router.push('/')}
              className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (response) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="bg-black/70 text-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className={`mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-4 ${
              response.accepted ? 'bg-green-100' : 'bg-yellow-100'
            }`}>
              {response.accepted ? (
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {response.accepted ? 'Welcome aboard!' : 'Invitation declined'}
            </h2>
            <p className="text-gray-600 mb-4">{response.message}</p>
            <p className="text-sm text-gray-500">
              {response.accepted 
                ? 'Redirecting to dashboard in 3 seconds...' 
                : 'Redirecting to homepage in 3 seconds...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center py-8">
      <div className="bg-black/70 text-white rounded-lg shadow-lg max-w-2xl w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-6">
          <div className="text-center text-white">
            <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.196-2.121M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.196-2.121M7 20v-2m5-8a3 3 0 11-6 0 3 3 0 016 0zM15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h1 className="text-2xl font-bold">You're Invited!</h1>
            <p className="text-purple-100">Join the team and start collaborating</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {inviteData?.project?.user?.firstname} has invited you to collaborate
            </h2>
            <p className="text-gray-600">
              You've been invited to join <strong>{inviteData?.project?.name}</strong> 
            </p>
          </div>

          {/* Project Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                <p className="text-gray-900 font-semibold">{inviteData?.project?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Role</label>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(inviteData.role)}`}>
                  {inviteData?.permission}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Invited By</label>
                <p className="text-gray-900">{inviteData?.project?.user?.firstname}</p>
                <p className="text-gray-500 text-sm">{inviteData?.project?.user?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Invited Email</label>
                <p className="text-gray-900">{inviteData?.user?.email}</p>
              </div>
            </div>
            
            {inviteData?.project?.description && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
                <p className="text-gray-600">{inviteData?.project?.description}</p>
              </div>
            )}
          </div>

          {/* Expiry Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.084 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-yellow-800 text-sm">
                This invitation expires on {formatExpiryDate( new Date(inviteData?.inviteDate || new Date()).getTime() + 10 * 24 * 60 * 60 * 1000)}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAccept}
              disabled={processing||declineProcessing}
              className={`flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${processing ? 'cursor-wait' : ''}`}
            >
              {processing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                <>
                  <svg className="inline h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Accept Invitation
                </>
              )}
            </button>
            
            <Button
              onClick={handleDecline}
              loading={declineProcessing}
              disabled={processing ||declineProcessing}
              
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="inline h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Decline
            </Button>
          </div>

          {/* Footer Note */}
          <p className="text-center text-sm text-gray-500 mt-6">
            By accepting this invitation, you agree to collaborate on this project and follow the team guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvitePage;