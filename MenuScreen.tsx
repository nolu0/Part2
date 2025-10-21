
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
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

  const handleAdd = () => {
    if (!name || !description || !price) {
      alert('Please fill all fields');
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      name,
      description,
      coursetype: 'Main',
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

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>🍳 Manage Your Menu</Text>

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

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, marginVertical: 5, backgroundColor: '#ffe7cc', borderRadius: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
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
