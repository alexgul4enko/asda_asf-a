import NavigationPropTypes from 'common/prop-types/Navigation'
import ReviewOrderView from './ReviewOrderView'
import { usePrefetchQuery, useGraphInifnyList } from '@cranium/resource'
import get from 'lodash/get'
import REVIEW from './review.graphql'

ReviewOrderContainer.propTypes = NavigationPropTypes
export default function ReviewOrderContainer({ route }) {
  const review = usePrefetchQuery(REVIEW, { parseValue: 'data.orderByToken' })({ first: 16, token: get(route, 'params.token') })
  const { refresh, isRefreshing } = useGraphInifnyList(review)
  return (
    <ReviewOrderView
      isLoading={review.initialLoading}
      {...review.data}
      refetch={refresh}
      refreshing={isRefreshing}
    />
  )
}
