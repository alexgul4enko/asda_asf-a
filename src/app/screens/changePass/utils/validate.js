import { validateRequired } from 'common/forms/validation'

export default validateRequired(['oldPassword', 'newPassword', 'confirmPassword'])
