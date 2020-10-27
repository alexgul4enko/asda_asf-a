import { usePrefetchQuery } from '@cranium/resource'
import { useMemo } from 'react'
import useGender from 'common/hooks/useGender'
import BANNERS from './banners.graphql'
import getBanner from './utils/getBanner'
import getSlider from './utils/getSlider'
import HomeView from './HomeView'

export default function HomeContainer() {
  const banners = usePrefetchQuery(BANNERS, { parseValue: 'data.promotionPlaceholders' })()
  useGender(banners)
  const headerBanner = useMemo(() => getBanner(banners, 'HEADER_BANNER'), [banners.data])
  const firstBanner = useMemo(() => getBanner(banners, 'HOMEPAGE_FIRST_BANNER'), [banners.data])
  const secondBanner = useMemo(() => getBanner(banners, 'HOMEPAGE_SECOND_BANNER'), [banners.data])
  const slides = useMemo(() => getSlider(banners), [banners.data])
  return (
    <HomeView
      headerBanner={headerBanner}
      firstBanner={firstBanner}
      secondBanner={secondBanner}
      slides={slides}
    />
  )
}
