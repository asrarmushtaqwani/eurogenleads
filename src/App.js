import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Sun, Check, ArrowRight, Star, Users, TrendingUp, MessageSquare, Phone, Globe } from 'lucide-react';

const EMAILJS_SERVICE_ID = 'service_xbest6g';
const EMAILJS_TEMPLATE_ID = 'template_9yoeqvi';
const EMAILJS_PUBLIC_KEY = 'EYJtF9EED4M0nd37i';

export default function EuroGenLeads() {
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [expandedFeature, setExpandedFeature] = useState(null);
  const [formData, setFormData] = useState({ company: '', email: '', installations: '' });
  const [showPopup, setShowPopup] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showInstallationDropdown, setShowInstallationDropdown] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [errors, setErrors] = useState({ company: '', email: '', installations: '' });
  const [leadMetrics, setLeadMetrics] = useState({
    qualification: 97,
    growth: 12,
    chatbots: 18,
    calls: 5
  });

  const companyInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const installationInputRef = useRef(null);
  const installationDropdownRef = useRef(null);
  const contactFormRef = useRef(null);
  const benefitsRef = useRef(null);
  const featuresRef = useRef(null);
  const featureDetailsRef = useRef(null);
  const aboutRef = useRef(null);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleContactClick = async (e) => {
    e.preventDefault();
    
    let newErrors = { company: '', email: '', installations: '' };
    let hasError = false;

    if (!formData.company.trim()) {
      newErrors.company = 'Please enter your company name';
      hasError = true;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your work email';
      hasError = true;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      hasError = true;
    }
    
    if (!formData.installations) {
      newErrors.installations = 'Please select an installation range';
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    setIsSending(true);

    // Show popup immediately for good UX
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      setFormData({ company: '', email: '', installations: '' });
      setErrors({ company: '', email: '', installations: '' });
    }, 3000);

    // Send email in background
    try {
      await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_company: formData.company,
          from_email: formData.email,
          installations: formData.installations,
        },
        EMAILJS_PUBLIC_KEY
      );
    } catch (error) {
      console.error('EmailJS error:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e, nextFieldRef) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextFieldRef) {
        nextFieldRef.current?.focus();
      }
    }
  };

  const handleScrollToForm = () => {
    setMobileMenuOpen(false);
    contactFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    { icon: MessageSquare, title: 'AI Chatbots', description: 'Intelligent conversational agents that qualify leads 24/7.', benefits: ['Multi-language support', 'Context awareness', '24/7 availability', 'Lead scoring'], details: 'Our AI Chatbots are powered by advanced natural language processing.' },
    { icon: Phone, title: 'Voice Assistants', description: 'Advanced voice AI that handles inbound calls and schedules appointments.', benefits: ['Natural conversation', 'Call scheduling', 'Lead qualification', 'CRM integration'], details: 'State-of-the-art speech recognition and synthesis technology.' },
    { icon: TrendingUp, title: 'Lead Automation', description: 'Seamless lead capture and distribution across your sales pipeline.', benefits: ['Auto-routing', 'Lead scoring', 'Pipeline management', 'Real-time sync'], details: 'Captures prospects and automatically qualifies them based on custom rules.' },
    { icon: Users, title: 'Real-time Analytics', description: 'Comprehensive dashboards showing lead quality and conversion metrics.', benefits: ['Live dashboards', 'Conversion tracking', 'Performance metrics', 'Custom reports'], details: 'Complete visibility into your sales pipeline with real-time dashboards.' }
  ];

  const benefits = [
    { title: '95% Lead Qualification Rate', icon: TrendingUp },
    { title: 'Reduce Cost by 60%', icon: Star },
    { title: '24/7 Booking Automation', icon: Phone },
    { title: 'CRM Integration Ready', icon: Users },
    { title: 'Multi-language Support', icon: MessageSquare },
    { title: 'Privacy Compliant & Secure', icon: Check }
  ];

  const testimonials = [
    { name: 'James Carter', initials: 'JC', text: 'EuroGenLeads transformed our lead gen process. We went from 40% to 95% qualification rate in 3 months.' },
    { name: 'Anna Rossi', initials: 'AR', text: 'The AI voice assistant handles our inbound calls perfectly. Our team can focus on closing deals.' },
    { name: 'Mark Thompson', initials: 'MT', text: 'Real-time analytics give us instant visibility. We optimized our process in weeks.' }
  ];

  const steps = [
    { title: 'Lead Capture', description: 'Automatically capture leads from multiple channels' },
    { title: 'Instant Qualification', description: 'AI instantly qualifies leads based on criteria' },
    { title: 'Smart Booking', description: 'Automatically schedule appointments' },
    { title: 'Real-time Insights', description: 'Track performance with live analytics' }
  ];

  const installationRanges = ['1-10', '11-20', '21-50', '51-100', '101-250', '251-500', '500+'];

  useEffect(() => {
    const interval = setInterval(() => {
      setLeadMetrics(prev => ({
        qualification: Math.min(98, Math.max(85, prev.qualification + (Math.random() * 4 - 2))),
        growth: Math.max(5, Math.min(25, prev.growth + (Math.random() * 3 - 1.5))),
        chatbots: Math.max(8, Math.min(35, prev.chatbots + Math.floor(Math.random() * 4 - 1))),
        calls: Math.max(2, Math.min(15, prev.calls + Math.floor(Math.random() * 5 - 2)))
      }));
    }, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Load EmailJS SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = () => window.emailjs.init(EMAILJS_PUBLIC_KEY);
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  // Prevent body scroll when pricing modal is open
  useEffect(() => {
    if (showPricingModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showPricingModal]);

  // Close installation dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        installationDropdownRef.current &&
        !installationDropdownRef.current.contains(e.target) &&
        installationInputRef.current &&
        !installationInputRef.current.contains(e.target)
      ) {
        setShowInstallationDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className={showPricingModal ? 'pointer-events-none' : ''} style={{ isolation: showPricingModal ? 'isolate' : 'auto' }}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full bg-slate-950/95 backdrop-blur-sm border-b border-slate-900 z-50 ${showPricingModal ? 'hidden' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sun className="w-6 h-6 text-teal-400" />
            <span className="text-xl font-semibold text-white">EuroGen<span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Leads</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Solutions', 'Benefits', 'About Us', 'Pricing'].map((item) => (
              <button 
                key={item} 
                onClick={() => {
                  if (item === 'Solutions') {
                    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
                  } else if (item === 'Benefits') {
                    benefitsRef.current?.scrollIntoView({ behavior: 'smooth' });
                  } else if (item === 'About Us') {
                    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
                  } else if (item === 'Pricing') {
                    setShowPricingModal(true);
                  }
                }}
                className="text-slate-400 hover:text-teal-300 transition-colors text-sm font-medium"
              >
                {item}
              </button>
            ))}
          </div>

          <button onClick={handleScrollToForm} className="header-get-started-btn get-started-btn hidden md:block bg-black border-2 border-teal-500 px-6 py-2 rounded-xl transition-all font-medium text-sm shadow-lg shadow-teal-500/20">
            Get Started
          </button>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800">
            <div className="px-4 py-4 space-y-4">
              <button onClick={() => { featuresRef.current?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }} className="block text-slate-400 hover:text-teal-300 text-sm font-medium w-full text-left">Solutions</button>
              <button onClick={() => { benefitsRef.current?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }} className="block text-slate-400 hover:text-teal-300 text-sm font-medium w-full text-left">Benefits</button>
              <button onClick={() => { aboutRef.current?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }} className="block text-slate-400 hover:text-teal-300 text-sm font-medium w-full text-left">About Us</button>
              <button onClick={() => setShowPricingModal(true)} className="block text-slate-400 hover:text-teal-300 text-sm font-medium w-full text-left">Pricing</button>
              <button onClick={handleScrollToForm} className="get-started-btn w-full bg-gradient-to-r from-teal-500 to-cyan-400 text-slate-900 px-6 py-2 rounded-xl hover:from-teal-400 hover:to-cyan-300 transition-all font-medium text-sm shadow-lg shadow-teal-500/20">Get Started</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">Transform Solar Lead Generation</h1>
            <p className="text-xl text-slate-400 mb-8">Automate your entire solar sales pipeline with AI-powered chatbots, voice assistants, and intelligent lead qualification.</p>

            <div className="grid grid-cols-3 gap-6 mb-8 py-8 border-y border-slate-800">
              <div>
                <div className="text-2xl font-bold text-teal-300">50+</div>
                <div className="text-sm text-slate-400">Companies</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-teal-300">97%</div>
                <div className="text-sm text-slate-400">Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-teal-300">10k+</div>
                <div className="text-sm text-slate-400">Leads</div>
              </div>
            </div>

            <button onClick={() => contactFormRef.current?.scrollIntoView({ behavior: 'smooth' })} className="hero-get-started-btn get-started-btn bg-gradient-to-r from-teal-500 to-cyan-400 text-slate-900 px-8 py-3 rounded-xl transition-all font-semibold inline-flex items-center gap-2 shadow-lg shadow-teal-500/30">
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Real-time Data Visualization */}
          <div className="relative">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-md">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2.5 h-2.5 bg-teal-400 rounded-full animate-pulse"></div>
                  <h3 className="text-lg font-semibold text-white">Live Performance</h3>
                </div>
                <p className="text-sm text-slate-400">Real-time system metrics</p>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-slate-300 text-sm font-medium">Lead Qualification</span>
                    <span className="text-3xl font-bold text-teal-400">{Math.round(leadMetrics.qualification)}%</span>
                  </div>
                  <div className="w-full bg-slate-700/40 rounded-full h-3 overflow-hidden border border-slate-600/30">
                    <div 
                      className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transition-all duration-500"
                      style={{ width: `${leadMetrics.qualification}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-slate-300 text-sm font-medium">Monthly Growth</span>
                    <span className="text-3xl font-bold text-emerald-400">+{Math.round(leadMetrics.growth)}%</span>
                  </div>
                  <div className="w-full bg-slate-700/40 rounded-full h-3 overflow-hidden border border-slate-600/30">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${(leadMetrics.growth / 25) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700/30">
                  <p className="text-slate-300 text-sm font-medium mb-5">Active Now</p>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="bg-slate-700/20 rounded-2xl p-5 border border-slate-600/30 text-center hover:border-slate-600/50 transition-all">
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse mx-auto mb-3"></div>
                      <div className="text-3xl font-bold text-blue-400 mb-1">{leadMetrics.chatbots}</div>
                      <p className="text-xs text-slate-400">Chatbots</p>
                    </div>

                    <div className="bg-slate-700/20 rounded-2xl p-5 border border-slate-600/30 text-center hover:border-slate-600/50 transition-all">
                      <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse mx-auto mb-3"></div>
                      <div className="text-3xl font-bold text-purple-400 mb-1">{leadMetrics.calls}</div>
                      <p className="text-xs text-slate-400">Voice Calls</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 px-4 bg-slate-900/30 border-t border-b border-slate-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">AI-Powered Solutions</h2>
          <p className="text-center text-slate-400 mb-16">Enterprise-grade automation tools built for solar companies</p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedFeature(idx);
                    setTimeout(() => {
                      featureDetailsRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }, 0);
                  }}
                  className={`text-left p-6 rounded-3xl border-2 transition-all feature-hover-card ${selectedFeature === idx ? 'bg-slate-800/50 border-teal-400' : 'bg-slate-800/20 border-slate-700'}`}
                >
                  <Icon className={`w-8 h-8 mb-4 ${selectedFeature === idx ? 'text-teal-400' : 'text-slate-400'}`} />
                  <h3 className="font-semibold text-lg text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400">{feature.description}</p>
                </button>
              );
            })}
          </div>

          {selectedFeature !== null && (
            <div ref={featureDetailsRef} className="bg-slate-800/40 border border-slate-700 rounded-3xl p-8 mt-12 scroll-mt-20">
              <h3 className="text-2xl font-bold text-white mb-4">Why {features[selectedFeature].title} Matters</h3>
              <p className="text-slate-300 mb-6">{features[selectedFeature].description}</p>
              <div className="space-y-3 mb-8">
                {features[selectedFeature].benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-teal-400" />
                    <span className="text-slate-300">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Read More Section */}
              <div className="border-t border-slate-700 pt-8">
                <button
                  onClick={() => setExpandedFeature(expandedFeature === selectedFeature ? null : selectedFeature)}
                  className="read-more-btn group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-400/30 hover:border-teal-400/70 rounded-xl text-teal-300 hover:text-teal-100 transition-all duration-300 font-semibold mb-6 overflow-hidden"
                >
                  {/* Background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  
                  {/* Animated arrow icon */}
                  <span className={`inline-flex items-center justify-center w-4 h-4 transition-transform duration-300 ${expandedFeature === selectedFeature ? 'rotate-180' : ''}`}>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>

                  {/* Text with animation */}
                  <span className="relative">
                    {expandedFeature === selectedFeature ? 'Show Less' : 'Read More'}
                  </span>

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg shadow-teal-400/20 -z-20"></div>
                </button>

                {expandedFeature === selectedFeature && (
                  <div className="space-y-4 text-slate-300 leading-relaxed animate-fade-in mt-6 p-6 rounded-lg bg-slate-900/30 border border-teal-400/10">
                    {selectedFeature === 0 && (
                      <>
                        <p>
                          Our AI Chatbots leverage advanced natural language processing (NLP) technology to understand customer intent and provide contextually relevant responses. They can be deployed across your website, chat platforms, social media, and messaging applications, providing consistent support across all channels.
                        </p>
                        <p>
                          Each chatbot interaction is designed to gather critical information about the prospect, such as their location, energy consumption patterns, roofing type, and budget. The system scores leads in real-time based on your custom qualification criteria, automatically identifying high-potential prospects for your sales team.
                        </p>
                        <p>
                          The chatbots continuously learn from every interaction, improving their responses and qualification accuracy over time. They can handle multiple conversations simultaneously, providing 24/7 availability without the need for human agents. Multilingual support ensures you can engage customers regardless of their language preference, making it perfect for diverse North American and European markets.
                        </p>
                        <p>
                          Integration with your CRM system is seamless, automatically updating customer records with chat data and qualified lead information. This eliminates manual data entry and ensures your sales team always has the most current prospect information.
                        </p>
                      </>
                    )}

                    {selectedFeature === 1 && (
                      <>
                        <p>
                          Our Voice Assistants use state-of-the-art speech recognition and synthesis technology to engage customers in natural, human-like conversations. Whether handling inbound calls, conducting outbound surveys, or providing customer support, the voice AI handles complex interactions with sophisticated language understanding.
                        </p>
                        <p>
                          The system can answer questions about your solar products and services, provide instant quotes based on customer details, and most importantly, schedule appointments directly into your CRM. When callers qualify as high-potential leads, the system can seamlessly transfer them to a human agent or add them to your sales follow-up queue.
                        </p>
                        <p>
                          Every call is recorded and transcribed for quality assurance, compliance, and team training purposes. Detailed analytics show call duration, topics discussed, qualification results, and outcomes. The voice AI manages multiple calls simultaneously and maintains consistent quality regardless of peak demand periods.
                        </p>
                        <p>
                          Advanced features include accent adaptation, background noise filtering, and context-aware responses. The system learns your business terminology and sales processes, becoming more effective with each interaction. Inbound calls never go unanswered, and your team has complete visibility into all voice interactions.
                        </p>
                      </>
                    )}

                    {selectedFeature === 2 && (
                      <>
                        <p>
                          Lead Automation captures prospects from all your marketing channels—website forms, social media ads, email campaigns, paid search, and more—consolidating them into a single qualified lead pool. Our intelligent system automatically qualifies each lead based on custom scoring rules you define, such as location, annual energy consumption, property type, and purchase timeline.
                        </p>
                        <p>
                          Qualified leads are instantly routed to the right sales representative based on territory, skill set, or current availability. The system continuously learns from your sales outcomes, improving routing decisions to maximize conversion rates. High-priority leads receive immediate attention, ensuring faster response times and better conversion results.
                        </p>
                        <p>
                          Real-time CRM synchronization keeps all lead information up-to-date across your organization. Lead status automatically updates as they move through your sales pipeline—from initial contact through qualified lead, scheduled demo, proposal sent, and closed deal. This eliminates manual data entry that often causes delays and errors.
                        </p>
                        <p>
                          Advanced pipeline management tools give you complete visibility into each lead's journey. You can track response times, identify bottlenecks in your process, and optimize based on data-driven insights. Custom workflows ensure every lead receives appropriate follow-up at each stage, dramatically improving your overall conversion rate.
                        </p>
                      </>
                    )}

                    {selectedFeature === 3 && (
                      <>
                        <p>
                          Real-time Analytics provides comprehensive dashboards showing every critical metric in your sales process. Track lead sources, qualification rates, conversion funnels, sales rep performance, pipeline value, and revenue forecasts. Every dashboard can be customized to show the metrics that matter most to your business.
                        </p>
                        <p>
                          Identify bottlenecks and inefficiencies in your sales process with detailed funnel analytics. See where leads drop off, which sales stages take longest, and which representatives perform best. Use these insights to optimize your process and improve overall efficiency.
                        </p>
                        <p>
                          Custom reporting tools let you slice and dice data by any dimension—by sales rep, lead source, qualification reason, location, or time period. Export data for deeper analysis or create automated reports that get emailed to stakeholders daily, weekly, or monthly. Visual charts and graphs make it easy to spot trends and opportunities.
                        </p>
                        <p>
                          Advanced predictive analytics forecast pipeline value and help you plan resources more effectively. Benchmark your performance against industry standards to understand where you stand. Track progress toward growth goals in real-time and adjust strategies quickly based on what the data tells you.
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-500/20 border border-teal-400 text-teal-300 font-bold mb-4 mx-auto">{idx + 1}</div>
                <h3 className="font-semibold text-lg text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-20 px-4 bg-slate-900/30 border-t border-b border-slate-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">Why Choose EuroGenLeads</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, idx) => {
              return (
                <div key={idx} className="flex items-center gap-6 p-6 rounded-xl hover:bg-slate-800/30 transition-colors">
                  <div className="w-1 h-16 bg-teal-500/30 rounded-full"></div>
                  <h3 className="font-semibold text-white text-lg">{benefit.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">What Customers Say</h2>
          <div className="flex items-center justify-center gap-2 mb-16">
            <Globe className="w-5 h-5 text-teal-400" />
            <p className="text-center text-slate-400">Trusted by leading solar companies across North America & Europe</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-slate-800/30 border border-slate-700 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-teal-500/30 border border-teal-400 flex items-center justify-center">
                    <span className="text-teal-300 font-semibold">{testimonial.initials}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                  </div>
                </div>
                <p className="text-slate-300">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section ref={contactFormRef} className="py-20 px-4 bg-slate-900/30 border-t border-slate-800 scroll-mt-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-3 text-center">Ready to Boost Your Solar Sales?</h2>
          <p className="text-center text-slate-400 mb-12">Join 50+ solar companies automating their lead generation.</p>

          {!showPopup && (
            <form className="space-y-6 bg-slate-800/40 border border-slate-700 rounded-3xl p-8">
              <div>
                <label className="block text-slate-300 font-medium mb-3">Company Name</label>
                <input
                  ref={companyInputRef}
                  type="text"
                  value={formData.company}
                  onChange={(e) => {
                    setFormData({ ...formData, company: e.target.value });
                    if (e.target.value.trim()) setErrors({ ...errors, company: '' });
                  }}
                  onKeyDown={(e) => handleKeyDown(e, emailInputRef)}
                  placeholder="Your company name"
                  className={`w-full bg-slate-900/50 border-2 text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                    errors.company ? 'border-red-500 focus:border-red-400' : 'border-teal-600 focus:border-teal-400'
                  }`}
                />
                {errors.company && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.company}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-3">Work Email</label>
                <input
                  ref={emailInputRef}
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (e.target.value.trim() && isValidEmail(e.target.value)) {
                      setErrors({ ...errors, email: '' });
                    }
                  }}
                  onKeyDown={(e) => handleKeyDown(e, installationInputRef)}
                  placeholder="your@company.com"
                  className={`w-full bg-slate-900/50 border-2 text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                    errors.email ? 'border-red-500 focus:border-red-400' : 'border-teal-600 focus:border-teal-400'
                  }`}
                />
                {errors.email && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.email}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-3">Average Solar Installations Per Month</label>
                <div className="relative">
                  <input
                    ref={installationInputRef}
                    type="text"
                    value={formData.installations}
                    onChange={(e) => {
                      setFormData({ ...formData, installations: e.target.value });
                      if (e.target.value.trim()) setErrors({ ...errors, installations: '' });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        setShowInstallationDropdown(false);
                        handleContactClick(e);
                      }
                    }}
                    onFocus={() => setShowInstallationDropdown(true)}
                    placeholder="Select range or type number"
                    className={`w-full bg-slate-900/50 border-2 text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                      errors.installations ? 'border-red-500 focus:border-red-400' : 'border-teal-600 focus:border-teal-400'
                    }`}
                  />
                  
                  {showInstallationDropdown && (
                    <div ref={installationDropdownRef} className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border-2 border-teal-600 rounded-xl overflow-hidden z-10 shadow-lg max-h-48 overflow-y-auto">
                      {installationRanges.map((range) => (
                        <button
                          key={range}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, installations: range });
                            setShowInstallationDropdown(false);
                            setErrors({ ...errors, installations: '' });
                          }}
                          className="w-full px-4 py-3 text-slate-300 hover:bg-teal-500/20 hover:text-teal-300 text-left border-b border-slate-700 last:border-b-0 transition-colors"
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {errors.installations && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.installations}
                  </div>
                )}
              </div>

              <button onClick={handleContactClick} disabled={isSending} className="form-get-started-btn w-full bg-gradient-to-r from-teal-500 to-cyan-400 text-slate-900 py-3 rounded-xl font-semibold shadow-lg shadow-teal-500/30 disabled:opacity-60 disabled:cursor-not-allowed">
                {isSending ? 'Sending...' : 'Contact Us'}
              </button>

              <p className="text-center text-slate-500 text-xs">We respect your privacy. Your data is handled in compliance with GDPR & CCPA.</p>
            </form>
          )}
        </div>
      </section>

      {/* About Us */}
      <section ref={aboutRef} className="py-20 px-4 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6 text-center">About Us</h2>
          
          <div className="space-y-6">
            <p className="text-lg text-slate-400 leading-relaxed">
              EuroGenLeads is an AI-powered solar lead automation agency dedicated to transforming how solar companies generate, qualify, and convert leads. We combine cutting-edge artificial intelligence technology with deep industry expertise to help solar businesses scale their sales operations efficiently and effectively.
            </p>

            <p className="text-lg text-slate-400 leading-relaxed">
              Our mission is simple: to eliminate the inefficiencies in solar lead generation and qualification. We understand that solar companies face unique challenges in today's competitive market—from high customer acquisition costs to lengthy qualification processes. That's why we built EuroGenLeads.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-teal-300 mb-3">What We Do</h3>
                <p className="text-slate-400">
                  We provide enterprise-grade AI automation solutions specifically designed for solar companies. Our platform combines intelligent chatbots, voice assistants, and advanced lead routing to automate your entire sales pipeline—from first contact to qualified appointment.
                </p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-teal-300 mb-3">How We Help</h3>
                <p className="text-slate-400">
                  By automating lead qualification and booking, we help you reduce costs by up to 60% while improving lead quality to 97% accuracy. Our clients typically see a 3x improvement in lead conversion rates within the first three months of implementation.
                </p>
              </div>
            </div>

            <p className="text-lg text-slate-400 leading-relaxed">
              Founded by solar industry veterans, EuroGenLeads brings years of experience in both technology and solar sales. We're not just building software—we're building partnerships with our clients. Your success is our success, and we're committed to supporting your growth every step of the way.
            </p>

            <p className="text-lg text-slate-400 leading-relaxed">
              Join 50+ leading solar companies across North America and Europe who are already transforming their lead generation with EuroGenLeads. Let's automate your path to growth.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-teal-500/20 px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-1 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Sun className="w-5 h-5 text-teal-400" />
                <span className="font-semibold text-white">EuroGen<span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Leads</span></span>
              </div>
              <p className="text-slate-400 text-sm">AI-powered solar lead automation for modern companies.</p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-center text-slate-500 text-sm">
            <p>&copy; 2026 EuroGenLeads. All rights reserved.</p>
          </div>
        </div>
      </footer>

      </div> {/* end page content wrapper */}

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-12 text-center max-w-md">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                <Check className="w-10 h-10 text-white" strokeWidth={3} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Submitted</h3>
            <p className="text-slate-400">Thank you for reaching out. We'll get back to you shortly.</p>
          </div>
        </div>
      )}

      {/* Pricing Modal */}
      {showPricingModal && (
        <div
          className="fixed inset-0 z-[9998] bg-black/80 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowPricingModal(false); }}
        >
          <div
            className="bg-slate-900 rounded-2xl w-full max-w-6xl border border-slate-700 shadow-2xl flex flex-col"
            style={{ maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >

            {/* Sticky Header */}
            <div className="sticky top-0 bg-slate-900 border-b border-slate-700 px-8 py-5 flex items-center justify-between rounded-t-2xl z-10">
              <div>
                <span className="text-xs font-semibold tracking-widest text-teal-400 uppercase">Value-Based Pricing</span>
                <h2 className="text-2xl font-bold text-white mt-1">Fuel Your Solar Pipeline with AI-Powered Leads</h2>
              </div>
              <button
                onClick={() => setShowPricingModal(false)}
                className="flex items-center gap-2 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700 hover:border-slate-500 px-4 py-2 rounded-xl transition-all text-sm font-medium"
              >
                <X className="w-4 h-4" /> Close
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-8 space-y-10">

              {/* Subtitle & badges */}
              <div className="text-center space-y-4">
                <p className="text-slate-400">AI outreach, voice assistants, and smart chatbots — all working 24/7 to fill your calendar with qualified solar prospects.</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <span className="flex items-center gap-2 border border-slate-600 rounded-full px-4 py-1.5 text-sm text-slate-300">🎙️ AI Voice Assistant Included</span>
                  <span className="flex items-center gap-2 border border-slate-600 rounded-full px-4 py-1.5 text-sm text-slate-300">💬 AI Chatbot Included</span>
                </div>
              </div>

              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-4">
                <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
                <button
                  onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                  className={`relative inline-flex w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${billingCycle === 'annual' ? 'bg-teal-500' : 'bg-slate-600'}`}
                >
                  <span className={`inline-block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 mt-0.5 ml-0.5 ${billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
                <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-teal-400' : 'text-slate-500'}`}>Annual</span>
                <span className="text-xs bg-teal-500/20 text-teal-300 border border-teal-500/40 px-2 py-0.5 rounded-full font-semibold">Save 20%</span>
              </div>

              {/* Founder's Deal Banner */}
              <div className="border border-teal-500/30 bg-teal-500/5 rounded-xl p-4 text-center">
                <p className="text-sm text-slate-300">🎉 <span className="text-teal-400 font-bold">Founder's Deal:</span> First 5 clients lock in launch pricing forever — <span className="text-teal-400 font-bold">3 spots remaining</span> 🎉</p>
              </div>

              {/* Pricing Cards — force 3 columns always */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1.5rem' }}>

                {/* Starter */}
                <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 flex flex-col">
                  <div className="mb-5">
                    <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center text-2xl mb-4">🌱</div>
                    <h3 className="text-lg font-bold text-slate-300 tracking-widest uppercase mb-2">Starter</h3>
                    <span className="inline-flex items-center gap-1 border border-slate-600 rounded-full px-3 py-1 text-xs text-slate-400">📬 10–15 leads/mo</span>
                    <p className="text-slate-500 text-xs mt-3">Consistent AI-driven lead flow for solar companies ready to grow</p>
                  </div>
                  <div className="mb-5">
                    <div className="flex items-start gap-1">
                      <span className="text-slate-400 text-lg mt-1">$</span>
                      <span className="text-5xl font-bold text-white">{billingCycle === 'annual' ? '798' : '997'}</span>
                    </div>
                    <p className="text-slate-500 text-xs mt-1">per month, billed {billingCycle === 'annual' ? 'annually' : 'monthly'}</p>
                  </div>
                  <div className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-4 mb-5">
                    <p className="text-xs font-bold text-purple-400 tracking-widest mb-3">🤖 AI ASSISTANTS INCLUDED</p>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li className="flex gap-2"><span className="text-purple-400">◆</span><span><strong>AI Chatbot</strong> — answers solar FAQs 24/7 on your site</span></li>
                      <li className="flex gap-2"><span className="text-purple-400">◆</span><span><strong>AI Voice Assistant</strong> — qualifies inbound leads by phone</span></li>
                      <li className="flex gap-2"><span className="text-purple-400">◆</span><span>Automatic appointment booking via voice & chat</span></li>
                    </ul>
                  </div>
                  <div className="mb-6">
                    <p className="text-xs font-bold text-teal-500 tracking-widest mb-3">OUTREACH & LEAD GEN</p>
                    <ul className="space-y-1.5 text-xs text-slate-400">
                      <li>✓ 500 AI-targeted contacts/mo</li>
                      <li>✓ AI email outreach — personalized sequences</li>
                      <li>✓ LinkedIn outreach — 50–80 requests/mo</li>
                      <li>✓ Basic lead qualification — location, ownership, intent</li>
                      <li>✓ Lead delivery via Google Sheet / CSV</li>
                      <li>✓ Monthly performance report</li>
                      <li>✓ Email support — 24hr response</li>
                    </ul>
                  </div>
                  <button onClick={() => { setShowPricingModal(false); contactFormRef.current?.scrollIntoView({ behavior: 'smooth' }); }} className="mt-auto w-full border border-slate-600 hover:border-teal-500 text-slate-300 hover:text-white py-2.5 rounded-xl font-semibold transition-all text-sm">Get Started</button>
                </div>

                {/* Growth - Most Popular */}
                <div className="bg-gradient-to-b from-amber-900/20 to-slate-800/60 border-2 border-amber-400/60 rounded-2xl p-6 flex flex-col relative">
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-black px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap">⭐ MOST POPULAR</div>
                  <div className="mb-5 mt-2">
                    <div className="w-12 h-12 bg-amber-500/20 border border-amber-400/40 rounded-xl flex items-center justify-center text-2xl mb-4">⚡</div>
                    <h3 className="text-lg font-bold text-amber-300 tracking-widest uppercase mb-2">Growth</h3>
                    <span className="inline-flex items-center gap-1 border border-amber-500/40 rounded-full px-3 py-1 text-xs text-amber-300">📬 30–50 leads/mo</span>
                    <p className="text-slate-400 text-xs mt-3">A full AI-powered lead engine running across every channel, non-stop</p>
                  </div>
                  <div className="mb-5">
                    <div className="flex items-start gap-1">
                      <span className="text-slate-400 text-lg mt-1">$</span>
                      <span className="text-5xl font-bold text-white">{billingCycle === 'annual' ? '1,998' : '2,497'}</span>
                    </div>
                    <p className="text-slate-500 text-xs mt-1">per month, billed {billingCycle === 'annual' ? 'annually' : 'monthly'}</p>
                  </div>
                  <div className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-4 mb-5">
                    <p className="text-xs font-bold text-purple-400 tracking-widest mb-3">🤖 ADVANCED AI ASSISTANTS</p>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li className="flex gap-2"><span className="text-purple-400">◆</span><span><strong>AI Chatbot</strong> — solar FAQs, pricing info, lead capture</span></li>
                      <li className="flex gap-2"><span className="text-purple-400">◆</span><span><strong>AI Voice Assistant</strong> — qualifies & scores leads by call</span></li>
                      <li className="flex gap-2"><span className="text-purple-400">◆</span><span><strong>Cold lead follow-up</strong> — auto voice & chat re-engagement</span></li>
                      <li className="flex gap-2"><span className="text-purple-400">◆</span><span><strong>Calendar booking</strong> — books appointments automatically</span></li>
                      <li className="flex gap-2"><span className="text-purple-400">◆</span><span>CRM sync — pushes qualified leads instantly</span></li>
                    </ul>
                  </div>
                  <div className="mb-6">
                    <p className="text-xs font-bold text-teal-500 tracking-widest mb-3">OUTREACH & LEAD GEN</p>
                    <ul className="space-y-1.5 text-xs text-slate-400">
                      <li>✓ 1,500 AI-targeted contacts/mo</li>
                      <li>✓ Meta & Google Ads — setup + management</li>
                      <li>✓ LinkedIn outreach — 150–200 requests/mo</li>
                      <li>✓ AI lead scoring — filters by budget, intent & property</li>
                      <li>✓ Live reporting dashboard</li>
                      <li>✓ Bi-weekly strategy calls</li>
                      <li>✓ Priority support — 4–6hr response</li>
                    </ul>
                  </div>
                  <button onClick={() => { setShowPricingModal(false); contactFormRef.current?.scrollIntoView({ behavior: 'smooth' }); }} className="mt-auto w-full bg-amber-400 hover:bg-amber-300 text-black py-2.5 rounded-xl font-bold transition-all text-sm">Start Growing →</button>
                </div>

                {/* Scale */}
                <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 flex flex-col">
                  <div className="mb-5">
                    <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center text-2xl mb-4">🚀</div>
                    <h3 className="text-lg font-bold text-slate-300 tracking-widest uppercase mb-2">Scale</h3>
                    <span className="inline-flex items-center gap-1 border border-slate-600 rounded-full px-3 py-1 text-xs text-slate-400">📬 75–100+ leads/mo</span>
                    <p className="text-slate-500 text-xs mt-3">A fully autonomous AI sales system replacing an entire in-house team</p>
                  </div>
                  <div className="mb-5">
                    <div className="flex items-start gap-1">
                      <span className="text-slate-400 text-lg mt-1">$</span>
                      <span className="text-5xl font-bold text-white">{billingCycle === 'annual' ? '3,598' : '4,497'}</span>
                    </div>
                    <p className="text-slate-500 text-xs mt-1">per month, billed {billingCycle === 'annual' ? 'annually' : 'monthly'}</p>
                  </div>
                  <div className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-4 mb-5">
                    <p className="text-xs font-bold text-purple-400 tracking-widest mb-3">🤖 FULL AI AUTOMATION SUITE</p>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li className="flex gap-2"><span className="text-purple-400">◆</span><span><strong>AI Chatbot</strong> — custom-trained on client's solar brand</span></li>
                      <li className="flex gap-2"><span className="text-purple-400">◆</span><span><strong>AI Voice Assistant</strong> — outbound + inbound call handling</span></li>
                      <li className="flex gap-2"><span className="text-purple-400">◆</span><span><strong>Full cold lead re-engagement</strong> via voice, chat & SMS</span></li>
                      <li className="flex gap-2"><span className="text-purple-400">◆</span><span><strong>Multi-step nurture</strong> — automated voice + chat + email flows</span></li>
                      <li className="flex gap-2"><span className="text-purple-400">◆</span><span><strong>Smart escalation</strong> — AI hands off hot leads to human sales</span></li>
                      <li className="flex gap-2"><span className="text-purple-400">◆</span><span>Deep CRM sync + real-time pipeline updates</span></li>
                    </ul>
                  </div>
                  <div className="mb-6">
                    <p className="text-xs font-bold text-teal-500 tracking-widest mb-3">OUTREACH & LEAD GEN</p>
                    <ul className="space-y-1.5 text-xs text-slate-400">
                      <li>✓ 3,000+ contacts/mo — expanded targeting</li>
                      <li>✓ Exclusive leads — 100% yours, never shared</li>
                      <li>✓ Full ad management — Meta + Google + retargeting</li>
                      <li>✓ SEO content — 2 location-targeted pieces/mo</li>
                      <li>✓ Competitor analysis — monthly local report</li>
                      <li>✓ Dedicated account manager + weekly calls</li>
                      <li>✓ Same-day support guaranteed</li>
                    </ul>
                  </div>
                  <button onClick={() => { setShowPricingModal(false); contactFormRef.current?.scrollIntoView({ behavior: 'smooth' }); }} className="mt-auto w-full border border-teal-500/50 hover:border-teal-400 hover:bg-teal-500/10 text-teal-300 hover:text-white py-2.5 rounded-xl font-semibold transition-all text-sm">Let's Scale →</button>
                </div>
              </div>

              {/* Feature Comparison Table */}
              <div>
                <h3 className="text-2xl font-bold text-white text-center mb-2">Full Feature Comparison</h3>
                <p className="text-slate-400 text-center text-sm mb-8">Everything side-by-side so you can choose with confidence</p>
                <div className="overflow-x-auto rounded-xl border border-slate-700">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700 bg-slate-800/60">
                        <th className="text-left px-5 py-4 text-slate-400 font-semibold tracking-wider text-xs uppercase w-2/5">Feature</th>
                        <th className="px-4 py-4 text-center text-white font-bold text-xs uppercase tracking-wide">Starter<br/><span className="text-slate-400 font-normal normal-case">${billingCycle === 'annual' ? '798' : '997'}/mo</span></th>
                        <th className="px-4 py-4 text-center text-amber-300 font-bold text-xs uppercase tracking-wide">Growth ⭐<br/><span className="text-slate-400 font-normal normal-case">${billingCycle === 'annual' ? '1,998' : '2,497'}/mo</span></th>
                        <th className="px-4 py-4 text-center text-teal-300 font-bold text-xs uppercase tracking-wide">Scale<br/><span className="text-slate-400 font-normal normal-case">${billingCycle === 'annual' ? '3,598' : '4,497'}/mo</span></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {/* AI Voice */}
                      <tr className="bg-slate-800/30"><td colSpan={4} className="px-5 py-2.5 text-xs font-bold text-purple-400 tracking-widest">🎙️ AI VOICE ASSISTANT</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">Inbound call qualification</td><td className="px-4 py-3 text-center text-purple-400 font-semibold text-xs">Basic</td><td className="px-4 py-3 text-center text-teal-400">✓</td><td className="px-4 py-3 text-center text-teal-400">✓</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">Outbound cold lead follow-up calls</td><td className="px-4 py-3 text-center text-slate-600">—</td><td className="px-4 py-3 text-center text-teal-400">✓</td><td className="px-4 py-3 text-center text-teal-400">✓</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">Voice-to-calendar appointment booking</td><td className="px-4 py-3 text-center text-teal-400">✓</td><td className="px-4 py-3 text-center text-teal-400">✓</td><td className="px-4 py-3 text-center text-teal-400">✓</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">Smart escalation to human sales</td><td className="px-4 py-3 text-center text-slate-600">—</td><td className="px-4 py-3 text-center text-slate-600">—</td><td className="px-4 py-3 text-center text-teal-400">✓</td></tr>
                      {/* AI Chatbot */}
                      <tr className="bg-slate-800/30"><td colSpan={4} className="px-5 py-2.5 text-xs font-bold text-purple-400 tracking-widest">💬 AI CHATBOT</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">Solar FAQ answering (24/7)</td><td className="px-4 py-3 text-center text-teal-400">✓</td><td className="px-4 py-3 text-center text-teal-400">✓</td><td className="px-4 py-3 text-center text-teal-400">✓</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">Lead capture & qualification via chat</td><td className="px-4 py-3 text-center text-purple-400 font-semibold text-xs">Basic</td><td className="px-4 py-3 text-center text-teal-400">✓</td><td className="px-4 py-3 text-center text-teal-400">✓</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">Cold lead re-engagement via chat</td><td className="px-4 py-3 text-center text-slate-600">—</td><td className="px-4 py-3 text-center text-teal-400">✓</td><td className="px-4 py-3 text-center text-teal-400">✓</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">Custom-trained on client's brand/pricing</td><td className="px-4 py-3 text-center text-slate-600">—</td><td className="px-4 py-3 text-center text-slate-600">—</td><td className="px-4 py-3 text-center text-teal-400">✓</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">Multi-step nurture flows (chat+email+SMS)</td><td className="px-4 py-3 text-center text-slate-600">—</td><td className="px-4 py-3 text-center text-slate-600">—</td><td className="px-4 py-3 text-center text-teal-400">✓</td></tr>
                      {/* Outreach */}
                      <tr className="bg-slate-800/30"><td colSpan={4} className="px-5 py-2.5 text-xs font-bold text-purple-400 tracking-widest">📬 OUTREACH & LEAD GENERATION</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">Monthly contacts reached</td><td className="px-4 py-3 text-center text-slate-300">500</td><td className="px-4 py-3 text-center text-slate-300">1,500</td><td className="px-4 py-3 text-center text-slate-300">3,000+</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">AI email outreach</td><td className="px-4 py-3 text-center text-teal-400">✓</td><td className="px-4 py-3 text-center text-teal-400">✓</td><td className="px-4 py-3 text-center text-teal-400">✓</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">LinkedIn outreach</td><td className="px-4 py-3 text-center text-slate-300 text-xs">50–80/mo</td><td className="px-4 py-3 text-center text-slate-300 text-xs">150–200/mo</td><td className="px-4 py-3 text-center text-slate-300 text-xs">300+/mo</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">Meta & Google Ads management</td><td className="px-4 py-3 text-center text-slate-600">—</td><td className="px-4 py-3 text-center text-teal-400">✓</td><td className="px-4 py-3 text-center text-teal-400">✓</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">AI lead scoring</td><td className="px-4 py-3 text-center text-purple-400 font-semibold text-xs">Basic</td><td className="px-4 py-3 text-center text-teal-400 text-xs">✓ Advanced</td><td className="px-4 py-3 text-center text-teal-400 text-xs">✓ Advanced</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">Exclusive leads (not shared)</td><td className="px-4 py-3 text-center text-slate-600">—</td><td className="px-4 py-3 text-center text-slate-600">—</td><td className="px-4 py-3 text-center text-teal-400">✓</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">SEO content creation</td><td className="px-4 py-3 text-center text-slate-600">—</td><td className="px-4 py-3 text-center text-slate-600">—</td><td className="px-4 py-3 text-center text-slate-300 text-xs">2 pieces/mo</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">Estimated leads/month</td><td className="px-4 py-3 text-center text-slate-300 text-xs">10–15</td><td className="px-4 py-3 text-center text-slate-300 text-xs">30–50</td><td className="px-4 py-3 text-center text-slate-300 text-xs">75–100+</td></tr>
                      {/* Reporting */}
                      <tr className="bg-slate-800/30"><td colSpan={4} className="px-5 py-2.5 text-xs font-bold text-purple-400 tracking-widest">📊 REPORTING & SUPPORT</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">CRM integration</td><td className="px-4 py-3 text-center text-slate-600">—</td><td className="px-4 py-3 text-center text-teal-400">✓</td><td className="px-4 py-3 text-center text-teal-400">✓</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">Live reporting dashboard</td><td className="px-4 py-3 text-center text-slate-600">—</td><td className="px-4 py-3 text-center text-teal-400">✓</td><td className="px-4 py-3 text-center text-teal-400">✓</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">Strategy calls</td><td className="px-4 py-3 text-center text-slate-600">—</td><td className="px-4 py-3 text-center text-slate-300 text-xs">Bi-weekly</td><td className="px-4 py-3 text-center text-slate-300 text-xs">Weekly</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">Dedicated account manager</td><td className="px-4 py-3 text-center text-slate-600">—</td><td className="px-4 py-3 text-center text-slate-600">—</td><td className="px-4 py-3 text-center text-teal-400">✓</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">Support response time</td><td className="px-4 py-3 text-center text-slate-300 text-xs">24 hrs</td><td className="px-4 py-3 text-center text-slate-300 text-xs">4–6 hrs</td><td className="px-4 py-3 text-center text-slate-300 text-xs">Same day</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="text-center space-y-4 pb-2">
                <p className="text-slate-500 text-sm">All plans are month-to-month — no long-term contracts. Ad spend is paid directly to Meta/Google by you and is separate from our fee. AI Voice & Chatbot setup is included in onboarding at no extra cost.</p>
                <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-400">
                  <span>🔒 No long-term contracts</span>
                  <span>❌ Cancel anytime</span>
                  <span>🎙️ AI Voice included</span>
                  <span>💬 AI Chatbot included</span>
                  <span>⚡ 48hr onboarding</span>
                  <span>📊 Full transparency</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes cardFloat { 
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes softGlow {
          0%, 100% { box-shadow: 0 10px 30px rgba(20, 184, 166, 0.1); }
          50% { box-shadow: 0 20px 40px rgba(20, 184, 166, 0.2); }
        }
        @keyframes buttonShimmer { 0% { left: -100%; } 100% { left: 100%; } }
        @keyframes buttonPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.4); } 50% { box-shadow: 0 0 0 8px rgba(20, 184, 166, 0); } }
        @keyframes textFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
        @keyframes iconBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        @keyframes readMoreFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        @keyframes readMoreGlow {
          0%, 100% { box-shadow: 0 4px 15px rgba(20, 184, 166, 0.1), inset 0 0 0 1px rgba(20, 184, 166, 0.3); }
          50% { box-shadow: 0 8px 25px rgba(20, 184, 166, 0.25), inset 0 0 0 1px rgba(20, 184, 166, 0.5); }
        }
        @keyframes heroButtonFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-8px) scale(1.08); }
        }
        @keyframes heroButtonGlow {
          0%, 100% { 
            box-shadow: 0 12px 24px rgba(20, 184, 166, 0.25), 0 0 0 0 rgba(20, 184, 166, 0.5);
          }
          50% { 
            box-shadow: 0 20px 50px rgba(20, 184, 166, 0.45), 0 0 40px 12px rgba(20, 184, 166, 0.3);
          }
        }
        @keyframes arrowSlide {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        @keyframes heroButtonShine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        @keyframes headerGetStartedFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-6px) scale(1.05); }
        }
        @keyframes headerGetStartedGlow {
          0%, 100% { 
            box-shadow: 0 8px 20px rgba(20, 184, 166, 0.2), 0 0 0 0 rgba(20, 184, 166, 0.4);
          }
          50% { 
            box-shadow: 0 16px 40px rgba(20, 184, 166, 0.4), 0 0 30px 8px rgba(20, 184, 166, 0.2);
          }
          100% { 
            box-shadow: 0 8px 20px rgba(20, 184, 166, 0.2), 0 0 0 0 rgba(20, 184, 166, 0.4);
          }
        }
        @keyframes headerGetStartedShimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        html { scroll-behavior: smooth; }

        .hero-get-started-btn {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          z-index: 1;
          overflow: hidden;
        }

        .hero-get-started-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: inherit;
          pointer-events: none;
          z-index: -1;
        }

        .hero-get-started-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
          border-radius: inherit;
          transition: none;
        }

        .hero-get-started-btn:hover::before {
          opacity: 1 !important;
        }

        .hero-get-started-btn:hover::after {
          animation: heroButtonShine 0.7s ease-in-out !important;
        }

        .hero-get-started-btn:hover {
          animation: heroButtonFloat 2s ease-in-out infinite, heroButtonGlow 2s ease-in-out infinite !important;
          background: linear-gradient(to right, rgb(34, 211, 238), rgb(20, 184, 166)) !important;
          transform: translateY(0) !important;
        }

        .hero-get-started-btn:hover svg {
          animation: arrowSlide 1s ease-in-out infinite !important;
        }

        .hero-get-started-btn:active {
          animation: none !important;
          transform: translateY(-2px) scale(0.96) !important;
        }

        .header-get-started-btn {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          z-index: 1;
          overflow: hidden;
          color: rgb(255, 255, 255) !important;
        }

        .header-get-started-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: inherit;
          pointer-events: none;
          z-index: -1;
        }

        .header-get-started-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(20, 184, 166, 0.3), transparent);
          border-radius: inherit;
          transition: none;
        }

        .header-get-started-btn:hover::before {
          opacity: 1;
        }

        .header-get-started-btn:hover::after {
          animation: headerButtonShine 0.6s ease-in-out;
        }

        .header-get-started-btn:hover {
          animation: headerButtonFloat 1.4s ease-in-out infinite, headerButtonGlow 1.4s ease-in-out infinite;
          transform: translateY(0);
          color: rgb(255, 255, 255) !important;
          border-color: rgba(20, 184, 166, 0.9) !important;
          background-color: rgba(0, 0, 0, 0.8) !important;
        }

        .header-get-started-btn:active {
          transform: translateY(-1px) scale(0.96);
          animation: none !important;
        }

        .form-get-started-btn {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          z-index: 1;
          overflow: hidden;
        }

        .form-get-started-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: inherit;
          pointer-events: none;
          z-index: -1;
        }

        .form-get-started-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          border-radius: inherit;
          transition: none;
        }

        .form-get-started-btn:hover::before {
          opacity: 1 !important;
        }

        .form-get-started-btn:hover::after {
          animation: headerGetStartedShimmer 0.8s ease-in-out !important;
        }

        .form-get-started-btn:hover {
          animation: headerGetStartedFloat 1.8s ease-in-out infinite, headerGetStartedGlow 1.8s ease-in-out infinite !important;
          background: linear-gradient(to right, rgb(45, 212, 191), rgb(34, 211, 238)) !important;
          box-shadow: 0 12px 30px rgba(20, 184, 166, 0.4) !important;
          transform: translateY(0) !important;
        }

        .form-get-started-btn:active {
          animation: none !important;
          transform: translateY(-2px) scale(0.98) !important;
        }

        .read-more-btn {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .read-more-btn:hover {
          animation: readMoreFloat 2s ease-in-out infinite, readMoreGlow 2s ease-in-out infinite;
          transform: translateY(0);
        }

        .feature-hover-card {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .feature-hover-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .feature-hover-card:hover {
          animation: cardFloat 2s ease-in-out infinite, softGlow 2s ease-in-out infinite;
          border-color: rgb(20, 184, 166) !important;
          background-color: rgba(30, 41, 59, 0.5) !important;
          transform: translateY(0);
        }

        .feature-hover-card:hover::before {
          opacity: 1;
        }

        .feature-hover-card:active {
          transform: scale(0.98);
          animation: none !important;
        }

        button {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
        }

        .bg-white {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }

        .bg-white::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s ease;
        }

        .bg-white:hover {
          box-shadow: 0 12px 24px rgba(20, 184, 166, 0.25);
          transform: translateY(-3px) scale(1.05);
          animation: buttonPulse 0.6s ease-out;
        }

        .bg-white:hover::before {
          left: 100%;
        }

        .bg-white:hover svg {
          animation: iconBounce 0.6s ease-in-out infinite;
        }

        .bg-white:active {
          transform: translateY(-1px) scale(0.98);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        nav button:not(.bg-white) {
          position: relative;
        }

        nav button:not(.bg-white)::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: rgb(20, 184, 166);
          transition: width 0.3s ease;
        }

        nav button:not(.bg-white):hover {
          color: rgb(45, 212, 191) !important;
          transform: translateY(-2px);
          text-shadow: 0 0 10px rgba(20, 184, 166, 0.5);
        }

        nav button:not(.bg-white):hover::after {
          width: 100%;
        }

        nav button:not(.bg-white):active {
          transform: translateY(0);
        }

        button[type="button"] {
          position: relative;
        }

        button[type="button"]:hover:not(.feature-hover-card) {
          border-color: rgb(20, 184, 166) !important;
          box-shadow: 0 4px 12px rgba(20, 184, 166, 0.1);
          transform: translateY(-1px);
        }

        button[type="button"]:hover svg {
          animation: iconBounce 0.4s ease-in-out infinite;
        }

        button[type="button"]:active {
          transform: translateY(0);
        }

        button[type="submit"] {
          position: relative;
          overflow: hidden;
        }

        button[type="submit"]::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          animation: buttonShimmer 0s ease;
        }

        button[type="submit"]:hover {
          box-shadow: 0 8px 20px rgba(20, 184, 166, 0.2);
          transform: translateY(-2px) scale(1.02);
          animation: buttonPulse 0.6s ease-out;
        }

        button[type="submit"]:hover::before {
          animation: buttonShimmer 0.6s ease;
        }

        button[type="submit"]:active {
          transform: translateY(0) scale(0.98);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        input:focus, textarea:focus {
          animation: slideDown 0.3s ease;
        }
      `}</style>
    </div>
  );
}
