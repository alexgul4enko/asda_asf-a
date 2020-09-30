import DesignersView from './DesignersView'
import DESIGNERS from './designers.graphql'
import useInfinityList from 'common/hooks/useInfinityList'

export default function DesignersContainer(props) {
  const { loading, data, loadNext, refetch, refreshing } = useInfinityList(DESIGNERS, 'designers')
  return (
    <DesignersView
      {...props}
      loading={loading}
      data={data}
      loadNext={loadNext}
      refetch={refetch}
      refreshing={refreshing}
    />
  )
}
