import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles } from './Styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, MenuItem } from './type';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const mockMenu: MenuItem[] = [
  { id: '1', name: 'Burger', description: 'Juicy beef burger', coursetype: 'Main', price: 85 },
  { id: '2', name: 'Fries', description: 'Crispy golden fries', coursetype: 'Side', price: 30 },
];

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>🍔 Welcome to Chris Restaurant</Text>

      <FlatList
        data={mockMenu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ddd' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>R{item.price}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={globalStyles.button} onPress={() => navigation.navigate('Menu')}>
        <Text style={globalStyles.buttonText}>Next → Menu Screen</Text>
      </TouchableOpacity>
    </View>
  );
}
