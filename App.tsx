
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Laptop, Cpu, HardDrive, Shield, 
  Settings, ArrowRight, Mail, Phone, MapPin, 
  Trash2, Edit2, PlusCircle, Network, Camera, Tv, MessageSquare, Smartphone, Database
} from 'lucide-react';
import { Service, SiteConfig } from './types';
import { INITIAL_SERVICES, INITIAL_SITE_CONFIG } from './constants';

// --- Components ---

const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <svg width="70" height="60" viewBox="0 0 100 85" className="mr-2">
        {/* Overlapping RGB Circles matching the uploaded image */}
        <circle cx="50" cy="30" r="28" fill="#00FF00" fillOpacity="0.8" />
        <circle cx="32" cy="55" r="28" fill="#FF0000" fillOpacity="0.8" />
        <circle cx="68" cy="55" r="28" fill="#0000FF" fillOpacity="0.8" />
      </svg>
      <div className="flex flex-col leading-none -ml-6 z-10">
        <span className="text-xl font-serif font-bold text-white drop-shadow-md">Shine</span>
        <span className="text-2xl font-serif font-bold text-white drop-shadow-md -mt-0.5">Electronic</span>
        <span className="text-sm font-serif font-bold text-brand-purple drop-shadow-md mt-0.5 tracking-wider">& COMPUTER</span>
      </div>
    </div>
  );
};

