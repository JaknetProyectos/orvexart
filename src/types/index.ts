export interface Product {
  id: string;
  isNew?: boolean;
  isFeatured?: boolean;
  slug: string;
  price: number;
  image: string;
  category: string;
  
  // translation
  name: string;
  name_english?: string;
  description?: string;
  description_english?: string;
  specs?: string[];
  specs_english?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount?: number;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FooterLink {
  label: string;
  href: string;
}
