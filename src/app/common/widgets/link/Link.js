import StylePropType from 'react-style-proptype'
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native'
import { useCallback } from 'react'
import Button from 'common/widgets/button'
import styles from './link.styles'


Link.propTypes = {
  to: PropTypes.string.isRequired,
  params: PropTypes.object,
  textStyle: StylePropType,
  onPress: PropTypes.func,
  linkAction: PropTypes.string,
}

Link.defaultProps = {
  textStyle: styles.link,
  params: undefined,
  onPress: undefined,
  linkAction: undefined,
}

export default function Link({ to, params, onPress, linkAction, ...props }) {
  const navigation = useNavigation()
  const haldleClick = useCallback(() => {
    onPress && onPress()
    const action = linkAction === 'push' ? navigation.push : navigation.navigate
    action(to, params)
  }, [navigation.push, params, to, onPress])

  return <Button {...props} onPress={haldleClick} />
}
