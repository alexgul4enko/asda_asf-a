import PropTypes from 'prop-types'
import { useMemo } from 'react'
import Link from 'common/widgets/link'
import { SharedElement } from 'react-navigation-shared-element'
import Avatar from 'common/widgets/avatar'
import { Text, View } from 'react-native'
import LikeButton from './LikeButton'
import styles from './product.styles'
import get from 'lodash/get'
import makeSlug from 'common/utils/makeSlug'
import getPrice from './utils/getPrice'

Product.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  slug: PropTypes.string.isRequired,
  thumbnail: PropTypes.shape({
    url: PropTypes.string,
  }),
  isVip: PropTypes.bool,
  inWishlist: PropTypes.bool,
  pricing: PropTypes.shape({
    priceRange: PropTypes.object,
    priceRangeUndiscounted: PropTypes.object,
  }),
  inList: PropTypes.string,
  linkAction: PropTypes.string,
  hideLikeButton: PropTypes.bool,
}

Product.defaultProps = {
  name: undefined,
  thumbnail: undefined,
  isVip: undefined,
  inWishlist: undefined,
  pricing: undefined,
  inList: undefined,
  linkAction: undefined,
  hideLikeButton: undefined,
}

export default function Product({ id, name, slug, thumbnail, isVip, pricing, inWishlist, inList, hideLikeButton, linkAction }) {
  const price = useMemo(() => getPrice(get(pricing, 'priceRange')), [pricing])
  const salePrice = useMemo(() => get(pricing, 'onSale') && getPrice(get(pricing, 'priceRangeUndiscounted')), [pricing])
  const params = useMemo(() => ({ slug: makeSlug(name, id) }), [id, name])
  return (
    <Link to="Product" params={params} style={styles.link} linkAction={linkAction}>
      <SharedElement id={`product.${id}.image`}>
        <Avatar
          url={get(thumbnail, 'url')}
          style={styles.img}
          resizeMode="cover"
          noImage="noimage"
        />
      </SharedElement>
      {isVip ? <Text style={styles.vip}>{gettext('VIP')}</Text> : null}
      <Text
        numberOfLines={2}
        allowFontScaling={false}
        ellipsizeMode="tail"
        style={styles.name}
      >
        {name}
      </Text>
      <Text style={styles.sale}>{salePrice}</Text>
      <View style={styles.row}>
        <Text style={styles.price}>{price}</Text>
        {hideLikeButton ? null : <LikeButton like={inWishlist} id={id} inList={inList} size={20}/>}
      </View>
    </Link>
  )
}
