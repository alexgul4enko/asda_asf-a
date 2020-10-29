import PropTypes from 'prop-types'
import { Linking } from 'react-native'
import { useCallback, useMemo } from 'react'
import Button from './Button'
import Icon from '../Icon'

SocialButton.propTypes = {
  type: PropTypes.string.isRequired,
  url: PropTypes.string,
  color: PropTypes.string,
}

SocialButton.defaultProps = {
  url: undefined,
  color: undefined,
}

export default function SocialButton({ type, url, color, ...props } = {}) {
  const handlePress = useCallback(() => Linking.openURL(url), [url])
  const name = useMemo(() => {
    switch (type) {
      case 'FB':
        return 'facebook-01'
      case 'TW':
        return 'twitter-01'
      case 'YT':
        return 'youtube-01'
      case 'IN':
        return 'instagram-01'
    }
  }, [type])
  return (
    <Button {...props} onPress={handlePress}>
      <Icon name={name} size={24} color={color}/>
    </Button>
  )
}
