import Config from 'react-native-config'
import { API } from '@cranium/api'
import { QueryParams } from '@cranium/queryparams'

export const QS = new QueryParams()

const api = new API({
  baseURL: Config.API_URL,
  queryFuntion: QS.buildQueryParams,
})

export default api
