import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './login'
import ForgotPassword from './forgotPass'
import theme from 'theme'


const Stack = createNativeStackNavigator()

const options = {
  ...theme.primaryHeader,
}

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={options} >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  )
}
