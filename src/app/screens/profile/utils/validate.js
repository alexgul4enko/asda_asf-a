import { validateRequired, compose } from 'common/forms/validation'

export default compose(
  validateRequired(['firstName', 'lastName', 'gender', 'birthday']),
)
