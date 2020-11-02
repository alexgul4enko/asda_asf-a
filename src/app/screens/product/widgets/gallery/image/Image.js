import PropTypes from 'prop-types'
import CacheImage from 'common/widgets/CacheImage'
import { TouchableWithoutFeedback, View } from 'react-native'
import { useMemo } from 'react'
import styles from './image.styles'

Image.propTypes = {
  url: PropTypes.string.isRequired,
  setVisible: PropTypes.func.isRequired,
}


export default function Image({ url, setVisible }) {
  const source = useMemo(() => ({ uri: url }), [url])
  return (
    <TouchableWithoutFeedback onPress={setVisible}>
      <View>
        <CacheImage
          source={source}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </TouchableWithoutFeedback>
  )
}
