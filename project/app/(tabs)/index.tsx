import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { mockOrders, getOrdersByStatus } from '@/data/orders';
import { OrderCard } from '@/components/OrderCard';
import { OrderStatus } from '@/types';

const statusOptions: (OrderStatus | 'All')[] = ['All', 'Pending', 'Confirmed', 'In-process', 'Picked Up', 'Delivered', 'Cancelled'];

export default function OrdersScreen() {
  const [activeStatus, setActiveStatus] = useState<OrderStatus | 'All'>('All');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  
  const filteredOrders = getOrdersByStatus(activeStatus);

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Order Dashboard</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContentContainer}
      >
        {statusOptions.map((status) => (
          <Pressable
            key={status}
            style={[
              styles.filterButton,
              activeStatus === status && styles.filterButtonActive
            ]}
            onPress={() => setActiveStatus(status)}
          >
            <Text 
              style={[
                styles.filterButtonText,
                activeStatus === status && styles.filterButtonTextActive
              ]}
            >
              {status}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderCard 
            order={item} 
            expanded={expandedOrderId === item.id} 
            toggleExpand={() => toggleOrderExpand(item.id)} 
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No orders found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#0F172A',
  },
  filterContainer: {
    flexGrow: 0,
    marginBottom: 16,
  },
  filterContentContainer: {
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F1F5F9',
  },
  filterButtonActive: {
    backgroundColor: '#0F172A',
  },
  filterButtonText: {
    fontFamily: 'Inter-Medium',
    color: '#64748B',
    fontSize: 14,
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  emptyContainer: {
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#64748B',
  },
});