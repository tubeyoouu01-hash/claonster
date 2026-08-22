"use client";
import React, { useEffect, useState } from 'react';
import { Settings, User, Shield, Bell, LogOut, Trash2, Edit3, Save, X } from 'lucide-react';
// Sync
import { SyncAlt } from '@mui/icons-material';
import { ISettings, useAuth, useSettings } from '../../../../hooks';
import _ from 'lodash';
import Button from '../../../../components/ui/Button';
import { IUser } from '@/states';
import toast from 'react-hot-toast';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Settings state
  // const [settings, setSettings] = useState({
  //   autoSync: true,
  //   notifications: true,
  //   twoFactor: false,
  //   darkMode: false,
  //   emailUpdates: true
  // });
  
  // Profile state
  // const [profile, setProfile] = useState({
  //   username: 'johndoe',
  //   firstName: 'John',
  //   lastName: 'Doe',
  //   email: 'john@example.com'
  // });
  const{session,updateUser,logout}=useAuth()
  const {updateBio,updateUserSetting} = useSettings()
  const [editProfile, setEditProfile] = useState<any>(session?.user);
  const [editloading ,setEditLoading] = useState(false)

  useEffect(()=>{

    setEditProfile(session?.user)
  },[session?.user])

  const toggleSetting = (key:keyof ISettings) => {

    try{
let value = false;

if (session?.settings && key in session.settings) {
  let d  = session.settings as ISettings
  
  value =!!d[key];
}
      updateUserSetting({body:{key:key,value:!value,prevalue:value}})

      // setSettings(prev => ({ ...prev, [key]: !prev[key] }));
      
    }catch(e){
      
      // setSettings(prev => ({ ...prev, [key]: !prev[key] }));

    }
  };

  const handleProfileUpdate =async  () => {


    try {
      setEditLoading(true)
await updateBio({body:_.omit(editProfile,"email")})
      // setProfile({ ...editProfile });
      setShowModal(false);
    }catch(e){

    }finally{
      setEditLoading(false)
    }
  };

  const handleLogout = () => {
    // alert('Logging out...');
    logout()
  };

  const handleDeleteAccount = () => {
    alert('Account deletion initiated...');
    setShowDeleteConfirm(false);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white/5 rounded-2xl shadow-sm border border-white/10 mb-8">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Settings</h1>
                <p className="text-gray-400 mt-1">Manage your account and preferences</p>
              </div>
              <div className="bg-white p-3 rounded-xl">
                <Settings className="w-6 h-6 text-black" />
              </div>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="px-6">
            <nav className="flex space-x-8">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-white text-white'
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/5 rounded-lg border border-white/10">
          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Profile Information</h2>
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all duration-200"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <span className="text-white">@{session?.user?.username||"N/A"}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">First Name</label>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <span className="text-white">{session?.user?.firstname}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Last Name</label>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <span className="text-white">{session?.user?.lastname}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <span className="text-white">{session?.user?.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Security Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div>
                      <h3 className="font-medium text-white">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!session?.settings?.twofactor}
                        onChange={() => {
                          toast("Coming soon")
                          toggleSetting('twofactor')}}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/50 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white peer-checked:after:bg-black"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Preferences</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center space-x-3">
                      <SyncAlt className="w-5 h-5 text-white" />
                      <div>
                        <h3 className="font-medium text-white">Auto Sync</h3>
                        <p className="text-sm text-gray-400">Automatically sync settings from environment</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!session?.settings?.autoSync}
                        onChange={() => toggleSetting('autoSync')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-cyan-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div>
                      <h3 className="font-medium text-white">Dark Mode</h3>
                      <p className="text-sm text-gray-400">Switch to dark theme</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!session?.settings?.darkMode}
                        onChange={() => {
                              toast("Coming soon")
                          toggleSetting('darkMode')}}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-cyan-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Notification Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div>
                      <h3 className="font-medium text-white">Push Notifications</h3>
                      <p className="text-sm text-gray-400">Receive notifications about important updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!session?.settings?.notifications}
                        onChange={() => toggleSetting('notifications')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-cyan-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div>
                      <h3 className="font-medium text-white">Email Updates</h3>
                      <p className="text-sm text-gray-400">Receive email notifications about account activity</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!session?.settings?.emailUpdates}
                        onChange={() => toggleSetting('emailUpdates')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-cyan-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Actions */}
          <div className="border-t border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
              
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center justify-center space-x-2 bg-red-50 text-red-600 px-6 py-3 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>

        {/* Profile Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Edit Profile</h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    value={editProfile?.username}
                    onChange={(e) => setEditProfile((prev:any) => ({ ...(prev||{}), username: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={editProfile?.firstname}
                    onChange={(e) => setEditProfile((prev:any) => ({ ...(prev||{}), firstname: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={editProfile?.lastname}
                    onChange={(e) => setEditProfile((prev:any) => ({ ...(prev||{}), lastname: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    disabled={true}
                    value={editProfile?.email}
                    onChange={(e) => setEditProfile((prev:any) => ({ ...(prev||{}), email: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-100">
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <Button
                  loading={editloading}
                  disabled={editloading}
                    onClick={handleProfileUpdate}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-red-100 p-2 rounded-full">
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Delete Account</h3>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
                </p>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  {/* <button
                    onClick={handleDeleteAccount}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete Account
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;

// import React, { useState } from 'react';
// import { Settings, User, Shield, Bell, LogOut, Trash2, Edit3, Save, X } from 'lucide-react';

// const DarkSettingsPage = () => {
//   const [activeTab, setActiveTab] = useState('profile');
//   const [showModal, setShowModal] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
//   const [settings, setSettings] = useState({
//     autoSync: true,
//     notifications: true,
//     twoFactor: false,
//     darkMode: false,
//     emailUpdates: true
//   });
  
//   const [profile, setProfile] = useState({
//     username: 'johndoe',
//     firstName: 'John',
//     lastName: 'Doe',
//     email: 'john@example.com'
//   });

//   const [editProfile, setEditProfile] = useState({ ...profile });

//   const toggleSetting = (key) => {
//     setSettings(prev => ({ ...prev, [key]: !prev[key] }));
//   };

//   const handleProfileUpdate = () => {
//     setProfile({ ...editProfile });
//     setShowModal(false);
//   };

//   const handleLogout = () => {
//     alert('Logging out...');
//   };

//   const handleDeleteAccount = () => {
//     alert('Account deletion initiated...');
//     setShowDeleteConfirm(false);
//   };

//   const tabs = [
//     { id: 'profile', label: 'Profile', icon: User },
//     { id: 'security', label: 'Security', icon: Shield },
//     { id: 'preferences', label: 'Preferences', icon: Settings },
//     { id: 'notifications', label: 'Notifications', icon: Bell }
//   ];

//   return (
//     <div className="min-h-screen bg-[#0A0A0A] py-8">
//       <div className="max-w-4xl mx-auto px-4">
//         {/* Header */}
//         <div className="bg-white/5 rounded-lg border border-white/10 mb-8">
//           <div className="p-6 border-b border-white/10">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-2xl font-bold text-white">Settings</h1>
//                 <p className="text-gray-400 mt-1">Manage your account and preferences</p>
//               </div>
//               <div className="bg-white p-3 rounded-lg">
//                 <Settings className="w-6 h-6 text-black" />
//               </div>
//             </div>
//           </div>
          
