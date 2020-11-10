import NavigationPropTypes from 'common/prop-types/Navigation'
import CityView from './CityView'
import SelectItem from 'common/widgets/selectItem'
import { usePrefetchQuery, useGraphInifnyList, useSearch } from '@cranium/resource'
import { useCallback } from 'react'
import get from 'lodash/get'
import CITY from './city.graphql'

CityContainer.propTypes = NavigationPropTypes

export default function CityContainer({ route, navigation }) {
  const country = get(route, 'params.country')
  const cities = usePrefetchQuery(CITY, { parseValue: 'data.cities' })({ country, first: 16 })
  const { refresh, isRefreshing, loadNext } = useGraphInifnyList(cities)
  const onSearch = useSearch(cities.request)

  const handleSearch = useCallback((search) => onSearch({ first: 16, search, country }), [onSearch, country])

  const renderItem = useCallback(({ item }) => {
    return (
      <SelectItem
        value={item.node}
        valueKey="id"
        titleKey="displayName"
        active={get(route, 'params.value.id')}
        onChange={get(route, 'params.onChange')}
        goBack={navigation.goBack}
      />
    )
  }, [navigation.goBack, route.params])
  return (
    <CityView
      isLoading={cities.initialLoading}
      data={cities.data}
      refetch={refresh}
      loadNext={loadNext}
      refreshing={isRefreshing}
      renderItem={renderItem}
      onSearch={handleSearch}
    />
  )
}
