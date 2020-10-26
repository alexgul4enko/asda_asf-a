import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import get from 'lodash/get'
import omit from 'lodash/omit'

export default function useGender({ request, filters, data }) {
  const gender = useSelector(state => get(state, 'gender.data'))
  useEffect(() => {
    if(!data) { return }
    return request(omit(filters, 'cursor'), { reducer: 'replace' }).cancel
  }, [gender])
}
