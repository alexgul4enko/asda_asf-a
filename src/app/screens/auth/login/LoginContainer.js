import NavigationPropTypes from 'common/prop-types/Navigation'
import { Form } from 'react-final-form'
import { useCallback } from 'react'
import LoginView from './LoginView'
import LOGIN from './login.graphql'
import validate from './utils/validate'
import { useQuery } from '@cranium/resource'
import parseValue from './utils/parseValue'
import { useFocusEffect } from '@react-navigation/native'
import { hasPermission } from '@cranium/access'
import { access } from 'common/session'

LoginContainer.propTypes = NavigationPropTypes

export default function LoginContainer({ navigation }) {
  const isLoggedIn = hasPermission(access.F_PROTECTED)
  useFocusEffect(
    useCallback(() => {
      if(isLoggedIn) {
        return navigation.goBack()
      }
    }, [isLoggedIn])
  )
  const { request } = useQuery(LOGIN, { namespace: 'session', parseValue })
  const handleSubmit = useCallback((variables) => {
    return request(variables)
      .then(data => {
        if(data && data.token) {
          return navigation.goBack()
        }
        return data
      })
  }, [request, navigation.goBack])
  return (
    <Form
      onSubmit={handleSubmit}
      render={LoginView}
      validate={validate}
    />
  )
}
