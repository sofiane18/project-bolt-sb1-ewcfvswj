import React, { useState } from 'react';
import { Bell } from 'lucide-react-native';
import { Pressable, Modal, View, Text, FlatList, StyleSheet } from 'react-native';
import { mockNotifications } from '@/data/notifications';

export function NotificationButton() {
  const [modalVisible, setModalVisible] = useState(false);
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.iconButton,
          pressed && styles.pressed,
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Bell size={24} color="#F8FAFC" />
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </View>
        )}
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Notifications</Text>
              <Pressable
                style={({ pressed }) => [
                  styles.closeButton,
                  pressed && styles.pressed,
                ]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>

            <FlatList
              data={mockNotifications}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={[styles.notificationItem, item.read ? styles.notificationRead : styles.notificationUnread]}>
                  <Text style={styles.notificationTitle}>{item.title}</Text>
                  <Text style={styles.notificationMessage}>{item.message}</Text>
                  <Text style={styles.notificationTime}>{item.time}</Text>
                </View>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    padding: 8,
    borderRadius: 8,
    position: 'relative',
  },
  pressed: {
    opacity: 0.7,
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#F97316',
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#0F172A',
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
  },
  closeButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#0F172A',
  },
  notificationItem: {
    padding: 12,
    borderRadius: 8,
  },
  notificationUnread: {
    backgroundColor: '#F1F5F9',
  },
  notificationRead: {
    backgroundColor: 'white',
  },
  notificationTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 4,
  },
  notificationMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#334155',
    marginBottom: 8,
  },
  notificationTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
    alignSelf: 'flex-end',
  },
  separator: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 8,
  },
});