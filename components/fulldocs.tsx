import React from 'react';
import { Terminal, Code, Settings, Monitor, FileText, AlertCircle, Download, Upload, Eye, Command } from 'lucide-react';
import { APPNAME, APPNAME_3,DOMAIN } from '../const';

// const APPNAME = "Xavren";
// const APPNAME_3 = "xavren";
// const DOMAIN = "https://xavren.com";
// APPNAME
// APPNAME_3

const Pre = ({ code }) => (
  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
    <code>{code}</code>
  </pre>
);

export  function FullDocs() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A] dark:text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">{APPNAME} Documentation</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Secure environment variable management with real-time synchronization and zero-knowledge encryption
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        
        {/* Installation Section */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-cyan-50 px-8 py-6 border-b border-gray-200">
              <div className="flex items-center">
                <Terminal className="w-6 h-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Installation</h2>
              </div>
            </div>
            <div className="p-8 space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Installation</h3>
                <p className="text-gray-600 mb-6">Install the {APPNAME} package using npm:</p>
                <Pre code={`npm install ${APPNAME_3}`} />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">CLI Installation</h3>
                <p className="text-gray-600 mb-6">Install the {APPNAME} CLI tool globally for command-line access:</p>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center mb-3">
                      <Terminal className="w-4 h-4 text-gray-700 mr-2" />
                      <p className="text-sm font-semibold text-gray-700">For macOS/Linux (Bash):</p>
                    </div>
                    <Pre code={`curl -fsSL ${DOMAIN}/api/releases/installer | bash`} />
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-3">
                      <Terminal className="w-4 h-4 text-gray-700 mr-2" />
                      <p className="text-sm font-semibold text-gray-700">For Windows (PowerShell):</p>
                    </div>
                    <Pre code={`iwr -useb ${DOMAIN}/api/releases/installer-ps | iex`} />
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
                  <h4 className="text-md font-semibold text-blue-900 mb-3">Verify Installation</h4>
                  <p className="text-blue-800 mb-3">After installation, verify the CLI is working correctly:</p>
                  <Pre code={`xavren --help`} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Git Push Integration Section */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-cyan-50 px-8 py-6 border-b border-gray-200">
              <div className="flex items-center">
                <Upload className="w-6 h-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">🚀 NEW: Git Push Integration with xavcli</h2>
              </div>
            </div>
            <div className="p-8 space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-cyan-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-purple-900 mb-4">✨ Automatic Environment Sync with Git Push</h3>
                <p className="text-purple-800 mb-4">
                  {APPNAME} now includes <code className="bg-purple-100 px-2 py-1 rounded font-semibold">xavcli</code> - a new Node.js binary tool (separate from the main <code className="bg-purple-100 px-2 py-1 rounded">xavren</code> CLI) that seamlessly integrates with your Git workflow.
                </p>
                <p className="text-purple-800 font-medium mb-4">
                  Just run <code className="bg-purple-100 px-2 py-1 rounded">git push</code> and your environment variables are automatically and securely synced to the cloud! 🎉
                </p>
                <div className="bg-white/50 rounded-lg p-4 border border-purple-200">
                  <p className="text-sm text-purple-900 font-semibold mb-2">📦 What's the difference?</p>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• <code className="bg-purple-100 px-1 py-0.5 rounded">xavren</code> - Main CLI for manual operations (installed globally)</li>
                    <li>• <code className="bg-purple-100 px-1 py-0.5 rounded">xavcli</code> - Node.js bin for Git hooks and npm scripts (installed with package)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">How It Works Behind the Scenes</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                    <div className="flex items-center mb-3">
                      <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">1</span>
                      <h4 className="font-semibold text-gray-900">Package Installation Creates Pre-Push Hook</h4>
                    </div>
                    <p className="text-gray-700 ml-11 mb-3">When you run <code className="bg-gray-100 px-1 py-0.5 rounded">npm install {APPNAME_3}</code>, the package automatically:</p>
                    <ul className="space-y-2 text-gray-700 ml-11">
                      <li>• Creates a Git pre-push hook in <code className="bg-gray-100 px-1 py-0.5 rounded">.git/hooks/pre-push</code></li>
                      <li>• The hook runs <code className="bg-gray-100 px-1 py-0.5 rounded">xavcli_postinstall</code> before every push</li>
                      <li>• This happens silently in the background - no manual setup needed!</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                    <div className="flex items-center mb-3">
                      <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">2</span>
                      <h4 className="font-semibold text-gray-900">First Push: Configure Your Credentials</h4>
                    </div>
                    <p className="text-gray-700 ml-11 mb-3">On your very first <code className="bg-gray-100 px-1 py-0.5 rounded">git push</code>, you'll see an interactive prompt asking how to provide your project key:</p>
                    <ul className="space-y-2 text-gray-700 ml-11">
                      <li>• <strong>keyenv</strong> (Recommended): Use environment variable like <code className="bg-gray-100 px-1 py-0.5 rounded">XAVKEY</code></li>
                      <li>• <strong>keyfile</strong>: Store key in a secure file path</li>
                      <li>• <strong>key</strong>: Provide key directly (not recommended for security)</li>
                    </ul>
                    <p className="text-gray-700 ml-11 mt-3 text-sm italic bg-blue-50 p-3 rounded border border-blue-200">
                      💾 Your configuration is saved in <code className="bg-blue-100 px-1 py-0.5 rounded">.git/xav_push_config.json</code> and you won't be prompted again on subsequent pushes!
                    </p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                    <div className="flex items-center mb-3">
                      <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">3</span>
                      <h4 className="font-semibold text-gray-900">Branch-Based Environment Isolation</h4>
                    </div>
                    <p className="text-gray-700 ml-11 mb-3">Your environment variables are synced based on your current Git branch. Each branch gets its own isolated environment:</p>
                    <div className="ml-11 space-y-3">
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <p className="font-semibold text-gray-900 mb-2">🌿 Branch: <code className="bg-green-100 px-2 py-1 rounded">main</code></p>
                        <p className="text-gray-700 text-sm">→ Syncs to <strong>production</strong> environment in cloud</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <p className="font-semibold text-gray-900 mb-2">🌿 Branch: <code className="bg-yellow-100 px-2 py-1 rounded">develop</code></p>
                        <p className="text-gray-700 text-sm">→ Syncs to <strong>development</strong> environment in cloud</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <p className="font-semibold text-gray-900 mb-2">🌿 Branch: <code className="bg-blue-100 px-2 py-1 rounded">feature/new-api</code></p>
                        <p className="text-gray-700 text-sm">→ Syncs to <strong>feature/new-api</strong> environment in cloud</p>
                      </div>
                    </div>
                    <p className="text-gray-700 ml-11 mt-3 text-sm">This means your production, staging, and development environments stay completely isolated! 🔒</p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                    <div className="flex items-center mb-3">
                      <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">4</span>
                      <h4 className="font-semibold text-gray-900">Automatic Encryption & Upload</h4>
                    </div>
                    <p className="text-gray-700 ml-11 mb-3">When you run <code className="bg-gray-100 px-1 py-0.5 rounded">git push</code>:</p>
                    <ul className="space-y-2 text-gray-700 ml-11">
                      <li>• <code className="bg-gray-100 px-1 py-0.5 rounded">xavcli</code> reads your local <code className="bg-gray-100 px-1 py-0.5 rounded">.env</code> file</li>
                      <li>• Encrypts all variables using AES-256-GCM encryption</li>
                      <li>• Detects your current Git branch automatically</li>
                      <li>• Pushes encrypted data to cloud under that branch name</li>
                      <li>• Only then allows Git to push your code to remote</li>
                    </ul>
                    <p className="text-gray-700 ml-11 mt-3 text-sm font-semibold text-green-800 bg-green-50 p-3 rounded border border-green-200">
                      ✅ Your environment variables are ALWAYS synced before your code is pushed!
                    </p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                    <div className="flex items-center mb-3">
                      <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">5</span>
                      <h4 className="font-semibold text-gray-900">What Happens on Subsequent Pushes</h4>
                    </div>
                    <p className="text-gray-700 ml-11 mb-3">After the first setup, every <code className="bg-gray-100 px-1 py-0.5 rounded">git push</code> is seamless:</p>
                    <ul className="space-y-2 text-gray-700 ml-11">
                      <li>• <code className="bg-gray-100 px-1 py-0.5 rounded">xavcli</code> loads your saved config from <code className="bg-gray-100 px-1 py-0.5 rounded">.git/xav_push_config.json</code></li>
                      <li>• Gets your project key from the configured source (env var, file, or direct)</li>
                      <li>• Automatically syncs your .env to the cloud</li>
                      <li>• No prompts, no manual commands - just push! 🚀</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-900 mb-3">Complete Example Workflow</h4>
                <Pre code={`# 1. Make changes to your .env file
echo "NEW_API_KEY=abc123" >> .env
echo "DB_HOST=localhost" >> .env

# 2. Commit your code changes
git add .
git commit -m "Update API configuration"

# 3. Push to Git (env vars sync automatically!)
git push

# 🎯 Behind the scenes:
# → xavcli_postinstall runs automatically
# → Detects current branch: "main"
# → Encrypts your .env variables
# → Pushes to cloud under "main" branch
# → Then pushes your code to remote

# ✅ Output you'll see:
# 🚀 Running xavcli before push on branch: main
# ✅ Environment variables pushed successfully to main branch
# Enumerating objects: 5, done.
# Counting objects: 100% (5/5), done.
# ...`} />
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
                <h4 className="text-md font-semibold text-green-900 mb-3">💡 Pro Tip: Clone Before Server Start with xavcli</h4>
                <p className="text-green-800 mb-4">
                  Use <code className="bg-green-100 px-2 py-1 rounded font-semibold">xavcli</code> in your npm scripts to automatically pull the latest environment variables before starting your server:
                </p>
                <Pre code={`{
  "scripts": {
    "dev": "xavcli clone --keyenv XAVKEY --write && node server.js",
    "start": "xavcli clone --keyenv XAVKEY --write --branch main && node server.js",
    "start:staging": "xavcli clone --keyenv XAVKEY --write --branch staging && node server.js"
  }
}`} />
                <div className="mt-4 space-y-3 text-green-800">
                  <p className="text-sm font-semibold">How it works:</p>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <code className="bg-green-100 px-1 py-0.5 rounded">xavcli clone</code> - Downloads env vars from cloud
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <code className="bg-green-100 px-1 py-0.5 rounded">--keyenv XAVKEY</code> - Uses environment variable for authentication
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <code className="bg-green-100 px-1 py-0.5 rounded">--write</code> - Writes to your local .env file
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <code className="bg-green-100 px-1 py-0.5 rounded">--branch</code> - Specifies which branch's env to clone (defaults to current Git branch or "main")
                    </li>
                  </ul>
                  <p className="text-sm font-medium bg-white p-3 rounded border border-green-300 mt-4">
                    🎯 This ensures your local environment is always synced with the cloud before your app starts! Perfect for team collaboration and CI/CD pipelines.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h4 className="text-md font-semibold text-amber-900 mb-3">⚙️ Reconfiguring Credentials</h4>
                <p className="text-amber-800 mb-3">If you need to change your credential method, simply delete the config file and push again:</p>
                <Pre code={`rm .git/xav_push_config.json
git push  # You'll be prompted to reconfigure`} />
              </div>
            </div>
          </div>
        </section>

        {/* Configuration Section */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-cyan-50 px-8 py-6 border-b border-gray-200">
              <div className="flex items-center">
                <Settings className="w-6 h-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">JavaScript Configuration</h2>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center mb-4">
                <Code className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-purple-700 bg-purple-100 px-3 py-1 rounded-full">JavaScript</span>
              </div>
              <p className="text-gray-600 mb-6">Basic configuration to get started with {APPNAME}:</p>
              <Pre code={`import dotenv from "${APPNAME_3}"

dotenv.config({
  env: "/path/to/.env",
  key: process.env.PROJECT_KEY,
  watch: true,
  write: false,
  onSync: (data) => {
    console.log("Sync data received:", data);
  },
  omit: ["PROJECT_KEY"]
})`} />
            </div>
          </div>
        </section>

        {/* Monitor Changes Section */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-cyan-50 px-8 py-6 border-b border-gray-200">
              <div className="flex items-center">
                <Monitor className="w-6 h-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Monitor for Changes</h2>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center mb-4">
                <Code className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-purple-700 bg-purple-100 px-3 py-1 rounded-full">JavaScript</span>
              </div>
              <p className="text-gray-600 mb-6">Set up real-time monitoring for environment variable changes using the onSync callback:</p>
              <Pre code={`import dotenv from "${APPNAME_3}"

dotenv.config({
  env: "/path/to/.env",
  key: process.env.PROJECT_KEY,
  updateCloud: true,
  sync: false,
  watch: true,
  onSync: (data) => {
    console.log("Environment file reloaded");
    console.log("All env variables:", data.list);
    console.log("Changed variables:", data.changes);
  },
  omit: ["PROJECT_KEY"]
});`} />
            </div>
          </div>
        </section>

        {/* Parameters Table */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-cyan-50 px-8 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Configuration Parameters</h2>
            </div>
            <div className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-6 py-4 text-left font-semibold text-gray-900">Parameter</th>
                      <th className="border border-gray-200 px-6 py-4 text-left font-semibold text-gray-900">Type</th>
                      <th className="border border-gray-200 px-6 py-4 text-left font-semibold text-gray-900">Required</th>
                      <th className="border border-gray-200 px-6 py-4 text-left font-semibold text-gray-900">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-6 py-4 font-medium text-purple-600">env</td>
                      <td className="border border-gray-200 px-6 py-4 text-gray-700">string</td>
                      <td className="border border-gray-200 px-6 py-4">
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">No</span>
                      </td>
                      <td className="border border-gray-200 px-6 py-4 text-gray-700">
                        Path to the environment file to load (e.g., <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">.env</code> or a custom path).
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-6 py-4 font-medium text-purple-600">key</td>
                      <td className="border border-gray-200 px-6 py-4 text-gray-700">string</td>
                      <td className="border border-gray-200 px-6 py-4">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">Yes</span>
                      </td>
                      <td className="border border-gray-200 px-6 py-4 text-gray-700">
                        Project key for secure access to environment management and encryption.
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-6 py-4 font-medium text-purple-600">onSync</td>
                      <td className="border border-gray-200 px-6 py-4 text-gray-700">Function</td>
                      <td className="border border-gray-200 px-6 py-4">
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">No</span>
                      </td>
                      <td className="border border-gray-200 px-6 py-4 text-gray-700">
                        Callback executed whenever environment variables are reloaded or changed. 
                        Receives an object with list and changes properties.
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-6 py-4 font-medium text-purple-600">watch</td>
                      <td className="border border-gray-200 px-6 py-4 text-gray-700">boolean</td>
                      <td className="border border-gray-200 px-6 py-4">
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">No</span>
                      </td>
                      <td className="border border-gray-200 px-6 py-4 text-gray-700">
                        Watch local .env file for changes and trigger onSync callback. Default: <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">false</code>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-6 py-4 font-medium text-purple-600">write</td>
                      <td className="border border-gray-200 px-6 py-4 text-gray-700">boolean</td>
                      <td className="border border-gray-200 px-6 py-4">
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">No</span>
                      </td>
                      <td className="border border-gray-200 px-6 py-4 text-gray-700">
                        Write cloud environment variables to local .env file when cloning. Default: <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">false</code>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-6 py-4 font-medium text-purple-600">omit</td>
                      <td className="border border-gray-200 px-6 py-4 text-gray-700">string[]</td>
                      <td className="border border-gray-200 px-6 py-4">
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">No</span>
                      </td>
                      <td className="border border-gray-200 px-6 py-4 text-gray-700">
                        Array of environment variable names to exclude from cloud synchronization. 
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-6 py-4 font-medium text-purple-600">sync</td>
                      <td className="border border-gray-200 px-6 py-4 text-gray-700">boolean</td>
                      <td className="border border-gray-200 px-6 py-4">
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">No</span>
                      </td>
                      <td className="border border-gray-200 px-6 py-4 text-gray-700">
                        Force cloud environment to match local .env exactly, removing any extra cloud variables. Default: <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">false</code>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-6 py-4 font-medium text-purple-600">updateCloud</td>
                      <td className="border border-gray-200 px-6 py-4 text-gray-700">boolean</td>
                      <td className="border border-gray-200 px-6 py-4">
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">No</span>
                      </td>
                      <td className="border border-gray-200 px-6 py-4 text-gray-700">
                        Enable synchronization of local changes to cloud. Default: <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">true</code>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* onSync Callback Section */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-cyan-50 px-8 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">onSync Callback</h2>
            </div>
            <div className="p-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Callback Parameters</h3>
                <p className="text-blue-800 mb-4">The onSync callback provides:</p>
                <ul className="space-y-2 text-blue-700">
                  <li><strong>list:</strong> All environment variables after reload</li>
                  <li><strong>changes:</strong> Only the environment variables that were modified since the last load</li>
                </ul>
              </div>

              <div className="flex items-center mb-4">
                <Code className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-purple-700 bg-purple-100 px-3 py-1 rounded-full">Example</span>
              </div>
              
              <Pre code={`onSync: ({ list, changes }) => {
  if (changes["DB_URL"]) {
    console.log("Database URL updated:", changes["DB_URL"]);
    reconnectDatabase(changes["DB_URL"]);
  }
}`} />
            </div>
          </div>
        </section>

        {/* Production Workflow Section */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-cyan-50 px-8 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Production Workflow</h2>
            </div>
            <div className="p-8">
              <div className="flex items-center mb-4">
                <Code className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-purple-700 bg-purple-100 px-3 py-1 rounded-full">JavaScript</span>
              </div>
              <p className="text-gray-600 mb-6">Complete example for production environment with MongoDB reconnection on changes:</p>
              
              <Pre code={`import mongoose from "mongoose";
import dotenv from "${APPNAME_3}";

let currentUri = process.env.MONGO_URI;

dotenv.config({
  env: ".env.production",
  key: process.env.PROJECT_KEY,
  watch: true,
  onSync: ({ list, changes }) => {
    if (changes["MONGO_URI"]) {
      connectDB(changes["MONGO_URI"]);
    }
    if (changes["API_KEY"]) {
      refreshAPIKey(changes["API_KEY"]);
    }
  },
  omit: ["PROJECT_KEY"]
});

async function connectDB(uri) {
  try {
    if (currentUri === uri && mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB");
      return;
    }

    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log("Disconnected from previous MongoDB connection");
    }

    await mongoose.connect(uri, { autoIndex: true });
    currentUri = uri;
    console.log("✅ MongoDB connected to new URI");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

connectDB(currentUri);`} />
            </div>
          </div>
        </section>

        {/* CLI Commands Section */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-cyan-50 px-8 py-6 border-b border-gray-200">
              <div className="flex items-center">
                <Command className="w-6 h-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">CLI Commands (xavcli)</h2>
              </div>
              <p className="text-gray-600 mt-2">Use <code className="bg-gray-100 px-2 py-1 rounded">xavcli</code> for npm scripts and Git hooks</p>
            </div>
            <div className="p-8 space-y-8">
              
              {/* Push Command */}
              <div>
                <div className="flex items-center mb-4">
                  <Upload className="w-5 h-5 text-purple-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">xavcli push - Push Environment to Cloud</h3>
                </div>
                <p className="text-gray-600 mb-4">Upload your local environment variables to the cloud using xavcli:</p>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Using project key from environment variable (Recommended):</p>
                    <Pre code={`xavcli push --keyenv XAVKEY`} />
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Using project key directly:</p>
                    <Pre code={`xavcli push --key YOUR_PROJECT_KEY`} />
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Using key from file:</p>
                    <Pre code={`xavcli push --keyfile path/to/keyfile`} />
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Push to specific branch:</p>
                    <Pre code={`xavcli push --keyenv XAVKEY --branch develop`} />
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Force sync (removes extra cloud variables):</p>
                    <Pre code={`xavcli push --keyenv XAVKEY --sync`} />
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">xavcli push Options</h4>
                  <ul className="space-y-1 text-sm text-blue-800">
                    <li><code className="bg-blue-100 px-1 py-0.5 rounded">--keyenv VARIABLE_NAME</code> - Use environment variable containing your project key (e.g., XAVKEY)</li>
                    <li><code className="bg-blue-100 px-1 py-0.5 rounded">--key YOUR_KEY</code> - Provide project key directly</li>
                    <li><code className="bg-blue-100 px-1 py-0.5 rounded">--keyfile path/to/file</code> - Path to file containing your project key</li>
                    <li><code className="bg-blue-100 px-1 py-0.5 rounded">--branch BRANCH_NAME</code> - Target branch (defaults to current Git branch or 'main')</li>
                    <li><code className="bg-blue-100 px-1 py-0.5 rounded">--sync</code> - Force cloud to match local exactly (removes extra cloud variables)</li>
                  </ul>
                </div>
              </div>

              {/* Clone Command */}
              <div>
                <div className="flex items-center mb-4">
                  <Download className="w-5 h-5 text-purple-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">xavcli clone - Clone Environment from Cloud</h3>
                </div>
                <p className="text-gray-600 mb-4">Download environment variables from cloud to local using xavcli:</p>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Clone using environment variable (Recommended):</p>
                    <Pre code={`xavcli clone --keyenv XAVKEY --write`} />
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Clone without writing to file (just display):</p>
                    <Pre code={`xavcli clone --keyenv XAVKEY`} />
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Clone and write to .env file:</p>
                    <Pre code={`xavcli clone --key YOUR_PROJECT_KEY --write`} />
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Using key from file:</p>
                    <Pre code={`xavcli clone --keyfile path/to/keyfile --write`} />
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Clone from specific branch:</p>
                    <Pre code={`xavcli clone --keyenv XAVKEY --branch develop --write`} />
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">xavcli clone Options</h4>
                  <ul className="space-y-1 text-sm text-blue-800">
                    <li><code className="bg-blue-100 px-1 py-0.5 rounded">--keyenv VARIABLE_NAME</code> - Use environment variable containing your project key (e.g., XAVKEY)</li>
                    <li><code className="bg-blue-100 px-1 py-0.5 rounded">--key YOUR_KEY</code> - Provide project key directly</li>
                    <li><code className="bg-blue-100 px-1 py-0.5 rounded">--keyfile path/to/file</code> - Path to file containing your project key</li>
                    <li><code className="bg-blue-100 px-1 py-0.5 rounded">--branch BRANCH_NAME</code> - Source branch (defaults to current Git branch or 'main')</li>
                    <li><code className="bg-blue-100 px-1 py-0.5 rounded">--write</code> - Write downloaded variables to local .env file</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mt-6">
                  <h4 className="text-md font-semibold text-green-900 mb-3">💡 Use xavcli in npm Scripts</h4>
                  <p className="text-green-800 mb-4">
                    Add xavcli clone to your package.json scripts to automatically sync environment before starting:
                  </p>
                  <Pre code={`{
  "scripts": {
    "dev": "xavcli clone --keyenv XAVKEY --write && node server.js",
    "start": "xavcli clone --keyenv XAVKEY --write --branch main && node server.js",
    "start:staging": "xavcli clone --keyenv XAVKEY --write --branch staging && node server.js"
  }
}`} />
                  <p className="text-green-800 mt-4 text-sm font-medium">
                    🎯 The <code className="bg-green-100 px-1 py-0.5 rounded">--branch</code> flag defaults to your current Git branch if not specified, 
                    or falls back to "main". This ensures each environment pulls the correct variables!
                  </p>
                </div>
              </div>

              {/* Help Command */}
              <div>
                <div className="flex items-center mb-4">
                  <Eye className="w-5 h-5 text-purple-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">Get Help</h3>
                </div>
                <p className="text-gray-600 mb-4">View all available commands and options:</p>
                <Pre code={`xavren --help`} />
              </div>

              {/* CLI Best Practices */}
              <div className="bg-gradient-to-br from-purple-50 to-cyan-50 border border-purple-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-purple-900 mb-3">CLI Best Practices</h4>
                <ul className="space-y-2 text-purple-800">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Store your project key in a secure location and use <code className="bg-purple-100 px-1 py-0.5 rounded text-sm">--keyfile</code> or <code className="bg-purple-100 px-1 py-0.5 rounded text-sm">--keyenv</code> instead of passing it directly
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Use <code className="bg-purple-100 px-1 py-0.5 rounded text-sm">--sync</code> carefully as it will remove cloud variables not present locally
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Always backup your .env file before using <code className="bg-purple-100 px-1 py-0.5 rounded text-sm">--write</code> option
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Review downloaded variables before writing to .env in production environments
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Security & Key Rotation Section */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 px-8 py-6 border-b border-gray-200">
              <div className="flex items-center">
                <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Security & Key Rotation</h2>
              </div>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">🔐 Automatic Key Rotation</h3>
                <p className="text-gray-700 mb-4">
                  {APPNAME} takes security seriously. When a team member is removed from your project, 
                  the entire project key is automatically rotated to prevent unauthorized access.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-red-900 mb-4">What Happens During Key Rotation</h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1 flex-shrink-0">1</span>
                    <div>
                      <h5 className="font-semibold text-red-900 mb-1">Team Member Removed</h5>
                      <p className="text-red-800">When you remove a team member from your {APPNAME} project dashboard, the process is initiated.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1 flex-shrink-0">2</span>
                    <div>
                      <h5 className="font-semibold text-red-900 mb-1">New Key Generated</h5>
                      <p className="text-red-800">A new project key is automatically generated and all your environment data is re-encrypted with the new key.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1 flex-shrink-0">3</span>
                    <div>
                      <h5 className="font-semibold text-red-900 mb-1">Old Key Invalidated</h5>
                      <p className="text-red-800">The previous project key is immediately invalidated and can no longer be used to access your environment variables.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1 flex-shrink-0">4</span>
                    <div>
                      <h5 className="font-semibold text-red-900 mb-1">Update Required</h5>
                      <p className="text-red-800">All remaining team members must update their local configuration with the new project key.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="text-md font-semibold text-blue-900 mb-3">Updating Your Local Configuration</h4>
                <p className="text-blue-800 mb-4">After a key rotation, update your configuration:</p>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-2">Option 1: Update Environment Variable</p>
                    <Pre code={`# Update your .env file with the new key
echo "XAVKEY=new_project_key_here" >> .env`} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-2">Option 2: Update Key File</p>
                    <Pre code={`# Update your key file
echo "new_project_key_here" > path/to/keyfile`} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-2">Option 3: Reconfigure Git Hook</p>
                    <Pre code={`# Delete the config and reconfigure on next push
rm .git/xav_push_config.json
git push  # You'll be prompted to enter the new key`} />
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h4 className="text-md font-semibold text-amber-900 mb-3">⚠️ Important Security Notes</h4>
                <ul className="space-y-2 text-amber-800">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Key rotation happens automatically and cannot be reversed. Always notify team members before removing someone.
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    The removed team member's key becomes invalid immediately and they lose all access to environment variables.
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    CI/CD pipelines and production servers will need the new key updated to continue working.
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Always store your project key securely and never commit it to version control.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-amber-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-amber-900 mb-4">Important Notes</h2>
                <ul className="space-y-3 text-amber-800">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Always validate changed environment variables before applying them to critical services (e.g., DB, Redis).
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Sensitive information (like <code className="bg-amber-100 px-2 py-1 rounded text-sm">key</code>) should not be logged and must be stored securely.
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Works seamlessly with watchers or reload triggers for <code className="bg-amber-100 px-2 py-1 rounded text-sm">.env</code> files when <code className="bg-amber-100 px-2 py-1 rounded text-sm">watch</code> is enabled.
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    All data is encrypted end-to-end using AES-256-GCM encryption for maximum security.
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Your {APPNAME} project key should be stored in your .env file and included in the <code className="bg-amber-100 px-2 py-1 rounded text-sm">omit</code> array to prevent it from being synced.
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Use the <code className="bg-amber-100 px-2 py-1 rounded text-sm">write</code> option carefully when cloning from cloud - always backup your local .env first.
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Git push integration uses branch-based environments - each Git branch can have its own set of environment variables in the cloud.
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    When team members are removed, the project key is automatically rotated and all team members must update their local configurations.
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    You can seamlessly push your environment variables with just <code className="bg-amber-100 px-2 py-1 rounded text-sm">git push</code> - no separate commands needed!
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section>
          <div className="bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-bold mb-4">Need Help?</h3>
            <p className="text-purple-100 mb-6">
              Check out our comprehensive guides or reach out to our support team for assistance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => alert("API Reference coming soon!")}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition-all"
              >
                View API Reference
              </button>
              <button 
                onClick={() => window.location.href = "/contact"}
                className="bg-white hover:bg-gray-100 text-purple-600 px-6 py-3 rounded-lg font-medium transition-all"
              >
                Contact Support
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}