import PropTypes from 'prop-types'
import { ScrollView, SafeAreaView, Text, View, RefreshControl, I18nManager } from 'react-native'
import { useTranslations } from '@cranium/i18n'
import { LoadingWrapper } from 'common/widgets/loading'
import Icon from 'common/widgets/Icon'
import Collapse from 'common/widgets/collapse'
import Toast from 'common/widgets/toast'
import Recomendations from 'common/widgets/recomentations'
import ListEmptyComponent from 'common/widgets/listEmptyComponent'
import RecentProducts from './widgets/recentProducts'
import Gallery from './widgets/gallery'
import ShareButton from './widgets/shareButton'
import Attributes from './widgets/attributes'
import Footer from './widgets/footer'
import VariantsWidget from './widgets/variants'
import { useMemo, Fragment } from 'react'
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
  translation: PropTypes.object,
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
  translation: undefined,
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
  translation,
}) {
  const { gettext } = useTranslations()
  const price = useMemo(() => {
    if(!isEmpty(get(variant, 'pricing'))) {
      return I18nManager.isRTL
        ? `${get(variant, 'pricing.price.net.amount').toLocaleString()} ${get(variant, 'pricing.price.currency')}`
        : `${get(variant, 'pricing.price.currency')} ${get(variant, 'pricing.price.net.amount').toLocaleString()}`
    }
    return getPrice(get(pricing, 'priceRange'))
  }, [pricing, variant])
  const salePrice = useMemo(() => {
    if(!isEmpty(get(variant, 'pricing')) && get(variant, 'pricing.onSale')) {
      return I18nManager.isRTL
        ? `${get(variant, 'pricing.priceUndiscounted.gross.amount').toLocaleString()} ${get(variant, 'pricing.price.currency')}`
        : `${get(variant, 'pricing.price.currency')} ${get(variant, 'pricing.priceUndiscounted.gross.amount').toLocaleString()}`
    }
    return get(pricing, 'onSale') && getPrice(get(pricing, 'priceRangeUndiscounted'))
  }, [pricing, variant])
  const discount = useMemo(() => {
    const disc = get(variant, 'discountPercent', discountPercent)
    return disc ? `-${disc}%` : null
  }, [discountPercent, variant])
  const description = useMemo(() => parseDescription(get(translation, 'descriptionJson') || descriptionJson), [descriptionJson, translation])
  const products = useMemo(() => ([id]), [id])
  const slug = useMemo(() => makeSlug(get(translation, 'name') || name, id), [name, id, translation])
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
          {images ? (
            <Gallery data={images}>
              {
                isVip ? (
                  <View
                    renderToHardwareTextureAndroid
                    needsOffscreenAlphaCompositing
                    style={styles.vipWrapper}
                  >
                    <Text style={styles.vip}>{gettext('vip')}</Text>
                  </View>
                ) : null
              }
            </Gallery>
          ) : null}
          {isVip && !isEmpty(images) ? (
            <View
              renderToHardwareTextureAndroid
              needsOffscreenAlphaCompositing
              style={styles.vipWrapper}
            >
              <Text style={styles.vip}>{gettext('vip')}</Text>
            </View>)
            : null}
          <View style={styles.content}>
            {
              id ? (
                <Fragment>
                  <Text style={styles.name}>{get(translation, 'name') || name}</Text>
                  <View style={styles.skuRow}>
                    <Text style={styles.sku}>{gettext('SKU')}</Text>
                    <Text style={styles.sku}>:</Text>
                    <Text style={styles.sku}> </Text>
                    <Text style={styles.sku}>{get(variant, 'sku')}</Text>
                  </View>
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
                    <Icon name="delivery-01" color={theme.primary} style={styles.deliveryIcon}/>
                    <Text style={styles.deliveryText}>
                      {gettext('Exspress delivery to')}
                    </Text>
                    <Text style={styles.deliveryText}>
                      {' '}
                    </Text>
                    <Text style={[styles.deliveryText, styles.Riyadh]}>
                      {gettext('Riyadh')}
                    </Text>
                  </View>
                </Fragment>
              ) : (
                <ListEmptyComponent title={gettext('No productFound')}/>
              )
            }

            {
              isEmpty(description) ? null : (
                <Collapse title={gettext('Product Details')} titleStyle={styles.collapse}>
                  {description}
                </Collapse>
              )
            }
            {
              !isEmpty(attributes) ? (
                <Collapse title={gettext('Product Specifications')} titleStyle={styles.collapse}>
                  <VariantsWidget data={attributes} />
                </Collapse>
              ) : null
            }

            <Recomendations products={products} namespace={`${namespace}Recomendations`}/>
            <RecentProducts id={id} namespace={`${namespace}Recent`}/>
          </View>
        </ScrollView>
        {id ? (
          <Footer
            id={id}
            slug={slug}
            like={inWishlist}
            namespace={namespace}
            isAvailable={!isEmpty(variant) && !!count}
            variant={variant}
            count={count}
            thumbnail={thumbnail}
            name={get(translation, 'name') || name}
          />) : null
        }
        {id ? (<Toast error={submitError}/>) : null}
      </LoadingWrapper>
    </SafeAreaView>
  )
}
