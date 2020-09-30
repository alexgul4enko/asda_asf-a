import CelebritiesView from './CelebritiesView'
import CELEBRITY from './celebrities.graphql'
import useInfinityList from 'common/hooks/useInfinityList'

export default function CelebritiesContainer(props) {
  const { loading, data, loadNext, refetch, refreshing } = useInfinityList(CELEBRITY, 'celebrities')
  return (
    <CelebritiesView
      {...props}
      loading={loading}
      data={data}
      loadNext={loadNext}
      refetch={refetch}
      refreshing={refreshing}
    />
  )
}
