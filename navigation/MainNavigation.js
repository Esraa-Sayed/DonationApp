import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './Routes';
import Home from '../screens/Home/Home';
import SingleDonationItemScreen from '../screens/SingleDonationItemScreen/SingleDonationItemScreen';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ header: () => null, headerShown: false }}>
      <Stack.Screen name={Routes.Home} component={Home} />
      <Stack.Screen
        name={Routes.SingleDonationItemScreen}
        component={SingleDonationItemScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
