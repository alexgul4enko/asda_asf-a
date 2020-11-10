import NavigationPropTypes from 'common/prop-types/Navigation'
import CountryView from './CountryView'
import SelectItem from 'common/widgets/selectItem'
import { usePrefetchQuery, useGraphInifnyList } from '@cranium/resource'
import { useCallback } from 'react'
import get from 'lodash/get'
import COUNTRY from './country.graphql'

CountryContainer.propTypes = NavigationPropTypes

export default function CountryContainer({ route, navigation }) {
  const countries = usePrefetchQuery(COUNTRY, { parseValue: 'data.shop.countries' })()
  const { refresh, isRefreshing } = useGraphInifnyList(countries)
  const renderItem = useCallback(({ item }) => {
    return (
      <SelectItem
        value={item}
        valueKey="code"
        titleKey="country"
        active={get(route, 'params.value.code')}
        onChange={get(route, 'params.onChange')}
        goBack={navigation.goBack}
      />
    )
  }, [navigation.goBack, route.params])
  return (
    <CountryView
      isLoading={countries.initialLoading}
      data={countries.data}
      refetch={refresh}
      refreshing={isRefreshing}
      renderItem={renderItem}
    />
  )
}
