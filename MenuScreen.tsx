import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MenuItem } from './type';
import { globalStyles } from './Styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './type';

type MenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;

interface Props {
  navigation: MenuScreenNavigationProp;
}

export default function MenuScreen({ navigation }: Props) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');

  const handleAdd = () => {
    if (!name || !description || !price) {
      alert('Please fill all fields');
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      name,
      description,
      coursetype: 'Main', // default course type
      price: parseFloat(price),
    };

    setMenuItems([...menuItems, newItem]);
    setName('');
    setDescription('');
    setPrice('');
  };

  const handleDelete = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  // Filter by search and course type
  const filteredItems = menuItems.filter(item => {
    const matchesName = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCourse = selectedCourse === 'All' || item.coursetype === selectedCourse;
    return matchesName && matchesCourse;
  });

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>🍳 Manage Your Menu</Text>

      {/* Inputs for adding a dish */}
      <TextInput
        style={{ borderWidth: 1, marginBottom: 8, padding: 8 }}
        placeholder="Dish Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={{ borderWidth: 1, marginBottom: 8, padding: 8 }}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={{ borderWidth: 1, marginBottom: 8, padding: 8 }}
        placeholder="Price (R)"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <TouchableOpacity style={globalStyles.button} onPress={handleAdd}>
        <Text style={globalStyles.buttonText}>➕ Add Dish</Text>
      </TouchableOpacity>

      {/* Search bar */}
      <TextInput
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
        placeholder="🔍 Search Dishes"
        value={search}
        onChangeText={setSearch}
      />

      {/* Course type filter */}
      <Picker
        selectedValue={selectedCourse}
        style={{ height: 50, width: '100%', marginBottom: 10 }}
        onValueChange={(itemValue) => setSelectedCourse(itemValue)}
      >
        <Picker.Item label="All Courses" value="All" />
        <Picker.Item label="Starter" value="Starter" />
        <Picker.Item label="Main" value="Main" />
        <Picker.Item label="Dessert" value="Dessert" />
      </Picker>

      {/* Display filtered dishes */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, marginVertical: 5, backgroundColor: '#ffe7cc', borderRadius: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.name} ({item.coursetype})</Text>
            <Text>{item.description}</Text>
            <Text>R{item.price}</Text>

            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={{ color: 'red', marginTop: 5 }}>🗑️ Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={globalStyles.button} onPress={() => navigation.navigate('Payment')}>
        <Text style={globalStyles.buttonText}>Next → Payment Screen</Text>
      </TouchableOpacity>
    </View>
  );
}

