
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

const Logo: React.FC<{ className?: string, height?: string }> = ({ className = "", height = "h-16 sm:h-20" }) => {
  return (
    <div className={`flex items-center gap-2 overflow-visible ${className}`}>
      {/* 
         사용자 요청 사양:
         1. 원 세 개 교집합: 빛의 삼원색 가산 혼합 (RGB -> Yellow, Cyan, Magenta, White)
         2. 상단: 녹색(#00FF00), 좌측하단: 빨강(#FF0000), 우측하단: 파랑(#0000FF)
         3. 블렌딩 모드를 screen으로 변경하여 교차 지점의 색상을 물리적으로 정확하게 표현
         4. 로고 글자 크기 10% 추가 확대 (최종 56px)
         5. 형태와 사이즈는 유지하되 풋터에서도 컬러로 표현
      */}
      <svg 
        viewBox="0 0 380 200" 
        className={`${height} w-auto drop-shadow-xl transition-transform duration-300 hover:scale-105`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g style={{ isolation: 'isolate' }}>
          {/* 빛의 삼원색 구현: 배경이 밝으므로 screen 모드가 효과를 내도록 어두운 베이스 보호 레이어 포함 */}
          <circle cx="180" cy="110" r="85" fill="#000000" opacity="0.15" filter="blur(8px)" />
          
          {/* 상단 원 (Pure Green) */}
          <circle cx="180" cy="70" r="54" fill="#00FF00" style={{ mixBlendMode: 'screen' }} />
          {/* 좌측 하단 원 (Pure Red) */}
          <circle cx="135" cy="145" r="54" fill="#FF0000" style={{ mixBlendMode: 'screen' }} />
          {/* 우측 하단 원 (Pure Blue) */}
          <circle cx="225" cy="145" r="54" fill="#0000FF" style={{ mixBlendMode: 'screen' }} />
        </g>

        {/* 텍스트 배치 - 크기 56px, 검정색, 강한 하얀색 음영 */}
        <g>
          <text 
            x="35" 
            y="100" 
            fontFamily="Montserrat, sans-serif" 
            fontWeight="900" 
            fontSize="56" 
            fill="#000000"
            style={{ 
              filter: 'drop-shadow(0px 0px 5px rgba(255,255,255,1)) drop-shadow(0px 0px 3px rgba(255,255,255,1))',
              paintOrder: 'stroke fill'
            }}
          >
            Shine
          </text>
          <text 
            x="80" 
            y="155" 
            fontFamily="Montserrat, sans-serif" 
            fontWeight="900" 
            fontSize="56" 
            fill="#000000"
            style={{ 
              filter: 'drop-shadow(0px 0px 5px rgba(255,255,255,1)) drop-shadow(0px 0px 3px rgba(255,255,255,1))',
              paintOrder: 'stroke fill'
            }}
          >
            Electronic
          </text>
        </g>
      </svg>
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
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 sm:h-28">
          <Link to="/" className="hover:opacity-90 transition-opacity flex-shrink-0">
            <Logo />
          </Link>
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-10">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`${
                    location.pathname === link.path ? 'text-brand-purple' : 'text-slate-600 hover:text-brand-purple'
                  } px-1 py-1 text-sm font-bold transition-all relative group`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-brand-purple transform origin-left transition-transform duration-300 ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </Link>
              ))}
              <Link to="/admin" className="text-slate-400 hover:text-brand-purple transition-colors p-2 rounded-full hover:bg-slate-50">
                <Settings size={20} />
              </Link>
            </div>
          </div>
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-brand-purple focus:outline-none p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top duration-300">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-4 rounded-xl text-base font-bold ${
                location.pathname === link.path ? 'bg-brand-purple/10 text-brand-purple' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/admin"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-4 rounded-xl text-base font-bold text-slate-400 hover:bg-slate-50"
          >
            Settings
          </Link>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC<{ config: SiteConfig }> = ({ config }) => {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            {/* 풋터 로고에서 흑백 스타일을 제거하여 헤더와 동일하게 컬러로 표현 */}
            <Logo height="h-16 sm:h-20" className="mb-8" />
            <p className="text-slate-500 max-w-sm mb-8 text-sm leading-relaxed">
              Serving the Upper West Side for over 40 years. Precision tech repair, installations, and digital modernization services for home and business.
            </p>
          </div>
          <div>
            <h3 className="text-slate-900 font-bold mb-6 text-sm uppercase tracking-widest">Company</h3>
            <ul className="space-y-4 text-slate-600 text-sm">
              <li><Link to="/" className="hover:text-brand-purple transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-brand-purple transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-brand-purple transition-colors">Contact Us</Link></li>
              <li><Link to="/admin" className="hover:text-brand-purple transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-slate-900 font-bold mb-6 text-sm uppercase tracking-widest">Connect</h3>
            <ul className="space-y-4 text-slate-600">
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-brand-purple" />
                <span className="text-sm font-medium">{config.phone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-brand-purple" />
                <span className="text-sm font-medium break-all">{config.email}</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="text-brand-purple mt-1 flex-shrink-0" />
                <span className="text-sm font-medium leading-tight">{config.address}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs uppercase tracking-widest font-bold">
          <p>© {new Date().getFullYear()} {config.shopName}. NYC Precision Service.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-brand-purple transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-purple transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Pages & Sub-components ---

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const icons: Record<string, any> = {
    laptop: Laptop,
    tv: Tv,
    network: Network,
    shield: Shield,
    database: Database,
    smartphone: Smartphone
  };
  const Icon = icons[service.icon] || Settings;

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={service.imageUrl} 
          alt={service.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 p-3 bg-white/90 backdrop-blur rounded-2xl text-brand-purple shadow-lg">
          <Icon size={24} />
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">{service.title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          {service.description}
        </p>
        <Link to="/contact" className="text-sm font-bold text-brand-purple flex items-center gap-2 group-hover:gap-3 transition-all">
          Learn More <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

const HomePage: React.FC<{ services: Service[], config: SiteConfig }> = ({ services, config }) => {
  return (
    <div className="pt-24">
      <section className="relative overflow-hidden bg-white pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-widest mb-6">
                Established 1983
              </span>
              <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tight mb-8 leading-[0.9]">
                Expert Tech <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-indigo-600">
                  Solutions.
                </span>
              </h1>
              <p className="text-xl text-slate-500 mb-10 leading-relaxed font-medium">
                {config.tagline}. From vintage audio repair to cutting-edge home networking and security systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                <Link to="/services" className="px-8 py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-brand-purple transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group">
                  View Services <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/contact" className="px-8 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-bold hover:border-brand-purple transition-all flex items-center justify-center gap-2">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="mt-16 lg:mt-0 lg:col-span-6">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-brand-purple/20 to-indigo-600/20 blur-2xl rounded-3xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200" 
                  alt="Tech repair" 
                  className="relative rounded-3xl shadow-2xl object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Professional Services</h2>
            <div className="h-1.5 w-24 bg-brand-purple mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ServicesPage: React.FC<{ services: Service[] }> = ({ services }) => {
  return (
    <div className="pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Our Services</h1>
          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
            Comprehensive technology solutions for your home and office. We combine decades of experience with modern expertise.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactPage: React.FC<{ config: SiteConfig }> = ({ config }) => {
  return (
    <div className="pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-5xl font-black text-slate-900 mb-8 tracking-tight text-brand-purple">Get In Touch</h1>
            <p className="text-xl text-slate-500 mb-12 leading-relaxed">
              Have a question or need a repair? Contact us today. We're conveniently located on the Upper West Side.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="p-4 bg-brand-purple/10 rounded-2xl text-brand-purple">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Call Us</h3>
                  <p className="text-slate-600 font-medium">{config.phone}</p>
                  <p className="text-slate-400 text-sm">Text: {config.textPhone}</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="p-4 bg-brand-purple/10 rounded-2xl text-brand-purple">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Email Us</h3>
                  <p className="text-slate-600 font-medium">{config.email}</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="p-4 bg-brand-purple/10 rounded-2xl text-brand-purple">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Visit Us</h3>
                  <p className="text-slate-600 font-medium">{config.address}</p>
                  <p className="text-slate-400 text-sm">New York, NY 10024</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Name</label>
                  <input type="text" className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-brand-purple outline-none transition-all font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Email</label>
                  <input type="email" className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-brand-purple outline-none transition-all font-medium" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Subject</label>
                <input type="text" className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-brand-purple outline-none transition-all font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Message</label>
                <textarea rows={5} className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-brand-purple outline-none transition-all font-medium resize-none"></textarea>
              </div>
              <button type="button" className="w-full py-5 bg-brand-purple text-white rounded-2xl font-bold hover:bg-slate-900 transition-all shadow-lg shadow-brand-purple/20">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminPage: React.FC<{ 
  config: SiteConfig, 
  setConfig: (c: SiteConfig) => void,
  services: Service[],
  setServices: (s: Service[]) => void
}> = ({ config, setConfig, services, setServices }) => {
  return (
    <div className="pt-32 pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-slate-900 mb-12 tracking-tight">Admin Dashboard</h1>
        
        <div className="space-y-12">
          <section className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <Settings size={24} className="text-brand-purple" /> General Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Shop Name</label>
                <input 
                  type="text" 
                  value={config.shopName}
                  onChange={(e) => setConfig({ ...config, shopName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-purple outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Tagline</label>
                <input 
                  type="text" 
                  value={config.tagline}
                  onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-purple outline-none"
                />
              </div>
            </div>
          </section>

          <section className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <Database size={24} className="text-brand-purple" /> Services
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-brand-purple transition-colors">
                <PlusCircle size={18} /> Add Service
              </button>
            </div>
            <div className="space-y-4">
              {services.map((service) => (
                <div key={service.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-4">
                    <img src={service.imageUrl} alt={service.title} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-bold text-slate-900">{service.title}</h4>
                      <p className="text-xs text-slate-500">{service.icon}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-brand-purple hover:bg-white rounded-lg transition-all"><Edit2 size={18} /></button>
                    <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-all"><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-brand-purple/20 selection:text-brand-purple">
        <Navbar shopName={siteConfig.shopName} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage services={services} config={siteConfig} />} />
            <Route path="/services" element={<ServicesPage services={services} />} />
            <Route path="/contact" element={<ContactPage config={siteConfig} />} />
            <Route path="/admin" element={<AdminPage config={siteConfig} setConfig={setSiteConfig} services={services} setServices={setServices} />} />
          </Routes>
        </main>

        <Footer config={siteConfig} />
      </div>
    </Router>
  );
};

export default App;
