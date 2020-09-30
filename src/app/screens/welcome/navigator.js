import PushNotifications from './pushNotifications'
import SelectGender from './selectGender'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
const Stack = createNativeStackNavigator()


const screenOptions = {
  headerShown: false,
}

export default function WelcomeStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="gender" component={SelectGender} />
      <Stack.Screen name="notifications" component={PushNotifications} />
    </Stack.Navigator>
  )
}
