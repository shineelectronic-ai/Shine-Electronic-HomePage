
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Laptop, Cpu, HardDrive, Shield, 
  Settings, ArrowRight, Mail, Phone, MapPin, 
  Trash2, Edit2, PlusCircle, Network, Camera, Tv, MessageSquare, Smartphone, Database, CheckCircle
} from 'lucide-react';
import { Service, SiteConfig } from './types.ts';
import { INITIAL_SERVICES, INITIAL_SITE_CONFIG } from './constants.tsx';

// --- Components ---

const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <svg width="60" height="50" viewBox="0 0 100 85" className="mr-3">
        <circle cx="50" cy="30" r="28" fill="#00FF00" fillOpacity="0.75" />
        <circle cx="32" cy="55" r="28" fill="#FF0000" fillOpacity="0.75" />
        <circle cx="68" cy="55" r="28" fill="#0000FF" fillOpacity="0.75" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-xl font-serif font-bold text-slate-900 tracking-tight">shine</span>
        <span className="text-2xl font-serif font-bold text-slate-900 tracking-tighter -mt-1 uppercase">Electronic</span>
        <span className="text-[10px] font-sans font-extrabold text-brand-purple tracking-[0.2em] mt-0.5 uppercase">& COMPUTER</span>
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
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="hover:opacity-90 transition-opacity">
            <Logo className="scale-90 origin-left" />
          </Link>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`${
                    location.pathname === link.path ? 'text-brand-purple border-b-2 border-brand-purple' : 'text-slate-600 hover:text-brand-purple'
                  } px-1 py-1 text-sm font-bold transition-all`}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/admin" className="text-slate-400 hover:text-brand-purple transition-colors">
                <Settings size={20} />
              </Link>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-brand-purple focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-2 pt-2 pb-3 space-y-1 shadow-xl">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-slate-700 hover:text-brand-purple px-3 py-4 rounded-md text-base font-bold"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/admin"
            onClick={() => setIsOpen(false)}
            className="block text-slate-700 hover:text-brand-purple px-3 py-4 rounded-md text-base font-bold"
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
    <footer className="bg-slate-100 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Logo className="mb-8 origin-left" />
            <p className="text-slate-600 max-w-sm mb-8">
              Serving the Upper West Side for over 40 years. We specialize in repair, installation, and modernization of computers and electronics.
            </p>
          </div>
          <div>
            <h3 className="text-slate-900 font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-slate-600">
              <li><Link to="/" className="hover:text-brand-purple transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-brand-purple transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-brand-purple transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-slate-900 font-bold mb-6">Contact Info</h3>
            <ul className="space-y-4 text-slate-600">
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-brand-purple" />
                <span className="font-medium text-slate-900">{config.phone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Smartphone size={18} className="text-brand-purple" />
                <span className="font-medium text-slate-900">{config.textPhone} (SMS)</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-brand-purple mt-1" />
                <span className="text-sm">{config.address}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-8 text-center text-slate-500 text-sm">
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
    case 'tv': return <Tv className="w-8 h-8" />;
    case 'database': return <Database className="w-8 h-8" />;
    default: return <Settings className="w-8 h-8" />;
  }
};

// --- Pages ---

