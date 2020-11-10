import errors from './constants'

export default function validateConfirmPassword(value, values) {
  if(value && values.password && value !== values.password) {
    return errors.samePass
  }
}
