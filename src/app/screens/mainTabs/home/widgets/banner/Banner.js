import PropTypes from 'prop-types'
import useOpenPromoUrl from 'screens/mainTabs/home/utils/useOpenPromoUrl'
import { useMemo } from 'react'
import Button from 'common/widgets/button'
import CacheImage from 'common/widgets/CacheImage'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import styles from './banner.styles'

Banner.propTypes = {
  promotion: PropTypes.shape({
    url: PropTypes.string,
    bannerImage: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
}

Banner.defaultProps = {
  promotion: undefined,
}

export default function Banner({ promotion }) {
  const handlePress = useOpenPromoUrl(promotion)
  const source = useMemo(() => {
    return { uri: get(promotion, 'bannerImage.url') }
  }, [promotion])
  if(isEmpty(promotion)) {
    return null
  }
  return (
    <Button style={styles.btn} onPress={handlePress}>
      <CacheImage
        source={source}
        style={styles.image}
        responsive
      />
    </Button>
  )
}
