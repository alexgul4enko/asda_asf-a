import NavigationPropTypes from 'common/prop-types/Navigation'
import { Form } from 'react-final-form'
import { useCallback } from 'react'
import RegisterView from './RegisterView'
import { useQuery } from '@cranium/resource'
import REGISTER from './register.graphql'
import validate from './utils/validate'
import parseValue from './utils/parseValue'
import Config from 'react-native-config'
import pick from 'lodash/pick'

RegisterContainer.propTypes = NavigationPropTypes

export default function RegisterContainer({ navigation }) {
  const { request } = useQuery(REGISTER, { reducer: 'none', parseValue })

  const handleSubmit = useCallback((variables) => {
    return request({ input: { ...pick(variables, ['email', 'password']), redirectUrl: Config.SITE_URL + '/auth/confirm' } })
      .then((res) => {
        if(res && res.id) {
          return navigation.navigate('RegistrationSuccess')
        }
        return res
      })
  }, [request, navigation.navigate])
  return (
    <Form
      onSubmit={handleSubmit}
      render={RegisterView}
      validate={validate}
    />
  )
}
