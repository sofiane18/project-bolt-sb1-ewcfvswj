import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Search } from 'lucide-react-native';
import { mockCustomers, searchCustomers } from '@/data/customers';
import { Customer } from '@/types';

export default function CustomersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  
  const filteredCustomers = searchQuery ? 
    searchCustomers(searchQuery) : 
    mockCustomers;

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Customers</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#64748B" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search customers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#94A3B8"
          />
        </View>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, { flex: 2 }]}>Name</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Orders</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Total Spent</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Reviews</Text>
        </View>

        <FlatList
          data={filteredCustomers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable 
              style={[
                styles.tableRow,
                selectedCustomer?.id === item.id && styles.selectedRow
              ]}
              onPress={() => handleSelectCustomer(item)}
            >
              <Text style={[styles.cell, { flex: 2 }]} numberOfLines={1}>{item.name}</Text>
              <Text style={[styles.cell, { flex: 1 }]}>{item.orderCount}</Text>
              <Text style={[styles.cell, { flex: 2 }]}>{item.totalSpent.toLocaleString()} DZD</Text>
              <Text style={[styles.cell, { flex: 1 }]}>{item.reviewCount}</Text>
            </Pressable>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No customers found</Text>
            </View>
          }
        />
      </View>

      {selectedCustomer && (
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>{selectedCustomer.name}</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Contact:</Text>
            <Text style={styles.detailValue}>{selectedCustomer.contact}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Spent:</Text>
            <Text style={styles.detailValue}>{selectedCustomer.totalSpent.toLocaleString()} DZD</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Orders:</Text>
            <Text style={styles.detailValue}>{selectedCustomer.orderCount}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Last Order:</Text>
            <Text style={styles.detailValue}>{selectedCustomer.lastOrderDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Reviews:</Text>
            <Text style={styles.detailValue}>{selectedCustomer.reviewCount}</Text>
          </View>
          <Pressable 
            style={styles.closeButton}
            onPress={() => setSelectedCustomer(null)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      )}
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#0F172A',
  },
  tableContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerCell: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#64748B',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  selectedRow: {
    backgroundColor: '#F1F5F9',
  },
  cell: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#0F172A',
  },
  separator: {
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
  },
  detailCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#0F172A',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
    width: 100,
  },
  detailValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#0F172A',
    flex: 1,
  },
  closeButton: {
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#0F172A',
  },
});