import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { Text, I18nManager } from 'react-native'
import Link from 'common/widgets/link'
import Avatar from 'common/widgets/avatar'
import get from 'lodash/get'
import makeSlug from 'common/utils/makeSlug'
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
  promoLinkText: PropTypes.string,
  translation: PropTypes.object,
}

Category.defaultProps = {
  name: undefined,
  productWithMinPrice: undefined,
  promoImage: undefined,
  promoLinkText: undefined,
  translation: undefined,
}

export default function Category({
  id,
  slug,
  name,
  productWithMinPrice,
  promoImage,
  type,
  promoLinkText,
  translation,
}) {
  const params = useMemo(() => ({ slug: makeSlug(get(translation, 'name') || name, id), type: 'category' }), [get(translation, 'name'), name, id])
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
        {get(translation, 'name') || name}
      </Text>
      {
        type === 'TOP' ? (
          <Text
            numberOfLines={1}
            allowFontScaling={false}
            ellipsizeMode="tail"
            style={styles.price}
          >
            {
              I18nManager.isRTL
                ? `${get(productWithMinPrice, 'minimalVariantPrice.amount', '')} ${get(productWithMinPrice, 'minimalVariantPrice.currency', '')}`
                : `${get(productWithMinPrice, 'minimalVariantPrice.currency', '')} ${get(productWithMinPrice, 'minimalVariantPrice.amount', '')}`
            }
          </Text>
        ) : null
      }
      <Text
        style={styles.link}
        numberOfLines={2}
        allowFontScaling={false}
        ellipsizeMode="tail"
      >
        {type === 'TOP' ? (get(translation, 'promoLinkText') || promoLinkText) : null}
      </Text>
    </Link>
  )
}
