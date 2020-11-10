import NavigationPropTypes from 'common/prop-types/Navigation'
import { Form } from 'react-final-form'
import { useCallback } from 'react'
import ChangePassView from './ChangePassView'
import { useQuery } from '@cranium/resource'
import validate from './utils/validate'
import parseValue from './utils/parseValue'
import pick from 'lodash/pick'
import CHANGEPASS from './change-pass.graphql'

ChangePassContainer.propTypes = NavigationPropTypes

export default function ChangePassContainer({ navigation }) {
  const { request } = useQuery(CHANGEPASS, { reducer: 'none', parseValue })
  const handleSubmit = useCallback((values) => {
    return request(pick(values, ['oldPassword', 'newPassword']))
      .then((res) => {
        if(res && res.id) {
          return navigation.goBack()
        }
        return res
      })
  }, [request, navigation.goBack])
  return (
    <Form
      onSubmit={handleSubmit}
      render={ChangePassView}
      validate={validate}
    />
  )
}
