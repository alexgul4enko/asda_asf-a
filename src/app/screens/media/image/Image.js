import PropTypes from 'prop-types'
import Avatar from 'common/widgets/avatar'
import Icon from 'common/widgets/Icon'
import Button from 'common/widgets/button'
import PhotoView from '@merryjs/photo-viewer'
import { View, Text, Linking } from 'react-native'
import { useCallback, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import styles from './image.styles'


Image.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string,
  type: PropTypes.string,
  url: PropTypes.string,
  translation: PropTypes.object,
  hasProducts: PropTypes.bool,
}

Image.defaultProps = {
  name: undefined,
  type: undefined,
  url: undefined,
  translation: undefined,
  hasProducts: undefined,
}


export default function Image({ translation, imageUrl, name, type, url, hasProducts }) {
  const [visible, setVisible] = useState([])
  const close = useCallback(() => setVisible([]), [setVisible])

  const handlePress = useCallback(() => {
    if(type === 'VIDEO') {
      return Linking.openURL(url)
    }
    setVisible([{ source: { uri: imageUrl } }])
  }, [type, imageUrl, setVisible, url])
  return (
    <View>
      <Text style={styles.text}>
        {get(translation, 'name') || name}
      </Text>
      <Button onPress={handlePress} style={styles.btn}>
        <View style={styles.imageWrapper}>
          <Avatar
            url={imageUrl}
            resizeMode="stretch"
            noImage="noimage"
            style={styles.image}
            responsive
          />
          {
            type === 'VIDEO' ? (
              <View style={styles.circle}>
                <View><Icon name="play-01" color="#ffffff" size={24}/></View>
              </View>
            ) : null
          }
        </View>
      </Button>
      {
        hasProducts ? (
          <Text style={styles.title}>
            {gettext('Related goods')}
          </Text>
        ) : null
      }
      <PhotoView
        visible={!isEmpty(visible)}
        data={visible}
        onDismiss={close}
        initial={0}
      />
    </View>
  )
}
