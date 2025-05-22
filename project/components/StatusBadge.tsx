import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { OrderStatus } from '@/types';

interface StatusBadgeProps {
  status: OrderStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'Pending':
        return {
          bg: '#FEF3C7',
          text: '#D97706'
        };
      case 'Confirmed':
        return {
          bg: '#E0F2FE',
          text: '#0369A1'
        };
      case 'In-process':
        return {
          bg: '#E0F2FE',
          text: '#0369A1'
        };
      case 'Picked Up':
      case 'Delivered':
        return {
          bg: '#DCFCE7',
          text: '#15803D'
        };
      case 'Cancelled':
        return {
          bg: '#FEE2E2',
          text: '#B91C1C'
        };
      default:
        return {
          bg: '#F1F5F9',
          text: '#475569'
        };
    }
  };

  const colors = getStatusColor();

  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }]}>
      <Text style={[styles.text, { color: colors.text }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
});