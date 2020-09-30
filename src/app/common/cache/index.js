import CacheProvider, { useCache } from './UserCacheContainer'
import memoryCache from './memoryCache'

export default CacheProvider

export {
  useCache,
  memoryCache,
}
