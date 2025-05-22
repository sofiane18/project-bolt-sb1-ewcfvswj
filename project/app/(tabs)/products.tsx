import React, { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Plus, Search } from 'lucide-react-native';
import { mockProducts } from '@/data/products';
import { Item } from '@/types';

export default function ProductsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (featuredOnly) {
      return matchesSearch && product.featured;
    }
    
    return matchesSearch;
  });

  const handleAddProduct = () => {
    Alert.alert(
      'Add New Product',
      'This would open a form to add a new product.'
    );
  };

  const handleEditProduct = (product: Item) => {
    Alert.alert(
      'Edit Product',
      `This would open a form to edit ${product.title}.`
    );
  };

  const handleDeleteProduct = (product: Item) => {
    Alert.alert(
      'Delete Product',
      `Are you sure you want to delete ${product.title}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => Alert.alert('Product Deleted', 'Product would be deleted in a real app') 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Products</Text>
        <Pressable
          style={styles.addButton}
          onPress={handleAddProduct}
        >
          <Plus size={20} color="white" />
          <Text style={styles.addButtonText}>Add Product</Text>
        </Pressable>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#64748B" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#94A3B8"
          />
        </View>
        
        <Pressable 
          style={[styles.filterButton, featuredOnly && styles.filterButtonActive]}
          onPress={() => setFeaturedOnly(!featuredOnly)}
        >
          <Text style={[styles.filterButtonText, featuredOnly && styles.filterButtonTextActive]}>
            Featured
          </Text>
        </Pressable>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productGrid}
      >
        {filteredProducts.map(product => (
          <View key={product.id} style={styles.productCard}>
            <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
            
            {product.featured && (
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredText}>Featured</Text>
              </View>
            )}
            
            <Text style={styles.productCategory}>{product.subcategory}</Text>
            <Text style={styles.productTitle}>{product.title}</Text>
            
            <View style={styles.productInfo}>
              <Text style={styles.productPrice}>{product.price.toLocaleString()} DZD</Text>
              <Text style={styles.productStock}>Stock: {product.stock}</Text>
            </View>
            
            <View style={styles.productActions}>
              <Pressable
                style={[styles.productActionButton, styles.editButton]}
                onPress={() => handleEditProduct(product)}
              >
                <Text style={styles.productActionButtonText}>Edit</Text>
              </Pressable>
              <Pressable
                style={[styles.productActionButton, styles.deleteButton]}
                onPress={() => handleDeleteProduct(product)}
              >
                <Text style={[styles.productActionButtonText, styles.deleteButtonText]}>Delete</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#0F172A',
  },
  addButton: {
    backgroundColor: '#F97316',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: 'white',
    marginLeft: 8,
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
    marginRight: 12,
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
  filterButton: {
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#0F172A',
  },
  filterButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  filterButtonTextActive: {
    color: 'white',
  },
  productGrid: {
    padding: 16,
    paddingTop: 0,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#F97316',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  featuredText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: 'white',
  },
  productCategory: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginTop: 12,
    marginHorizontal: 16,
  },
  productTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#0F172A',
    marginTop: 4,
    marginHorizontal: 16,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginHorizontal: 16,
  },
  productPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#0F172A',
  },
  productStock: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  productActions: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  productActionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  editButton: {
    backgroundColor: '#F1F5F9',
  },
  deleteButton: {
    backgroundColor: '#FEE2E2',
  },
  productActionButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#0F172A',
  },
  deleteButtonText: {
    color: '#B91C1C',
  },
});