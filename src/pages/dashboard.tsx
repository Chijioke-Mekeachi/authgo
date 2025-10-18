import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import type { ReactElement } from "react";

interface UserDataProps {
  id: string;
  username: string;
  email: string;
}

interface Credential {
  id: string;
  social: string;
  username: string;
  password: string;
  visible?: boolean;
}

interface AnalyticsData {
  totalClicks: number;
  uniqueVisitors: number;
  conversionRate: number;
  topPlatform: string;
  linksGenerated: number;
}

interface GeneratedLink {
  id: string;
  platform: string;
  url: string;
  shortUrl: string;
  clicks: number;
  uniqueVisitors: number;
  createdAt: string;
  status: 'active' | 'paused';
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('analytics');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string>('');
  const [user, setUser] = useState<UserDataProps>({
    id: '',
    username: '',
    email: ''
  });
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalClicks: 0,
    uniqueVisitors: 0,
    conversionRate: 0,
    topPlatform: 'None',
    linksGenerated: 0
  });
  const [generatedLinks, setGeneratedLinks] = useState<GeneratedLink[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      fetchCredentials(userData.id);
      generateMockAnalytics();
    } else {
      window.location.href = "/login";
    }
  }, []);

  // Fetch credentials from API
  const fetchCredentials = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://authgo-backend.onrender.com/cred/${id}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch credentials");
      }

      console.log("Full result:", result);
      
      // Set credentials to state
      const credsArray = result.creds || [];
      setCredentials(credsArray);
      
      // Update analytics with actual credentials count
      setAnalytics(prev => ({
        ...prev,
        linksGenerated: credsArray.length
      }));

      return credsArray;
    } catch (error) {
      console.error("Error fetching credentials:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Generate mock analytics data
  const generateMockAnalytics = () => {
    setAnalytics(prev => ({
      ...prev,
      totalClicks: 1247,
      uniqueVisitors: 892,
      conversionRate: 72,
      topPlatform: 'Instagram'
    }));
  };

  // Close mobile menu when switching tabs on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
  }, [activeTab]);

  // Close sidebar by default on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
        setIsMobileMenuOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const copyLink = async (shortUrl: string, platform: string) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedLink(platform);
      setTimeout(() => setCopiedLink(''), 2000);
    } catch{
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shortUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedLink(platform);
      setTimeout(() => setCopiedLink(''), 2000);
    }
  };

  const toggleLinkStatus = (id: string) => {
    setGeneratedLinks(prev =>
      prev.map(link =>
        link.id === id 
          ? { ...link, status: link.status === 'active' ? 'paused' : 'active' }
          : link
      )
    );
  };

  const togglePasswordVisibility = (id: string) => {
    setCredentials(prev =>
      prev.map(cred =>
        cred.id === id ? { ...cred, visible: !cred.visible } : cred
      )
    );
  };

  const generateNewLink = (platform: string) => {
    const newLink: GeneratedLink = {
      id: Date.now().toString(),
      platform,
      url: `http://localhost:3000/${platform.toLowerCase() === 'google' ? 'gmail' : platform.toLowerCase()}/${user.id}`,
      shortUrl: `authgo.io/${platform.toLowerCase().substring(0, 3)}-${user.id.substring(0, 4)}`,
      clicks: 0,
      uniqueVisitors: 0,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setGeneratedLinks(prev => [newLink, ...prev]);
    setAnalytics(prev => ({
      ...prev,
      linksGenerated: prev.linksGenerated + 1
    }));
  };

  // SVG Logo Components
  const GoogleLogo = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );

  const FacebookLogo = () => (
    <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );

  const TwitterLogo = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
  );

  const LinkedInLogo = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );

  const InstagramLogo = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FD5" />
          <stop offset="25%" stopColor="#FD5" />
          <stop offset="50%" stopColor="#FF543E" />
          <stop offset="75%" stopColor="#C837AB" />
          <stop offset="100%" stopColor="#C837AB" />
        </linearGradient>
      </defs>
      <path 
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" 
        fill="url(#instagram-gradient)"
      />
    </svg>
  );

  const TikTokLogo = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );

  const BankLogo = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
    </svg>
  );

  const AuthGoLogo = () => (
    <Image src="/Logo.png" alt="AuthGo Logo" width={100} height={100} />
  );

  const getPlatformLogo = (platform: string): ReactElement => {
  const logos: Record<string, ReactElement> = {
    gmail: <GoogleLogo />,
    Facebook: <FacebookLogo />,
    Twitter: <TwitterLogo />,
    LinkedIn: <LinkedInLogo />,
    Instagram: <InstagramLogo />,
    TikTok: <TikTokLogo />,
    "Bank Account": <BankLogo />,
  };

  return logos[platform] ?? (
    <div className="w-6 h-6 bg-gray-500 rounded" />
  );
};

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <Head>
        <title>AuthGo Dashboard - Link Analytics & Management</title>
        <meta name="description" content="Professional link analytics and management dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo.png" />
      </Head>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        bg-gray-800 border-r border-gray-700 transition-all duration-300 
        fixed md:relative z-50 h-full
        ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full md:translate-x-0'}
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4 md:p-6 border-b border-gray-700">
          <div className="flex items-center justify-between md:justify-start md:space-x-3">
            <div className="flex items-center space-x-3">
              <AuthGoLogo />
              {isSidebarOpen && (
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    AuthGo
                  </h1>
                  <p className="text-xs text-gray-400">Link Analytics Platform</p>
                </div>
              )}
            </div>
            {/* Mobile close button */}
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <nav className="p-4 space-y-2 h-screen">
          {[
            { id: 'analytics', icon: '📊', label: 'Link Analytics' },
            { id: 'password', icon: '🔐', label: 'Password Manager' },
            { id: 'settings', icon: '⚙️', label: 'Security Settings' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
          <button
              onClick={() => {}}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-400'
                  
              `}
            >
              {isSidebarOpen && <span className="font-medium text-red-500">Logout</span>}
            </button>
        </nav>

        {/* Sidebar Toggle - Desktop only */}
        <div className="absolute bottom-4 left-4 hidden md:block">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 p-4 md:p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <div>
                <h1 className="text-xl md:text-2xl font-bold">
                  {activeTab === 'analytics' && 'Link Analytics'}
                  {activeTab === 'password' && 'Password Manager'}
                  {activeTab === 'settings' && 'Security Settings'}
                </h1>
                <p className="text-gray-400 text-xs md:text-sm hidden sm:block">
                  {activeTab === 'analytics' && 'Track and manage your generated links'}
                  {activeTab === 'password' && 'View and manage your saved passwords'}
                  {activeTab === 'settings' && 'Configure your security preferences'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">Welcome back</p>
                <p className="text-xs text-gray-400">{user.username}</p>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="font-bold text-sm md:text-base">{user.username.substring(0,1)}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 md:p-6 bg-gray-900/50 overflow-x-auto">
          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Analytics Overview Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl border border-blue-500/30 p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-400 text-sm font-medium">Total Clicks</p>
                      <p className="text-xl md:text-2xl font-bold text-white mt-2">{analytics.totalClicks.toLocaleString()}</p>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-xl md:text-2xl">👆</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl border border-green-500/30 p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-400 text-sm font-medium">Unique Visitors</p>
                      <p className="text-xl md:text-2xl font-bold text-white mt-2">{analytics.uniqueVisitors.toLocaleString()}</p>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-xl md:text-2xl">👥</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl border border-purple-500/30 p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-400 text-sm font-medium">Conversion Rate</p>
                      <p className="text-xl md:text-2xl font-bold text-white mt-2">{analytics.conversionRate}%</p>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-xl md:text-2xl">📈</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl border border-orange-500/30 p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-400 text-sm font-medium">Links Generated</p>
                      <p className="text-xl md:text-2xl font-bold text-white mt-2">{analytics.linksGenerated}</p>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-xl md:text-2xl">🔗</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generate Links Section */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 md:p-6">
                <h3 className="font-semibold text-white mb-4">Generate New Links</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
                  {['Instagram', 'Twitter', 'Facebook', 'LinkedIn', 'gmail', 'TikTok'].map((platform) => (
                    <button
                      key={platform}
                      onClick={() => generateNewLink(platform)}
                      className="bg-gray-700 hover:bg-gray-600 rounded-lg p-3 md:p-4 transition-all duration-200 border border-gray-600 hover:border-blue-500/50"
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-6 h-6 md:w-8 md:h-8">
                          {getPlatformLogo(platform)}
                        </div>
                        <span className="text-xs text-gray-300">{platform}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generated Links Table */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="bg-gray-700 px-4 md:px-6 py-3 md:py-4 border-b border-gray-600">
                  <h3 className="font-semibold text-white">Generated Links</h3>
                </div>
                
                <div className="divide-y divide-gray-700 min-w-[800px] md:min-w-0">
                  {generatedLinks.map((link) => (
                    <div key={link.id} className="px-4 md:px-6 py-3 md:py-4 hover:bg-gray-750 transition-colors">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-center">
                        {/* Platform */}
                        <div className="md:col-span-2 flex items-center space-x-3">
                          <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                            {getPlatformLogo(link.platform)}
                          </div>
                          <span className="font-medium text-white text-sm md:text-base">{link.platform}</span>
                        </div>

                        {/* URLs */}
                        <div className="md:col-span-4">
                          <div className="space-y-1">
                            <p className="text-xs md:text-sm text-gray-400 truncate">Original: {link.url}</p>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="md:col-span-3">
                          <div className="grid grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm">
                            <div>
                              <p className="text-gray-400">Clicks</p>
                              <p className="text-white font-semibold">{link.clicks}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Unique</p>
                              <p className="text-white font-semibold">{link.uniqueVisitors}</p>
                            </div>
                          </div>
                        </div>

                        {/* Status & Actions */}
                        <div className="md:col-span-3 flex items-center justify-start md:justify-end space-x-2 md:space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            link.status === 'active' 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          }`}>
                            {link.status === 'active' ? 'Active' : 'Paused'}
                          </span>
                          
                          <button
                            onClick={() => toggleLinkStatus(link.id)}
                            className={`px-2 py-1 rounded-lg text-xs md:text-sm ${
                              link.status === 'active'
                                ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border border-yellow-500/30'
                                : 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30'
                            }`}
                          >
                            {link.status === 'active' ? 'Pause' : 'Resume'}
                          </button>

                          <button
                            onClick={() => copyLink(link.url, link.platform)}
                            className={`px-2 py-1 rounded-lg text-xs md:text-sm transition-all duration-200 ${
                              copiedLink === link.platform
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30'
                            }`}
                          >
                            {copiedLink === link.platform ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Password Manager Tab */}
          {activeTab === 'password' && (
            <div className="space-y-6">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                  {/* Table Header */}
                  <div className="bg-gray-700 px-4 md:px-6 py-3 md:py-4 border-b border-gray-600">
                    <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-semibold text-gray-300">
                      <div className="col-span-3">Social Platform</div>
                      <div className="col-span-4">Username / Number</div>
                      <div className="col-span-4">Password</div>
                      <div className="col-span-1">Actions</div>
                    </div>
                    <h3 className="md:hidden font-semibold text-white">Saved Passwords</h3>
                  </div>

                  {/* Table Body */}
                  <div className="divide-y divide-gray-700">
                    {credentials.map((credential) => (
                      <div key={credential.id} className="px-4 md:px-6 py-3 md:py-4 hover:bg-gray-750 transition-colors">
                        {/* Mobile View */}
                        <div className="md:hidden space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                                {getPlatformLogo(credential.social)}
                              </div>
                              <span className="font-medium text-white">{credential.social}</span>
                            </div>
                            <button
                              onClick={() => togglePasswordVisibility(credential.id)}
                              className="p-2 text-gray-400 hover:text-white transition-colors"
                            >
                              {credential.visible ? (
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
                          <div className="space-y-2">
                            <div>
                              <p className="text-xs text-gray-400">Username</p>
                              <p className="text-gray-300 font-mono text-sm">{credential.username}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400">Password</p>
                              <p className="font-mono text-sm bg-gray-700 px-2 py-1 rounded">
                                {credential.visible ? credential.password : '••••••••'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Desktop View */}
                        <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-3 flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                              {getPlatformLogo(credential.social)}
                            </div>
                            <span className="font-medium text-white">{credential.social}</span>
                          </div>

                          <div className="col-span-4">
                            <span className="text-gray-300 font-mono text-sm">{credential.username}</span>
                          </div>

                          <div className="col-span-4">
                            <div className="flex items-center space-x-2">
                              <span className="font-mono text-sm bg-gray-700 px-2 py-1 rounded">
                                {credential.visible ? credential.password : '••••••••'}
                              </span>
                            </div>
                          </div>

                          <div className="col-span-1 flex justify-end">
                            <button
                              onClick={() => togglePasswordVisibility(credential.id)}
                              className="p-2 text-gray-400 hover:text-white transition-colors"
                            >
                              {credential.visible ? (
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
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Security Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 md:p-6">
                <h3 className="font-semibold text-white mb-4">Security Overview</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  <div className="text-center p-3 md:p-4 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg border border-blue-500/30">
                    <div className="text-xl md:text-2xl font-bold text-blue-400">A+</div>
                    <div className="text-xs md:text-sm text-gray-400">Security Score</div>
                  </div>
                  <div className="text-center p-3 md:p-4 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg border border-green-500/30">
                    <div className="text-xl md:text-2xl font-bold text-green-400">
                      {generatedLinks.length}
                    </div>
                    <div className="text-xs md:text-sm text-gray-400">Active Links</div>
                  </div>
                  <div className="text-center p-3 md:p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
                    <div className="text-xl md:text-2xl font-bold text-purple-400">{credentials.length}</div>
                    <div className="text-xs md:text-sm text-gray-400">Saved Passwords</div>
                  </div>
                  <div className="text-center p-3 md:p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
                    <div className="text-xl md:text-2xl font-bold text-yellow-400">0</div>
                    <div className="text-xs md:text-sm text-gray-400">Security Alerts</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #111827;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1f2937;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }

        .bg-gray-750 {
          background-color: #374151;
        }
      `}</style>
    </div>
  );
}