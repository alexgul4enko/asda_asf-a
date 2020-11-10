import PropTypes from 'prop-types'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { TextField, RadioField, DateField } from 'common/forms'
import { AbsoluteLoader } from 'common/widgets/loading'
import { SubmittingButton } from 'common/widgets/button'
import Toast from 'common/widgets/toast'
import Avatar from './widgets/avatar'
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
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        style={styles.main}
      >
        <Avatar
          url={avatar}
          id={id}
        />
        <TextField
          name="firstName"
          label={gettext('First name')}
        />
        <TextField
          name="lastName"
          label={gettext('Last name')}
        />
        <RadioField
          name="gender"
          options={options}
          valueKey="value"
          label={gettext('Gender')}
        />
        <DateField
          name="birthday"
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
      <AbsoluteLoader isLoading={submitting}/>
      <Toast error={submitError}/>
    </SafeAreaView>
  )
}
