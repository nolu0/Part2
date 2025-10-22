export type MenuItem = {
  id: string;
  name: string;
  description: string;
  coursetype: string;
  price: number;
};

export type RootStackParamList = {
  Home: undefined;                // HomeScreen doesn't need any params
  Menu: undefined;                // MenuScreen doesn't need any params
  Payment: undefined;             // PaymentScreen doesn't need any params
  Filter: { menuItems: MenuItem[] }; // FilterScreen expects an array of MenuItem
};
