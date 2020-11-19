import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { TextField } from 'common/forms'
import { SubmittingButton } from 'common/widgets/button'
import isFormValid from 'common/utils/isFormValid'
import openUrl from 'common/utils/openUrl'
import styles from './settings.styles'


function privacy() {
  openUrl('/help/privacy-policy')
}

Subscribe.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
}


export default function Subscribe({ handleSubmit, submitting, ...form } = {}) {
  const valid = isFormValid(form)
  return (
    <View style={styles.subscribeForm}>
      <TextField
        name="email"
        label={gettext('Email address')}
        keyboardType="email-address"
      />
      <SubmittingButton
        primary
        valid={valid}
        submitting={submitting}
        title={gettext('Subscribe')}
        onPress={handleSubmit}
        style={styles.subscribe}
      />
      <Text style={styles.privacy}>
        {gettext("By clicking 'Subscribe', I am requesting that WECRE8 send me promotional offers to this email address. I understand that my information will be subject to this")}
        <Text> </Text>
        <Text style={styles.privacyLink} onPress={privacy}>{gettext('Privacy Policy.')}</Text>
      </Text>
    </View>
  )
}
