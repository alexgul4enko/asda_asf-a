import validate from './utils/validate'
import { withFinalForm } from '@cranium/resource'


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
