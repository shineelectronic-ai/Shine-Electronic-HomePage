
import { Service, SiteConfig, BlogPost, ThemeConfig } from './types';

export const INITIAL_SITE_CONFIG: SiteConfig = {
  shopName: "Shine Electronic & Computer",
  tagline: "Precision Tech Services Since 1983",
  phone: "(212) 799-1773",
  textPhone: "(917) 960-2277",
  email: "shineelectronic@gmail.com",
  address: "137 West 83rd Street, New York, NY 10024",
};

export const INITIAL_THEME_CONFIG: ThemeConfig = {
  primaryColor: "#A020F0",
  headingFont: "Montserrat",
  bodyFont: "Inter",
};

export const INITIAL_SERVICES: Service[] = [
  {
    id: "1",
    title: "Computer Repair & Sales",
    description: "Full service for PC and Mac. OS upgrades, motherboard repair, and performance tuning. Authorized sales and expert diagnostics.",
    icon: "laptop",
    imageUrl: "https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "2",
    title: "Electronic & TV Systems",
    description: "Professional Home Audio & Video installation. TV mounting, online streaming setup, and high-end audio system upgrades.",
    icon: "tv",
    imageUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "3",
    title: "Networking & Data",
    description: "Secure home and office networking. Professional data backup solutions and recovery for failed drives.",
    icon: "network",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "4",
    title: "Security & CCTV",
    description: "Complete security system design and installation. High-definition CCTV monitoring to protect your property.",
    icon: "shield",
    imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "5",
    title: "Old Media Conversion",
    description: "Preserve your memories. Professional conversion of old VHS and Camcorder tapes to MP3, MP4, and digital video clips.",
    icon: "database",
    imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "6",
    title: "Mobile & Tablets",
    description: "Expert screen and battery replacements for all major mobile brands. Charging port and internal component repairs.",
    icon: "smartphone",
    imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800"
  }
];

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: "p1",
    title: "Why Maintenance Matters for High-End Audio",
    excerpt: "Professional high-end audio equipment requires precise calibration and internal cleaning to maintain its peak acoustic performance over decades.",
    content: "Full detailed article content here...",
    date: "2024-03-15",
    imageUrl: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "p2",
    title: "The Future of Home Security: AI-Driven Systems",
    excerpt: "Discover how AI-integrated CCTV systems are changing Manhattan security, offering smarter alerts and superior night vision capabilities.",
    content: "Full detailed article content here...",
    date: "2024-03-10",
    imageUrl: "https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=800"
  }
];
