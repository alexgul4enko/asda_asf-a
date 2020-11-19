import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import useOpenPromoUrl from 'screens/mainTabs/home/utils/useOpenPromoUrl'
import Button from 'common/widgets/button'
import CacheImage from 'common/widgets/CacheImage'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import styles from './header.styles'

Header.propTypes = {
  promotion: PropTypes.shape({
    url: PropTypes.string,
    bannerImage: PropTypes.shape({
      url: PropTypes.string,
    }),
    description: PropTypes.string,
    title: PropTypes.string,
    buttonText: PropTypes.string,
  }),
}

Header.defaultProps = {
  promotion: undefined,
}

export default function Header({ promotion }) {
  const handlePress = useOpenPromoUrl(promotion)
  if(isEmpty(promotion)) {
    return null
  }
  return (
    <View style={styles.root}>
      <CacheImage
        source={{ uri: get(promotion, 'bannerImage.url') }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{promotion.description}</Text>
      <View style={styles.row}>
        <Text style={styles.desc}>{promotion.title}</Text>
        <View style={styles.underline}/>
        <Button
          title={promotion.buttonText}
          onPress={handlePress}
          style={styles.btn}
          textStyle={styles.link}
        />
      </View>
    </View>
  )
}
