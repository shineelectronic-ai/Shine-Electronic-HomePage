
import { Service, SiteConfig } from './types';

export const INITIAL_SITE_CONFIG: SiteConfig = {
  shopName: "Shine Electronic & Computer",
  tagline: "Premium Precision. Professional Care.",
  phone: "+1 (212) 799-1773",
  textPhone: "+1 (917) 960-2277",
  email: "shineelectronic@gmail.com",
  address: "137 w 83rd Street, New York, NY10024",
};

export const INITIAL_SERVICES: Service[] = [
  {
    id: "1",
    title: "All Desktops & Laptops",
    description: "Expert diagnostics and board-level repairs for all major desktop and laptop brands including MacBook, Windows PC.",
    icon: "laptop",
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "5",
    title: "Mobile Phone & Tablet Repair",
    description: "Expert screen and battery replacement, charging port fixes, and advanced logic board repairs for all major mobile brands.",
    icon: "smartphone",
    imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "6",
    title: "Data Recovery & Backup",
    description: "Professional recovery from failed hard drives and SSDs. Secure automated backup solutions and seamless data migration for all your devices.",
    icon: "database",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "2",
    title: "Network Inspection",
    description: "Professional network diagnostics, signal optimization, and secure infrastructure setup for homes and offices.",
    icon: "network",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "3",
    title: "Multimedia Repair & Installation & Old Media Conversion",
    description: "Professional setup for home theaters and audio systems. Specialized in Old Media Conversion: We transform your VHS, Camcorder tapes, and old films into high-quality digital formats.",
    icon: "tv",
    imageUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "4",
    title: "Hardware Upgrades",
    description: "Boost performance with high-speed SSD installations, RAM expansions, and professional system builds.",
    icon: "hard-drive",
    imageUrl: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800"
  }
];
