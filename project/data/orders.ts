import { Order } from '@/types';

export const mockOrders: Order[] = [
  {
    id: 'ORD-20230001',
    buyerName: 'Ahmed Bouaziz',
    productName: 'Continental Performance Tires',
    price: 45000,
    storeName: 'AutoParts Plus',
    status: 'Pending',
    date: '2023-06-15',
    verificationCode: '123456'
  },
  {
    id: 'ORD-20230002',
    buyerName: 'Lamia Hadj',
    productName: 'Engine Oil Change Service',
    price: 3500,
    storeName: 'AutoParts Plus',
    status: 'Confirmed',
    date: '2023-06-14',
    verificationCode: '234567'
  },
  {
    id: 'ORD-20230003',
    buyerName: 'Karim Benzema',
    productName: 'Premium Car Detailing',
    price: 12000,
    storeName: 'AutoParts Plus',
    status: 'Delivered',
    date: '2023-06-12',
    verificationCode: '345678'
  },
  {
    id: 'ORD-20230004',
    buyerName: 'Fatiha Belkacem',
    productName: 'Bosch Automotive Battery',
    price: 15000,
    storeName: 'AutoParts Plus',
    status: 'Picked Up',
    date: '2023-06-10',
    verificationCode: '456789'
  },
  {
    id: 'ORD-20230005',
    buyerName: 'Mohamed Salah',
    productName: 'Wheel Alignment Service',
    price: 5000,
    storeName: 'AutoParts Plus',
    status: 'In-process',
    date: '2023-06-09',
    verificationCode: '567890'
  },
  {
    id: 'ORD-20230006',
    buyerName: 'Amina Kouki',
    productName: 'Air Filter Replacement',
    price: 1200,
    storeName: 'AutoParts Plus',
    status: 'Cancelled',
    date: '2023-06-08',
    verificationCode: '678901'
  },
  {
    id: 'ORD-20230007',
    buyerName: 'Rachid Tlemcani',
    productName: 'Brake Pads (Front)',
    price: 8500,
    storeName: 'AutoParts Plus',
    status: 'Pending',
    date: '2023-06-07',
    verificationCode: '789012'
  },
  {
    id: 'ORD-20230008',
    buyerName: 'Yasmine Boudraa',
    productName: 'Full AC System Recharge',
    price: 7000,
    storeName: 'AutoParts Plus',
    status: 'Pending',
    date: '2023-06-06',
    verificationCode: '890123'
  }
];

export function getOrderById(id: string): Order | undefined {
  return mockOrders.find(order => order.id === id);
}

export function verifyOrderCode(orderId: string, code: string): boolean {
  const order = getOrderById(orderId);
  return order?.verificationCode === code;
}

export function getOrdersByStatus(status: string | null): Order[] {
  if (!status || status === 'All') {
    return [...mockOrders];
  }
  return mockOrders.filter(order => order.status === status);
}