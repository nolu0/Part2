import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './type';
import { globalStyles } from './Styles'; // ✅ make sure this path matches your file

type PaymentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Payment'>;

interface Props {
  navigation: PaymentScreenNavigationProp;
}

export default function PaymentScreen({ navigation }: Props) {
  const [amount, setAmount] = useState('');

  const handlePay = () => {
    if (!amount) {
      Alert.alert('Missing Amount', 'Please enter an amount before paying.');
      return;
    }
    Alert.alert('Success', `Payment of R${amount} successful!`);
    setAmount('');
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>💰 Payment Screen</Text>

      <TextInput
        style={{
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
          borderRadius: 8,
          width: '80%',
          backgroundColor: '#fff',
        }}
        placeholder="Enter Amount (R)"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity style={globalStyles.button} onPress={handlePay}>
        <Text style={globalStyles.buttonText}>💳 Pay Now</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[globalStyles.button, { backgroundColor: '#888' }]}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={globalStyles.buttonText}>🏠 Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}