//           {/* Tab Navigation */}
//           <div className="px-6">
//             <nav className="flex space-x-8">
//               {tabs.map(tab => {
//                 const Icon = tab.icon;
//                 return (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
//                       activeTab === tab.id
//                         ? 'border-white text-white'
//                         : 'border-transparent text-gray-400 hover:text-gray-300'
//                     }`}
//                   >
//                     <Icon className="w-5 h-5" />
//                     <span className="font-medium">{tab.label}</span>
//                   </button>
//                 );
//               })}
//             </nav>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="bg-white/5 rounded-lg border border-white/10">
//           <div className="p-6">
//             {activeTab === 'profile' && (
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-xl font-semibold text-white">Profile Information</h2>
//                   <button
//                     onClick={() => setShowModal(true)}
//                     className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-200"
//                   >
//                     <Edit3 className="w-4 h-4" />
//                     <span>Edit Profile</span>
//                   </button>
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
//                       <div className="bg-white/5 p-3 rounded-lg border border-white/10">
//                         <span className="text-white">@{profile.username}</span>
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-400 mb-1">First Name</label>
//                       <div className="bg-white/5 p-3 rounded-lg border border-white/10">
//                         <span className="text-white">{profile.firstName}</span>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-400 mb-1">Last Name</label>
//                       <div className="bg-white/5 p-3 rounded-lg border border-white/10">
//                         <span className="text-white">{profile.lastName}</span>
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
//                       <div className="bg-white/5 p-3 rounded-lg border border-white/10">
//                         <span className="text-white">{profile.email}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'security' && (
//               <div className="space-y-6">
//                 <h2 className="text-xl font-semibold text-white">Security Settings</h2>
                
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
//                     <div>
//                       <h3 className="font-medium text-white">Two-Factor Authentication</h3>
//                       <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={settings.twoFactor}
//                         onChange={() => toggleSetting('twoFactor')}
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/50 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white peer-checked:after:bg-black"></div>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'preferences' && (
//               <div className="space-y-6">
//                 <h2 className="text-xl font-semibold text-white">Preferences</h2>
                
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
//                     <div className="flex items-center space-x-3">
//                       <Settings className="w-5 h-5 text-white" />
//                       <div>
//                         <h3 className="font-medium text-white">Auto Sync</h3>
//                         <p className="text-sm text-gray-400">Automatically sync settings from environment</p>
//                       </div>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={settings.autoSync}
//                         onChange={() => toggleSetting('autoSync')}
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/50 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white peer-checked:after:bg-black"></div>
//                     </label>
//                   </div>
                  
