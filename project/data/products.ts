import { Item } from '@/types';

export const mockProducts: Item[] = [
  {
    id: 'PRD001',
    title: 'Continental Performance Tires',
    category: 'Product',
    subcategory: 'Tires',
    price: 45000,
    description: 'Premium performance tires with excellent grip and durability. Set of 4 tires suitable for most sedan and SUV models.',
    imageUrl: 'https://images.pexels.com/photos/15760848/pexels-photo-15760848.jpeg',
    stock: 16,
    featured: true
  },
  {
    id: 'PRD002',
    title: 'Bosch Automotive Battery',
    category: 'Product',
    subcategory: 'Batteries',
    price: 15000,
    description: 'High-performance car battery with extended life and reliable cold-weather starting capability.',
    imageUrl: 'https://images.pexels.com/photos/10803127/pexels-photo-10803127.jpeg',
    stock: 23,
    featured: true
  },
  {
    id: 'PRD003',
    title: 'Mobil 1 Synthetic Oil',
    category: 'Product',
    subcategory: 'Engine Lubricants',
    price: 5500,
    description: 'Fully synthetic motor oil that helps extend engine life by providing exceptional wear protection.',
    imageUrl: 'https://images.pexels.com/photos/19100355/pexels-photo-19100355/free-photo-of-car-oil-filter-system.jpeg',
    stock: 45,
    featured: false
  },
  {
    id: 'PRD004',
    title: 'NGK Spark Plugs (Set of 4)',
    category: 'Product',
    subcategory: 'Ignition',
    price: 3200,
    description: 'Premium spark plugs for improved engine performance, better fuel economy, and reliable starting.',
    imageUrl: 'https://images.pexels.com/photos/12856162/pexels-photo-12856162.jpeg',
    stock: 32,
    featured: false
  },
  {
    id: 'PRD005',
    title: 'Brake Pads (Front)',
    category: 'Product',
    subcategory: 'Brakes',
    price: 8500,
    description: 'High-quality ceramic brake pads for improved stopping power and reduced brake dust.',
    imageUrl: 'https://images.pexels.com/photos/3846132/pexels-photo-3846132.jpeg',
    stock: 18,
    featured: true
  },
  {
    id: 'PRD006',
    title: 'Air Filter',
    category: 'Product',
    subcategory: 'Filters',
    price: 1200,
    description: 'Engine air filter that improves airflow and protects the engine from harmful contaminants.',
    imageUrl: 'https://images.pexels.com/photos/16004628/pexels-photo-16004628/free-photo-of-car-auto-parts-placed-on-table.jpeg',
    stock: 7,
    featured: false
  },
  {
    id: 'PRD007',
    title: 'Windshield Wipers',
    category: 'Product',
    subcategory: 'Wipers & Vision',
    price: 2500,
    description: 'All-season windshield wipers with durable rubber blades for clear visibility in all weather conditions.',
    imageUrl: 'https://images.pexels.com/photos/241001/pexels-photo-241001.jpeg',
    stock: 28,
    featured: false
  },
  {
    id: 'PRD008',
    title: 'Car Audio System',
    category: 'Product',
    subcategory: 'Electronics',
    price: 35000,
    description: 'Premium car audio system with Bluetooth connectivity, USB ports, and excellent sound quality.',
    imageUrl: 'https://images.pexels.com/photos/4988291/pexels-photo-4988291.jpeg',
    stock: 5,
    featured: true
  }
];

export const mockServices: Item[] = [
  {
    id: 'SRV001',
    title: 'Engine Oil Change Service',
    category: 'Service',
    subcategory: 'Routine Maintenance',
    price: 3500,
    description: 'Complete oil change service using premium synthetic oil, includes filter replacement and multi-point inspection.',
    imageUrl: 'https://images.pexels.com/photos/4116193/pexels-photo-4116193.jpeg',
    duration: 'Approx. 1 hour',
    featured: true
  },
  {
    id: 'SRV002',
    title: 'Wheel Alignment Service',
    category: 'Service',
    subcategory: 'Suspension & Steering',
    price: 5000,
    description: 'Professional wheel alignment service to ensure optimal tire wear and vehicle handling.',
    imageUrl: 'https://images.pexels.com/photos/3787238/pexels-photo-3787238.jpeg',
    duration: 'Approx. 1.5 hours',
    featured: true
  },
  {
    id: 'SRV003',
    title: 'Full AC System Recharge',
    category: 'Service',
    subcategory: 'Climate Control',
    price: 7000,
    description: 'Complete air conditioning system service including refrigerant recharge, leak test, and system inspection.',
    imageUrl: 'https://images.pexels.com/photos/7161247/pexels-photo-7161247.jpeg',
    duration: 'Approx. 2 hours',
    featured: false
  },
  {
    id: 'SRV004',
    title: 'Premium Car Detailing',
    category: 'Service',
    subcategory: 'Car Care & Detailing',
    price: 12000,
    description: 'Comprehensive car detailing service including exterior wash, wax, interior cleaning, and paint protection.',
    imageUrl: 'https://images.pexels.com/photos/6260263/pexels-photo-6260263.jpeg',
    duration: 'Approx. 4 hours',
    featured: true
  },
  {
    id: 'SRV005',
    title: 'Brake Service',
    category: 'Service',
    subcategory: 'Brake Services',
    price: 9500,
    description: 'Complete brake service including pad replacement, rotor inspection, and brake fluid check.',
    imageUrl: 'https://images.pexels.com/photos/4488656/pexels-photo-4488656.jpeg',
    duration: 'Approx. 2 hours',
    featured: false
  },
  {
    id: 'SRV006',
    title: 'Battery Replacement',
    category: 'Service',
    subcategory: 'Electrical',
    price: 2000,
    description: 'Professional battery replacement service with proper disposal of the old battery.',
    imageUrl: 'https://images.pexels.com/photos/5835392/pexels-photo-5835392.jpeg',
    duration: 'Approx. 30 minutes',
    featured: false
  }
];

export function getLowStockProducts(threshold: number = 10): Item[] {
  return mockProducts.filter(product => (product.stock || 0) < threshold);
}

export function getProductById(id: string): Item | undefined {
  return [...mockProducts, ...mockServices].find(item => item.id === id);
}

export function getFeaturedItems(): Item[] {
  return [...mockProducts, ...mockServices].filter(item => item.featured);
}