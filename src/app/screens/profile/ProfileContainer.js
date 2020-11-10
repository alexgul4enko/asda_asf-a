import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import { useCallback } from 'react'
import ProfileView from './ProfileView'
import validate from './utils/validate'
import parseValue from './utils/parseValue'
import get from 'lodash/get'
import omit from 'lodash/omit'
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
  const handleSubmit = useCallback((variables) => {
    return request({ input: omit(variables, ['avatar', 'id', 'email', 'role']) }, { query: PROFILE, parseValue, reducer: 'none' })
      .then(data => {
        if(data && data.user) {
          return navigation.goBack()
        }
        return data
      })
  }, [request, navigation.goBack])
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
