import NavigationPropTypes from 'common/prop-types/Navigation'
import AttributesView from './AttributesView'
import Attribute from './widgets/attribute'
import Clear from '../clear'
import { useState, useCallback, useLayoutEffect } from 'react'
import { useQuery, useSearch } from '@cranium/resource'
import get from 'lodash/get'
import attributesFilter from './utils/attributesFilter'
import PRODUCTS from './products.graphql'

AttributesContainer.propTypes = NavigationPropTypes

export default function AttributesContainer(props) {
  const [selectedItems, setSelected] = useState(get(props, 'route.params.selected') || [])
  const products = useQuery(PRODUCTS, { parseValue: 'data.products', destroyOnUnmount: false })
  const onSearch = useSearch(products.request)

  const handleSearch = useCallback((values) => {
    const slug = get(props, 'route.params.slug')

    const attributes = attributesFilter(get(products, 'filters.filter.attributes'), values, slug)
    onSearch({
      filter: {
        ...get(products, 'filters.filter'),
        attributes,
      },
    })
  }, [onSearch, get(props, 'route.params.slug'), get(products, 'filters.filter')])

  const selectItem = useCallback((slug) => {
    const selections = selectedItems.includes(slug)
      ? selectedItems.filter(item => item !== slug)
      : [...selectedItems, slug]
    handleSearch(selections)
    setSelected(selections)
  }, [selectedItems, setSelected, handleSearch])

  const selectAll = useCallback(() => {
    const selections = get(props, 'route.params.values', []).map(({ slug }) => slug)
    setSelected(selections)
    handleSearch(selections)
  }, [setSelected, get(props, 'route.params.values'), handleSearch])


  const renderItem = useCallback(({ item }) => {
    return (<Attribute {...item} selectItem={selectItem} isActive={selectedItems.includes(item.slug)}/>)
  }, [selectItem, selectedItems])

  const clear = useCallback(() => {
    setSelected([])
    handleSearch([])
  }, [setSelected, handleSearch])

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (<Clear clear={clear}/>),
    })
  }, [props.navigation, clear])

  return (
    <AttributesView
      data={get(props, 'route.params.values')}
      renderItem={renderItem}
      selectAll={selectAll}
      selectedItems={selectedItems}
    />
  )
}
