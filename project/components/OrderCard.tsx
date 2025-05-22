import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Order } from '@/types';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { StatusBadge } from './StatusBadge';
import { mockOrders } from '@/data/orders';

interface OrderCardProps {
  order: Order;
  expanded: boolean;
  toggleExpand: () => void;
}

export function OrderCard({ order, expanded, toggleExpand }: OrderCardProps) {
  const handleVerify = () => {
    router.push(`/verify/${order.id}`);
  };

  const handleMarkDelivered = () => {
    Alert.alert(
      'Confirm Delivery',
      'Are you sure this order is delivered? This will update the order status.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm', 
          onPress: () => {
            // In a real app, this would call an API to update the order
            Alert.alert('Success', 'Order has been marked as delivered');
          }
        },
      ]
    );
  };
  
  const handleViewReceipt = () => {
    Alert.alert(
      'Order Receipt',
      `Order ID: ${order.id}\nCustomer: ${order.buyerName}\nProduct: ${order.productName}\nPrice: ${order.price} DZD\nStatus: ${order.status}`
    );
  };
  
  return (
    <View style={[styles.card, expanded && styles.cardExpanded]}>
      <Pressable 
        style={styles.header} 
        onPress={toggleExpand}
        android_ripple={{ color: 'rgba(0, 0, 0, 0.05)' }}
      >
        <View style={styles.headerContent}>
          <Text style={styles.orderNumber}>Order #{order.id.slice(-7)}</Text>
          <StatusBadge status={order.status} />
        </View>
        {expanded ? <ChevronUp size={20} color="#64748B" /> : <ChevronDown size={20} color="#64748B" />}
      </Pressable>
      
      <View style={[styles.content, { display: expanded ? 'flex' : 'none' }]}>
        <View style={styles.row}>
          <Text style={styles.label}>Customer:</Text>
          <Text style={styles.value}>{order.buyerName}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Item:</Text>
          <Text style={styles.value}>{order.productName}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Price:</Text>
          <Text style={styles.value}>{order.price.toLocaleString()} DZD</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Store:</Text>
          <Text style={styles.value}>{order.storeName}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Order Date:</Text>
          <Text style={styles.value}>{order.date}</Text>
        </View>
        
        <View style={styles.actions}>
          {order.status === 'Pending' && (
            <Pressable 
              style={[styles.button, styles.primaryButton]} 
              onPress={handleVerify}
            >
              <Text style={styles.buttonText}>Verify</Text>
            </Pressable>
          )}
          
          {order.status === 'Confirmed' && (
            <Pressable 
              style={[styles.button, styles.primaryButton]} 
              onPress={handleMarkDelivered}
            >
              <Text style={styles.buttonText}>Mark Delivered</Text>
            </Pressable>
          )}
          
          {(order.status === 'Picked Up' || order.status === 'Delivered') && (
            <Pressable 
              style={[styles.button, styles.secondaryButton]} 
              onPress={handleViewReceipt}
            >
              <Text style={styles.secondaryButtonText}>View Receipt</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardExpanded: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginRight: 12,
  },
  orderNumber: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#0F172A',
  },
  content: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  value: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#0F172A',
    textAlign: 'right',
    flex: 1,
    marginLeft: 12,
  },
  actions: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
  },
  primaryButton: {
    backgroundColor: '#F97316',
  },
  secondaryButton: {
    backgroundColor: '#F1F5F9',
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: 'white',
  },
  secondaryButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#334155',
  },
});