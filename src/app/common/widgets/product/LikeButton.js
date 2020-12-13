import PropTypes from 'prop-types'
import { View } from 'react-native'
import Link from 'common/widgets/link'
import Button from 'common/widgets/button'
import Icon from 'common/widgets/Icon'
import Animated, { Easing } from 'react-native-reanimated'
import AnimatedLoadingWrapper from '../AnimatedLoadingWrapper'
import { useCallback, useMemo, useEffect, useState } from 'react'
import { useQuery } from '@cranium/resource'
import reducer from './utils/reducer'
import { hasPermission } from '@cranium/access'
import { access } from 'common/session'
import styles from './product.styles'
import DISLIKE from './dislike.graphql'
import LIKE from './like.graphql'
import Product from './product.graphql'
import theme from 'theme'
import analytics from '@react-native-firebase/analytics'


LikeButton.propTypes = {
  like: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  size: PropTypes.number,
  options: PropTypes.object,
}

LikeButton.defaultProps = {
  size: 20,
  options: {
    reducer,
    namespace: 'products',
  },
}

export default function LikeButton({ like, id, size, options }) {
  const [isLoading, setLoading] = useState(false)
  const animatedValue = useMemo(() => new Animated.Value(like ? 1 : 0), [])
  const animatedStyle = useMemo(() => {
    return [
      styles.liked,
      {
        transform: [{
          scale: animatedValue,
        }],
      },
    ]
  }, [animatedValue])
  useEffect(() => {
    Animated.timing(animatedValue, {
      duration: 200,
      toValue: like ? 1 : 0,
      easing: Easing.inOut(Easing.ease),
    }).start()
  }, [like])
  const { request } = useQuery(LIKE, { reducer: 'none', namespace: 'like' })
  const handlePress = useCallback(() => {
    const query = like ? DISLIKE : LIKE
    setLoading(true)
    analytics().logAddToWishlist({
      items: [{ item_id: id }],
    })
    request({ id }, { query })
      .then(() => request({ id }, { query: Product, ...options, forceUpdates: true, queries: [] }))
      .finally(() => setLoading(false))
    return true
  }, [like, request, id, setLoading, options])

  if(hasPermission(access.F_UNAUTHORISED)) {
    return (
      <Link to="Login" style={styles.like}>
        <View>
          <Icon name="favourite-01" size={size} color={theme.primary}/>
          <Animated.View style={animatedStyle}>
            <Icon name="favourite-fill-01" size={size} color={theme.primary}/>
          </Animated.View>
        </View>
      </Link>
    )
  }
  return (
    <Button onPress={handlePress} style={styles.like}>
      <AnimatedLoadingWrapper isLoading={isLoading}>
        <Icon name="favourite-01" size={size} color={theme.primary}/>
        <Animated.View style={animatedStyle}>
          <Icon name="favourite-fill-01" size={size} color={theme.primary}/>
        </Animated.View>
      </AnimatedLoadingWrapper>
    </Button>
  )
}
