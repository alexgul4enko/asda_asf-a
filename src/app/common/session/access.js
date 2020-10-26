import { composeAccess } from '@cranium/access'
import get from 'lodash/get'

export const F_FIRST_INSTALL = 'F_FIRST_INSTALL'
export const F_FIRST_INSTALL_PASSED = 'F_FIRST_INSTALL_PASSED'
export const F_PROTECTED = 'F_PROTECTED'
export const F_UNAUTHORISED = 'F_UNAUTHORISED'

export default composeAccess(
  (props) => {
    return get(props, 'session.data.token') ? F_PROTECTED : F_UNAUTHORISED
  },
  props => props.firstInstall ? F_FIRST_INSTALL : F_FIRST_INSTALL_PASSED
)
