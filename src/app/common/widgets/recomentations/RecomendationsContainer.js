import PropTypes from 'prop-types'
import RecomendationsView from './RecomendationsView'
import { usePrefetchQuery } from '@cranium/resource'
import RECOMENDATIONS from './recomendations.graphql'

RecomendationsContainer.propTypes = {
  products: PropTypes.array,
  namespace: PropTypes.string,
}

RecomendationsContainer.defaultProps = {
  products: undefined,
  namespace: undefined,
}

export default function RecomendationsContainer({ products, namespace }) {
  const recomendations = usePrefetchQuery(RECOMENDATIONS, { parseValue: 'data.youMayAlsoLike', namespace })({ first: 20, products })

  return (
    <RecomendationsView
      isLoading={recomendations.initialLoading}
      data={recomendations.data}
    />
  )
}
