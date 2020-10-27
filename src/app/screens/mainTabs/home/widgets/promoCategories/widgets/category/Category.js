import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { Text } from 'react-native'
import Link from 'common/widgets/link'
import Avatar from 'common/widgets/avatar'
import get from 'lodash/get'
import styles from './category.styles'

Category.propTypes = {
  id: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  name: PropTypes.string,
  productWithMinPrice: PropTypes.shape({
    minimalVariantPrice: PropTypes.shape({
      amount: PropTypes.number,
      currency: PropTypes.string,
    }),
  }),
  promoImage: PropTypes.shape({
    url: PropTypes.string,
  }),
  type: PropTypes.oneOf(['TOP', 'POPULAR']).isRequired,
}

Category.defaultProps = {
  name: undefined,
  productWithMinPrice: undefined,
  promoImage: undefined,
}

export default function Category({
  id,
  slug,
  name,
  productWithMinPrice,
  promoImage,
  type,
}) {
  const params = useMemo(() => ({ slug }), [slug])
  return (
    <Link to="Products" params={params} style={styles.btn}>
      <Avatar
        url={get(promoImage, 'url')}
        resizeMode="cover"
        noImage="noimage"
        size={50}
        style={styles.image}
      />
      <Text
        numberOfLines={2}
        allowFontScaling={false}
        ellipsizeMode="tail"
        style={styles.title}
      >
        {name}
      </Text>
      {
        type === 'TOP' ? (
          <Text
            numberOfLines={1}
            allowFontScaling={false}
            ellipsizeMode="tail"
            style={styles.price}
          >
            {get(productWithMinPrice, 'minimalVariantPrice.amount')} {get(productWithMinPrice, 'minimalVariantPrice.currency')}
          </Text>
        ) : null
      }

    </Link>
  )
}