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
  const [leadMetrics, setLeadMetrics] = useState({ qualification: 97, growth: 12, chatbots: 18, calls: 5 });

  const companyInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const installationInputRef = useRef(null);
  const installationDropdownRef = useRef(null);
  const contactFormRef = useRef(null);
  const benefitsRef = useRef(null);
  const featuresRef = useRef(null);
  const featureDetailsRef = useRef(null);
  const aboutRef = useRef(null);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleContactClick = async (e) => {
    e.preventDefault();
    let newErrors = { company: '', email: '', installations: '' };
    let hasError = false;
    if (!formData.company.trim()) { newErrors.company = 'Please enter your company name'; hasError = true; }
    if (!formData.email.trim()) { newErrors.email = 'Please enter your work email'; hasError = true; }
    else if (!isValidEmail(formData.email)) { newErrors.email = 'Please enter a valid email address'; hasError = true; }
    if (!formData.installations) { newErrors.installations = 'Please select an installation range'; hasError = true; }
    setErrors(newErrors);
    if (hasError) return;
    setIsSending(true);
    setShowPopup(true);
    setTimeout(() => { setShowPopup(false); setFormData({ company: '', email: '', installations: '' }); setErrors({ company: '', email: '', installations: '' }); }, 3000);
    try {
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { from_company: formData.company, from_email: formData.email, installations: formData.installations }, EMAILJS_PUBLIC_KEY);
    } catch (error) { console.error('EmailJS error:', error); }
    finally { setIsSending(false); }
  };

  const handleKeyDown = (e, nextFieldRef) => { if (e.key === 'Enter') { e.preventDefault(); if (nextFieldRef) nextFieldRef.current?.focus(); } };
  const handleScrollToForm = () => { setMobileMenuOpen(false); contactFormRef.current?.scrollIntoView({ behavior: 'smooth' }); };

  const features = [
    { icon: MessageSquare, title: 'AI Chatbots', description: 'Intelligent conversational agents that qualify leads 24/7.', benefits: ['Multi-language support', 'Context awareness', '24/7 availability', 'Lead scoring'] },
    { icon: Phone, title: 'Voice Assistants', description: 'Advanced voice AI that handles inbound calls and schedules appointments.', benefits: ['Natural conversation', 'Call scheduling', 'Lead qualification', 'CRM integration'] },
    { icon: TrendingUp, title: 'Lead Automation', description: 'Seamless lead capture and distribution across your sales pipeline.', benefits: ['Auto-routing', 'Lead scoring', 'Pipeline management', 'Real-time sync'] },
    { icon: Users, title: 'Real-time Analytics', description: 'Comprehensive dashboards showing lead quality and conversion metrics.', benefits: ['Live dashboards', 'Conversion tracking', 'Performance metrics', 'Custom reports'] }
  ];

  const benefits = [
    { title: '95% Lead Qualification Rate' }, { title: 'Reduce Cost by 60%' }, { title: '24/7 Booking Automation' },
    { title: 'CRM Integration Ready' }, { title: 'Multi-language Support' }, { title: 'Privacy Compliant & Secure' }
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

  // Pricing plans data
  const plans = [
    {
      emoji: '🌱', name: 'Core', nameColor: 'text-slate-300',
      border: 'border-slate-700', bg: 'bg-slate-800/40', badge: null,
      roiLabel: '1 closed deal covers your next', roiValue: '13 months of service',
      roiBg: 'bg-slate-700/40', roiTextColor: 'text-teal-300',
      strikeMonthly: '1,000', strikeAnnual: '800',
      priceMonthly: '797', priceAnnual: '638',
      saveMonthly: 'Save $203/mo', saveAnnual: 'Save $162/mo',
      desc: 'For solar companies beginning AI-powered outreach',
      outreach: ['200 targeted solar prospects researched/mo', 'AI-written 3-step personalised email sequence sent on your behalf', '50 LinkedIn connection requests/mo to decision-makers'],
      delivery: ['Prospects delivered via Google Sheet, updated weekly', 'Monthly activity report (contacts reached, responses received)', 'Email support — 48hr response'],
      ai: null, crm: false,
      btnClass: 'border border-slate-600 hover:border-teal-500 text-slate-300 hover:text-white', btnLabel: 'Get Started'
    },
    {
      emoji: '⚡', name: 'Growth', nameColor: 'text-amber-300',
      border: 'border-amber-400/60', bg: 'bg-gradient-to-b from-amber-900/20 to-slate-800/60',
      badge: '⭐ MOST POPULAR', badgeBg: 'bg-amber-400 text-black',
      roiLabel: '2 closed deals/mo covers your next', roiValue: '20 months of service',
      roiBg: 'bg-amber-500/10 border border-amber-500/20', roiTextColor: 'text-amber-300',
      strikeMonthly: '2,000', strikeAnnual: '1,600',
      priceMonthly: '1,497', priceAnnual: '1,198',
      saveMonthly: 'Save $503/mo', saveAnnual: 'Save $402/mo',
      desc: 'For solar companies ready to build a full AI pipeline',
      outreach: ['500 targeted solar prospects researched/mo', '100–150 LinkedIn outreach requests/mo', '2-step SMS follow-up sequence for non-responders'],
      delivery: ['Prospects delivered via Google Sheet, updated weekly', 'Bi-weekly 30-min strategy call', 'Priority email support — 24hr response'],
      ai: ['AI Voice Agent — handles inbound enquiry calls, qualifies prospects & books appointments automatically'],
      crm: true,
      btnClass: 'bg-amber-400 hover:bg-amber-300 text-black font-bold', btnLabel: 'Start Growing →'
    },
    {
      emoji: '🚀', name: 'Pro', nameColor: 'text-teal-300',
      border: 'border-teal-500/40', bg: 'bg-slate-800/40', badge: null,
      roiLabel: '3 closed deals/mo covers your next', roiValue: '18 months of service',
      roiBg: 'bg-teal-500/10 border border-teal-500/20', roiTextColor: 'text-teal-300',
      strikeMonthly: '3,000', strikeAnnual: '2,400',
      priceMonthly: '2,197', priceAnnual: '1,758',
      saveMonthly: 'Save $803/mo', saveAnnual: 'Save $642/mo',
      desc: 'For solar companies replacing their entire lead gen team with AI',
      outreach: ['1,000+ targeted solar prospects researched/mo', '200+ LinkedIn outreach requests/mo', '5-step email + SMS nurture sequence — full automation'],
      delivery: ['Prospects delivered via Google Sheet, updated weekly', 'Weekly 30-min strategy call', 'Priority support — same-day response'],
      ai: ['AI Voice Agent: inbound + outbound — calls, qualifies & books appointments automatically'],
      crm: true,
      btnClass: 'border border-teal-500/50 hover:border-teal-400 hover:bg-teal-500/10 text-teal-300 hover:text-white', btnLabel: "Let's Scale →"
    }
  ];

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

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = () => window.emailjs.init(EMAILJS_PUBLIC_KEY);
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showPricingModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showPricingModal]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (installationDropdownRef.current && !installationDropdownRef.current.contains(e.target) && installationInputRef.current && !installationInputRef.current.contains(e.target)) {
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
              <button key={item} onClick={() => {
                if (item === 'Solutions') featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
                else if (item === 'Benefits') benefitsRef.current?.scrollIntoView({ behavior: 'smooth' });
                else if (item === 'About Us') aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
                else if (item === 'Pricing') setShowPricingModal(true);
              }} className="text-slate-400 hover:text-teal-300 transition-colors text-sm font-medium">{item}</button>
            ))}
          </div>
          <button onClick={handleScrollToForm} className="header-get-started-btn get-started-btn hidden md:block bg-black border-2 border-teal-500 px-6 py-2 rounded-xl transition-all font-medium text-sm shadow-lg shadow-teal-500/20">Get Started</button>
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

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">Transform Solar Lead Generation</h1>
            <p className="text-xl text-slate-400 mb-8">Automate your entire solar sales pipeline with AI-powered chatbots, voice assistants, and intelligent lead qualification.</p>
            <div className="grid grid-cols-3 gap-6 mb-8 py-8 border-y border-slate-800">
              <div><div className="text-2xl font-bold text-teal-300">50+</div><div className="text-sm text-slate-400">Companies</div></div>
              <div><div className="text-2xl font-bold text-teal-300">97%</div><div className="text-sm text-slate-400">Accuracy</div></div>
              <div><div className="text-2xl font-bold text-teal-300">10k+</div><div className="text-sm text-slate-400">Leads</div></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => contactFormRef.current?.scrollIntoView({ behavior: 'smooth' })} className="hero-get-started-btn get-started-btn bg-gradient-to-r from-teal-500 to-cyan-400 text-slate-900 px-8 py-3 rounded-xl transition-all font-semibold inline-flex items-center gap-2 shadow-lg shadow-teal-500/30">
                Get Started <ArrowRight className="w-4 h-4" />
              </button>
              <a href="https://forms.gle/U25w1oDjitSBLJWk7" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-teal-400/60 text-teal-300 hover:border-teal-400 hover:bg-teal-500/10 transition-all font-semibold text-sm">
                🔍 Get Free Lead Audit
              </a>
            </div>
          </div>
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
                    <div className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transition-all duration-500" style={{ width: `${leadMetrics.qualification}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-slate-300 text-sm font-medium">Monthly Growth</span>
                    <span className="text-3xl font-bold text-emerald-400">+{Math.round(leadMetrics.growth)}%</span>
                  </div>
                  <div className="w-full bg-slate-700/40 rounded-full h-3 overflow-hidden border border-slate-600/30">
                    <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500" style={{ width: `${(leadMetrics.growth / 25) * 100}%` }}></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-700/30">
                  <p className="text-slate-300 text-sm font-medium mb-5">Active Now</p>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="bg-slate-700/20 rounded-2xl p-5 border border-slate-600/30 text-center">
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse mx-auto mb-3"></div>
                      <div className="text-3xl font-bold text-blue-400 mb-1">{leadMetrics.chatbots}</div>
                      <p className="text-xs text-slate-400">Chatbots</p>
                    </div>
                    <div className="bg-slate-700/20 rounded-2xl p-5 border border-slate-600/30 text-center">
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

      {/* Features */}
      <section ref={featuresRef} className="py-20 px-4 bg-slate-900/30 border-t border-b border-slate-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">AI-Powered Solutions</h2>
          <p className="text-center text-slate-400 mb-16">Enterprise-grade automation tools built for solar companies</p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <button key={idx} onClick={() => { setSelectedFeature(idx); setTimeout(() => { featureDetailsRef.current?.scrollIntoView({ behavior: 'smooth' }); }, 0); }}
                  className={`text-left p-6 rounded-3xl border-2 transition-all feature-hover-card ${selectedFeature === idx ? 'bg-slate-800/50 border-teal-400' : 'bg-slate-800/20 border-slate-700'}`}>
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
                  <div key={idx} className="flex items-center gap-3"><Check className="w-5 h-5 text-teal-400" /><span className="text-slate-300">{benefit}</span></div>
                ))}
              </div>
              <div className="border-t border-slate-700 pt-8">
                <button onClick={() => setExpandedFeature(expandedFeature === selectedFeature ? null : selectedFeature)}
                  className="read-more-btn group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-400/30 hover:border-teal-400/70 rounded-xl text-teal-300 hover:text-teal-100 transition-all duration-300 font-semibold mb-6 overflow-hidden">
                  <span className={`inline-flex items-center justify-center w-4 h-4 transition-transform duration-300 ${expandedFeature === selectedFeature ? 'rotate-180' : ''}`}>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  </span>
                  <span>{expandedFeature === selectedFeature ? 'Show Less' : 'Read More'}</span>
                </button>
                {expandedFeature === selectedFeature && (
                  <div className="space-y-4 text-slate-300 leading-relaxed mt-6 p-6 rounded-lg bg-slate-900/30 border border-teal-400/10">
                    {selectedFeature === 0 && (<><p>Our AI Chatbots leverage advanced natural language processing to understand customer intent and provide contextually relevant responses across your website, social media, and messaging applications.</p><p>Each chatbot gathers critical prospect information—location, energy consumption, roofing type, and budget—scoring leads in real-time based on your custom qualification criteria. Multilingual support ensures you can engage customers across North American and European markets.</p></>)}
                    {selectedFeature === 1 && (<><p>Our Voice Assistants use state-of-the-art speech recognition to engage customers in natural, human-like conversations—handling inbound calls, conducting outbound surveys, and scheduling appointments directly into your CRM.</p><p>Every call is recorded and transcribed for quality assurance. The system learns your business terminology and processes, becoming more effective with each interaction. Multiple calls are handled simultaneously with consistent quality.</p></>)}
                    {selectedFeature === 2 && (<><p>Lead Automation captures prospects from all your marketing channels—website forms, social media ads, email campaigns, and more—consolidating them into a single qualified lead pool with real-time CRM synchronization.</p><p>Qualified leads are instantly routed to the right sales representative based on territory and availability. Custom workflows ensure every lead receives appropriate follow-up at each stage of your pipeline.</p></>)}
                    {selectedFeature === 3 && (<><p>Real-time Analytics provides comprehensive dashboards showing every critical metric: lead sources, qualification rates, conversion funnels, and revenue forecasts. Every dashboard can be customized to show the metrics that matter most.</p><p>Custom reporting tools let you slice data by sales rep, lead source, location, or time period. Advanced predictive analytics forecast pipeline value and help you plan resources more effectively.</p></>)}
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

      {/* Benefits */}
      <section ref={benefitsRef} className="py-20 px-4 bg-slate-900/30 border-t border-b border-slate-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">Why Choose EuroGenLeads</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-6 p-6 rounded-xl hover:bg-slate-800/30 transition-colors">
                <div className="w-1 h-16 bg-teal-500/30 rounded-full"></div>
                <h3 className="font-semibold text-white text-lg">{benefit.title}</h3>
              </div>
            ))}
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
                  <div><div className="font-semibold text-white">{testimonial.name}</div></div>
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
                <input ref={companyInputRef} type="text" value={formData.company}
                  onChange={(e) => { setFormData({ ...formData, company: e.target.value }); if (e.target.value.trim()) setErrors({ ...errors, company: '' }); }}
                  onKeyDown={(e) => handleKeyDown(e, emailInputRef)} placeholder="Your company name"
                  className={`w-full bg-slate-900/50 border-2 text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none transition-colors ${errors.company ? 'border-red-500' : 'border-teal-600 focus:border-teal-400'}`} />
                {errors.company && <div className="flex items-center gap-2 mt-2 text-red-400 text-sm"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.company}</div>}
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-3">Work Email</label>
                <input ref={emailInputRef} type="email" value={formData.email}
                  onChange={(e) => { setFormData({ ...formData, email: e.target.value }); if (e.target.value.trim() && isValidEmail(e.target.value)) setErrors({ ...errors, email: '' }); }}
                  onKeyDown={(e) => handleKeyDown(e, installationInputRef)} placeholder="your@company.com"
                  className={`w-full bg-slate-900/50 border-2 text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-teal-600 focus:border-teal-400'}`} />
                {errors.email && <div className="flex items-center gap-2 mt-2 text-red-400 text-sm"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.email}</div>}
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-3">Average Solar Installations Per Month</label>
                <div className="relative">
                  <input ref={installationInputRef} type="text" value={formData.installations}
                    onChange={(e) => { setFormData({ ...formData, installations: e.target.value }); if (e.target.value.trim()) setErrors({ ...errors, installations: '' }); }}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); setShowInstallationDropdown(false); handleContactClick(e); } }}
                    onFocus={() => setShowInstallationDropdown(true)} placeholder="Select range or type number"
                    className={`w-full bg-slate-900/50 border-2 text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none transition-colors ${errors.installations ? 'border-red-500' : 'border-teal-600 focus:border-teal-400'}`} />
                  {showInstallationDropdown && (
                    <div ref={installationDropdownRef} className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border-2 border-teal-600 rounded-xl overflow-hidden z-10 shadow-lg max-h-48 overflow-y-auto">
                      {installationRanges.map((range) => (
                        <button key={range} type="button" onClick={() => { setFormData({ ...formData, installations: range }); setShowInstallationDropdown(false); setErrors({ ...errors, installations: '' }); }}
                          className="w-full px-4 py-3 text-slate-300 hover:bg-teal-500/20 hover:text-teal-300 text-left border-b border-slate-700 last:border-b-0 transition-colors">{range}</button>
                      ))}
                    </div>
                  )}
                </div>
                {errors.installations && <div className="flex items-center gap-2 mt-2 text-red-400 text-sm"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.installations}</div>}
              </div>
              <button onClick={handleContactClick} disabled={isSending} className="form-get-started-btn w-full bg-gradient-to-r from-teal-500 to-cyan-400 text-slate-900 py-3 rounded-xl font-semibold shadow-lg shadow-teal-500/30 disabled:opacity-60 disabled:cursor-not-allowed">
                {isSending ? 'Sending...' : 'Contact Us'}
              </button>
              <p className="text-center text-slate-500 text-xs">We respect your privacy. Your data is handled in compliance with GDPR & CCPA.</p>
            </form>
          )}
        </div>
      </section>

      {/* About */}
      <section ref={aboutRef} className="py-20 px-4 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6 text-center">About Us</h2>
          <div className="space-y-6">
            <p className="text-lg text-slate-400 leading-relaxed">EuroGenLeads is an AI-powered solar lead automation agency dedicated to transforming how solar companies generate, qualify, and convert leads. We combine cutting-edge artificial intelligence with deep industry expertise to help solar businesses scale their sales operations efficiently and effectively.</p>
            <p className="text-lg text-slate-400 leading-relaxed">Our mission is simple: to eliminate the inefficiencies in solar lead generation. We understand that solar companies face unique challenges—from high customer acquisition costs to lengthy qualification processes. That's why we built EuroGenLeads.</p>
            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-teal-300 mb-3">What We Do</h3>
                <p className="text-slate-400">We provide enterprise-grade AI automation solutions designed for solar companies. Our platform combines intelligent chatbots, voice assistants, and advanced lead routing to automate your entire sales pipeline—from first contact to qualified appointment.</p>
              </div>
              <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-teal-300 mb-3">How We Help</h3>
                <p className="text-slate-400">By automating lead qualification and outreach, we help you reduce costs by up to 60% while improving lead quality. Our clients typically see significant improvements in pipeline volume within the first three months.</p>
              </div>
            </div>
            <p className="text-lg text-slate-400 leading-relaxed">Join 50+ leading solar companies across North America and Europe who are already transforming their lead generation with EuroGenLeads. Let's automate your path to growth.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-teal-500/20 px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Sun className="w-5 h-5 text-teal-400" />
              <span className="font-semibold text-white">EuroGen<span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Leads</span></span>
            </div>
            <p className="text-slate-400 text-sm">AI-powered solar lead automation for modern companies.</p>
          </div>
          <div className="pt-8 border-t border-slate-900 flex items-center justify-center text-slate-500 text-sm">
            <p>&copy; 2026 EuroGenLeads. All rights reserved.</p>
          </div>
        </div>
      </footer>

      </div>

      {/* Popup */}
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

      {/* ===================== PRICING MODAL ===================== */}
      {showPricingModal && (
        <div className="fixed inset-0 z-[9998] bg-black/80 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowPricingModal(false); }}>
          <div className="bg-slate-900 rounded-2xl w-full max-w-6xl border border-slate-700 shadow-2xl flex flex-col"
            style={{ maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}>

            {/* Header */}
            <div className="sticky top-0 bg-slate-900 border-b border-slate-700 px-8 py-5 flex items-center justify-between rounded-t-2xl z-10">
              <div>
                <span className="text-xs font-semibold tracking-widest text-teal-400 uppercase">Transparent Pricing</span>
                <h2 className="text-2xl font-bold text-white mt-1">Simple Plans. Real Deliverables. No Surprises.</h2>
              </div>
              <button onClick={() => setShowPricingModal(false)}
                className="flex items-center gap-2 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700 hover:border-slate-500 px-4 py-2 rounded-xl transition-all text-sm font-medium">
                <X className="w-4 h-4" /> Close
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-8 space-y-10">

              {/* ROI Banner */}
              <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-xl p-5 text-center">
                <p className="text-slate-300 text-sm">☀️ The average solar installation generates <strong className="text-teal-300">$8,000–$15,000</strong> in revenue for your business. One closed deal from our outreach pays for months of service.</p>
              </div>

              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-4">
                <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
                <button onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                  className={`relative inline-flex w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${billingCycle === 'annual' ? 'bg-teal-500' : 'bg-slate-600'}`}>
                  <span className={`inline-block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 mt-0.5 ml-0.5 ${billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
                <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-teal-400' : 'text-slate-500'}`}>Annual</span>
                <span className="text-xs bg-teal-500/20 text-teal-300 border border-teal-500/40 px-2 py-0.5 rounded-full font-semibold">Save 20%</span>
              </div>

              {/* Plans Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {plans.map((plan, i) => (
                  <div key={i} className={`${plan.bg} border-2 ${plan.border} rounded-2xl p-6 flex flex-col relative`}>
                    {plan.badge && (
                      <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 ${plan.badgeBg} px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap`}>{plan.badge}</div>
                    )}

                    <div className={`mb-5 ${plan.badge ? 'mt-2' : ''}`}>
                      <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center text-2xl mb-4">{plan.emoji}</div>
                      <h3 className={`text-lg font-bold ${plan.nameColor} tracking-widest uppercase mb-1`}>{plan.name}</h3>
                      <p className="text-slate-500 text-xs mb-3">{plan.desc}</p>
                      {/* ROI badge */}
                      <div className={`${plan.roiBg} rounded-lg px-3 py-2 mb-1`}>
                        <p className="text-xs font-medium">
                          <span className={plan.roiTextColor}>💡 {plan.roiLabel} </span>
                          <strong className="text-white">{plan.roiValue}</strong>
                        </p>
                      </div>
                    </div>

                    {/* Pricing with strikethrough */}
                    <div className="mb-5">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-slate-500 text-sm line-through decoration-red-400">${billingCycle === 'annual' ? plan.strikeAnnual : plan.strikeMonthly}/mo</span>
                        <span className="text-xs bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-0.5 rounded-full font-semibold">
                          {billingCycle === 'annual' ? plan.saveAnnual : plan.saveMonthly}
                        </span>
                      </div>
                      <div className="flex items-start gap-1">
                        <span className="text-slate-400 text-lg mt-1">$</span>
                        <span className="text-5xl font-bold text-white">{billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly}</span>
                      </div>
                      <p className="text-slate-500 text-xs mt-1">per month, billed {billingCycle === 'annual' ? 'annually' : 'monthly'}</p>
                    </div>

                    {/* Feature lists */}
                    <div className="mb-6 space-y-4 flex-1">
                      <div>
                        <p className="text-xs font-bold text-teal-500 tracking-widest mb-2">OUTREACH & LEAD GENERATION</p>
                        <ul className="space-y-2 text-xs text-slate-400">
                          {plan.outreach.map((f, j) => (
                            <li key={j} className="flex gap-2"><span className="text-teal-400 mt-0.5 shrink-0">✓</span><span>{f}</span></li>
                          ))}
                        </ul>
                      </div>

                      {plan.ai && (
                        <div>
                          <p className="text-xs font-bold text-purple-400 tracking-widest mb-2">🤖 AI VOICE AGENT</p>
                          <ul className="space-y-2 text-xs text-slate-400">
                            {plan.ai.map((f, j) => (
                              <li key={j} className="flex gap-2"><span className="text-purple-400 mt-0.5 shrink-0">◆</span><span>{f}</span></li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {plan.crm && (
                        <div>
                          <p className="text-xs font-bold text-blue-400 tracking-widest mb-2">🔗 CRM INTEGRATION</p>
                          <ul className="space-y-2 text-xs text-slate-400">
                            <li className="flex gap-2"><span className="text-blue-400 mt-0.5 shrink-0">✓</span><span>Qualified prospects pushed directly into your existing CRM in real-time</span></li>
                          </ul>
                        </div>
                      )}

                      <div>
                        <p className="text-xs font-bold text-teal-500 tracking-widest mb-2">DELIVERY & SUPPORT</p>
                        <ul className="space-y-2 text-xs text-slate-400">
                          {plan.delivery.map((f, j) => (
                            <li key={j} className="flex gap-2"><span className="text-teal-400 mt-0.5 shrink-0">✓</span><span>{f}</span></li>
                          ))}
                        </ul>
                      </div>

                      <div className="border border-slate-700/60 rounded-lg p-3 bg-slate-900/30">
                        <p className="text-xs text-slate-500 italic">⚠️ We deliver prospects who have responded with genuine interest. Converting them into paying customers is the responsibility of your sales team.</p>
                      </div>
                    </div>

                    <button onClick={() => { setShowPricingModal(false); contactFormRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
                      className={`w-full py-2.5 rounded-xl font-semibold transition-all text-sm ${plan.btnClass}`}>
                      {plan.btnLabel}
                    </button>
                  </div>
                ))}
              </div>

              {/* Comparison Table */}
              <div>
                <h3 className="text-2xl font-bold text-white text-center mb-2">Full Feature Comparison</h3>
                <p className="text-slate-400 text-center text-sm mb-8">Everything side-by-side so you can choose with confidence</p>
                <div className="overflow-x-auto rounded-xl border border-slate-700">
                  <table className="w-full text-sm" style={{ minWidth: '600px' }}>
                    <thead>
                      <tr className="border-b border-slate-700 bg-slate-800/60">
                        <th className="text-left px-5 py-4 text-slate-400 font-semibold tracking-wider text-xs uppercase w-2/5">Feature</th>
                        <th className="px-4 py-4 text-center text-white font-bold text-xs uppercase tracking-wide">Core<br/><span className="text-slate-400 font-normal normal-case">${billingCycle === 'annual' ? '638' : '797'}/mo</span></th>
                        <th className="px-4 py-4 text-center text-amber-300 font-bold text-xs uppercase tracking-wide">Growth ⭐<br/><span className="text-slate-400 font-normal normal-case">${billingCycle === 'annual' ? '1,198' : '1,497'}/mo</span></th>
                        <th className="px-4 py-4 text-center text-teal-300 font-bold text-xs uppercase tracking-wide">Pro<br/><span className="text-slate-400 font-normal normal-case">${billingCycle === 'annual' ? '1,758' : '2,197'}/mo</span></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      <tr className="bg-slate-800/30"><td colSpan={4} className="px-5 py-2.5 text-xs font-bold text-teal-500 tracking-widest">📬 OUTREACH</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">Prospects researched/mo</td><td className="px-4 py-3 text-center text-slate-300 text-xs">200</td><td className="px-4 py-3 text-center text-slate-300 text-xs">500</td><td className="px-4 py-3 text-center text-slate-300 text-xs">1,000+</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">AI email sequence</td><td className="px-4 py-3 text-center text-slate-300 text-xs">3-step</td><td className="px-4 py-3 text-center text-slate-300 text-xs">3-step</td><td className="px-4 py-3 text-center text-slate-300 text-xs">5-step</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">LinkedIn outreach/mo</td><td className="px-4 py-3 text-center text-slate-300 text-xs">50</td><td className="px-4 py-3 text-center text-slate-300 text-xs">100–150</td><td className="px-4 py-3 text-center text-slate-300 text-xs">200+</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">SMS follow-up</td><td className="px-4 py-3 text-center text-slate-600">—</td><td className="px-4 py-3 text-center text-slate-300 text-xs">2-step</td><td className="px-4 py-3 text-center text-slate-300 text-xs">5-step</td></tr>
                      <tr className="bg-slate-800/30"><td colSpan={4} className="px-5 py-2.5 text-xs font-bold text-purple-400 tracking-widest">🤖 AI VOICE AGENT</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">Inbound call qualification</td><td className="px-4 py-3 text-center text-slate-600">—</td><td className="px-4 py-3 text-center text-teal-400">✓</td><td className="px-4 py-3 text-center text-teal-400">✓</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">Outbound follow-up calls</td><td className="px-4 py-3 text-center text-slate-600">—</td><td className="px-4 py-3 text-center text-slate-600">—</td><td className="px-4 py-3 text-center text-teal-400">✓</td></tr>
                      <tr className="bg-slate-800/30"><td colSpan={4} className="px-5 py-2.5 text-xs font-bold text-blue-400 tracking-widest">🔗 CRM & REPORTING</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">CRM integration</td><td className="px-4 py-3 text-center text-slate-600">—</td><td className="px-4 py-3 text-center text-teal-400">✓</td><td className="px-4 py-3 text-center text-teal-400">✓</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">Google Sheet delivery</td><td className="px-4 py-3 text-center text-teal-400">✓</td><td className="px-4 py-3 text-center text-teal-400">✓</td><td className="px-4 py-3 text-center text-teal-400">✓</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">Monthly activity report</td><td className="px-4 py-3 text-center text-teal-400">✓</td><td className="px-4 py-3 text-center text-teal-400">✓</td><td className="px-4 py-3 text-center text-teal-400">✓</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">Strategy calls</td><td className="px-4 py-3 text-center text-slate-600">—</td><td className="px-4 py-3 text-center text-slate-300 text-xs">Bi-weekly</td><td className="px-4 py-3 text-center text-slate-300 text-xs">Weekly</td></tr>
                      <tr className="hover:bg-slate-800/20"><td className="px-5 py-3 text-slate-300">Support response time</td><td className="px-4 py-3 text-center text-slate-300 text-xs">48 hrs</td><td className="px-4 py-3 text-center text-slate-300 text-xs">24 hrs</td><td className="px-4 py-3 text-center text-slate-300 text-xs">Same day</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Legal Disclaimer */}
              <div className="border border-slate-700 bg-slate-800/20 rounded-xl p-5 space-y-2">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-2">Important — Please Read Before Purchasing</p>
                <p className="text-slate-500 text-xs">• <strong className="text-slate-400">Contacts</strong> are solar businesses or homeowners we identify and reach out to on your behalf via email, LinkedIn, or SMS.</p>
                <p className="text-slate-500 text-xs">• <strong className="text-slate-400">Prospects</strong> are contacts who respond with genuine interest — these are the leads we deliver to you.</p>
                <p className="text-slate-500 text-xs">• <strong className="text-slate-400">We do not guarantee sales or revenue.</strong> Converting prospects into paying customers is the responsibility of your sales team.</p>
                <p className="text-slate-500 text-xs">• All plans are <strong className="text-slate-400">month-to-month</strong> — no long-term contracts. Cancel anytime with 30 days notice.</p>
                <p className="text-slate-500 text-xs">• CRM integration (Growth & Pro) requires your team to provide API access to your existing CRM. Setup time may vary by platform.</p>
              </div>

              {/* Bottom badges */}
              <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-400 pb-2">
                <span>🔒 No long-term contracts</span>
                <span>❌ Cancel anytime</span>
                <span>🤖 AI Voice (Growth+)</span>
                <span>🔗 CRM integration (Growth+)</span>
                <span>⚡ 48hr onboarding</span>
                <span>🇺🇸 🇬🇧 US & UK markets</span>
              </div>

            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes cardFloat { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes softGlow { 0%, 100% { box-shadow: 0 10px 30px rgba(20, 184, 166, 0.1); } 50% { box-shadow: 0 20px 40px rgba(20, 184, 166, 0.2); } }
        @keyframes buttonShimmer { 0% { left: -100%; } 100% { left: 100%; } }
        @keyframes buttonPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.4); } 50% { box-shadow: 0 0 0 8px rgba(20, 184, 166, 0); } }
        @keyframes iconBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        @keyframes readMoreFloat { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-3px); } }
        @keyframes readMoreGlow { 0%, 100% { box-shadow: 0 4px 15px rgba(20,184,166,0.1), inset 0 0 0 1px rgba(20,184,166,0.3); } 50% { box-shadow: 0 8px 25px rgba(20,184,166,0.25), inset 0 0 0 1px rgba(20,184,166,0.5); } }
        @keyframes heroButtonFloat { 0%, 100% { transform: translateY(0px) scale(1); } 50% { transform: translateY(-8px) scale(1.08); } }
        @keyframes heroButtonGlow { 0%, 100% { box-shadow: 0 12px 24px rgba(20,184,166,0.25), 0 0 0 0 rgba(20,184,166,0.5); } 50% { box-shadow: 0 20px 50px rgba(20,184,166,0.45), 0 0 40px 12px rgba(20,184,166,0.3); } }
        @keyframes arrowSlide { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(4px); } }
        @keyframes heroButtonShine { 0% { left: -100%; } 100% { left: 100%; } }
        @keyframes headerGetStartedFloat { 0%, 100% { transform: translateY(0px) scale(1); } 50% { transform: translateY(-6px) scale(1.05); } }
        @keyframes headerGetStartedGlow { 0%, 100% { box-shadow: 0 8px 20px rgba(20,184,166,0.2), 0 0 0 0 rgba(20,184,166,0.4); } 50% { box-shadow: 0 16px 40px rgba(20,184,166,0.4), 0 0 30px 8px rgba(20,184,166,0.2); } }
        @keyframes headerGetStartedShimmer { 0% { left: -100%; } 100% { left: 100%; } }

        html { scroll-behavior: smooth; }

        .hero-get-started-btn { transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); position: relative; z-index: 1; overflow: hidden; }
        .hero-get-started-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 100%); opacity: 0; transition: opacity 0.3s ease; border-radius: inherit; pointer-events: none; z-index: -1; }
        .hero-get-started-btn::after { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent); border-radius: inherit; transition: none; }
        .hero-get-started-btn:hover::before { opacity: 1 !important; }
        .hero-get-started-btn:hover::after { animation: heroButtonShine 0.7s ease-in-out !important; }
        .hero-get-started-btn:hover { animation: heroButtonFloat 2s ease-in-out infinite, heroButtonGlow 2s ease-in-out infinite !important; background: linear-gradient(to right, rgb(34,211,238), rgb(20,184,166)) !important; transform: translateY(0) !important; }
        .hero-get-started-btn:hover svg { animation: arrowSlide 1s ease-in-out infinite !important; }
        .hero-get-started-btn:active { animation: none !important; transform: translateY(-2px) scale(0.96) !important; }

        .header-get-started-btn { transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1); position: relative; z-index: 1; overflow: hidden; color: rgb(255,255,255) !important; }
        .header-get-started-btn:hover { animation: headerGetStartedFloat 1.4s ease-in-out infinite, headerGetStartedGlow 1.4s ease-in-out infinite; color: rgb(255,255,255) !important; border-color: rgba(20,184,166,0.9) !important; background-color: rgba(0,0,0,0.8) !important; }
        .header-get-started-btn:active { transform: translateY(-1px) scale(0.96); animation: none !important; }

        .form-get-started-btn { transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1); position: relative; z-index: 1; overflow: hidden; }
        .form-get-started-btn:hover { animation: headerGetStartedFloat 1.8s ease-in-out infinite, headerGetStartedGlow 1.8s ease-in-out infinite !important; background: linear-gradient(to right, rgb(45,212,191), rgb(34,211,238)) !important; box-shadow: 0 12px 30px rgba(20,184,166,0.4) !important; transform: translateY(0) !important; }
        .form-get-started-btn:active { animation: none !important; transform: translateY(-2px) scale(0.98) !important; }

        .read-more-btn { transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1); }
        .read-more-btn:hover { animation: readMoreFloat 2s ease-in-out infinite, readMoreGlow 2s ease-in-out infinite; transform: translateY(0); }

        .feature-hover-card { transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1); position: relative; overflow: hidden; }
        .feature-hover-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, rgba(20,184,166,0.1) 0%, transparent 100%); opacity: 0; transition: opacity 0.4s ease; pointer-events: none; }
        .feature-hover-card:hover { animation: cardFloat 2s ease-in-out infinite, softGlow 2s ease-in-out infinite; border-color: rgb(20,184,166) !important; background-color: rgba(30,41,59,0.5) !important; transform: translateY(0); }
        .feature-hover-card:hover::before { opacity: 1; }
        .feature-hover-card:active { transform: scale(0.98); animation: none !important; }

        nav button:not(.bg-white)::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 2px; background: rgb(20,184,166); transition: width 0.3s ease; }
        nav button:not(.bg-white):hover { color: rgb(45,212,191) !important; transform: translateY(-2px); text-shadow: 0 0 10px rgba(20,184,166,0.5); }
        nav button:not(.bg-white):hover::after { width: 100%; }
        nav button:not(.bg-white):active { transform: translateY(0); }

        input:focus, textarea:focus { animation: slideDown 0.3s ease; }
      `}</style>
    </div>
  );
}