import { View } from 'react-native'
import PropTypes from 'prop-types'
import { TextField } from 'common/forms'
import { Button, Link } from 'common/widgets'
import { SimpleKeyboardLayout } from 'common/layouts'
import styles from './login.styles'
import { SafeAreaView } from 'react-native-safe-area-context'

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  valid: PropTypes.bool,
}

Login.defaultProps = {
  submitting: false,
  valid: false,
}

export default function Login({ handleSubmit, submitting, valid }) {
  return (
    <SimpleKeyboardLayout style={styles.main}>
      <View style={styles.form}>
        <TextField
          label="Username"
          name="email"
          placeholder="Username or email address"
          containerStyles={styles.input}
        />
        <TextField
          label="Password"
          name="password"
          placeholder="Password"
          type="password"
          containerStyles={styles.input}
        />
        <Link to ="ForgotPassword" title ="Forgot password"/>
      </View>
      <SafeAreaView style={styles.loginButton}>
        <Button
          onPress={handleSubmit}
          title="Login"
          disabled={submitting || !valid }
          primary
        />
      </SafeAreaView>
    </SimpleKeyboardLayout>
  )
}
