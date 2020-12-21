import PropTypes from 'prop-types'
import { SafeAreaView, ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native'
import { TextField, RadioField, DateField } from 'common/forms'
import { SubmittingButton } from 'common/widgets/button'
import Toast from 'common/widgets/toast'
import isFormValid from 'common/utils/isFormValid'
import styles from './profile.styles'


const options = [
  {
    title: gettext('Male'),
    value: 'M',
  },
  {
    title: gettext('Female'),
    value: 'F',
  },
]

ProfileView.propTypes = {
  id: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitError: PropTypes.any,
  avatar: PropTypes.string,
}

ProfileView.defaultProps = {
  id: undefined,
  submitError: undefined,
  avatar: undefined,
}

export default function ProfileView({ id, handleSubmit, submitting, submitError, avatar, ...form } = {}) {
  const valid = isFormValid(form)
  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={64}
        contentContainerStyle={[styles.root, { marginBottom: 10 }]}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          style={styles.main}
        >
          <TextField
            name="firstName"
            required
            label={gettext('First name')}
          />
          <TextField
            name="lastName"
            required
            label={gettext('Last name')}
          />
          <RadioField
            name="gender"
            required
            options={options}
            valueKey="value"
            label={gettext('Gender')}
          />
          <DateField
            name="birthday"
            required
            label={gettext('Date of birth')}
          />
          <TextField
            name="email"
            label={gettext('Email address')}
            disabled
          />
          <TextField
            name="phone"
            label={gettext('Mobile number')}
            dataDetectorTypes="phoneNumber"
            keyboardType="phone-pad"
          />
        </ScrollView>

        <View style={styles.footer}>
          <SubmittingButton
            primary
            valid={valid}
            submitting={submitting}
            title={gettext('Update profile')}
            onPress={handleSubmit}
          />
        </View>
      </KeyboardAvoidingView>
      <Toast error={submitError} selfClearable/>
    </SafeAreaView>
  )
}