const Navbar: React.FC<{ shopName: string }> = ({ shopName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-brand-purple/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="hover:opacity-90 transition-opacity">
            <Logo className="scale-75 sm:scale-90 origin-left" />
          </Link>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`${
                    location.pathname === link.path ? 'text-brand-purple' : 'text-gray-300 hover:text-white'
                  } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/admin" className="text-gray-400 hover:text-brand-purple transition-colors">
                <Settings size={20} />
              </Link>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-b border-brand-purple/20 px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-white px-3 py-4 rounded-md text-base font-medium"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/admin"
            onClick={() => setIsOpen(false)}
            className="block text-gray-300 hover:text-white px-3 py-4 rounded-md text-base font-medium"
          >
            Admin Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC<{ config: SiteConfig }> = ({ config }) => {
  return (
    <footer className="bg-black border-t border-brand-purple/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Logo className="scale-110 mb-8 origin-left" />
            <p className="text-gray-400 max-w-sm mb-8">
              Providing world-class repair services for high-end workstations, gaming rigs, and mobile electronics. We pride ourselves on precision and speed.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/" className="hover:text-brand-purple transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-brand-purple transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-brand-purple transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-6">Contact Info</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-brand-purple" />
                <span>{config.phone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Smartphone size={18} className="text-brand-purple" />
                <span>{config.textPhone} (Text Only)</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-brand-purple" />
                <span>{config.email}</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-brand-purple mt-1" />
                <span>{config.address}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Shine Electronic & Computer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const ServiceIcon: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'laptop': return <Laptop className="w-8 h-8" />;
    case 'smartphone': return <Smartphone className="w-8 h-8" />;
    case 'cpu': return <Cpu className="w-8 h-8" />;
    case 'hard-drive': return <HardDrive className="w-8 h-8" />;
    case 'shield': return <Shield className="w-8 h-8" />;
    case 'network': return <Network className="w-8 h-8" />;
    case 'camera': return <Camera className="w-8 h-8" />;
    case 'tv': return <Tv className="w-8 h-8" />;
    case 'database': return <Database className="w-8 h-8" />;
    default: return <Settings className="w-8 h-8" />;
  }
};

// --- Pages ---

const Home: React.FC<{ services: Service[], config: SiteConfig }> = ({ services, config }) => {
  return (
    <div className="pt-20">
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black z-0">
          {/* Animated Tech Background Video - Flashy hardware focus */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-50 scale-105 transition-opacity duration-1000"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-motherboard-close-up-with-moving-lights-40080-large.mp4" type="video/mp4" />
            {/* Fallback Image */}
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600" 
              alt="Hero Background" 
              className="w-full h-full object-cover"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/50 via-black/70 to-black"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-in fade-in slide-in-from-left-8 duration-700">
            <h1 className="text-5xl lg:text-7xl font-display font-extrabold text-white leading-tight mb-6">
              Expert Tech for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-purple-400 text-glow">
                Modern Living
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {config.tagline} We specialize in high-end electronics, advanced networking, and professional multimedia systems with precision and care.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/contact" className="w-full sm:w-auto px-8 py-4 bg-brand-purple hover:bg-brand-purple-dark text-white font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95 purple-glow">
                Request Service
              </Link>
              <Link to="/services" className="w-full sm:w-auto px-8 py-4 border border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white font-bold rounded-lg transition-all">
                Our Services
              </Link>
            </div>
          </div>
          <div className="hidden lg:block relative animate-in zoom-in fade-in duration-1000">
             <div className="w-full h-[500px] bg-gray-900 rounded-2xl overflow-hidden border border-brand-purple/30 purple-glow rotate-2 transition-transform hover:rotate-0 duration-500">
                <img src="https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800" alt="Tech Repair" className="w-full h-full object-cover opacity-60" />
             </div>
             <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-black/90 backdrop-blur-sm rounded-2xl border border-brand-purple/30 p-8 -rotate-3 purple-glow hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center space-x-4 mb-4">
                   <div className="w-12 h-12 bg-brand-purple/20 rounded-lg flex items-center justify-center text-brand-purple">
                      <Shield size={24} />
                   </div>
                   <div className="text-white font-bold">100% Reliable</div>
                </div>
                <p className="text-xs text-gray-400">Advanced infrastructure and entertainment solutions to keep your world connected and secure.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-white mb-4">Specialized Solutions</h2>
            <div className="w-24 h-1 bg-brand-purple mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">From enterprise-grade networking to professional multimedia setups, we deliver expert results every time.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div key={service.id} className="group overflow-hidden bg-zinc-900 border border-brand-purple/10 rounded-2xl hover:border-brand-purple/50 transition-all hover:-translate-y-2">
                <div className="h-48 relative overflow-hidden">
                   <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70" />
                   <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
                   <div className="absolute bottom-4 left-4 text-brand-purple">
                     <ServiceIcon type={service.icon} />
                   </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 h-12 overflow-hidden">
                    {service.description}
                  </p>
                  <Link to="/contact" className="text-brand-purple font-semibold flex items-center gap-2 group-hover:gap-4 transition-all">
                    Book Now <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-8">
              <h2 className="text-4xl font-display font-bold text-white">Why Shine Electronic?</h2>
              <div className="flex items-start gap-6 group">
                 <div className="p-3 bg-brand-purple/20 rounded-xl text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-all"><Network size={24} /></div>
                 <div>
                    <h4 className="text-white font-bold text-xl mb-2">Network Experts</h4>
                    <p className="text-gray-400">Specialized in low-latency infrastructure for both residential and commercial properties.</p>
                 </div>
              </div>
              <div className="flex items-start gap-6 group">
                 <div className="p-3 bg-brand-purple/20 rounded-xl text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-all"><Tv size={24} /></div>
                 <div>
                    <h4 className="text-white font-bold text-xl mb-2">Multimedia Masters</h4>
                    <p className="text-gray-400">Integration with the latest audiovisual technology for an immersive entertainment experience.</p>
                 </div>
              </div>
           </div>
           <div className="bg-zinc-900 p-12 rounded-3xl border border-brand-purple/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/10 blur-3xl group-hover:bg-brand-purple/20 transition-all"></div>
              <p className="text-brand-purple font-bold mb-4">TESTIMONIAL</p>
              <h3 className="text-2xl text-white italic mb-8">"They set up our entire multimedia room and office network in record time. The quality and simplicity are outstanding."</h3>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-brand-purple/40"></div>
                 <div>
                    <p className="text-white font-bold">James Miller</p>
                    <p className="text-gray-500 text-sm">Operations Director</p>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

const ServicesPage: React.FC<{ services: Service[] }> = ({ services }) => {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4">
      <h1 className="text-5xl font-display font-bold text-white mb-12 text-center">Our Specialized Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(s => (
          <div key={s.id} className="group bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 hover:border-brand-purple/40 transition-colors">
            <div className="h-56 relative">
              <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
              <div className="absolute bottom-6 left-8 text-brand-purple"><ServiceIcon type={s.icon} /></div>
            </div>
            <div className="p-8 pt-0">
              <h2 className="text-2xl font-bold text-white mb-4">{s.title}</h2>
              <p className="text-gray-400 mb-6">{s.description}</p>
              <Link to="/contact" className="block w-full py-3 bg-white/5 hover:bg-brand-purple text-white text-center rounded-lg transition-colors font-bold">Get Started</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ContactPage: React.FC<{ config: SiteConfig }> = ({ config }) => {
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h1 className="text-5xl font-display font-bold text-white mb-6">Get in Touch</h1>
          <p className="text-gray-400 text-lg mb-12">Need a network audit or multimedia consultation? Fill out the form or reach out directly to our team.</p>
          
          <div className="space-y-8">
            <a href={`tel:${config.phone}`} className="flex items-center gap-6 group">
              <div className="p-4 bg-brand-purple/10 rounded-full text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-all"><Phone /></div>
              <div>
                <p className="text-gray-500 text-sm">Call Us</p>
                <p className="text-white font-bold">{config.phone}</p>
              </div>
            </a>
            <a href={`sms:${config.textPhone}`} className="flex items-center gap-6 group">
              <div className="p-4 bg-brand-purple/10 rounded-full text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-all"><Smartphone /></div>
              <div>
                <p className="text-gray-500 text-sm">Text Us (SMS Only)</p>
                <p className="text-white font-bold">{config.textPhone}</p>
              </div>
            </a>
            <a href={`mailto:${config.email}`} className="flex items-center gap-6 group">
              <div className="p-4 bg-brand-purple/10 rounded-full text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-all"><Mail /></div>
              <div>
                <p className="text-gray-500 text-sm">Email Us</p>
                <p className="text-white font-bold">{config.email}</p>
              </div>
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-2xl border border-brand-purple/20">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                <Shield size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white">Inquiry Received!</h3>
              <p className="text-gray-400">A technical specialist will contact you shortly.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                <input required type="text" placeholder="John Doe" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-brand-purple outline-none transition-colors" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                  <input required type="email" placeholder="john@example.com" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-brand-purple outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2 flex items-center gap-2">
                    Phone Number <span className="text-[10px] uppercase text-brand-purple font-bold">(for Text Updates)</span>
                  </label>
                  <input required type="tel" placeholder="+1 (123) 456-7890" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-brand-purple outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Service Type</label>
                <select className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-brand-purple outline-none transition-colors">
                  <option>Network Inspection</option>
                  <option>Multimedia Repair & Installation</option>
                  <option>All Desktops & Laptops</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Project Details</label>
                <textarea rows={4} placeholder="Tell us about your technical needs..." className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-brand-purple outline-none transition-colors"></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-brand-purple hover:bg-brand-purple-dark text-white font-bold rounded-lg transition-all transform active:scale-[0.98] purple-glow">
                Send Inquiry
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC<{ 
  services: Service[], 
  setServices: React.Dispatch<React.SetStateAction<Service[]>>,
  config: SiteConfig,
  setConfig: React.Dispatch<React.SetStateAction<SiteConfig>>
}> = ({ services, setServices, config, setConfig }) => {
  const [activeTab, setActiveTab] = useState<'config' | 'services'>('config');

  const updateConfig = (field: string, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const deleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  const addService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      title: "New Service",
      description: "Description of the new service.",
      icon: "settings"
    };
    setServices([...services, newService]);
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4">
      <div className="bg-zinc-900 rounded-3xl border border-brand-purple/30 overflow-hidden">
        <div className="flex border-b border-white/5">
          <button onClick={() => setActiveTab('config')} className={`px-8 py-6 font-bold ${activeTab === 'config' ? 'bg-brand-purple text-white' : 'text-gray-400 hover:text-white'}`}>Site Config</button>
          <button onClick={() => setActiveTab('services')} className={`px-8 py-6 font-bold ${activeTab === 'services' ? 'bg-brand-purple text-white' : 'text-gray-400 hover:text-white'}`}>Services</button>
        </div>

        <div className="p-10">
          {activeTab === 'config' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-gray-400 mb-2">Shop Name</label>
                  <input type="text" value={config.shopName} onChange={(e) => updateConfig('shopName', e.target.value)} className="w-full bg-black border border-white/10 p-3 rounded-lg text-white" />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Tagline</label>
                  <input type="text" value={config.tagline} onChange={(e) => updateConfig('tagline', e.target.value)} className="w-full bg-black border border-white/10 p-3 rounded-lg text-white" />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Primary Phone</label>
                  <input type="text" value={config.phone} onChange={(e) => updateConfig('phone', e.target.value)} className="w-full bg-black border border-white/10 p-3 rounded-lg text-white" />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Text-only Phone (SMS)</label>
                  <input type="text" value={config.textPhone} onChange={(e) => updateConfig('textPhone', e.target.value)} className="w-full bg-black border border-white/10 p-3 rounded-lg text-white" />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Email</label>
                  <input type="text" value={config.email} onChange={(e) => updateConfig('email', e.target.value)} className="w-full bg-black border border-white/10 p-3 rounded-lg text-white" />
                </div>
              </div>
              <button className="px-8 py-3 bg-brand-purple text-white rounded-lg font-bold">Save Settings</button>
            </div>
          )}

          {activeTab === 'services' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-white">Manage Services</h3>
                <button onClick={addService} className="flex items-center gap-2 bg-brand-purple/20 text-brand-purple px-4 py-2 rounded-lg border border-brand-purple hover:bg-brand-purple hover:text-white transition-all">
                  <PlusCircle size={20} /> Add Service
                </button>
              </div>
              <div className="space-y-4">
                {services.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-6 bg-black rounded-xl border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="text-brand-purple"><ServiceIcon type={s.icon} /></div>
                      <div>
                        <h4 className="text-white font-bold">{s.title}</h4>
                        <p className="text-gray-500 text-sm truncate max-w-md">{s.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button className="text-gray-400 hover:text-white"><Edit2 size={20} /></button>
                      <button onClick={() => deleteService(s.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={20} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [config, setConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG);

  useEffect(() => {
    // Load data from localStorage if available
    const savedServices = localStorage.getItem('shine_services');
    const savedConfig = localStorage.getItem('shine_config');
    
    if (savedServices) setServices(JSON.parse(savedServices));
    if (savedConfig) setConfig(JSON.parse(savedConfig));
  }, []);

  useEffect(() => {
    // Persist data on change
    localStorage.setItem('shine_services', JSON.stringify(services));
    localStorage.setItem('shine_config', JSON.stringify(config));
    
    // SEO Tool: Update title
    document.title = `${config.shopName} | Premium Electronics & Security`;
  }, [services, config]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black text-white font-sans selection:bg-brand-purple selection:text-white">
        <Navbar shopName={config.shopName} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home services={services} config={config} />} />
            <Route path="/services" element={<ServicesPage services={services} />} />
            <Route path="/contact" element={<ContactPage config={config} />} />
            <Route path="/admin" element={
              <AdminDashboard 
                services={services} 
                setServices={setServices} 
                config={config} 
                setConfig={setConfig} 
              />
            } />
          </Routes>
        </main>

        <Footer config={config} />
        
        {/* Floating Contact Trigger (Mobile First) */}
        <Link to="/contact" className="fixed bottom-6 right-6 z-50 p-4 bg-brand-purple text-white rounded-full shadow-2xl purple-glow md:hidden">
          <MessageSquare size={24} />
        </Link>
      </div>
    </Router>
  );
}
