
"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { 
  Gift, 
  Users, 
  Copy, 
  Check, 
  Share2, 
  Mail, 
  MessageCircle,
  Facebook,
  Twitter,
  Star,
  Coins,
  Crown
} from 'lucide-react';
import { useAuth, useFetch } from '../../../../hooks';
import { DOMAIN, DOMAINAPI } from '../../../../const';

export default function InviteFriendPage() {
  const [copied, setCopied] = useState(false);
  // const [referralCode] = useState('FRIEND2024');
  const {session} = useAuth()
  const {apifetch}= useFetch()
  const [stats,setstats]= useState<any>({})
  // const [referralLink] = useState('https://yourapp.com/signup?ref=FRIEND2024');
  const referralLink = useMemo(()=>{
return `${DOMAIN}/signup?ref=${session?.user?._id||""}`
    
  },[session])
  const referralCode = useMemo(()=>{
return `${session?.user?._id||""}`
    
  },[session])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
useEffect(()=>{
let v = async()=>{
 let data = await apifetch({url:DOMAINAPI+"/ref/stats"})
 if(data.success){
  setstats(data.data)
 }
}
if(session?.token){

  v()
}


},[session?.token])
  const handleShare = (platform:string) => {
    const message = "Join me on this amazing platform! Use my referral code and we both get rewards!";
    const urls:any = {
      facebook: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(referralLink)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${message} ${referralLink}`)}`,
      email: `mailto:?subject=Join me on this platform!&body=${encodeURIComponent(`${message}\n\n${referralLink}`)}`
    };
    
    if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  };
// bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6">
            <Gift className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 dark:text-white">
            Invite Friends & Earn
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto dark:text-gray-400">
            Share the love and get rewarded! Invite your friends and you'll both receive amazing benefits.
          </p>
        </div>

        {/* Rewards Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white dark:bg-white/5 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-white/10">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                <Crown className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">You Get</h3>
                <p className="text-gray-600 dark:text-white">For each successful referral</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <Coins className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-400">10 Credit Bonus</span>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 text-purple-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-400">Premium Features Access</span>
              </div>
              <div className="flex items-center">
                <Gift className="w-5 h-5 text-blue-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-400">Exclusive Rewards</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-white/10 dark:bg-none dark:bg-white/5">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">They Get</h3>
                <p className="text-gray-600 dark:text-white">When they sign up</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <Coins className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-400">5 Welcome credit Bonus</span>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 text-purple-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-400">Free Premium Trial</span>
              </div>
              <div className="flex items-center">
                <Gift className="w-5 h-5 text-blue-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-400">Special Onboarding</span>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Code Section */}
        <div className="bg-white dark:bg-white/5 dark:border-white/10 rounded-2xl p-8 shadow-lg mb-8 border border-gray-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold dark:text-white text-gray-900 mb-2">Your Referral Code</h2>
            <p className="text-gray-600 dark:text-white">Share this code or link with your friends</p>
          </div>

          <div className="max-w-md mx-auto mb-6">
            <div className="flex items-center bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-lg p-4 border-2 border-dashed border-gray-300">
              <code className="flex-1 text-center text-2xl font-mono font-bold text-purple-600 dark:text-white">
                {referralCode}
              </code>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="flex items-center bg-gray-50 dark:bg-white/5 rounded-lg p-4 mb-6">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 bg-transparent dark:text-white text-gray-700 text-sm focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="ml-3 flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Share Options */}
        <div className="bg-white dark:bg-white/5 rounded-2xl p-8 shadow-lg mb-8 border border-gray-100 dark:border-white/10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Share with Friends</h2>
            <p className="text-gray-600 dark:text-white">Choose your preferred way to invite friends</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => handleShare('whatsapp')}
              className="flex flex-col items-center p-6 rounded-xl hover:bg-green-50 transition-colors group border border-gray-200 dark:border-white/10 hover:border-green-200"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-400">WhatsApp</span>
            </button>

            <button
              onClick={() => handleShare('email')}
              className="flex flex-col items-center p-6 rounded-xl hover:bg-blue-50 dark:border-white/10 transition-colors group border border-gray-200 hover:border-blue-200"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-400">Email</span>
            </button>

            <button
              onClick={() => handleShare('facebook')}
              className="flex flex-col items-center p-6 rounded-xl hover:bg-blue-50 dark:border-white/10 transition-colors group border border-gray-200 hover:border-blue-200"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                <Facebook className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-400">Facebook</span>
            </button>

            <button
              onClick={() => handleShare('twitter')}
              className="flex flex-col items-center p-6 rounded-xl hover:bg-sky-50 dark:border-white/10 transition-colors group border border-gray-200 hover:border-sky-200"
            >
              <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-sky-200 transition-colors">
                <Twitter className="w-6 h-6 text-sky-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-400">Twitter</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-semibold mb-6">Your Referral Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold mb-2">{stats?.totalInvitees||0}</div>
              <div className="text-purple-100">Friends Invited</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">{stats?.totalInvitees||0}</div>
              <div className="text-purple-100">Successful Signups</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">{stats?.credit||0}</div>
              <div className="text-purple-100">Total Credit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}