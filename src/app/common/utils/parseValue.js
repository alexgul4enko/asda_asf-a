import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { FORM_ERROR } from 'final-form'

export default function parseValue(errorKey, dataKey, errorMapping) {
  return function(resp) {
    if(Array.isArray(get(resp, errorKey)) && !isEmpty(get(resp, errorKey))) {
      return get(resp, errorKey).reduce((res, { code, field, message }) => {
        const errorKey = field || errorMapping[code] || FORM_ERROR
        return {
          ...res,
          [errorKey]: [...get(res, errorKey, []), ...(Array.isArray(message) ? message : [message])],
        }
      }, {})
    }
    return get(resp, dataKey)
  }
}
