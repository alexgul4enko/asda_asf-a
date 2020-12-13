import { validateRequired } from 'common/forms/validation'

export default validateRequired(['oldPassword', 'newPassword', 'confirmPassword'])

export function validateConfirm(value, values) {
  if(value && values && values.newPassword && values.newPassword !== value) {
    return gettext('Passwords should be equal')
  }
}
