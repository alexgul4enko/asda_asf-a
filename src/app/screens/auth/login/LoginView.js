import PropTypes from 'prop-types'
import { SafeAreaView, Text, ScrollView, View } from 'react-native'
import { TextField } from 'common/forms'
import Button, { SubmittingButton } from 'common/widgets/button'
import isFormValid from 'common/utils/isFormValid'
import SocialButtons from '../socialLogin'
import Link from 'common/widgets/link'
import Toast from 'common/widgets/toast'
import openUrl from 'common/utils/openUrl'
import styles from './login.styles'

function forgotPass() {
  openUrl('/auth/reset')
}

function terms() {
  openUrl('/help/terms-and-conditions')
}

function privacy() {
  openUrl('/help/privacy-policy')
}

LoginView.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitError: PropTypes.any,
}

LoginView.defaultProps = {
  submitError: undefined,
}

export default function LoginView({ handleSubmit, submitting, submitError, ...form } = {}) {
  const valid = isFormValid(form)

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        style={styles.main}
      >
        <View>
          <TextField
            name="email"
            label={gettext('Email address')}
            keyboardType="email-address"
          />
          <TextField
            name="password"
            type="password"
            label={gettext('Password')}
            secureTextEntry
          />
          <SubmittingButton
            primary
            valid={valid}
            submitting={submitting}
            title={gettext('Sign In')}
            onPress={handleSubmit}
          />
          <SocialButtons title={gettext('or login with')}/>
          <Text style={styles.privacy}>
            {gettext('By signing in or creating an account, you agree out')}
            <Text> </Text>
            <Text style={styles.privacyLink} onPress={terms}>{gettext('Terms & Conditions')}</Text>
            <Text> </Text>
            <Text>{gettext('and')}</Text>
            <Text> </Text>
            <Text style={styles.privacyLink} onPress={privacy}>{gettext('Privacy Statement')}</Text>
          </Text>
          <Button
            style={styles.link}
            onPress={forgotPass}
          >
            <Text style={styles.forgot}>{gettext('Forgot password?')}</Text>
          </Button>
        </View>
        <Link to="Register" title={gettext('Create new account')} outline style={styles.footer} textStyle={styles.footertext}/>
      </ScrollView>

      <Toast error={submitError}/>
    </SafeAreaView>
  )
}
