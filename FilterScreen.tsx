import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MenuItem } from './type';

// Sample data (can be replaced with data from MenuScreen via context or props)
const sampleMenu: MenuItem[] = [
  { id: '1', name: 'Caesar Salad', description: 'Fresh greens with dressing', coursetype: 'Starter', price: 45 },
  { id: '2', name: 'Grilled Chicken', description: 'Served with veggies', coursetype: 'Main', price: 85 },
  { id: '3', name: 'Chocolate Cake', description: 'Rich and moist', coursetype: 'Dessert', price: 35 },
];

export default function FilterScreen() {
  const [filterType, setFilterType] = useState('All');
  const course = ['Starter', 'Main', 'Dessert'];

  // Filter menu items
  const filteredItems =
    filterType === 'All'
      ? sampleMenu
      : sampleMenu.filter((item) => item.coursetype === filterType);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🍽️ Filter Menu</Text>

      {/* Filter Picker */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Course:</Text>
        <Picker
          selectedValue={filterType}
          onValueChange={(value) => setFilterType(value)}
          style={styles.input}
        >
          <Picker.Item label="All" value="All" />
          {course.map((c) => (
            <Picker.Item label={c} value={c} key={c} />
          ))}
        </Picker>
      </View>

      {/* Menu List */}
      {filteredItems.length === 0 ? (
        <Text style={styles.noItems}>No dishes found for this course.</Text>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.menuItem}>
              <Text style={styles.dishName}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.course}>{item.coursetype}</Text>
              <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#ff884d', marginBottom: 20, textAlign: 'center' },
  filterContainer: { marginBottom: 15 },
  filterLabel: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  menuItem: { backgroundColor: '#ffe7cc', padding: 15, borderRadius: 12, marginBottom: 10 },
  dishName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  description: { fontSize: 14, color: '#555' },
  course: { fontSize: 14, fontStyle: 'italic', marginTop: 3 },
  price: { fontWeight: 'bold', marginTop: 5, color: '#000' },
  noItems: { textAlign: 'center', marginTop: 50, fontStyle: 'italic', color: '#555' },
});
