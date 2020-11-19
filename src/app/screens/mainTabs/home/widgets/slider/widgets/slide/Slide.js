import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import useOpenPromoUrl from 'screens/mainTabs/home/utils/useOpenPromoUrl'
import { useMemo } from 'react'
import Button from 'common/widgets/button'
import CacheImage from 'common/widgets/CacheImage'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import styles from './slide.styles'

Slide.propTypes = {
  promotion: PropTypes.shape({
    url: PropTypes.string,
    bannerImage: PropTypes.shape({
      url: PropTypes.string,
    }),
    title: PropTypes.string,
    description: PropTypes.string,
    buttonText: PropTypes.string,
  }),
}

Slide.defaultProps = {
  promotion: undefined,
}


export default function Slide({ promotion }) {
  const handlePress = useOpenPromoUrl(promotion)
  const source = useMemo(() => {
    return { uri: get(promotion, 'bannerImage.url') }
  }, [promotion])
  if(isEmpty(promotion)) {
    return null
  }
  return (
    <View style={styles.slide}>
      <CacheImage
        source={source}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.banner}>
        <Text
          style={styles.title}
          numberOfLines={2}
          allowFontScaling={false}
          ellipsizeMode="tail"
        >
          {promotion.title}
        </Text>
        <Text
          style={styles.desc}
          numberOfLines={2}
          allowFontScaling={false}
          ellipsizeMode="tail"
        >
          {promotion.description}
        </Text>
        <Button
          title={promotion.buttonText || gettext('Shop now')}
          onPress={handlePress}
          primary
          style={styles.link}
          textStyle={styles.linkText}
        />
      </View>
    </View>
  )
}
