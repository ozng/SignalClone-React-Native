import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import SignalStack from './navigation/SignalStack';

export default function App() {
  return (
    <NavigationContainer>
      <SignalStack />
    </NavigationContainer>
  );
}

