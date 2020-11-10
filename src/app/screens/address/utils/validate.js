import { validateRequired, compose } from 'common/forms/validation'

export default compose(
  validateRequired(['firstName', 'lastName', 'phone', 'streetAddress1', 'country', 'city', 'postalCode']),
)
