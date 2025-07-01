import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const events = {
  '2025-07-02': { marked: true, dotColor: 'red' },
  '2025-07-05': { marked: true, dotColor: 'blue' },
};

export default function EventCalendar() {
  const [selected, setSelected] = useState(null);

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={day => setSelected(day.dateString)}
        markedDates={{
          ...events,
          [selected]: { selected: true, selectedColor: 'green' },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});
