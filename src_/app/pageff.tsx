"use client";
import React, { useState, useEffect } from 'react';
import { Code, ArrowRight, Check, Terminal, Zap, Shield, GitBranch, Users, Clock, Lock } from 'lucide-react';

export default function MinimalDotEnvLanding() {
  const [typedText, setTypedText] = useState('');
  const [activeTab, setActiveTab] = useState('sync');
  const fullText = 'dotenv.config()';
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const tabs = {
    sync: {
      title: 'Real-time Sync',
      code: `// Update anywhere, sync everywhere
await dotenv.set('API_KEY', newValue)

// All environments update instantly
// Development ✓
// Staging ✓  
// Production ✓`
    },
    callbacks: {
      title: 'Smart Callbacks',
      code: `// React to changes automatically
dotenv.onChange('DATABASE_URL', async () => {
  await db.reconnect()
  console.log('Database reconnected')
})

// Restart services on change
// No manual intervention needed`
    },
    security: {
      title: 'End-to-end Encryption',
      code: `// Your secrets stay secret
dotenv.config({
  encryption: 'AES-256-GCM',
  keyRotation: 'automatic'
})

// Military-grade security
// Zero-knowledge architecture`
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Nav */}
      <nav className="border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-md flex items-center justify-center">
              <Code className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold tracking-tight">dotenv<span className="text-purple-400">pro</span></span>
          </div>
          <div className="flex items-center gap-8">
            <a href="/pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</a>
            <a href="/docs" className="text-sm text-gray-400 hover:text-white transition-colors">Docs</a>
            <a href="/changelog" className="text-sm text-gray-400 hover:text-white transition-colors">Changelog</a>
            <button className="text-sm px-4 py-1.5 border border-white/10 rounded hover:border-white/20 transition-colors">
              Sign in
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></div>
            <span className="text-xs text-purple-300">Now with automatic service restarts</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            Environment variables
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-[length:200%_auto] animate-gradient">
              for modern teams
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl">
            Replace .env files with real-time cloud sync. One line of code, military-grade encryption, instant updates across all environments.
          </p>

          <div className="flex items-center gap-4 mb-16">
            <button className="group px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-all flex items-center gap-2 font-medium">
              Start building
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button className="px-6 py-3 border border-white/10 rounded-lg hover:border-white/20 transition-colors">
              View demo
            </button>
            <span className="text-sm text-gray-500 ml-2">Free for 3 months</span>
          </div>

          {/* Terminal */}
          <div className="border border-white/10 rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm">
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-white/10"></div>
                  <div className="w-3 h-3 rounded-full bg-white/10"></div>
                  <div className="w-3 h-3 rounded-full bg-white/10"></div>
                </div>
                <span className="text-xs text-gray-500">app/index.js</span>
              </div>
              <Terminal className="w-4 h-4 text-gray-500" />
            </div>
            <div className="p-6 font-mono text-sm">
              <div className="text-gray-600 mb-3">// Legacy approach</div>
              <div className="text-gray-500 mb-6 opacity-50">
                <span className="line-through">require('dotenv').config()</span><br/>
                <span className="line-through">// Manage .env files manually</span><br/>
                <span className="line-through">// Deploy with CI/CD secrets</span><br/>
                <span className="line-through">// Hope everything syncs</span>
              </div>
              
              <div className="text-gray-600 mb-3 mt-8">// Modern approach</div>
              <div className="text-white">
                <span className="text-purple-400">import</span> dotenv <span className="text-purple-400">from</span> <span className="text-cyan-400">'@xavren/dotenv'</span><br/>
                <br/>
                <span className="text-cyan-400">{typedText}</span>
                <span className="inline-block w-2 h-5 bg-cyan-400 ml-0.5 animate-pulse"></span>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 space-y-2.5 text-xs">
                <div className="flex items-center gap-2 text-green-400">
                  <Check className="w-3.5 h-3.5" />
                  <span>Connected to production environment</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-400">
                  <Check className="w-3.5 h-3.5" />
                  <span>Synced 47 variables in 6ms</span>
                </div>
                <div className="flex items-center gap-2 text-purple-400">
                  <Check className="w-3.5 h-3.5" />
                  <span>AES-256 encryption active</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Check className="w-3.5 h-3.5" />
                  <span>2 callbacks registered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Interactive Tabs Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl font-bold mb-6 tracking-tight">
              Built for how you
              <br />
              actually work
            </h2>
            <p className="text-lg text-gray-400 mb-12 leading-relaxed">
              Stop managing infrastructure. Start shipping features. Environment variables that adapt to your workflow, not the other way around.
            </p>

            <div className="space-y-3">
              {Object.entries(tabs).map(([key, { title }]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                    activeTab === key
                      ? 'border-purple-500/50 bg-purple-500/10 text-white'
                      : 'border-white/5 hover:border-white/10 text-gray-400'
                  }`}
                >
                  <div className="font-medium">{title}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="border border-white/10 rounded-xl overflow-hidden bg-black/40">
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs text-gray-500">{tabs[activeTab].title}</span>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/10"></div>
                <div className="w-2 h-2 rounded-full bg-white/10"></div>
                <div className="w-2 h-2 rounded-full bg-white/10"></div>
              </div>
            </div>
            <pre className="p-6 text-sm font-mono text-gray-300 leading-relaxed">
              {tabs[activeTab].code}
            </pre>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Everything you need</h2>
          <p className="text-lg text-gray-400">Enterprise features without enterprise complexity</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="group p-6 rounded-xl border border-white/5 hover:border-purple-500/30 bg-gradient-to-br from-white/[0.02] to-transparent transition-all">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Instant sync</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Changes propagate globally in milliseconds. No polling, no delays, no race conditions.
            </p>
          </div>

          <div className="group p-6 rounded-xl border border-white/5 hover:border-cyan-500/30 bg-gradient-to-br from-white/[0.02] to-transparent transition-all">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Zero-knowledge encryption</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              We can't read your secrets. End-to-end AES-256-GCM encryption with automatic key rotation.
            </p>
          </div>

          <div className="group p-6 rounded-xl border border-white/5 hover:border-purple-500/30 bg-gradient-to-br from-white/[0.02] to-transparent transition-all">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <GitBranch className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Branch-based environments</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Automatic environment creation for every branch. Preview deployments with isolated configs.
            </p>
          </div>

          <div className="group p-6 rounded-xl border border-white/5 hover:border-cyan-500/30 bg-gradient-to-br from-white/[0.02] to-transparent transition-all">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Team collaboration</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Granular permissions, audit logs, and approval workflows. Built for teams of any size.
            </p>
          </div>

          <div className="group p-6 rounded-xl border border-white/5 hover:border-purple-500/30 bg-gradient-to-br from-white/[0.02] to-transparent transition-all">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Time-travel debugging</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Complete version history with one-click rollbacks. See exactly what changed and when.
            </p>
          </div>

          <div className="group p-6 rounded-xl border border-white/5 hover:border-cyan-500/30 bg-gradient-to-br from-white/[0.02] to-transparent transition-all">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Lock className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Compliance ready</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              SOC 2 Type II, GDPR, HIPAA compliant. Enterprise security without the enterprise price.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="border-y border-white/10 py-16">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">50+</div>
              <div className="text-sm text-gray-500">Active teams</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">99.99%</div>
              <div className="text-sm text-gray-500">Uptime SLA</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">&lt;5ms</div>
              <div className="text-sm text-gray-500">Global latency</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">2.1M+</div>
              <div className="text-sm text-gray-500">Variables synced</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 tracking-tight">
            Start shipping faster
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Join teams building the future. Free for 3 months, no credit card required.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              Get started free
            </button>
            <button className="px-8 py-4 border border-white/10 rounded-lg hover:border-white/20 transition-colors">
              Schedule demo
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            Used by teams at Vercel, GitHub, Linear, and more
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-32">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-md flex items-center justify-center">
                <Code className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold">dotenv<span className="text-purple-400">pro</span></span>
            </div>
            <div className="text-sm text-gray-500">
              © 2024 · Built for developers, by developers
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}