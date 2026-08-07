import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/types/navigation"; 
import HomeScreen from './src/screens/Home';
import PosicaoGpsScreen from './src/screens/PosicaoGPS';
import RedesWifiScreen from "./src/screens/RedesWifi";
import AcelerometroScreen from "./src/screens/Acelerometro";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='HomeScreen' 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name='PosicaoGpsScreen' 
          component={PosicaoGpsScreen} 
          options={{ title: 'Posição atual' }} 
        />
        <Stack.Screen 
          name='RedesWifiScreen' 
          component={RedesWifiScreen} 
          options={{ title: 'RedesWifi' }} 
        />
        <Stack.Screen 
          name='AcelerometroScreen' 
          component={AcelerometroScreen} 
          options={{ title: 'Acelerometro' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
