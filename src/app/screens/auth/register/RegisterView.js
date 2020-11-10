import PropTypes from 'prop-types'
import { SafeAreaView, Text, ScrollView } from 'react-native'
import { TextField } from 'common/forms'
import { SubmittingButton } from 'common/widgets/button'
import Toast from 'common/widgets/toast'
import Link from 'common/widgets/link'
import { validateConfirmPassword } from 'common/forms/validation'
import openUrl from 'common/utils/openUrl'
import isFormValid from 'common/utils/isFormValid'
import styles from './register.styles'


function terms() {
  openUrl('/help/terms-and-conditions')
}

function privacy() {
  openUrl('/help/privacy-policy')
}

RegisterView.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitError: PropTypes.any,
}

RegisterView.defaultProps = {
  submitError: undefined,
}


function RegisterView({ handleSubmit, submitting, submitError, ...form } = {}) {
  const valid = isFormValid(form)
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        style={styles.main}
      >
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
        <TextField
          name="confirm_password"
          type="password"
          label={gettext('Confirm Password')}
          secureTextEntry
          validate={validateConfirmPassword}
        />
        <Text style={styles.privacy}>
          {gettext('By signing in or creating an account, you agree out')}
          <Text> </Text>
          <Text style={styles.privacyLink} onPress={terms}>{gettext('Terms & Conditions')}</Text>
          <Text> </Text>
          <Text>{gettext('and')}</Text>
          <Text> </Text>
          <Text style={styles.privacyLink} onPress={privacy}>{gettext('Privacy Statement')}</Text>
        </Text>
        <SubmittingButton
          primary
          valid={valid}
          submitting={submitting}
          title={gettext('Get started')}
          onPress={handleSubmit}
        />
      </ScrollView>
      <Link to="Login" title={gettext('Already have an account?')} outline style={styles.footer} textStyle={styles.footertext}/>
      <Toast error={submitError}/>
    </SafeAreaView>
  )
}

export default RegisterView
