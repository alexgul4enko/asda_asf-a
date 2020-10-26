import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { AccessProvider } from '@cranium/access'
import get from 'lodash/get'
import acessLevels from './access'

AppPermissions.propTypes = {
  children: PropTypes.node.isRequired,
}

export default function AppPermissions({ children }) {
  const data = useSelector(state => ({
    firstInstall: get(state, 'app.data') !== 'done',
    session: get(state, 'session'),
  }))
  return (
    <AccessProvider acessLevels={acessLevels} {...data}>
      {children}
    </AccessProvider>
  )
}
