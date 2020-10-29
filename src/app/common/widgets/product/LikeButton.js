import PropTypes from 'prop-types'
import { View } from 'react-native'
import Link from 'common/widgets/link'
import Button from 'common/widgets/button'
import Icon from 'common/widgets/Icon'
import Animated, { Easing } from 'react-native-reanimated'
import AnimatedLoadingWrapper from '../AnimatedLoadingWrapper'
import { useCallback, useMemo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from '@cranium/resource'
import get from 'lodash/get'
import reducer from './utils/reducer'
import styles from './product.styles'
import DISLIKE from './dislike.graphql'
import LIKE from './like.graphql'
import Product from './product.graphql'
import theme from 'theme'

LikeButton.propTypes = {
  like: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
}
export default function LikeButton({ like, id }) {
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
  const token = useSelector(state => get(state, 'session.data.token'))
  const { request } = useQuery(LIKE, { reducer: 'none', namespace: 'like' })
  const handlePress = useCallback(() => {
    const query = like ? DISLIKE : LIKE
    setLoading(true)
    request({ id }, { query })
      .then(() => request({ id }, { query: Product, reducer, namespace: 'products' }))
      .finally(() => setLoading(false))
    return true
  }, [like, request, id, setLoading])
  if(!token) {
    return (
      <Link to="Login" style={styles.like}>
        <View>
          <Icon name="favourite-01" size={17} color={theme.primary}/>
          <Animated.View style={animatedStyle}>
            <Icon name="favourite-fill-01" size={17} color={theme.primary}/>
          </Animated.View>
        </View>
      </Link>
    )
  }
  return (
    <Button onPress={handlePress} style={styles.like}>
      <AnimatedLoadingWrapper isLoading={isLoading}>
        <Icon name="favourite-01" size={17} color={theme.primary}/>
        <Animated.View style={animatedStyle}>
          <Icon name="favourite-fill-01" size={17} color={theme.primary}/>
        </Animated.View>
      </AnimatedLoadingWrapper>
    </Button>
  )
}
