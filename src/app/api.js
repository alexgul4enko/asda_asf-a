import Config from 'react-native-config'
import { API } from '@cranium/api'
import { QueryParams } from '@cranium/queryparams'
import has from 'lodash/get'

export const QS = new QueryParams()

function hasFile(obj) {
  return has(obj, '1.uri')
}
function prepareBody(body, isMultipartFormData) {
  if(isMultipartFormData) {
    return converToFormData(new FormData(), body)
  }
  return JSON.stringify(body)
}

function converToFormData(formData, value) {
  Object.entries(value).forEach(([key, value]) => {
    formData.append(key, value)
  })
  return formData
}


const api = new API({
  baseURL: Config.API_URL,
  queryFuntion: QS.buildQueryParams,
  isMultipartFormData: hasFile,
  prepareBody,
})

export default api
