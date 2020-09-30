import validate from './utils/validate'
import { withFinalForm } from '@ds-frontend/resource'


export default withFinalForm(
  {
    validate,
  },
  {
    namespace: 'session',
    endpoint: 'accounts/signin',
  },
  {
    prefetch: false,
  }
)
