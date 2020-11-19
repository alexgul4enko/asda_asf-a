import ProductsContainer from './ProductsContainer'
import { LoadingWrapper } from 'common/widgets/loading'
import { usePrefetchQuery } from '@cranium/resource'
import get from 'lodash/get'
import ME from './me.graphql'


export default function isVIPUser(props) {
  const myself = usePrefetchQuery(ME, { parseValue: 'data' })({ })

  return (
    <LoadingWrapper isLoading={myself.initialLoading}>
      <ProductsContainer
        {...props}
        isVip = {get(myself, 'data.me.isVip') ? undefined : false}
      />
    </LoadingWrapper>
  )
}
