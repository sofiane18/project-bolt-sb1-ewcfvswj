import React, { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { mockProfile } from '@/data/profile';
import { StoreProfile } from '@/types';

export default function ProfileScreen() {
  const [profile, setProfile] = useState<StoreProfile>(mockProfile);
  const [editing, setEditing] = useState(false);
  
  const handleSaveProfile = () => {
    // In a real app, this would save to an API
    Alert.alert('Success', 'Profile updated successfully');
    setEditing(false);
  };
  
  const handleCancelEdit = () => {
    // Reset to original values
    setProfile(mockProfile);
    setEditing(false);
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Store Profile</Text>
        {!editing ? (
          <Pressable
            style={styles.editButton}
            onPress={() => setEditing(true)}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </Pressable>
        ) : (
          <View style={styles.editActions}>
            <Pressable
              style={[styles.actionButton, styles.cancelButton]}
              onPress={handleCancelEdit}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.actionButton, styles.saveButton]}
              onPress={handleSaveProfile}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>
          </View>
        )}
      </View>
      
      <View style={styles.profileContainer}>
        <View style={styles.logoContainer}>
          <Image source={{ uri: profile.logoUrl }} style={styles.logo} />
          {editing && (
            <Pressable
              style={styles.changeLogoButton}
              onPress={() => Alert.alert('Change Logo', 'This would open the image picker')}
            >
              <Text style={styles.changeLogoText}>Change Logo</Text>
            </Pressable>
          )}
        </View>
        
        <View style={styles.infoContainer}>
          <View style={styles.field}>
            <Text style={styles.label}>Store Name</Text>
            {editing ? (
              <TextInput
                style={styles.input}
                value={profile.name}
                onChangeText={(text) => setProfile({...profile, name: text})}
              />
            ) : (
              <Text style={styles.value}>{profile.name}</Text>
            )}
          </View>
          
          <View style={styles.field}>
            <Text style={styles.label}>Phone Number</Text>
            {editing ? (
              <TextInput
                style={styles.input}
                value={profile.phone}
                onChangeText={(text) => setProfile({...profile, phone: text})}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.value}>{profile.phone}</Text>
            )}
          </View>
          
          <View style={styles.field}>
            <Text style={styles.label}>Working Hours</Text>
            {editing ? (
              <TextInput
                style={styles.input}
                value={profile.workingHours}
                onChangeText={(text) => setProfile({...profile, workingHours: text})}
                multiline
              />
            ) : (
              <Text style={styles.value}>{profile.workingHours}</Text>
            )}
          </View>
          
          <View style={styles.field}>
            <Text style={styles.label}>Store Category</Text>
            {editing ? (
              <View style={styles.buttonGroup}>
                <Pressable
                  style={[
                    styles.categoryButton,
                    profile.category === 'Car Parts' && styles.categoryButtonActive
                  ]}
                  onPress={() => setProfile({...profile, category: 'Car Parts'})}
                >
                  <Text style={[
                    styles.categoryButtonText,
                    profile.category === 'Car Parts' && styles.categoryButtonTextActive
                  ]}>Car Parts</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.categoryButton,
                    profile.category === 'Car Services' && styles.categoryButtonActive
                  ]}
                  onPress={() => setProfile({...profile, category: 'Car Services'})}
                >
                  <Text style={[
                    styles.categoryButtonText,
                    profile.category === 'Car Services' && styles.categoryButtonTextActive
                  ]}>Car Services</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.categoryButton,
                    profile.category === 'Both' && styles.categoryButtonActive
                  ]}
                  onPress={() => setProfile({...profile, category: 'Both'})}
                >
                  <Text style={[
                    styles.categoryButtonText,
                    profile.category === 'Both' && styles.categoryButtonTextActive
                  ]}>Both</Text>
                </Pressable>
              </View>
            ) : (
              <Text style={styles.value}>{profile.category}</Text>
            )}
          </View>
          
          <View style={styles.field}>
            <Text style={styles.label}>Store Description</Text>
            {editing ? (
              <TextInput
                style={[styles.input, styles.textArea]}
                value={profile.bio}
                onChangeText={(text) => setProfile({...profile, bio: text})}
                multiline
                numberOfLines={4}
              />
            ) : (
              <Text style={styles.value}>{profile.bio}</Text>
            )}
          </View>
          
          <View style={styles.field}>
            <Text style={styles.label}>Full Address</Text>
            {editing ? (
              <TextInput
                style={[styles.input, styles.textArea]}
                value={profile.address}
                onChangeText={(text) => setProfile({...profile, address: text})}
                multiline
                numberOfLines={2}
              />
            ) : (
              <Text style={styles.value}>{profile.address}</Text>
            )}
          </View>
          
          <View style={styles.field}>
            <Text style={styles.label}>Map Coordinates</Text>
            <View style={styles.coordinatesContainer}>
              {editing ? (
                <>
                  <TextInput
                    style={[styles.input, styles.coordinateInput]}
                    value={profile.latitude.toString()}
                    onChangeText={(text) => setProfile({...profile, latitude: parseFloat(text) || 0})}
                    keyboardType="numeric"
                    placeholder="Latitude"
                  />
                  <TextInput
                    style={[styles.input, styles.coordinateInput]}
                    value={profile.longitude.toString()}
                    onChangeText={(text) => setProfile({...profile, longitude: parseFloat(text) || 0})}
                    keyboardType="numeric"
                    placeholder="Longitude"
                  />
                </>
              ) : (
                <Text style={styles.value}>
                  Lat: {profile.latitude}, Long: {profile.longitude}
                </Text>
              )}
            </View>
          </View>
          
          <View style={styles.field}>
            <Text style={styles.label}>Delivery Zones</Text>
            {editing ? (
              <TextInput
                style={[styles.input, styles.textArea]}
                value={profile.deliveryZones.join(', ')}
                onChangeText={(text) => setProfile({...profile, deliveryZones: text.split(', ')})}
                multiline
                numberOfLines={2}
                placeholder="Enter zones separated by commas"
              />
            ) : (
              <Text style={styles.value}>{profile.deliveryZones.join(', ')}</Text>
            )}
          </View>
          
          <View style={styles.switchField}>
            <Text style={styles.switchLabel}>Proximity Visibility</Text>
            <Switch
              value={profile.proximityVisible}
              onValueChange={(value) => setProfile({...profile, proximityVisible: value})}
              trackColor={{ false: '#E2E8F0', true: '#F97316' }}
              thumbColor={'#FFFFFF'}
              disabled={!editing}
            />
          </View>
        </View>
      </View>
    </ScrollView>
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
  editButton: {
    backgroundColor: '#F97316',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  editButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: 'white',
  },
  editActions: {
    flexDirection: 'row',
  },
  actionButton: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: '#E2E8F0',
  },
  saveButton: {
    backgroundColor: '#F97316',
  },
  cancelButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#64748B',
  },
  saveButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: 'white',
  },
  profileContainer: {
    padding: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  changeLogoButton: {
    marginTop: 8,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  changeLogoText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#0F172A',
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  value: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#0F172A',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#0F172A',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  coordinatesContainer: {
    flexDirection: 'row',
  },
  coordinateInput: {
    flex: 1,
    marginRight: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryButton: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  categoryButtonActive: {
    backgroundColor: '#0F172A',
  },
  categoryButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  categoryButtonTextActive: {
    color: 'white',
  },
  switchField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#0F172A',
  },
});