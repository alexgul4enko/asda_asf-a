import PropTypes from 'prop-types'
import Avatar from 'common/widgets/avatar'
import Icon from 'common/widgets/Icon'
import { TouchableWithoutFeedback, View, Text, Linking } from 'react-native'
import { useCallback } from 'react'
import styles from './image.styles'

Image.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  setVisible: PropTypes.func.isRequired,
  name: PropTypes.string,
  type: PropTypes.string,
  url: PropTypes.string,
}

Image.defaultProps = {
  name: undefined,
  type: undefined,
  url: undefined,
}


export default function Image({ setVisible, imageUrl, name, type, url }) {
  const handlePress = useCallback(() => {
    if(type === 'VIDEO') {
      return Linking.openURL(url)
    }
    setVisible({ type, uri: imageUrl, title: name })
  }, [type, imageUrl, setVisible, name, url])
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          <Avatar
            url={imageUrl}
            resizeMode="cover"
            noImage="noimage"
            style={styles.image}
          />
          {
            type === 'VIDEO' ? (
              <View style={styles.circle}>
                <View><Icon name="play-01" color="#ffffff" size={12}/></View>
              </View>
            ) : null
          }
        </View>
        <Text
          style={styles.text}
          numberOfLines={2}
          allowFontScaling={false}
          ellipsizeMode="tail"
        >
          {name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}
