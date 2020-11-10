import { useSetFilters } from '@cranium/resource'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import get from 'lodash/get'

export default function markAsViewed(id) {
  const setFilter = useSetFilters('recent')
  const filters = useSelector(state => get(state, 'recent.filters.ids'))
  useEffect(() => {
    const products = [id, ...(filters || []).filter(item => item !== id)].slice(0, 16)
    return () => setFilter({ ids: products })
  }, [])
}
