"use client";
import React, { useState } from 'react';
import { 
  Code,
  Check,
  Zap,
  Shield,
  Cloud,
  Users,
  Database,
  Globe,
  Star,
  ChevronRight,
  Sparkles,
  Crown,
  Building,
  Headphones,
  Lock,
  RotateCcw,
  Bell,
  Github,
  Twitter
} from 'lucide-react';
import { usePayment } from '../../../hooks';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Button from '../../../components/ui/Button';
import { APPNAME, APPTWITERURL, creditDurationMonth, creditVersion } from '../../../const';

export default function PricingPage() {
  const router = useRouter()
  const [isYearly, setIsYearly] = useState(false);
const {plansmemo,getcheckoutUrl,getcurrentsubscription,gettransactions} = usePayment()
  // const plans = [
  //   {
  //     name: "Developer",
  //     description: "Perfect for individual developers and small projects",
  //     monthlyPrice: 0,
  //     yearlyPrice: 0,
  //     popular: false,
  //     icon: <Code className="w-6 h-6" />,
  //     gradient: "from-gray-500 to-gray-600",
  //     features: [
  //       "Up to 3 projects",
  //       "Basic environment sync",
  //       "Standard encryption",
  //       "Email support",
  //       "5GB storage",
  //       "Community access"
  //     ]
  //   },
  //   {
  //     name: "Professional",
  //     description: "For growing teams and production applications",
  //     monthlyPrice: 29,
  //     yearlyPrice: 290, // 2 months free
  //     popular: true,
  //     icon: <Zap className="w-6 h-6" />,
  //     gradient: "from-purple-500 to-cyan-500",
  //     features: [
  //       "Unlimited projects",
  //       "Real-time sync",
  //       "Military-grade encryption",
  //       "Priority support",
  //       "100GB storage",
  //       "Advanced callbacks",
  //       "Team collaboration",
  //       "Version history",
  //       "API access"
  //     ]
  //   },
  //   {
  //     name: "Enterprise",
  //     description: "For large organizations with advanced security needs",
  //     monthlyPrice: 99,
  //     yearlyPrice: 990, // 2 months free
  //     popular: false,
  //     icon: <Building className="w-6 h-6" />,
  //     gradient: "from-yellow-500 to-orange-500",
  //     features: [
  //       "Everything in Professional",
  //       "SSO integration",
  //       "Advanced audit logs",
  //       "Custom integrations",
  //       "Unlimited storage",
  //       "24/7 phone support",
  //       "SLA guarantee",
  //       "On-premise deployment",
  //       "Custom contracts",
  //       "Dedicated account manager"
  //     ]
  //   }
  // ];
const [loading,setLoading] = useState<any>(null)
  const faqs = [
    {
      question: "Can I switch plans at any time?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated and reflected in your next billing cycle."
    },
    {
      question: "What happens if I exceed my project limit?",
      answer: "We'll notify you when you're approaching your limit. You can upgrade your plan or we'll help you manage your usage."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use military-grade encryption, zero-trust architecture, and comply with SOC 2 Type II standards."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. No questions asked."
    },
    {
      question: "Can I use my own encryption keys?",
      answer: "Enterprise customers can bring their own encryption keys (BYOK) for additional security and compliance requirements."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">{APPNAME} Pro</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="/#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="/pricing" className="text-purple-400 font-medium">Pricing</a>
          <a href="/docs" className="text-gray-300 hover:text-white transition-colors">Docs</a>
          <button className="bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-2 rounded-lg text-white font-medium hover:shadow-lg transform hover:scale-105 transition-all">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-20">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full border border-purple-500/30 mb-8">
            <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-purple-300 text-sm">14-Day Free Trial • No Credit Card Required</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Simple, Transparent
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}Pricing
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Choose the perfect plan for your needs. Start free and scale as you grow. All plans include our core security and sync features.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-16">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-1">
              <div className="flex items-center">
                <button
                  onClick={() => setIsYearly(false)}
                  className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                    !isYearly 
                      ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsYearly(true)}
                  className={`px-6 py-3 rounded-lg text-sm font-medium transition-all relative ${
                    isYearly 
                      ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg' 
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
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plansmemo(isYearly).map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gray-900/50 backdrop-blur-sm rounded-2xl border transition-all duration-300 hover:transform hover:scale-105 ${
                plan.popular 
                  ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20' 
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 rounded-full">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-medium">Most Popular</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center text-white`}>
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                    {plan.name === "Enterprise" && (
                      <Crown className="w-5 h-5 text-yellow-400 inline ml-2" />
                    )}
                  </div>
                </div>

                <p className="text-gray-400 mb-8">{plan.description}</p>

                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-white">
                      ${plan.amount}
                    </span>
                    <span className="text-gray-400 ml-2">/{isYearly?"annually":"monthly"}</span>
                  </div>
                  {/* {isYearly && plan.amount > 0 && (
                    <p className="text-green-400 text-sm mt-2">
                      ${plan.amount}/year (Save ${(plan.monthlyPrice * 12) - plan.yearlyPrice})
                    </p>
                  )} */}
                </div>

                <Button disabled={loading==plan.title} loading={loading==plan.title} className={`w-full py-4 rounded-xl font-semibold text-lg transition-all mb-8 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:shadow-xl transform hover:scale-105'
                    : 'border border-gray-600 text-white hover:bg-gray-800'
                }`} 
                onClick={async ()=>{

                  try{
 

                    setLoading(plan.title)
                    if(plan.free){
  
                      toast.success("Sign up to access our free beta plan")
  router.push("/signup")
                    }else{
                                           if(creditVersion){
    toast.success(`This action is unavailalble, You currently have free credit for ${creditDurationMonth} months`)
    return
  }
  
                   await   getcheckoutUrl({plan_code:plan.plan_code})
                    }
                  }catch(e:any){
                    toast.success(e.message||"An error occured")
                  }finally{
                     setLoading(null)
                  }


                }}
                >
                  {plan.amount === 0 ? 'Start Free' : 'Start Trial'}
                </Button>

                <ul className="space-y-4">
                  {plan.features.map((feature:any, featureIndex:number) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700 p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Need Something Custom?</h3>
            <p className="text-gray-300 mb-6">
              We work with enterprise customers to create custom solutions that fit your unique requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-3 rounded-lg text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center">
                Contact Sales
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
              <button className="border border-gray-600 px-8 py-3 rounded-lg text-white font-semibold hover:bg-gray-800 transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Comparison */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            All Plans Include
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}Core Features
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Every plan comes with the essential features you need to manage your environment variables securely.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 text-center">
            <Shield className="w-8 h-8 text-blue-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-white mb-2">End-to-End Encryption</h4>
            <p className="text-gray-400 text-sm">Military-grade security for all your data</p>
          </div>

          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 text-center">
            <RotateCcw className="w-8 h-8 text-green-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-white mb-2">Real-Time Sync</h4>
            <p className="text-gray-400 text-sm">Instant updates across all environments</p>
          </div>

          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 text-center">
            <Globe className="w-8 h-8 text-purple-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-white mb-2">Global CDN</h4>
            <p className="text-gray-400 text-sm">Lightning-fast access worldwide</p>
          </div>

          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 text-center">
            <Bell className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-white mb-2">Smart Callbacks</h4>
            <p className="text-gray-400 text-sm">Automated actions on variable changes</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Frequently Asked
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}Questions
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Got questions? We've got answers.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
              <h4 className="text-lg font-semibold text-white mb-3">{faq.question}</h4>
              <p className="text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-3xl border border-purple-500/20 p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of developers who trust {APPNAME} Pro with their environment management.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-500 to-cyan-500 px-10 py-4 rounded-xl text-white font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center">
              Start Free Trial
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
            <button className="border border-gray-600 px-10 py-4 rounded-xl text-white font-semibold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center">
              <Headphones className="w-5 h-5 mr-2" />
              Talk to Sales
            </button>
          </div>
          
          <p className="text-gray-400 mt-6">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800">
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
              <a href={APPTWITERURL} className="text-gray-400 hover:text-white transition-colors">
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