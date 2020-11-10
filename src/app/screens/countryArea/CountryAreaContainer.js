import NavigationPropTypes from 'common/prop-types/Navigation'
import CountryAreaView from './CountryAreaView'
import SelectItem from 'common/widgets/selectItem'
import { usePrefetchQuery, useGraphInifnyList } from '@cranium/resource'
import { useCallback } from 'react'
import get from 'lodash/get'
import COUNTRYAREA from './countryArea.graphql'

CountryAreaContainer.propTypes = NavigationPropTypes

export default function CountryAreaContainer({ route, navigation }) {
  const country = get(route, 'params.country')
  const countryAreas = usePrefetchQuery(COUNTRYAREA, { parseValue: 'data.addressValidationRules.countryAreaChoices' })({ country })
  const { refresh, isRefreshing } = useGraphInifnyList(countryAreas)
  const renderItem = useCallback(({ item }) => {
    return (
      <SelectItem
        value={item}
        valueKey="verbose"
        titleKey="raw"
        active={get(route, 'params.value')}
        onChange={(val) => get(route, 'params.onChange')(val.verbose)}
        goBack={navigation.goBack}
      />
    )
  }, [navigation.goBack, route.params])
  return (
    <CountryAreaView
      isLoading={countryAreas.initialLoading}
      data={countryAreas.data}
      refetch={refresh}
      refreshing={isRefreshing}
      renderItem={renderItem}
    />
  )
}
