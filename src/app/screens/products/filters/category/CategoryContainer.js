import NavigationPropTypes from 'common/prop-types/Navigation'
import { useQuery, useGraphInifnyList, useSearch } from '@cranium/resource'
import { useLayoutEffect, useCallback, useState } from 'react'
import CategoryView from './CategoryView'
import Category from './widgets/category'
import Clear from '../clear'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import CATEGORY from './category.graphql'
import PRODUCTS from './products.graphql'

CategoryContainer.propTypes = NavigationPropTypes

export default function CategoryContainer({ navigation }) {
  const category = useQuery(CATEGORY, { parseValue: 'data.category.children' })
  const { loadNext, refresh, isRefreshing } = useGraphInifnyList(category)


  const products = useQuery(PRODUCTS, { parseValue: 'data.products' })
  const onSearch = useSearch(products.request)

  const handleSearch = useCallback((values) => {
    const vals = values.filter(item => item !== get(category, 'filters.id'))
    onSearch({
      filter: {
        ...get(products, 'filters.filter'),
        categories: isEmpty(vals) ? [get(category, 'filters.id')] : vals,
      },
    })
  }, [onSearch, get(category, 'filters.id')])


  const [selectedItems, setSelected] = useState(get(products, 'filters.filter.categories') || [])

  const selectItem = useCallback((id) => {
    const selections = selectedItems.includes(id)
      ? selectedItems.filter(item => item !== id)
      : [...selectedItems, id]
    handleSearch(selections)
    setSelected(selections)
  }, [selectedItems, setSelected, handleSearch])

  const renderItem = useCallback(({ item }) => {
    return (
      <Category
        {...item.node}
        selectItem={selectItem}
        isActive={selectedItems.includes(get(item, 'node.id'))}
      />
    )
  }, [selectItem, selectedItems])


  const clear = useCallback(() => {
    setSelected([])
    handleSearch([])
  }, [setSelected, handleSearch])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (<Clear clear={clear}/>),
    })
  }, [navigation, clear])

  return (
    <CategoryView
      data={category.data}
      loadNext={loadNext}
      refetch={refresh}
      refreshing={isRefreshing}
      renderItem={renderItem}
    />
  )
}
