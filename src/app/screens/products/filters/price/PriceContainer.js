import NavigationPropTypes from 'common/prop-types/Navigation'
import PriceView from './PriceView'
import Clear from '../clear'
import { useCallback, useState, useLayoutEffect } from 'react'
import { useQuery } from '@cranium/resource'
import omit from 'lodash/omit'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import PRODUCTS from './products.graphql'

PriceContainer.propTypes = NavigationPropTypes

export default function PriceContainer({ navigation }) {
  const products = useQuery(PRODUCTS, { parseValue: 'data.products', destroyOnUnmount: false })
  const [minPrice, setMinPrice] = useState(get(products, 'filters.filter.price.gte'))
  const [maxPrice, setMaxPrice] = useState(get(products, 'filters.filter.price.lte'))
  const [error, setError] = useState()


  const fromPrice = useCallback((value) => {
    if(value && value.startsWith('.')) {
      return setMinPrice('')
    }
    const price = value ? parseInt(value, 10) : ''
    setMinPrice(price)
  }, [setMinPrice])
  const toPrice = useCallback((value) => {
    if(value && value.startsWith('.')) {
      return setMaxPrice('')
    }
    const price = value ? parseInt(value, 10) : ''
    setMaxPrice(price)
  }, [setMaxPrice])
  const handleBlur = useCallback(() => {
    if(minPrice && maxPrice && maxPrice < minPrice) {
      return setError(gettext('Please enter valid min max values'))
    } else {
      setError('')
    }
    const price = {}
    if(minPrice) {
      price.gte = minPrice
    }
    if(maxPrice) {
      price.lte = maxPrice
    }
    if(isEmpty(price)) {
      return products.request(omit(products.filters, 'filter.price'))
    }
    products.request({
      filter: {
        ...get(products, 'filters.filter', {}),
        price: price,
      },
    })
  }, [minPrice, maxPrice, setError])

  const clear = useCallback(() => {
    setMinPrice('')
    setMaxPrice('')
    setError('')
    products.request(omit(products.filters, 'filter.price'))
  }, [setMinPrice, setMaxPrice, setError])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (<Clear clear={clear}/>),
    })
  }, [navigation, clear])


  return (
    <PriceView
      error={error}
      minPrice={minPrice}
      maxPrice={maxPrice}
      fromPrice={fromPrice}
      toPrice={toPrice}
      handleBlur={handleBlur}
    />
  )
}
