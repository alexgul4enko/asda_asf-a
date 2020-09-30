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
}

Link.defaultProps = {
  textStyle: styles.link,
  params: undefined,
  onPress: undefined,
}

export default function Link({ to, params, onPress, ...props }) {
  const navigation = useNavigation()

  const haldleClick = useCallback(() => {
    navigation.navigate(to, params)
    onPress && onPress()
  }, [navigation])

  return <Button {...props} onPress={haldleClick} />
}
