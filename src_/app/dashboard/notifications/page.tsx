"use client";
import React, { useEffect, useState } from 'react';
import { 
  Code,
  Bell,
  CheckCircle,
  Shield,
  RotateCcw,
  Database,
  Users,
  Settings,
  Trash2,
  Filter,
  Search,
  Globe,
  Clock,
  Eye,
  AlertTriangle,
  Crown,
  Github,
  Twitter,
  Dot
} from 'lucide-react';
import { useAuth, useFetch } from '../../../../hooks';
import _ from 'lodash';
import { APPNAME, NOTIFICATIONURL } from '../../../../const';
import { getreadabledate } from '@/utils';
import { notsstate } from '@/states';
import { useAtom } from 'jotai';

export default function NotificationsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [notstats, setNotStats] = useAtom(notsstate);
  // const [notifications, setNotifications] = useState([
  //   {
  //     id: 1,
  //     type: 'sync',
  //     title: 'Environment Sync Completed',
  //     message: 'Successfully synced 47 variables to production environment',
  //     time: '2 minutes ago',
  //     read: false,
  //     project: 'E-commerce API'
  //   },
  //   {
  //     id: 2,
  //     type: 'security',
  //     title: 'Security Alert: New Login Location',
  //     message: 'New login detected from San Francisco, CA. If this wasn\'t you, secure your account immediately.',
  //     time: '15 minutes ago',
  //     read: false,
  //     project: 'Account Security'
  //   },
  //   {
  //     id: 3,
  //     type: 'callback',
  //     title: 'Callback Triggered: Database Restart',
  //     message: 'Database service restarted automatically after DATABASE_URL variable update',
  //     time: '1 hour ago',
  //     read: true,
  //     project: 'User Management System'
  //   },
  //   {
  //     id: 4,
  //     type: 'team',
  //     title: 'Team Member Added',
  //     message: 'Sarah Chen has been added to the "Mobile App" project with Developer permissions',
  //     time: '2 hours ago',
  //     read: true,
  //     project: 'Mobile App'
  //   },
  //   {
  //     id: 5,
  //     type: 'update',
  //     title: 'Variable Updated',
  //     message: 'API_RATE_LIMIT has been changed from 1000 to 2000 in staging environment',
  //     time: '3 hours ago',
  //     read: false,
  //     project: 'Payment Gateway'
  //   },
  //   {
  //     id: 6,
  //     type: 'deployment',
  //     title: 'Deployment Successful',
  //     message: 'Environment variables deployed successfully to 3 regions (US, EU, APAC)',
  //     time: '4 hours ago',
  //     read: true,
  //     project: 'Global CDN'
  //   },
  //   {
  //     id: 7,
  //     type: 'billing',
  //     title: 'Upgrade Available',
  //     message: 'You\'re approaching your project limit. Upgrade to Professional for unlimited projects.',
  //     time: '6 hours ago',
  //     read: false,
  //     project: 'Account Management'
  //   },
  //   {
  //     id: 8,
  //     type: 'error',
  //     title: 'Sync Failed',
  //     message: 'Failed to sync variables to production. Network timeout error. Retrying automatically.',
  //     time: '1 day ago',
  //     read: true,
  //     project: 'Analytics Dashboard'
  //   }
  // ]);
const {apifetch} = useFetch()
const {session} = useAuth()
  const [ notifications, setNotifications] = useState<any>({
    hasMore:false,
    nextPage:1,
    data:[  
    //    {
    //   id: 1,
    //   _id: 1,
    //   type: 'sync',
    //   head: 'Environment Sync Completed',
    //   message: 'Successfully synced 47 variables to production environment',
    //   time: '2 minutes ago',
    //   read: false,
    //   project: 'E-commerce API'
    // },
  ]
  })

const fetchnotification = async ()=>{


let data =   await apifetch({url:NOTIFICATIONURL+`?nextPage=1`})

if(data.success){
  setNotifications(data.data)
}

}


  useEffect(() => {
    if (notifications.data.length > 0) {
     let lastRead = notifications.data[notifications.data.length - 1].createdAt;
         apifetch({ url: `/api/nots/updatelastread?lastRead=${lastRead}` });
    }
  }, [ notifications]);
const fetchmorenotification = async ({nextPage=1})=>{


let data =   await apifetch({url:NOTIFICATIONURL+`?nextPage=${nextPage}`})

if(data.success){
  setNotifications((d:any)=>{
    return {...d,...data.data,data:_.uniqBy([...(d.data||[]),...(data.data.data||[])],"_id")}
  })
}

}


  // const [notstats, setNotStats] = useAtom(notsstate);
const fetchnotstats = async ()=>{

      let data = await apifetch({ url: "/api/nots/stats" });
      if(data.success){
        setNotStats(data.data)
      }

}
  useEffect(()=>{
    if(session?.token,session?.secretPhrase){

      
fetchnotstats()
      fetchnotification()
    }
  },[session?.token,session?.secretPhrase])

  const filters = [
    { id: 'all', label: 'All', count: notifications.data.length },
    { id: 'unread', label: 'Unread', count: notifications.data.filter((n:any) => !n.read).length },
    { id: 'security', label: 'Security', count: notifications.data.filter((n:any) => n.type === 'security').length },
    { id: 'sync', label: 'Sync', count: notifications.data.filter((n:any) => n.type === 'sync').length },
    { id: 'team', label: 'Team', count: notifications.data.filter((n:any)=> n.type === 'team').length }
  ];
