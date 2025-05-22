import { AnalyticsData } from '@/types';

export const mockAnalytics: AnalyticsData = {
  totalSales: 97200,
  bestSellingItem: 'Continental Performance Tires',
  customerRepeatRate: 68,
  averageRating: 4.7,
  lowStockItems: [
    {
      id: 'PRD006',
      name: 'Air Filter',
      stock: 7
    },
    {
      id: 'PRD008',
      name: 'Car Audio System',
      stock: 5
    }
  ],
  topProducts: [
    {
      name: 'Continental Performance Tires',
      count: 24
    },
    {
      name: 'Engine Oil Change Service',
      count: 18
    },
    {
      name: 'Bosch Automotive Battery',
      count: 15
    },
    {
      name: 'Premium Car Detailing',
      count: 12
    },
    {
      name: 'Brake Pads (Front)',
      count: 10
    }
  ],
  salesTrend: [
    { month: 'Jan', amount: 60000 },
    { month: 'Feb', amount: 65000 },
    { month: 'Mar', amount: 75000 },
    { month: 'Apr', amount: 90000 },
    { month: 'May', amount: 85000 },
    { month: 'Jun', amount: 97200 }
  ]
};