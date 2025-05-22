export type OrderStatus = 'Pending' | 'Confirmed' | 'In-process' | 'Picked Up' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  buyerName: string;
  productName: string;
  price: number;
  storeName: string;
  status: OrderStatus;
  date: string;
  verificationCode?: string;
}

export type ItemCategory = 'Product' | 'Service';

export interface Item {
  id: string;
  title: string;
  category: ItemCategory;
  subcategory: string;
  price: number;
  description: string;
  imageUrl: string;
  stock?: number; // For products
  duration?: string; // For services
  featured: boolean;
}

export interface StoreProfile {
  name: string;
  phone: string;
  workingHours: string;
  category: 'Car Parts' | 'Car Services' | 'Both';
  bio: string;
  logoUrl: string;
  address: string;
  latitude: number;
  longitude: number;
  deliveryZones: string[];
  proximityVisible: boolean;
}

export interface Customer {
  id: string;
  name: string;
  contact: string;
  totalSpent: number;
  orderCount: number;
  lastOrderDate: string;
  reviewCount: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'stock' | 'review' | 'system';
}

export interface AnalyticsData {
  totalSales: number;
  bestSellingItem: string;
  customerRepeatRate: number;
  averageRating: number;
  lowStockItems: Array<{
    id: string;
    name: string;
    stock: number;
  }>;
  topProducts: Array<{
    name: string;
    count: number;
  }>;
  salesTrend: Array<{
    month: string;
    amount: number;
  }>;
}