"use client";
import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  Shield, 
  Zap, 
  RotateCcw, 
  Bell, 
  Code, 
  Lock, 
  RefreshCw, 
  Database, 
  Server, 
  CheckCircle, 
  ArrowRight, 
  Play, 
  Terminal,
  Globe,
  Users,
  Clock,
  Eye,
  EyeOff,
  Copy,
  Star,
  Sparkles,
  ChevronRight,
  Github,
  Twitter
} from 'lucide-react';
import { APPNAME, APPNAME_3, APPTWITERURL, DOMAINAPI } from '../../const';
import { useRouter } from 'next/navigation';
import { publicKeyAtom } from '@/states';
import { useAtom } from 'jotai';

export default function DotEnvHomepage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isCodeVisible, setIsCodeVisible] = useState(true);
  const [animatedText, setAnimatedText] = useState('');
  const router = useRouter()
  

  const fullText = `${APPNAME_3}.config()`;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setAnimatedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 150);
    
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Cloud-Native Sync",
      description: "Seamlessly sync environment variables between local development and cloud deployment with one command.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Military-Grade Security",
      description: "End-to-end encryption ensures your sensitive data remains protected at all times.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-Time Updates",
      description: "Environment changes propagate instantly across all your environments without downtime.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Smart Callbacks",
      description: "Automated notifications and custom actions when environment variables change.",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const codeExample = `// Before: Complex environment management
process.env.DATABASE_URL = 'manual-config'
process.env.API_KEY = 'hardcoded-values'
// Multiple files, CLI tools, manual syncing...

// After: Simple, powerful, secure
import ${APPNAME_3} from '@xavren/dotenv'

${APPNAME_3}.config() // That's it! 🚀
// ✅ Automatic cloud sync
// ✅ Real-time updates  
// ✅ Encrypted & secure
// ✅ Smart callbacks`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">{APPNAME} Pro</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
          <a href="/docs" className="text-gray-300 hover:text-white transition-colors">Docs</a>
          <button onClick={()=>{
            router.push("/signup")
          }} className="bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-2 rounded-lg text-white font-medium hover:shadow-lg transform hover:scale-105 transition-all">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full border border-purple-500/30 mb-8">
              <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-purple-300 text-sm">No CLI Required • Zero Configuration</span>
            </div>
            
            <div className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight ">
            <h1 className=" flex max-sm:flex-col">
             <span>
               Environment 
              </span>
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Variables
              </span>
              <br className='max-sm:hidden' />
            </h1>
              Made Simple
            </div>
            
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Manage, sync, and secure your environment variables across all environments with military-grade encryption, real-time updates, and intelligent callbacks. All with just one line of code.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <button onClick={()=>{
                router.push("/signup")
              }} className="group bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-4 rounded-xl text-white font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              {/* <button className="border border-gray-600 px-8 py-4 rounded-xl text-white font-semibold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button> */}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-gray-400">Developers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">99.9%</div>
                <div className="text-gray-400">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">10ms</div>
                <div className="text-gray-400">Sync Time</div>
              </div>
            </div>
          </div>

          {/* Code Demo */}
          <div className="relative">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 text-sm">app.js</span>
                <button
                  onClick={() => setIsCodeVisible(!isCodeVisible)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {isCodeVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {isCodeVisible && (
                <div className="p-6">
                  <div className="text-2xl font-mono text-green-400 mb-8">
                    <span className="text-gray-500">$ </span>
                    <span className="border-r-2 border-green-400 animate-pulse">
                      {animatedText}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-green-400">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span>✅ Connected to cloud environment</span>
                    </div>
                    <div className="flex items-center text-blue-400">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      <span>🔄 Synced 47 variables in 8ms</span>
                    </div>
                    <div className="flex items-center text-purple-400">
                      <Shield className="w-4 h-4 mr-2" />
                      <span>🔐 All data encrypted end-to-end</span>
                    </div>
                    <div className="flex items-center text-yellow-400">
                      <Bell className="w-4 h-4 mr-2" />
                      <span>🔔 Callback listeners active</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-xl opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-xl opacity-40 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20" id="features">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Everything You Need for
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}Environment Management
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From local development to production deployment, manage your environment variables with confidence and security.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group p-8 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all cursor-pointer ${
                activeFeature === index ? 'bg-gray-800/50' : 'bg-gray-900/30'
              }`}
              onClick={() => setActiveFeature(index)}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 text-white`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 text-lg">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Detailed Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
            <RefreshCw className="w-8 h-8 text-blue-400 mb-4" />
            <h4 className="text-lg font-semibold text-white mb-2">Auto-Restart Services</h4>
            <p className="text-gray-400">Automatically restart databases, servers, or any service when environment variables change.</p>
          </div>
          
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
            <Database className="w-8 h-8 text-green-400 mb-4" />
            <h4 className="text-lg font-semibold text-white mb-2">Database Integration</h4>
            <p className="text-gray-400">Seamlessly manage database connections and configurations across environments.</p>
          </div>
          
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
            <Server className="w-8 h-8 text-purple-400 mb-4" />
            <h4 className="text-lg font-semibold text-white mb-2">Multi-Environment</h4>
            <p className="text-gray-400">Development, staging, and production environments synchronized effortlessly.</p>
          </div>
          
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
            <Globe className="w-8 h-8 text-cyan-400 mb-4" />
            <h4 className="text-lg font-semibold text-white mb-2">Global Distribution</h4>
            <p className="text-gray-400">Edge locations worldwide ensure lightning-fast access to your configurations.</p>
          </div>
          
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
            <Users className="w-8 h-8 text-yellow-400 mb-4" />
            <h4 className="text-lg font-semibold text-white mb-2">Team Collaboration</h4>
            <p className="text-gray-400">Role-based access control and audit logs for secure team environment management.</p>
          </div>
          
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
            <Clock className="w-8 h-8 text-pink-400 mb-4" />
            <h4 className="text-lg font-semibold text-white mb-2">Version History</h4>
            <p className="text-gray-400">Complete audit trail with rollback capabilities for all environment changes.</p>
          </div>
        </div>
      </div>

      {/* Code Example Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl border border-gray-700 p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Replace Complex Workflows with
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {" "}One Line
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                No more juggling multiple tools, CLI installations, or manual synchronization. Just pure simplicity and power.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Zero configuration required
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Works with any framework
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Instant cloud synchronization
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Enterprise-grade security
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">Before vs After</span>
                </div>
                <Copy className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white transition-colors" />
              </div>
              <pre className="p-6 text-sm overflow-x-auto">
                <code className="text-gray-300">{codeExample}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-3xl border border-purple-500/20 p-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Simplify Your
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}Environment Management?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join thousands of developers who have already revolutionized their workflow with secure, real-time environment management.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button onClick={()=>{
                 router.push("/signup")
            }} className="group bg-gradient-to-r from-purple-500 to-cyan-500 px-10 py-4 rounded-xl text-white font-semibold text-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center">
              Start Your Free Trial
              <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={()=>{
                 router.push("/docs")
            }} className="border border-gray-600 px-10 py-4 rounded-xl text-white font-semibold text-xl hover:bg-gray-800 transition-colors">
              View Documentation
            </button>
          </div>
          
          <p className="text-gray-400">
            No credit card required • 3-month free credit 
          </p>
        </div>
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