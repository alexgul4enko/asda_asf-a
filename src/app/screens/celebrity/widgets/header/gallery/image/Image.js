import PropTypes from 'prop-types'
import Avatar from 'common/widgets/avatar'
import Link from 'common/widgets/link'
import Icon from 'common/widgets/Icon'
import { View, Text } from 'react-native'
import get from 'lodash/get'
import styles from './image.styles'

Image.propTypes = {
  imageUrl: PropTypes.string.isRequired,
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


export default function Image(props) {
  const { translation, imageUrl, name, type } = props
  return (
    <Link params={props} to="Media">
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
    </Link>
  )
}
