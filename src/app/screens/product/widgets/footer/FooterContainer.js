import PropTypes from 'prop-types'
import { I18nManager } from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'
import analytics from '@react-native-firebase/analytics'
import { useCallback, useMemo, useEffect, useState } from 'react'
import camelCase from 'lodash/camelCase'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import { usePrefetchQuery } from '@cranium/resource'
import interpolateColors from 'common/utils/interpolateColors'
import useAddtoBag from './utils/useAddtoBag'
import CHECKOUT from './checkout.graphql'
import styles from './footer.styles'
import theme from 'theme'
import Footer from './Footer'

FooterContainer.propTypes = {
  like: PropTypes.bool.isRequired,
  id: PropTypes.string,
  namespace: PropTypes.string,
  isAvailable: PropTypes.bool.isRequired,
  variant: PropTypes.shape({
    id: PropTypes.string,
    pricing: PropTypes.object,
  }),
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  thumbnail: PropTypes.shape({
    url: PropTypes.string,
  }),
  name: PropTypes.string,
}

FooterContainer.defaultProps = {
  namespace: undefined,
  variant: undefined,
  thumbnail: undefined,
  count: undefined,
  name: undefined,
  id: undefined,
}

export default function FooterContainer({ like, id, namespace, isAvailable, variant, count, thumbnail, name }) {
  const checkoutList = usePrefetchQuery(CHECKOUT, { parseValue: 'data.me.checkout', namespace: 'checkout_bag' })({ })

  const animatedValue = useMemo(() => new Animated.Value(isAvailable ? 1 : 0), [])
  const [active, setActive] = useState(false)
  const addTobag = useAddtoBag(checkoutList)
  const price = useMemo(() => {
    if(isEmpty(get(variant, 'pricing'))) { return null }
    const cur = get(variant, 'pricing.price.currency')
    const amount = get(variant, 'pricing.price.net.amount')
    if(!cur || !amount) { return null }
    return I18nManager.isRTL ? [cur, (amount * count).toLocaleString()].reverse().join(' ') : [cur, (amount * count).toLocaleString()].join(' ')
  }, [count, variant])

  const item = useMemo(() => {
    return {
      quantity: count,
      id: get(variant, 'id'),
      variant: {
        ...(variant || {}),
        product: {
          name,
          thumbnail,
          id,
        },
      },
    }
  }, [count, id, variant, name])

  const animatedStyle = useMemo(() => ([
    styles.btn,
    {
      backgroundColor: interpolateColors(
        animatedValue,
        [0, 1],
        [theme.grey, theme.primary],
      ),
    },
  ]), [animatedValue])


  useEffect(() => {
    setTimeout(() => {
      Animated.timing(animatedValue, {
        duration: 200,
        toValue: isAvailable ? 1 : 0,
        easing: Easing.inOut(Easing.ease),
      }).start()
    }, 100)
  }, [isAvailable])

  const add = useCallback(() => {
    setActive(true)
    analytics().logAddToCart({
      items: [
        {
          item_id: item.id,
          item_variant: item.variant.sku,
        },
      ],
    })
    addTobag(item, setActive)
  }, [setActive, addTobag, item])


  const close = useCallback(() => {
    setActive(false)
  }, [setActive])


  const options = useMemo(() => ({
    namespace: camelCase(namespace),
    reducer: 'object',
    parseValue: 'data.product',
  }), [namespace])


  return (
    <Footer
      animatedStyle={animatedStyle}
      options={options}
      like={like}
      id={id}
      isAvailable={isAvailable}
      addTobag={add}
      active={active}
      close={close}
      item={item}
      price={price}
    />
  )
}
