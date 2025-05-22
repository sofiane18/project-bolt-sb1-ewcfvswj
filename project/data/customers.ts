import { Customer } from '@/types';

export const mockCustomers: Customer[] = [
  {
    id: 'CUS001',
    name: 'Ahmed Bouaziz',
    contact: 'ahmed.b@example.com',
    totalSpent: 85000,
    orderCount: 3,
    lastOrderDate: '2023-06-15',
    reviewCount: 2
  },
  {
    id: 'CUS002',
    name: 'Lamia Hadj',
    contact: '+213 555 678 123',
    totalSpent: 25500,
    orderCount: 5,
    lastOrderDate: '2023-06-14',
    reviewCount: 4
  },
  {
    id: 'CUS003',
    name: 'Karim Benzema',
    contact: 'karim90@example.com',
    totalSpent: 142000,
    orderCount: 8,
    lastOrderDate: '2023-06-12',
    reviewCount: 6
  },
  {
    id: 'CUS004',
    name: 'Fatiha Belkacem',
    contact: '+213 555 234 987',
    totalSpent: 35000,
    orderCount: 2,
    lastOrderDate: '2023-06-10',
    reviewCount: 1
  },
  {
    id: 'CUS005',
    name: 'Mohamed Salah',
    contact: 'msalah@example.com',
    totalSpent: 67500,
    orderCount: 4,
    lastOrderDate: '2023-06-09',
    reviewCount: 3
  },
  {
    id: 'CUS006',
    name: 'Amina Kouki',
    contact: '+213 555 789 456',
    totalSpent: 12500,
    orderCount: 1,
    lastOrderDate: '2023-06-08',
    reviewCount: 0
  },
  {
    id: 'CUS007',
    name: 'Rachid Tlemcani',
    contact: 'rachid.t@example.com',
    totalSpent: 98500,
    orderCount: 6,
    lastOrderDate: '2023-06-07',
    reviewCount: 5
  },
  {
    id: 'CUS008',
    name: 'Yasmine Boudraa',
    contact: '+213 555 123 789',
    totalSpent: 32000,
    orderCount: 2,
    lastOrderDate: '2023-06-06',
    reviewCount: 2
  }
];

export function searchCustomers(query: string): Customer[] {
  const lowercaseQuery = query.toLowerCase();
  return mockCustomers.filter(customer => 
    customer.name.toLowerCase().includes(lowercaseQuery) ||
    customer.contact.toLowerCase().includes(lowercaseQuery)
  );
}