const Home: React.FC<{ services: Service[], config: SiteConfig }> = ({ services, config }) => {
  return (
    <div className="pt-20">
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 hidden lg:block skew-x-[-15deg] transform translate-x-1/4"></div>
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-bold mb-6 tracking-widest uppercase">
              <span className="flex h-2 w-2 rounded-full bg-brand-purple animate-pulse"></span>
              <span>NYC Premier Tech Shop</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-display font-extrabold text-slate-900 leading-[1.1] mb-6">
              Expert Repair & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-indigo-600">
                Tech Solutions
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
              Serving the Upper West Side since 1983. We offer professional computer repair, networking, and high-end home theater installations.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link to="/contact" className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-xl transition-all transform hover:-translate-y-1 active:scale-95">
                Book a Service
              </Link>
              <div className="flex items-center gap-2 text-slate-500 font-bold">
                <CheckCircle className="text-brand-purple" size={18} />
                <span>On-Site Estimates</span>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] animate-in zoom-in fade-in duration-1000">
             <div className="absolute top-0 right-0 w-full h-full grid grid-cols-2 grid-rows-2 gap-4">
                <div className="rounded-3xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform">
                  <img src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=400" alt="Home Theater" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform translate-y-8">
                  <img src="https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&q=80&w=400" alt="Desktop PC" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform -translate-y-8">
                  <img src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=400" alt="Networking" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform">
                  <img src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400" alt="Laptop Repair" className="w-full h-full object-cover" />
                </div>
             </div>
             <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 flex items-center space-x-4 w-64">
                <div className="w-12 h-12 bg-brand-purple/10 rounded-full flex items-center justify-center text-brand-purple">
                  <Shield size={24} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Trusted NYC Pro</p>
                  <p className="text-xs text-slate-500">Authorized & Insured</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-slate-900 mb-4">Our Expertise</h2>
            <div className="w-20 h-1.5 bg-brand-purple mx-auto mb-6 rounded-full"></div>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Comprehensive technology solutions for your home and business.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="group overflow-hidden bg-white border border-slate-200 rounded-[2rem] hover:border-brand-purple/30 transition-all hover:shadow-2xl">
                <div className="h-48 relative overflow-hidden">
                   <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
                </div>
                <div className="p-8 pt-0 relative z-10">
                  <div className="w-14 h-14 bg-white shadow-lg rounded-2xl flex items-center justify-center text-brand-purple mb-6 -mt-7">
                    <ServiceIcon type={service.icon} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <Link to="/contact" className="text-brand-purple font-extrabold flex items-center gap-2 group-hover:gap-4 transition-all uppercase text-xs tracking-widest">
                    Request Details <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-10">
              <h2 className="text-4xl font-display font-bold text-slate-900">Serving New Yorkers Since 1983</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-brand-purple/20 transition-colors">
                  <div className="text-brand-purple mb-4"><Network size={32} /></div>
                  <h4 className="text-slate-900 font-bold text-lg mb-2">Network Experts</h4>
                  <p className="text-slate-600 text-sm">Low-latency infrastructure for both residential and commercial properties.</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-brand-purple/20 transition-colors">
                  <div className="text-brand-purple mb-4"><Tv size={32} /></div>
                  <h4 className="text-slate-900 font-bold text-lg mb-2">Theater Pro</h4>
                  <p className="text-slate-600 text-sm">Integration with the latest audiovisual technology for immersive experiences.</p>
                </div>
              </div>
           </div>
           <div className="bg-slate-900 p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-purple/10 blur-[100px]"></div>
              <div className="relative z-10">
                <p className="text-brand-purple font-bold mb-4 tracking-[0.2em] uppercase text-sm">Verified Testimonial</p>
                <h3 className="text-2xl font-serif italic mb-8 leading-relaxed">"Shine is a neighborhood staple. They modernized my entire office network and converted years of family VHS tapes to digital video perfectly. Professional and fast."</h3>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-bold text-brand-purple">RM</div>
                   <div>
                      <p className="font-bold">Robert M.</p>
                      <p className="text-slate-400 text-xs">UWS Resident</p>
                   </div>
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
    <div className="pt-32 pb-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-display font-bold text-slate-900 mb-12 text-center">Comprehensive Tech Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(s => (
            <div key={s.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-brand-purple/40 transition-all shadow-sm hover:shadow-xl">
              <div className="h-56 relative">
                <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
                <div className="absolute bottom-6 left-8 text-brand-purple"><ServiceIcon type={s.icon} /></div>
              </div>
              <div className="p-8 pt-0">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{s.title}</h2>
                <p className="text-slate-600 mb-8 leading-relaxed">{s.description}</p>
                <Link to="/contact" className="block w-full py-4 bg-slate-100 hover:bg-brand-purple hover:text-white text-slate-900 text-center rounded-xl transition-all font-bold">Inquire Now</Link>
              </div>
            </div>
          ))}
        </div>
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
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
          <div>
            <h1 className="text-5xl font-display font-bold text-slate-900 mb-6 tracking-tight">Visit Our NYC Shop</h1>
            <p className="text-slate-600 text-lg mb-12 leading-relaxed">
              Located on the Upper West Side, we're here to solve all your electronic, computer, and security needs.
            </p>
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-slate-100 rounded-2xl text-brand-purple"><MapPin /></div>
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Address</p>
                  <p className="text-slate-900 font-bold text-lg">{config.address}</p>
                  <p className="text-slate-500 text-sm">Mon-Fri: 10am - 7pm | Sat: 11am - 5pm</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-slate-100 rounded-2xl text-brand-purple"><Phone /></div>
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Call Us</p>
                  <p className="text-slate-900 font-bold text-lg">{config.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-slate-100 rounded-2xl text-brand-purple"><Smartphone /></div>
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Text Updates (SMS)</p>
                  <p className="text-slate-900 font-bold text-lg">{config.textPhone}</p>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Message Sent!</h3>
                <p className="text-slate-600">Our tech specialists will get back to you within 24 hours.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-slate-500 text-xs font-bold uppercase mb-2">Name</label>
                  <input required type="text" placeholder="Your Name" className="w-full bg-white border border-slate-200 rounded-xl p-4 text-slate-900 focus:ring-2 ring-brand-purple/20 focus:border-brand-purple outline-none transition-all" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-500 text-xs font-bold uppercase mb-2">Email</label>
                    <input required type="email" placeholder="email@example.com" className="w-full bg-white border border-slate-200 rounded-xl p-4 text-slate-900 focus:ring-2 ring-brand-purple/20 focus:border-brand-purple outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-xs font-bold uppercase mb-2">Service</label>
                    <select className="w-full bg-white border border-slate-200 rounded-xl p-4 text-slate-900 focus:ring-2 ring-brand-purple/20 focus:border-brand-purple outline-none transition-all">
                      <option>Computer Repair</option>
                      <option>TV/Home Theater</option>
                      <option>Media Conversion</option>
                      <option>Security/CCTV</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-slate-500 text-xs font-bold uppercase mb-2">Project Details</label>
                  <textarea rows={4} placeholder="Describe the issue or project..." className="w-full bg-white border border-slate-200 rounded-xl p-4 text-slate-900 focus:ring-2 ring-brand-purple/20 focus:border-brand-purple outline-none transition-all"></textarea>
                </div>
                <button type="submit" className="w-full py-5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl shadow-xl transition-all transform active:scale-[0.98] uppercase tracking-widest">
                  Send Inquiry
                </button>
              </div>
            )}
          </form>
        </div>
        <div className="w-full h-[450px] rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.921387606774!2d-73.97828062341498!3d40.78572417138342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2588f018e692b%3A0xc3f124c653655325!2s137%20W%2083rd%20St%2C%20New%20York%2C%20NY%2010024!5e0!3m2!1sen!2sus!4v1709400000000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Shine Electronic Map"
          ></iframe>
        </div>
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
      description: "Service description goes here.",
      icon: "settings"
    };
    setServices([...services, newService]);
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4">
      <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-2xl">
        <div className="flex border-b border-slate-200">
          <button onClick={() => setActiveTab('config')} className={`px-10 py-6 font-bold ${activeTab === 'config' ? 'bg-slate-50 text-brand-purple' : 'text-slate-400 hover:text-slate-600'}`}>General Config</button>
          <button onClick={() => setActiveTab('services')} className={`px-10 py-6 font-bold ${activeTab === 'services' ? 'bg-slate-50 text-brand-purple' : 'text-slate-400 hover:text-slate-600'}`}>Manage Services</button>
        </div>
        <div className="p-10">
          {activeTab === 'config' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-slate-500 text-xs font-bold uppercase mb-2">Shop Name</label>
                  <input type="text" value={config.shopName} onChange={(e) => updateConfig('shopName', e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900" />
                </div>
                <div>
                  <label className="block text-slate-500 text-xs font-bold uppercase mb-2">Tagline</label>
                  <input type="text" value={config.tagline} onChange={(e) => updateConfig('tagline', e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900" />
                </div>
                <div>
                  <label className="block text-slate-500 text-xs font-bold uppercase mb-2">Phone</label>
                  <input type="text" value={config.phone} onChange={(e) => updateConfig('phone', e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900" />
                </div>
                <div>
                  <label className="block text-slate-500 text-xs font-bold uppercase mb-2">SMS Phone</label>
                  <input type="text" value={config.textPhone} onChange={(e) => updateConfig('textPhone', e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-slate-500 text-xs font-bold uppercase mb-2">Address</label>
                  <input type="text" value={config.address} onChange={(e) => updateConfig('address', e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900" />
                </div>
              </div>
              <button className="px-10 py-4 bg-brand-purple text-white rounded-xl font-bold shadow-lg">Save Settings</button>
            </div>
          )}
          {activeTab === 'services' && (
            <div>
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-bold text-slate-900">Expertise Areas</h3>
                <button onClick={addService} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition-all">
                  <PlusCircle size={20} /> Add New
                </button>
              </div>
              <div className="space-y-4">
                {services.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-6">
                      <div className="text-brand-purple bg-white p-3 rounded-xl shadow-sm"><ServiceIcon type={s.icon} /></div>
                      <div>
                        <h4 className="text-slate-900 font-bold">{s.title}</h4>
                        <p className="text-slate-500 text-sm truncate max-w-md">{s.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button className="text-slate-400 hover:text-brand-purple"><Edit2 size={20} /></button>
                      <button onClick={() => deleteService(s.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={20} /></button>
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
    const savedServices = localStorage.getItem('shine_v2_services');
    const savedConfig = localStorage.getItem('shine_v2_config');
    if (savedServices) setServices(JSON.parse(savedServices));
    if (savedConfig) setConfig(JSON.parse(savedConfig));
  }, []);

  useEffect(() => {
    localStorage.setItem('shine_v2_services', JSON.stringify(services));
    localStorage.setItem('shine_v2_config', JSON.stringify(config));
    document.title = `${config.shopName} | NYC Premier Tech Services`;
  }, [services, config]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-brand-purple selection:text-white">
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
        <Link to="/contact" className="fixed bottom-6 right-6 z-50 p-5 bg-brand-purple text-white rounded-full shadow-2xl md:hidden transform active:scale-90 transition-transform">
          <MessageSquare size={24} />
        </Link>
      </div>
    </Router>
  );
}
