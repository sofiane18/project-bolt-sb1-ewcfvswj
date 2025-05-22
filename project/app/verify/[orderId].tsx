import React, { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { getOrderById, verifyOrderCode } from '@/data/orders';
import { QrCode as QrCodeIcon } from 'lucide-react-native';

export default function VerifyScreen() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  
  const order = orderId ? getOrderById(orderId) : null;
  
  const handleManualVerify = () => {
    if (!orderId || !verificationCode) return;
    
    setIsVerifying(true);
    
    // Simulate API call
    setTimeout(() => {
      const isValid = verifyOrderCode(orderId, verificationCode);
      
      if (isValid) {
        Alert.alert(
          'Verification Successful',
          'The order has been verified successfully.',
          [
            { 
              text: 'View Receipt', 
              onPress: () => {
                // Show receipt
                Alert.alert(
                  'Order Receipt',
                  `Order ID: ${orderId}\nVerification Code: ${verificationCode}\nVerified: ${new Date().toLocaleString()}`
                );
              } 
            },
            { 
              text: 'Done', 
              onPress: () => router.back() 
            },
          ]
        );
      } else {
        Alert.alert(
          'Verification Failed',
          'The verification code is invalid. Please try again.',
          [{ text: 'OK' }]
        );
      }
      
      setIsVerifying(false);
    }, 1000);
  };
  
  const handleScanQR = () => {
    Alert.alert(
      'QR Scanner',
      'This would open the camera to scan a QR code in a real app.',
      [
        { text: 'Cancel' },
        { 
          text: 'Simulate Success', 
          onPress: () => {
            if (order) {
              setVerificationCode(order.verificationCode || '');
            }
          } 
        },
      ]
    );
  };
  
  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Order not found</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Verify Order #{orderId.slice(-7)}</Text>
        
        <View style={styles.orderInfo}>
          <Text style={styles.infoTitle}>Order Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Customer:</Text>
            <Text style={styles.infoValue}>{order.buyerName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Item:</Text>
            <Text style={styles.infoValue}>{order.productName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Price:</Text>
            <Text style={styles.infoValue}>{order.price.toLocaleString()} DZD</Text>
          </View>
        </View>
        
        <View style={styles.verificationOptions}>
          <Text style={styles.sectionTitle}>Verification Options</Text>
          
          <Pressable 
            style={styles.qrButton}
            onPress={handleScanQR}
          >
            <QrCodeIcon size={24} color="#0F172A" />
            <Text style={styles.qrButtonText}>Scan QR Code</Text>
          </Pressable>
          
          <Text style={styles.orText}>OR</Text>
          
          <Text style={styles.inputLabel}>Enter 6-digit Verification Code</Text>
          <TextInput
            style={styles.input}
            value={verificationCode}
            onChangeText={setVerificationCode}
            placeholder="Enter code (e.g. 123456)"
            keyboardType="number-pad"
            maxLength={6}
          />
          
          <Pressable
            style={[
              styles.verifyButton, 
              (!verificationCode || isVerifying) && styles.verifyButtonDisabled
            ]}
            onPress={handleManualVerify}
            disabled={!verificationCode || isVerifying}
          >
            <Text style={styles.verifyButtonText}>
              {isVerifying ? 'Verifying...' : 'Verify Order'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#0F172A',
    marginBottom: 16,
    textAlign: 'center',
  },
  orderInfo: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  infoTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
    width: 80,
  },
  infoValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#0F172A',
    flex: 1,
  },
  verificationOptions: {
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    width: '100%',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  qrButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#0F172A',
    marginLeft: 12,
  },
  orText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginVertical: 16,
  },
  inputLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#0F172A',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 16,
  },
  verifyButton: {
    backgroundColor: '#F97316',
    borderRadius: 8,
    width: '100%',
    padding: 16,
    alignItems: 'center',
  },
  verifyButtonDisabled: {
    backgroundColor: '#FDA382',
  },
  verifyButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'white',
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
  },
});