import PropTypes from 'prop-types'
import { TextInput } from 'react-native'
import { Form } from 'react-final-form'
import { useCallback } from 'react'
import ProfileView from './ProfileView'
import validate from './utils/validate'
import parseValue from './utils/parseValue'
import { useTranslations } from '@cranium/i18n'
import get from 'lodash/get'
import omit from 'lodash/omit'
import toast from 'common/utils/toast'
import PROFILE from './profile.graphql'


ProfileContainer.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  request: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
}

ProfileContainer.defaultProps = {
  initialValues: {},
}

export default function ProfileContainer({ navigation, request, initialValues }) {
  const { gettext } = useTranslations()
  const handleSubmit = useCallback((variables) => {
    TextInput.State.currentlyFocusedInput() && TextInput.State.blurTextInput(TextInput.State.currentlyFocusedInput())
    return request({ input: { phone: '', ...omit(variables, ['avatar', 'id', 'email', 'role']) } }, { query: PROFILE, parseValue, reducer: 'none' })
      .then(data => {
        if(data && data.user) {
          // setErrors(null)
          return toast({ title: gettext('Profile chages saved'), position: 'top' })
        }
        return data
      })
  }, [request, gettext])
  return (
    <Form
      onSubmit={handleSubmit}
      render={ProfileView}
      validate={validate}
      initialValues={initialValues}
      avatar={get(initialValues, 'avatar.url')}
      id={get(initialValues, 'id')}
    />
  )
}
