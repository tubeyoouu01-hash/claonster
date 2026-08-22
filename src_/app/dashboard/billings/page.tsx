"use client"
import React, { useState, useEffect } from 'react';
import { useAuth, usePayment } from '../../../../hooks';
import { plansVar } from '@/more';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { creditDurationMonth, creditVersion } from '../../../../const';

const BillingPage = () => {
  const [subscription, setSubscription] = useState<any>(null);
  const [transactions, setTransactions] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [processingUpgrade, setProcessingUpgrade] = useState(false);
const [annually ,setAnnually] = useState(false)
const {plansmemo,getcheckoutUrl,getcurrentsubscription,gettransactions} = usePayment()
  // Mock session - replace with your auth hook
  // const session = { token: 'mock-token' };
  const {session} = useAuth()
  const router = useRouter()
  

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchBillingData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        let currentsub =await  getcurrentsubscription()

    
        // Mock subscription data
        setSubscription(
       currentsub
        );
let t = await gettransactions()

if(t.success){
setTransactions(t.data)
}
        // Mock transaction history
        // setTransactions([
        //   {
        //     id: '1',
        //     date: '2024-12-15',
        //     description: 'Free Plan - Account Creation',
        //     amount: 0,
        //     status: 'completed',
        //     type: 'subscription'
        //   },
        //   {
        //     id: '2',
        //     date: '2024-11-20',
        //     description: 'Welcome Bonus',
        //     amount: 0,
        //     status: 'completed',
        //     type: 'credit'
        //   }
        // ]);
      } catch (error) {
       
      } finally {
        setLoading(false);
      }
    };

    if (session?.token) {
      fetchBillingData();
    }
  }, [session?.token]);

  const plans = [
    {
      name: 'Free',
      price: 0,
      period: 'forever',
      features: [
        '3 Projects',
        '5 Team Members',
        '5GB Storage',
        '1,000 API Calls/month',
        'Basic Support'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: 29,
      period: 'month',
      features: [
        'Unlimited Projects',
        '25 Team Members',
        '100GB Storage',
        '50,000 API Calls/month',
        'Priority Support',
        'Advanced Analytics',
        'Custom Integrations'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 99,
      period: 'month',
      features: [
        'Everything in Pro',
        'Unlimited Team Members',
        '1TB Storage',
        'Unlimited API Calls',
        '24/7 Phone Support',
        'White-label Options',
        'Dedicated Account Manager',
        'Custom SLA'
      ],
      popular: false
    }
  ];

  const handleUpgrade = (plan:any) => {
    setSelectedPlan(plan);
  };



  const confirmUpgrade = async () => {
    if (!selectedPlan) return;
    
    setProcessingUpgrade(true);
    try {
          if(selectedPlan?.free){
  
                      toast.success("Your currently using free plan")
  return router.push("/dashboard/projects")
                    }

                      if(creditVersion){
    toast.success(`This action is unavailalble, You currently have free credit for ${creditDurationMonth} months`)
    return
  }
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      await getcheckoutUrl({plan_code:selectedPlan.plan_code})
      // Update subscription
      setSubscription((prev:any) => ({
        ...prev,
        plan: selectedPlan.title,
        amount: selectedPlan.amount,
        nextBilling: selectedPlan.amount > 0 
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          : null
      }));

      // Add transaction
      const newTransaction = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        description: `${selectedPlan.price === 0 ? 'Downgraded to' : 'Upgraded to'} ${selectedPlan.name} Plan`,
        amount: selectedPlan.price,
        status: 'completed',
        type: 'subscription'
      };
      
      setTransactions((prev:any) => [newTransaction, ...prev]);
      setShowUpgradeModal(false);
      setSelectedPlan(null);
      

    } catch (error) {
    
      alert('Failed to update plan. Please try again.');
    } finally {
      setProcessingUpgrade(false);
    }
  };

  const getUsagePercentage = (used:number, limit:number) => {
    return Math.min((used / limit) * 100, 100);
  };

  const getUsageColor = (percentage:number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-gradient-to-r from-purple-500 to-cyan-500';
  };

  const formatDate = (dateString:string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

 
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A] flex items-center justify-center">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          <span className="ml-3 text-gray-600">Loading billing information...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A]  py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Billing & Subscription</h1>
          <p className="text-gray-600 dark:text-gray-400  mt-2">Manage your subscription and view billing history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Subscription */}
          <div className="lg:col-span-2 space-y-6">
            {/* Subscription Card */}
            <div className="bg-white dark:bg-white/5 dark:text-white rounded-lg shadow-sm border p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Current Subscription</h2>
                  <p className="text-gray-600 dark:text-gray-400">Manage your current plan and usage</p>
                </div>
                <div className="text-left sm:text-right ">
                  <div className="bg-gradient-to-r from-purple-500 to-cyan-500  text-white px-4 py-2 rounded-full text-sm font-medium inline-block">
                    {subscription?.name} Plan
                  </div>
                  {(subscription?.status=== 'active' || subscription?.free)  && (
                    <span className="text-green-600 text-sm mt-1 block">Active</span>
                  )}
                </div>
              </div>

              {/* Plan Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 dark:bg-white/5 rounded-lg">
                  <p className="text-gray-600 dark:text-white text-sm">Monthly Cost</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${subscription?.amount}
                    {subscription?.amount > 0 && <span className="text-lg font-normal text-gray-600">/mo</span>}
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-white/5 rounded-lg">
                  <p className="text-gray-600 dark:text-white text-sm">Started</p>
                  <p className="text-lg font-semibold dark:text-white text-gray-900">
                    {subscription?.createdAt && formatDate(subscription?.createdAt)||"N/A"}
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-white/5 rounded-lg">
                  <p className="text-gray-600 dark:text-white text-sm">Next Billing</p>
                  <p className="text-lg font-semibold dark:text-white text-gray-900">
                    {subscription?.nextPayment ? formatDate(subscription.nextPayment) : 'N/A'}
                  </p>
                </div>
              </div>

              {/* Usage Stats */}
              {/* <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Usage Overview</h3>
                
                {Object.entries(subscription?.features || {}).map(([key, usage]) => {
                  const percentage = getUsagePercentage(usage.used, usage.limit);
                  const colorClass = getUsageColor(percentage);
                  
                  return (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize text-gray-700">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-gray-600">
                          {usage.used} / {usage.limit} {key === 'storage' ? 'GB' : ''}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${colorClass}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div> */}

              {
              subscription?.plan === 'Free' &&
               (
                <div className="mt-6 p-4  bg-gradient-to-r from-purple-50 to-cyan-50 border border-purple-200 rounded-lg dark:bg-white/5 dark:bg-none dark:border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0">
                    <svg className="h-5 w-5 text-purple-600 dark:text-white mt-0.5 mr-0 sm:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex-1">
                      <h4 className="font-medium text-purple-900 dark:text-white mb-1">Ready to unlock more features?</h4>
                      <p className="text-purple-700 dark:text-gray-400 text-sm mb-3">
                        Upgrade to Pro or Enterprise to get unlimited projects, more team members, and advanced features.
                      </p>
                      <button
                        onClick={() => setShowUpgradeModal(true)}
                        className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-cyan-600 transition-colors"
                      >
                        View Upgrade Options
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Transaction History */}
            <div className="bg-white dark:bg-white/5 rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Transaction History</h2>
                <p className="text-gray-600 dark:text-gray-400">Your billing and payment history</p>
              </div>
              
              <div className="overflow-x-auto">
                {transactions.length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-500 dark:text-white mt-2">No transactions yet</p>
                  </div>
                ) : (
                  <div className="min-w-full">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-white/3">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase">Description</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {transactions.map((transaction:any) => (
                          <tr key={transaction._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white whitespace-nowrap">
                              {formatDate(transaction.createdAt)}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                              <div className="flex items-center">
                                { (
                                  <svg className="h-4 w-4 text-purple-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                  </svg>
                                )}
                                {/* {!!!transaction.subscriptionCode  && (
                                  <svg className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                  </svg>
                                )} */}
                                {transaction?.description||"Your Payment has being proccessed "}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                              <span className={transaction.amount === 0 ? 'text-gray-600 dark:text-white' : 'text-gray-900 dark:text-white/2'}>
                                ${transaction.amount}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            (    transaction.status === 'completed'||  transaction.status === 'success'  )
                                  ? 'bg-green-100 text-green-800'
                                  : transaction.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {transaction.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-white/5 rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
          {subscription?.free  ?      <button
                  onClick={() => setShowUpgradeModal(true)}
                  className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-cyan-600 transition-colors"
                >
                  {subscription?.free ? 'Upgrade Plan' : 'Change Plan'}
                </button>:null}
                {
                  subscription?.invoice ?

                <button className="w-full border border-gray-300 text-gray-700 dark:text-white dark:bg-none dark:bg-white/5 dark:border-white/10 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Download Invoice
                </button>
                :null
                }
                {/* <button className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Payment Methods
                </button> */}
              </div>
            </div>

            {/* Support */}
            <div className="bg-white dark:bg-white/5 rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Need Help?</h3>
              <div className="space-y-3 text-sm">
                {/* <a href="#" className="flex items-center text-purple-600 hover:text-purple-700 transition-colors">
                  <svg className="h-4 w-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Billing FAQ
                </a> */}
                <a href="/contact" className="flex items-center text-purple-600 dark:text-white hover:text-purple-700 transition-colors">
                  <svg className="h-4 w-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Support
                </a>
                <a href="/docs" className="flex items-center text-purple-600 dark:text-white hover:text-purple-700 transition-colors">
                  <svg className="h-4 w-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowUpgradeModal(false)}></div>
          
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white dark:bg-[#0A0A0A] rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                 {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-16">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-1">
              <div className="flex items-center">
                <button
                  onClick={() => setAnnually(false)}
                  className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                    !annually 
                      ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg ' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setAnnually(true)}
                  className={`px-6 py-3 rounded-lg text-sm font-medium transition-all relative ${
                    annually 
                      ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg ' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Yearly
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Save 20%
                  </span>
                </button>
              </div>
            </div>
          </div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Choose Your Plan</h3>
                  <button
                    onClick={() => {
                      setShowUpgradeModal(false);
                      setSelectedPlan(null);
                    }}
                    className="text-gray-400 dark:text-white hover:text-gray-600 transition-colors"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plansmemo(annually).map((plan) => (
                    <div
                      key={plan.title}
                      className={`border rounded-lg p-6 relative transition-all dark:bg-white/5 ${
                        plan.popular
                          ? 'border-purple-500 shadow-lg'
                          : 'border-gray-200 dark:border-white/10'
                      } ${
                        subscription?.title?.toLowerCase() === plan?.title?.toLowerCase() 
                          ? 'bg-gray-50 '
                          : 'bg-white hover:shadow-md cursor-pointer'
                      } ${
                        selectedPlan?.title?.toLowerCase()  === plan?.title?.toLowerCase() 
                          ? 'ring-2 ring-purple-500 border-purple-500'
                          : ''
                      }`}
                      onClick={() => subscription?.title !== plan.title && handleUpgrade(plan)}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Most Popular
                          </span>
                        </div>
                      )}
                      
                      <div className="text-center mb-4">
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{plan.title||plan.name}</h4>
                        <div className="mt-2">
                          <span className="text-4xl font-bold text-gray-900 dark:text-white">${plan.amount||0}</span>
                          {plan.price > 0 && <span className="text-gray-600 dark:text-white">/{plan.interval}</span>}
                        </div>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature:any, index:number) => (
                          <li key={index} className="flex items-center text-sm">
                            <svg className="h-4 w-4 text-green-500 dark:text-white mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div>
                        {subscription?.title?.toLowerCase()  === plan.title?.toLowerCase()  ? (
                          <button
                            disabled
                            className="w-full bg-gray-100 text-gray-500  px-4 py-2 rounded-lg font-medium cursor-not-allowed"
                          >
                            Current Plan
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUpgrade(plan)}
                            className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                              selectedPlan?.title?.toLowerCase()  === plan.title?.toLowerCase()
                                ? 'bg-purple-600 text-white'
                                : plan.popular
                                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:from-purple-600 hover:to-cyan-600'
                                : 'border border-gray-300 text-gray-700 dark:text-white dark:border-white/10 hover:bg-gray-50'
                            }`}
                          >
                            {selectedPlan?.title?.toLowerCase() === plan.title ?.toLowerCase()
                              ? 'Selected'
                              : plan.name === 'Free' 
                              ? 'Downgrade' 
                              : 'Select Plan'
                            }
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {selectedPlan && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-cyan-50 border border-purple-200 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                      <div>
                        <p className="font-medium text-purple-900">
                          {selectedPlan?.free ? 'Downgrade' : 'Upgrade'} to {selectedPlan?.name.toLowerCase()} Plan
                        </p>
                        <p className="text-purple-700 text-sm">
                          {selectedPlan.amount === 0 
                            ? 'You will lose access to premium features'
                            : `You'll be charged $${selectedPlan.amount}/${selectedPlan.interval} starting today`
                          }
                        </p>
                      </div>
                      <button
                        onClick={confirmUpgrade}
                        disabled={processingUpgrade}
                        className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {processingUpgrade ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Processing...
                          </div>
                        ) : (
                          'Confirm'
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingPage;