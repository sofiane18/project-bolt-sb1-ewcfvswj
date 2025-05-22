import { StoreProfile } from '@/types';

export const mockProfile: StoreProfile = {
  name: 'AutoParts Plus',
  phone: '+213 551 234 567',
  workingHours: 'Sunday-Thursday: 9:00 AM - 6:00 PM, Friday: 9:00 AM - 12:00 PM',
  category: 'Both',
  bio: 'Your one-stop shop for automotive parts and services. We provide high-quality parts and professional services for all car makes and models.',
  logoUrl: 'https://images.pexels.com/photos/14436240/pexels-photo-14436240.jpeg',
  address: '123 Rue Didouche Mourad, Alger Centre, Algiers',
  latitude: 36.7539,
  longitude: 3.0589,
  deliveryZones: ['Alger Centre', 'Hydra', 'Kouba', 'El Biar', 'Bab Ezzouar'],
  proximityVisible: true
};