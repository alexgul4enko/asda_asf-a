import PropTypes from 'prop-types'
import Avatar from 'common/widgets/avatar'
import Icon from 'common/widgets/Icon'
import { TouchableWithoutFeedback, View, Text, Linking } from 'react-native'
import { useCallback } from 'react'
import get from 'lodash/get'
import styles from './image.styles'

Image.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  setVisible: PropTypes.func.isRequired,
  name: PropTypes.string,
  type: PropTypes.string,
  url: PropTypes.string,
  translation: PropTypes.object,
}

Image.defaultProps = {
  name: undefined,
  type: undefined,
  url: undefined,
  translation: undefined,
}


export default function Image({ translation, setVisible, imageUrl, name, type, url }) {
  const handlePress = useCallback(() => {
    if(type === 'VIDEO') {
      return Linking.openURL(url)
    }
    setVisible({ type, uri: imageUrl, title: get(translation, 'name') || name })
  }, [type, imageUrl, setVisible, name, url, translation])
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
          {get(translation, 'name') || name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}
