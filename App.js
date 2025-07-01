import React, { useEffect } from 'react';
import { View, Text, Platform, Button, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import EventCalendar from './src/components/EventCalendar';
import { scheduleNotification } from './src/notifications/NotificationHandler';

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      Alert.alert("Notification reçue", notification.request.content.body);
    });
    return () => subscription.remove();
  }, []);

  async function registerForPushNotificationsAsync() {
    let { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      const { status: newStatus } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      status = newStatus;
    }
    if (status !== 'granted') {
      alert('Autorisation de notifications refusée!');
      return;
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, textAlign: 'center', margin: 10 }}>EduWorld AI - Planning & Notifications</Text>
      <EventCalendar />
      <Button
        title="Planifier notification test"
        onPress={() => scheduleNotification("Rappel : Cours de Maths demain !", 5)}
      />
    </View>
  );
        }
