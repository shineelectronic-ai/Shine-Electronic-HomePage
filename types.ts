
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl?: string;
  price?: string;
}

export interface SiteConfig {
  shopName: string;
  tagline: string;
  phone: string;
  textPhone: string;
  email: string;
  address: string;
}
