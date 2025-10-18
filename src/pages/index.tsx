import { useState, lazy, Suspense } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

// Lazy load components
const AuthGoLogo = lazy(() => Promise.resolve({
  default: () => (
   <>
    <Image src="/Logo.png" alt="AuthGo Logo" width={100} height={100} />
    </>
  )
}));

// Lazy load sections
const Navigation = ({ AuthGoLogo }: { AuthGoLogo: any }) => (
    <nav className="border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-3">
            <Suspense fallback={<div className="w-12 h-12 bg-gray-700 rounded animate-pulse"></div>}>
              <AuthGoLogo />
            </Suspense>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                AuthGo
              </span>
              <p className="text-xs text-gray-400">by JudeX</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#simulations" className="text-gray-300 hover:text-white transition-colors">Simulations</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <Link href="/auth" className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition-colors">
              Login
            </Link>
          </div>

          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
const HeroSection = lazy(() => Promise.resolve({
  default: () => (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 bg-purple-900/30 px-4 py-2 rounded-full mb-8 border border-purple-800">
          <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
          <span className="text-sm text-purple-300">Trusted by 500+ security professionals</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Test Your Human Firewall
          <span className="block bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Before Attackers Do
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Advanced phishing simulation platform that helps pentesters and security teams 
          identify employee vulnerabilities through realistic social engineering attacks.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/auth" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-purple-900/30">
            Start Testing - $4/month
          </Link>
          <button className="border border-gray-600 hover:border-gray-500 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
            View Demo
          </button>
        </div>

        {/* Security Badges */}
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          {[
            { value: '98%', label: 'Realism Rate', color: 'text-green-400' },
            { value: '10K+', label: 'Simulations/Month', color: 'text-purple-400' },
            { value: '0', label: 'False Positives', color: 'text-yellow-400' }
          ].map((badge, index) => (
            <div key={index} className="text-center">
              <div className={`text-2xl font-bold ${badge.color}`}>{badge.value}</div>
              <div className="text-sm text-gray-400">{badge.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}));

const FeaturesSection = lazy(() => Promise.resolve({
  default: () => {
    const features = [
      {
        icon: '🎣',
        title: 'Realistic Phishing Campaigns',
        description: 'Create convincing phishing emails that mimic real attacker techniques. Customize templates, sender addresses, and landing pages.'
      },
      {
        icon: '📧',
        title: 'Email Spoofing & Cloning',
        description: 'Test email security with advanced spoofing capabilities. Clone legitimate corporate emails for maximum realism.'
      },
      {
        icon: '🌐',
        title: 'Custom Landing Pages',
        description: 'Build convincing fake login pages that capture credentials without storing sensitive data.'
      },
      {
        icon: '📊',
        title: 'Detailed Analytics',
        description: 'Track click rates, credential submissions, and user behavior with comprehensive reporting.'
      },
      {
        icon: '👥',
        title: 'Employee Training',
        description: 'Automated training modules for employees who fall for simulations. Real-time educational interventions.'
      },
      {
        icon: '⚡',
        title: 'Quick Deployment',
        description: 'Launch sophisticated campaigns in minutes with our pre-built templates and easy-to-use interface.'
      }
    ];

    return (
      <section id="features" className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Advanced Social Engineering Toolkit</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {`Everything you need to test and strengthen your organization's human defenses`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-600 transition-all group"
                loading="lazy"
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}));

const SimulationsSection = lazy(() => Promise.resolve({
  default: () => {
    const simulations = [
      {
        title: 'Credential Harvesting',
        description: 'Simulate login page phishing for Office 365, GSuite, and other corporate services',
        successRate: '85%'
      },
      {
        title: 'Attachment-Based Attacks',
        description: 'Test employee awareness with fake document and executable attachments',
        successRate: '72%'
      },
      {
        title: 'CEO Fraud & Whaling',
        description: 'Target executives with business email compromise (BEC) scenarios',
        successRate: '45%'
      },
      {
        title: 'Multi-Channel Attacks',
        description: 'Combine email, SMS, and social media for comprehensive testing',
        successRate: '68%'
      }
    ];

    const stats = [
      { metric: 'Phishing Emails Sent', value: '2,847' },
      { metric: 'Emails Opened', value: '1,923 (68%)' },
      { metric: 'Links Clicked', value: '847 (30%)' },
      { metric: 'Credentials Submitted', value: '284 (10%)' },
      { metric: 'Training Completed', value: '221 (78%)' },
      { metric: 'Risk Score Reduction', value: '42%' }
    ];

    return (
      <section id="simulations" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Real-World Attack Simulations</h2>
            <p className="text-xl text-gray-300">Test against actual attack vectors used by threat actors</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {simulations.map((simulation, index) => (
                <div 
                  key={index} 
                  className="bg-gray-800 rounded-xl p-6 border border-gray-700"
                  loading="lazy"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-white">{simulation.title}</h3>
                    <span className="bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full text-sm font-semibold">
                      {simulation.successRate} Success
                    </span>
                  </div>
                  <p className="text-gray-400">{simulation.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-center">Simulation Results Dashboard</h3>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-700 last:border-b-0">
                    <span className="text-gray-300">{stat.metric}</span>
                    <span className="font-bold text-purple-400">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}));

const PricingSection = lazy(() => Promise.resolve({
  default: () => {
    const plans = [
      {
        name: 'Pentester',
        price: '$4',
        period: 'per month',
        description: 'Perfect for individual security researchers and freelance pentesters',
        features: [
          'Up to 500 simulations/month',
          'Basic phishing templates',
          'Email spoofing capabilities',
          'Basic analytics dashboard',
          'Single user license',
          'Community support'
        ],
        cta: 'Get Started',
        popular: false
      },
      {
        name: 'Security Team',
        price: '$20',
        period: 'per month',
        description: 'For security teams and organizations',
        features: [
          'Unlimited simulations',
          'Advanced phishing templates',
          'Custom landing pages',
          'Advanced analytics & reporting',
          'Multi-user licenses (up to 5)',
          'Priority support',
          'API access',
          'Custom training modules'
        ],
        cta: 'Start Testing',
        popular: true
      }
    ];

    return (
      <section id="pricing" className="py-20 bg-gray-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Affordable Pricing</h2>
            <p className="text-xl text-gray-300">No hidden fees. No free tiers. Professional tools for security professionals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-gray-800 rounded-2xl p-8 border-2 relative ${
                  plan.popular ? 'border-purple-500 scale-105 shadow-lg shadow-purple-900/20' : 'border-gray-700'
                } transition-all`}
                loading="lazy"
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-bold text-purple-400">{plan.price}</span>
                  <span className="text-lg text-gray-400 ml-2">/{plan.period}</span>
                </div>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.popular 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-400">
              Both plans include full access to all social engineering features. 30-day money-back guarantee.
            </p>
          </div>
        </div>
      </section>
    );
  }
}));

const CTASection = lazy(() => Promise.resolve({
  default: ({ email, setEmail, handleSubmit }) => (
    <section className="py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Test Your Defenses?</h2>
        <p className="text-xl text-gray-300 mb-8">
          Join hundreds of security professionals using AuthGo to identify and fix human vulnerabilities.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-white placeholder-gray-400"
            required
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
          >
            Get Started
          </button>
        </form>
        
        <p className="text-sm text-gray-400 mt-4">
          Complete setup in under 10 minutes. No credit card required for demo.
        </p>
      </div>
    </section>
  )
}));

const Footer = lazy(() => Promise.resolve({
  default: ({ AuthGoLogo }) => (
    <footer className="border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Suspense fallback={<div className="w-12 h-12 bg-gray-700 rounded animate-pulse"></div>}>
                <AuthGoLogo />
              </Suspense>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  AuthGo
                </span>
                <p className="text-xs text-gray-400">Built by JudeX</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Professional social engineering testing platform for security teams and pentesters.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#simulations" className="hover:text-white transition-colors">Simulations</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><Link href="/auth" className="hover:text-white transition-colors">Login</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ethical Usage Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Responsible Disclosure</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Report Abuse</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 AuthGo. Professional Social Engineering Testing Platform. Built by JudeX. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <p className="text-xs text-gray-500">
              For authorized security testing only. Unauthorized use prohibited.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}));

// Loading components
const SectionLoading = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-400">Loading...</p>
    </div>
  </div>
);

const CardLoading = () => (
  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 animate-pulse">
    <div className="w-12 h-12 bg-gray-700 rounded mb-4"></div>
    <div className="h-4 bg-gray-700 rounded mb-2"></div>
    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
  </div>
);

export default function LandingPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    alert('Thank you for your interest! We\'ll contact you with purchase details.');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Head>
        <title>AuthGo - Phishing Simulation & Social Engineering Testing</title>
        <meta name="description" content="Professional social engineering testing platform for pentesters and security teams. Identify employee vulnerabilities with realistic phishing simulations." />
        <meta name="keywords" content="phishing simulation, social engineering, pentesting, security testing, employee training" />
        <link rel="icon" href="/Logo.png" />
      </Head>

      {/* Navigation */}
      <Suspense fallback={
        <nav className="border-b border-gray-800 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-700 rounded animate-pulse"></div>
                <div>
                  <div className="h-6 w-24 bg-gray-700 rounded animate-pulse mb-1"></div>
                  <div className="h-3 w-16 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      }>
        <Navigation AuthGoLogo={AuthGoLogo} />
      </Suspense>

      {/* Hero Section */}
      <Suspense fallback={<SectionLoading />}>
        <HeroSection />
      </Suspense>

      {/* Features Section */}
      <Suspense fallback={
        <section className="py-20 bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="h-12 bg-gray-700 rounded w-1/2 mx-auto mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-700 rounded w-2/3 mx-auto animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <CardLoading key={index} />
              ))}
            </div>
          </div>
        </section>
      }>
        <FeaturesSection />
      </Suspense>

      {/* Simulations Section */}
      <Suspense fallback={<SectionLoading />}>
        <SimulationsSection />
      </Suspense>

      {/* Pricing Section */}
      <Suspense fallback={<SectionLoading />}>
        <PricingSection />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<SectionLoading />}>
        <CTASection email={email} setEmail={setEmail} handleSubmit={handleSubmit} />
      </Suspense>

      {/* Footer */}
      <Suspense fallback={
        <footer className="border-t border-gray-800 py-12 animate-pulse">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index}>
                  <div className="h-6 bg-gray-700 rounded w-1/2 mb-4"></div>
                  <div className="space-y-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-4 bg-gray-700 rounded"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </footer>
      }>
        <Footer AuthGoLogo={AuthGoLogo} />
      </Suspense>
    </div>
  );
}