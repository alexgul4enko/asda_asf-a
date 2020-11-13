import PropTypes from 'prop-types'
import { ScrollView, SafeAreaView, Text, View, RefreshControl } from 'react-native'
import { useTranslations } from '@cranium/i18n'
import { LoadingWrapper } from 'common/widgets/loading'
import Icon from 'common/widgets/Icon'
import Collapse from 'common/widgets/collapse'
import Toast from 'common/widgets/toast'
import Recomendations from 'common/widgets/recomentations'
import RecentProducts from './widgets/recentProducts'
import Gallery from './widgets/gallery'
import ShareButton from './widgets/shareButton'
import Attributes from './widgets/attributes'
import Footer from './widgets/footer'
import VariantsWidget from './widgets/variants'
import { useMemo } from 'react'
import getPrice from 'common/widgets/product/utils/getPrice'
import parseDescription from './utils/parseDescription'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import makeSlug from 'common/utils/makeSlug'
import styles from './product.style'
import theme from 'theme'

ProductView.propTypes = {
  images: PropTypes.array,
  isVip: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  name: PropTypes.string,
  pricing: PropTypes.shape({
    priceRange: PropTypes.object,
    priceRangeUndiscounted: PropTypes.object,
  }),
  id: PropTypes.string,
  refetch: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
  descriptionJson: PropTypes.string,
  discountPercent: PropTypes.number,
  attributes: PropTypes.array,
  namespace: PropTypes.string,
  inWishlist: PropTypes.bool,
  isAvailable: PropTypes.bool,
  variants: PropTypes.array,
  selectVariant: PropTypes.func.isRequired,
  variant: PropTypes.object,
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setCount: PropTypes.func.isRequired,
  thumbnail: PropTypes.shape({
    url: PropTypes.string,
  }),
  submitError: PropTypes.any,
}

ProductView.defaultProps = {
  images: [],
  isVip: undefined,
  name: undefined,
  descriptionJson: undefined,
  discountPercent: undefined,
  attributes: undefined,
  namespace: undefined,
  inWishlist: false,
  isAvailable: false,
  variants: undefined,
  variant: undefined,
  count: undefined,
  thumbnail: undefined,
  id: undefined,
  pricing: undefined,
  submitError: undefined,
}

export default function ProductView({
  id,
  images,
  isVip,
  isLoading,
  name,
  pricing,
  refetch,
  refreshing,
  descriptionJson,
  discountPercent,
  attributes,
  namespace,
  inWishlist,
  isAvailable,
  variants,
  selectVariant,
  variant,
  count,
  setCount,
  thumbnail,
  submitError,
}) {
  const { gettext } = useTranslations()
  const price = useMemo(() => {
    if(!isEmpty(get(variant, 'pricing'))) {
      return `${get(variant, 'pricing.price.currency')} ${get(variant, 'pricing.price.net.amount').toLocaleString()}`
    }
    return getPrice(get(pricing, 'priceRange'))
  }, [pricing, variant])
  const salePrice = useMemo(() => {
    if(!isEmpty(get(variant, 'pricing'))) {
      return get(variant, 'pricing.onSale') && `${get(variant, 'pricing.price.currency')} ${get(variant, 'pricing.priceUndiscounted.gross.amount').toLocaleString()}`
    }
    return get(pricing, 'onSale') && getPrice(get(pricing, 'priceRangeUndiscounted'))
  }, [pricing, variant])
  const discount = useMemo(() => {
    const disc = get(variant, 'discountPercent', discountPercent)
    return disc ? `-${disc}%` : null
  }, [discountPercent, variant])
  const description = useMemo(() => parseDescription(descriptionJson), [descriptionJson])
  const products = useMemo(() => ([id]), [id])
  const slug = useMemo(() => makeSlug(name, id), [name, id])
  return (
    <SafeAreaView style={styles.root}>
      <LoadingWrapper isLoading={isLoading}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refetch} />
          }
        >
          <Gallery data={images}/>
          {isVip ? <Text style={styles.vip}>{gettext('vip')}</Text> : null}

          <View style={styles.content}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.sku}>{gettext('SKU:')} {get(variant, 'sku')}</Text>
            <Text style={styles.price}>{ price }</Text>
            {get(pricing, 'onSale') ? (
              <View style={styles.row}>
                <Text style={styles.sale}>{salePrice}</Text>
                <Text style={styles.discount}>{discount}</Text>
              </View>) : null
            }
            <ShareButton id={id} name={name}/>
            <Attributes
              isAvailable={isAvailable}
              variants={variants}
              selectVariant={selectVariant}
              count={count}
              setCount={setCount}
            />
            <View style={styles.delivery}>
              <Icon name="delivery-01" color={theme.primary}/>
              <Text style={styles.deliveryText}>
                {gettext('Exspress delivery to')} {' '}
                <Text style={styles.Riyadh}>{gettext('Riyadh')}</Text>
              </Text>
            </View>
            {
              isEmpty(description) ? null : (
                <Collapse title={gettext('Product Details')}>
                  {description}
                </Collapse>
              )
            }
            {
              !isEmpty(attributes) ? (
                <Collapse title={gettext('Product Specifications')}>
                  <VariantsWidget data={attributes} />
                </Collapse>
              ) : null
            }

            <Recomendations products={products} namespace={`${namespace}Recomendations`}/>
            <RecentProducts id={id} namespace={`${namespace}Recent`}/>
          </View>
        </ScrollView>
        <Footer
          id={id}
          slug={slug}
          like={inWishlist}
          namespace={namespace}
          isAvailable={!isEmpty(variant) && !!count}
          variant={variant}
          count={count}
          thumbnail={thumbnail}
          name={name}
        />
        <Toast error={submitError}/>
      </LoadingWrapper>
    </SafeAreaView>
  )
}
