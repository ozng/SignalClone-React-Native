import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';


const SignalStack = () => {
  const Stack = createStackNavigator();

  const globalScreenOptions = {
    headerStyle: { backgroundColor: '#2C6BED' },
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
    </Stack.Navigator>
  )
}

export default SignalStack;
