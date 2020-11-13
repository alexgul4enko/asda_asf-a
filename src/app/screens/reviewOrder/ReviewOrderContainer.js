import NavigationPropTypes from 'common/prop-types/Navigation'
import { BackHandler } from 'react-native'
import ReviewOrderView from './ReviewOrderView'
import { usePrefetchQuery, useGraphInifnyList } from '@cranium/resource'
import { useCallback, useEffect } from 'react'
import get from 'lodash/get'
import REVIEW from './review.graphql'

ReviewOrderContainer.propTypes = NavigationPropTypes
export default function ReviewOrderContainer({ route, navigation }) {
  const review = usePrefetchQuery(REVIEW, { parseValue: 'data.orderByToken' })({ first: 16, token: get(route, 'params.token') })
  const { refresh, isRefreshing } = useGraphInifnyList(review)
  const onBackPress = useCallback(() => {
    navigation.navigate('main')
    return true
  }, [navigation.navigate])
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress)
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress)
  }, [])
  return (
    <ReviewOrderView
      isLoading={review.initialLoading}
      {...review.data}
      refetch={refresh}
      refreshing={isRefreshing}
    />
  )
}
