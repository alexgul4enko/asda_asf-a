import PropTypes from 'prop-types'
import Animated, { Easing } from 'react-native-reanimated'
import { ActivityIndicator, Image, View, Text } from 'react-native'
import { useMemo, useCallback, useState } from 'react'
import Button from 'common/widgets/button'
import Avatar from 'common/widgets/avatar'
import { useTranslations } from '@cranium/i18n'
import get from 'lodash/get'
import getImage from './utils/getImage'
import sendImage from './utils/sendImage'
import styles from './avatar.styles'

EditAvatar.propTypes = {
  id: PropTypes.string,
  url: PropTypes.string,
}

EditAvatar.defaultProps = {
  id: undefined,
  url: undefined,
}

export default function EditAvatar({ url, id }) {
  const animatedValue = useMemo(() => new Animated.Value(1), [])
  const uploadAnimation = useMemo(() => new Animated.Value(1), [])
  const [image, setImage] = useState()
  const { gettext } = useTranslations()

  const animatedStyles = useMemo(() => ([
    styles.fade,
    {
      opacity: animatedValue,
      transform: [{ scale: animatedValue }],
    },
  ]), [animatedValue])

  const uploadLoadingStyles = useMemo(() => ([
    styles.uploading,
    {
      opacity: Animated.interpolate(uploadAnimation, {
        inputRange: [0, 1],
        outputRange: [1, 0],
        extrapolate: Animated.Extrapolate.CLAMP,
      }),
      transform: [
        {
          scale: Animated.interpolate(uploadAnimation, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Animated.Extrapolate.CLAMP,
          }),
        },
      ],
    },
  ]), [uploadAnimation])


  const handleUploadAvatar = useCallback(() => {
    Animated.timing(uploadAnimation, {
      duration: 300,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    }).start(() => {
      getImage({
        title: gettext('Select avatar photo'),
        takePhotoButtonTitle: gettext('Take a phone'),
        cancelButtonTitle: gettext('Cancel'),
        chooseFromLibraryButtonTitle: gettext('Select from library'),
      })
        .then((image) => sendImage(id, image))
        .then((data) => {
          setImage(get(data, 'uri'))
          Animated.timing(uploadAnimation, {
            duration: 300,
            toValue: 1,
            easing: Easing.inOut(Easing.ease),
          }).start()
        })
    })
  }, [id])

  return (
    <View style={styles.root}>
      <Animated.View style={animatedStyles}>
        <Button onPress={handleUploadAvatar} style={styles.avatarButton}>
          {
            image ? (
              <Image
                source={{ uri: image }}
                style={styles.img}
                resizeMode="cover"
              />
            ) : (
              <Avatar
                url={url}
                style={styles.img}
                resizeMode="cover"
              />
            )
          }
        </Button>
        <Animated.View style={[uploadLoadingStyles]}>
          <ActivityIndicator color="#fff"/>
        </Animated.View>
      </Animated.View>
      <Text style={styles.instructions}>
        {gettext('Maximum size of 1MB. JPG, GIF, or PNG.')}
      </Text>
    </View>
  )
}
