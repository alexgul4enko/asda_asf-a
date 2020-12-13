import PropTypes from 'prop-types'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { TextField } from 'common/forms'
import { SubmittingButton } from 'common/widgets/button'
import Toast from 'common/widgets/toast'
import isFormValid from 'common/utils/isFormValid'
import styles from './change-pass.styles'
import { validateConfirm } from './utils/validate'

ChangePassView.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitError: PropTypes.any,
}

ChangePassView.defaultProps = {
  submitError: undefined,
}

export default function ChangePassView({ handleSubmit, submitting, submitError, ...form } = {}) {
  const valid = isFormValid(form)
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        style={styles.main}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        scrollEnabled={false}
      >
        <TextField
          name="oldPassword"
          type="password"
          label={gettext('Previous password')}
          secureTextEntry
        />
        <TextField
          name="newPassword"
          type="password"
          label={gettext('New password')}
          secureTextEntry
        />
        <TextField
          name="confirmPassword"
          type="password"
          label={gettext('Confirm new password')}
          secureTextEntry
          validate={validateConfirm}
        />
      </ScrollView>
      <View style={styles.submit}>
        <SubmittingButton
          primary
          valid={valid}
          submitting={submitting}
          title={gettext('Get started')}
          onPress={handleSubmit}
        />
      </View>
      <Toast error={submitError}/>
    </SafeAreaView>
  )
}