const isRead =(date:string)=>{

  return new Date(date) > new Date(notstats.lastRead)

}
  const getNotificationIcon = (type:string) => {
    const iconClass = "w-4 h-4 text-gray-500";
    switch (type) {
      case 'sync': return <RotateCcw className={iconClass} />;
      case 'security': return <Shield className={iconClass} />;
      case 'callback': return <Database className={iconClass} />;
      case 'team': return <Users className={iconClass} />;
      case 'update': return <Settings className={iconClass} />;
      case 'deployment': return <Globe className={iconClass} />;
      case 'billing': return <Crown className={iconClass} />;
      case 'error': return <AlertTriangle className={iconClass} />;
      default: return <Bell className={iconClass} />;
    }
  };

  const markAsRead = (id:string) => {
    // setNotifications(prev => 
    //   prev.map(notification => 
    //     notification.id === id ? { ...notification, read: true } : notification
    //   )
    // );
  };

  const markAllAsRead = () => {
    // setNotifications(prev => 
    //   prev.map(notification => ({ ...notification, read: true }))
    // );
  };

  const deleteNotification = (id:string) => {
    // setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const filteredNotifications = notifications.data.filter((notification:any) => {
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'unread' && !notification.read) ||
                         notification.type === selectedFilter;
    
    const matchesSearch = notification.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase()) 
                        //  notification.project.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // const unreadCount = notifications.data.filter(n => !n.read).length;
  const unreadCount = notstats?.new||0

  return (
    <div className="min-h-screen ">
      {/* Navigation */}
     

      <div className=" z-10 max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white dark:bg-white/5 dark:border-white/10  rounded-2xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
                <p className="text-gray-600 mt-1 dark:text-white">Stay updated on your environment changes and activities</p>
              </div>
              {/* {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Mark all as read</span>
                </button>
              )} */}
            </div>
          </div>

          {/* Filters and Search */}
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                {filters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedFilter === filter.id
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-200 dark:border-white/5'
                    }`}
                  >
                    <span>{filter.label}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      selectedFilter === filter.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-gray-100 text-gray-600 dark:text-black'
                    }`}>
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Search */}
              {/* <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div> */}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white dark:bg-white/5 dark:border-white/10 rounded-2xl shadow-sm border border-gray-200">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center">
              <Bell className="w-12 h-12 text-gray-300 dark:text-white mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2 dark:text-white">No notifications found</h3>
              <p className="text-gray-500 dark:text-white">
                {searchTerm ? 'Try adjusting your search terms.' : 'You\'re all caught up!'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:bg-white/5">
              {filteredNotifications.map((notification:any) => (
                <div
                  key={notification?._id}
                  className={`p-6 hover:bg-gray-50 dark:text-white dark:bg-white/5 transition-colors ${
                    !isRead(notification?.createdAt) ? 'bg-purple-50/30' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {/* Icon and Unread Indicator */}
                      <div className="flex items-center space-x-2 mt-1">
                        {getNotificationIcon(notification.type)}
                        {!isRead(notification.createdAt) && (
                          <Dot className="w-3 h-3 text-purple-500 dark:text-white -ml-1" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium mb-1 ${
                          isRead(notification.createdAt) ? 'text-gray-700 dark:text-white' : 'text-gray-900 dark:text-gray-400'
                        }`}>
                          {isRead(notification.createdAt)}
                        </h4>
                        
                        <p className={`mb-3 ${
                          isRead(notification.createdAt) ? 'text-gray-500 dark:text-white' : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {getreadabledate(notification.createdAt)}
                          </div>
                          {/* <div className="flex items-center">
                            <Code className="w-3 h-3 mr-1" />
                            {notification.project}
                          </div> */}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      {!isRead(notification.createdAt) && (
                        <button
                          onClick={() => markAsRead(notification._id)}
                          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                          title="Mark as read"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      {/* <button
                        onClick={() => deleteNotification(notification._id)}
                        className="p-2 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                        title="Delete notification"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More */}
          {/* {filteredNotifications.length > 0 && (
            <div className="p-6 border-t border-gray-100 text-center">
              <button className="text-gray-600 hover:text-gray-900 font-medium">
                Load more notifications
              </button>
            </div>
          )} */}
        </div>

        {/* Settings CTA */}
        {/* <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Customize Your Notifications
            </h3>
            <p className="text-gray-600 mb-4">
              Manage what notifications you receive and how you want to be alerted.
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-2 rounded-lg text-white font-medium hover:shadow-lg transition-all flex items-center mx-auto">
              <Settings className="w-4 h-4 mr-2" />
              Notification Settings
            </button>
          </div>
        </div> */}
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">{APPNAME} Pro</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 {APPNAME} Pro. All rights reserved. Built for developers, by developers.</p>
          </div>
        </div>
      </footer>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rotate-45 blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 rotate-45 blur-3xl"></div>
      </div>
    </div>
  );
}