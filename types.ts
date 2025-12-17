export enum Role {
  USER = 'user',
  MODEL = 'model'
}

export interface Message {
  id: string;
  role: Role;
  text: string;
  relatedProducts?: Product[];
  timestamp: number;
  showEmailRequest?: boolean; // New: Should we show the lead gen form?
  emailSubmitted?: boolean;   // New: Did the user submit the form?
}

export enum ProductCategory {
  NECKLACE = 'Dây chuyền',
  EARRINGS = 'Bông tai',
  RING = 'Nhẫn',
  BRACELET = 'Vòng tay'
}

export interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string; 
  badge?: string;         
  category: ProductCategory;
  description: string;
  imageUrl: string;
  arOverlayUrl: string; 
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isAROpen: boolean;
  activeProduct: Product | null;
}