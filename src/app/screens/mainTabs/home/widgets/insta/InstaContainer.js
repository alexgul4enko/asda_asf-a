import getFeeds from './utils/getFeeds'
import { useEffect, useState } from 'react'
import InstaView from './InstaView'
export default function InstaContainer() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getFeeds()
      .then(data => setData(data || []))
      .finally(_ => setLoading(false))
  }, [])
  return (
    <InstaView
      data={data}
      isLoading={loading}
    />
  )
}
