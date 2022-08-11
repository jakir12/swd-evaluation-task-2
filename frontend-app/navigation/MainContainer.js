import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './screens/HomeScreen';
import CusttomerScreen from './screens/CustomerScreen';
import BankScreen from './screens/BankScreen';
import MRFScreen from './screens/MRFScreen';
import MRListScreen from './screens/MRListScreen';

//Screen names
const homeName = "Home";
const customerName = "Customer";
const bankName = "Bank";
const moneyReceipt = "Add MR";
const moneyReceiptList = "MR List";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === customerName) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === bankName) {
              iconName = focused ? 'home' : 'home-outline';
           
            } else if (rn === moneyReceipt) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === moneyReceiptList) {
              iconName = focused ? 'list' : 'list-outline';
            }


            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={moneyReceipt} component={MRFScreen} />
        <Tab.Screen name={moneyReceiptList} component={MRListScreen} />
        <Tab.Screen name={customerName} component={CusttomerScreen} />
        <Tab.Screen name={bankName} component={BankScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;