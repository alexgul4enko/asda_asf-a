import PropTypes from 'prop-types'
import { SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, View } from 'react-native'
import { TextField, LinkField, BoolField } from 'common/forms'
import Button, { SubmittingButton } from 'common/widgets/button'
import { AbsoluteLoader } from 'common/widgets/loading'
import { useMemo } from 'react'
import isFormValid from 'common/utils/isFormValid'
import get from 'lodash/get'
import Toast from 'common/widgets/toast'
import styles from './address.styles'

AddressView.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitError: PropTypes.any,
  values: PropTypes.object,
  showSwitch: PropTypes.bool,
  id: PropTypes.string,
  handleDelete: PropTypes.func.isRequired,
}

AddressView.defaultProps = {
  submitError: undefined,
  values: undefined,
  showSwitch: undefined,
  id: undefined,
}


export default function AddressView({ handleSubmit, submitting, submitError, values, showSwitch, id, handleDelete, ...form } = {}) {
  const country = get(values, 'country.code')
  const params = useMemo(() => ({ country }), [country])
  const valid = isFormValid(form)
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.root}>
        <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={120}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            style={styles.main}
          >
            <TextField
              name="label"
              label={gettext('Address name')}
            />
            <TextField
              name="companyName"
              label={gettext('Company name')}
            />
            <TextField
              name="firstName"
              label={gettext('First name')}
              required
            />
            <TextField
              name="lastName"
              label={gettext('Last name')}
              required
            />
            <TextField
              name="phone"
              label={gettext('Mobile number')}
              required
              dataDetectorTypes="phoneNumber"
              keyboardType="phone-pad"
            />
            <TextField
              name="streetAddress1"
              label={gettext('Address line 1')}
              required
              dataDetectorTypes="address"
            />
            <TextField
              name="streetAddress2"
              label={gettext('Address line 2')}
              dataDetectorTypes="address"
            />

            <LinkField
              name="country"
              label={gettext('Country')}
              required
              to="Country"
              valueCode="country"
            />

            <LinkField
              name="city"
              label={gettext('City')}
              required
              to="City"
              valueCode="name"
              disable={!country}
              params={params}
            />

            <TextField
              name="postalCode"
              label={gettext('Zip code')}
              required
              keyboardType="numeric"
            />

            <LinkField
              name="countryArea"
              label={gettext('Country area')}
              to="CountryArea"
              disable={!country}
              params={params}
            />
            {
              showSwitch ? (
                <BoolField
                  name="isDefaultShippingAddress"
                  text={gettext('Mark as default address')}
                />
              ) : null
            }
            {
              id ? (
                <Button
                  outline
                  onPress={handleDelete}
                  title={gettext('Delete address')}
                  style={styles.delete}
                  textStyle={styles.deleteText}
                />) : null
            }
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <SubmittingButton
        primary
        valid={valid}
        submitting={submitting}
        title={id ? gettext('Save changes') : gettext('Create')}
        onPress={handleSubmit}
      />

      <Toast error={submitError}/>
      <AbsoluteLoader isLoading={submitting}/>
    </SafeAreaView>
  )
}
