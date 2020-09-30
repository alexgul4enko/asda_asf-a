import { Form } from 'react-final-form'
import { useCallback } from 'react'
import LoginView from './LoginView'
import LOGIN from './login.graphql'
import { useMutation } from '@apollo/client'
import validate from './utils/validate'
import { useCache } from 'common/cache'

export default function LoginContainer(props) {
  const { setToken } = useCache()
  const [login, { data, ...rest }] = useMutation(LOGIN)
  const handleSubmit = useCallback((variables) => {
    login({ variables })
      .then(({ data }) => {
        const token = data.tokenCreate.token
        setToken(token)
        props.navigation.goBack()
      })
      .catch(err => {})
  }, [login, props.navigation.goBack, setToken])
  return (
    <Form
      onSubmit={handleSubmit}
      render={LoginView}
      validate={validate}
    />
  )
}
