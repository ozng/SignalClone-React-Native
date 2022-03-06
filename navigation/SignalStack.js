import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';


const SignalStack = () => {
  const Stack = createStackNavigator();

  const globalScreenOptions = {
    headerStyle: { backgroundColor: Colors.primary },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white',
  }

  return (
    <Stack.Navigator
      screenOptions={globalScreenOptions}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: 'Back to login'
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}

      />
    </Stack.Navigator>
  )
}

export default SignalStack;
