import { Form } from 'react-final-form'
import { useCallback } from 'react'
import LoginView from './LoginView'
import LOGIN from './login.graphql'
import validate from './utils/validate'
import { withGraphQL } from '@cranium/resource'
import get from 'lodash/get'

function LoginContainer({ navigation, session }) {
  const handleSubmit = useCallback((variables) => {
    return session.request(variables)
  }, [session.request, navigation.goBack])
  return (
    <Form
      onSubmit={handleSubmit}
      render={LoginView}
    />
  )
}

function parseValue(resp) {
  if(!get(resp, 'data.tokenCreate.token')) {
    return Promise.reject({ _error: '401' })
  }
  return get(resp, 'data.tokenCreate')
}

export default withGraphQL(LOGIN, { namespace: 'session', parseValue })(LoginContainer)
