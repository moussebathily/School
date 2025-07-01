import * as Notifications from 'expo-notifications';

export async function scheduleNotification(message, secondsFromNow) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "EduWorld AI",
      body: message,
    },
    trigger: { seconds: secondsFromNow },
  });
}
