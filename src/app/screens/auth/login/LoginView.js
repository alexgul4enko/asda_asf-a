import { SafeAreaView } from 'react-native'
import { TextField } from 'common/forms'
import Button from 'common/widgets/button'
import styles from './login.styles'

export default function LoginView({ handleSubmit }) {
  return (
    <SafeAreaView style={styles.root}>
      <TextField
        name="email"
        label="Email"
      />
      <TextField
        name="password"
        label="Password"
        secureTextEntry
      />
      <Button
        title="Login"
        primary
        onPress={handleSubmit}
      />
    </SafeAreaView>
  )
}
