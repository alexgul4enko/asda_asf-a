import CelebritiesView from './CelebritiesView'
import { usePrefetchQuery } from '@cranium/resource'
import useGender from 'common/hooks/useGender'
import CELEBRITY from './celebrities.graphql'

export default function CelebritiesContainer(props) {
  const celebrities = usePrefetchQuery(CELEBRITY, { parseValue: 'data.celebrities' })()
  useGender(celebrities)
  return (
    <CelebritiesView
      {...props}
      isLoading={celebrities.isLoading}
      data={celebrities.data}
    />
  )
}
