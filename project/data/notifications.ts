import { Notification } from '@/types';

export const mockNotifications: Notification[] = [
  {
    id: 'NOTIF001',
    title: 'New Order Received',
    message: 'New order #ORD-20230001 received from Ahmed Bouaziz',
    time: '5 minutes ago',
    read: false,
    type: 'order'
  },
  {
    id: 'NOTIF002',
    title: 'Low Stock Alert',
    message: 'Air Filter is running low (7 units left)',
    time: '1 hour ago',
    read: false,
    type: 'stock'
  },
  {
    id: 'NOTIF003',
    title: 'New Review',
    message: 'Karim Benzema left a 5-star review for Premium Car Detailing',
    time: '3 hours ago',
    read: true,
    type: 'review'
  },
  {
    id: 'NOTIF004',
    title: 'Order Status Updated',
    message: 'Order #ORD-20230003 has been marked as Delivered',
    time: '1 day ago',
    read: true,
    type: 'order'
  },
  {
    id: 'NOTIF005',
    title: 'Payment Received',
    message: 'Payment received for order #ORD-20230002',
    time: '2 days ago',
    read: true,
    type: 'order'
  },
  {
    id: 'NOTIF006',
    title: 'System Update',
    message: 'The system will undergo maintenance on June 30th at 23:00',
    time: '3 days ago',
    read: true,
    type: 'system'
  }
];