//                   <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
//                     <div>
//                       <h3 className="font-medium text-white">Dark Mode</h3>
//                       <p className="text-sm text-gray-400">Switch to dark theme</p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={settings.darkMode}
//                         onChange={() => toggleSetting('darkMode')}
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/50 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white peer-checked:after:bg-black"></div>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'notifications' && (
//               <div className="space-y-6">
//                 <h2 className="text-xl font-semibold text-white">Notification Settings</h2>
                
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
//                     <div>
//                       <h3 className="font-medium text-white">Push Notifications</h3>
//                       <p className="text-sm text-gray-400">Receive notifications about important updates</p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={settings.notifications}
//                         onChange={() => toggleSetting('notifications')}
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/50 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white peer-checked:after:bg-black"></div>
//                     </label>
//                   </div>
                  
//                   <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
//                     <div>
//                       <h3 className="font-medium text-white">Email Updates</h3>
//                       <p className="text-sm text-gray-400">Receive email notifications about account activity</p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={settings.emailUpdates}
//                         onChange={() => toggleSetting('emailUpdates')}
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/50 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white peer-checked:after:bg-black"></div>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
          
//           {/* Actions */}
//           <div className="border-t border-white/10 p-6">
//             <div className="flex flex-col sm:flex-row gap-4 justify-between">
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center justify-center space-x-2 bg-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors border border-white/10"
//               >
//                 <LogOut className="w-4 h-4" />
//                 <span>Logout</span>
//               </button>
              
//               <button
//                 onClick={() => setShowDeleteConfirm(true)}
//                 className="flex items-center justify-center space-x-2 bg-red-500/10 text-red-400 px-6 py-3 rounded-lg hover:bg-red-500/20 transition-colors border border-red-500/30"
//               >
//                 <Trash2 className="w-4 h-4" />
//                 <span>Delete Account</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Profile Edit Modal */}
//         {showModal && (
//           <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <div className="bg-[#161616] rounded-lg border border-white/10 shadow-xl max-w-md w-full">
//               <div className="p-6 border-b border-white/10">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-lg font-semibold text-white">Edit Profile</h3>
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="text-gray-400 hover:text-white"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="p-6 space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
//                   <input
//                     type="text"
//                     value={editProfile.username}
//                     onChange={(e) => setEditProfile(prev => ({ ...prev, username: e.target.value }))}
//                     className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 outline-none focus:border-white/30"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-400 mb-1">First Name</label>
//                   <input
//                     type="text"
//                     value={editProfile.firstName}
//                     onChange={(e) => setEditProfile(prev => ({ ...prev, firstName: e.target.value }))}
//                     className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 outline-none focus:border-white/30"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-400 mb-1">Last Name</label>
//                   <input
//                     type="text"
//                     value={editProfile.lastName}
//                     onChange={(e) => setEditProfile(prev => ({ ...prev, lastName: e.target.value }))}
//                     className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 outline-none focus:border-white/30"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
//                   <input
//                     type="email"
//                     disabled={true}
//                     value={editProfile.email}
//                     onChange={(e) => setEditProfile(prev => ({ ...prev, email: e.target.value }))}
//                     className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-gray-500 placeholder-gray-500 outline-none opacity-50 cursor-not-allowed"
//                   />
//                 </div>
//               </div>
              
//               <div className="p-6 border-t border-white/10">
//                 <div className="flex space-x-3">
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="flex-1 px-4 py-2 text-white border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleProfileUpdate}
//                     className="flex-1 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center justify-center space-x-2"
//                   >
//                     <Save className="w-4 h-4" />
//                     <span>Save Changes</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Delete Confirmation Modal */}
//         {showDeleteConfirm && (
//           <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <div className="bg-[#161616] rounded-lg border border-white/10 shadow-xl max-w-md w-full">
//               <div className="p-6">
//                 <div className="flex items-center space-x-3 mb-4">
//                   <div className="bg-red-500/20 p-2 rounded-full">
//                     <Trash2 className="w-5 h-5 text-red-400" />
//                   </div>
//                   <h3 className="text-lg font-semibold text-white">Delete Account</h3>
//                 </div>
                
//                 <p className="text-gray-400 mb-6">
//                   Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
//                 </p>
                
//                 <div className="flex space-x-3">
//                   <button
//                     onClick={() => setShowDeleteConfirm(false)}
//                     className="flex-1 px-4 py-2 text-white border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleDeleteAccount}
//                     className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                   >
//                     Delete Account
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DarkSettingsPage;
