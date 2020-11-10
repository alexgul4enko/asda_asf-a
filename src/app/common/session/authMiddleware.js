import api from 'api'
import get from 'lodash/get'
import { reset } from '@cranium/cache'

export default function authMiddleware(store) {
  api.interceptors.response.use({
    onError: function({ data, response }) {
      if(get(response, 'status') === 401) {
        store.dispatch(reset())
        throw new Error(response.statusText)
      }
      return { data, response }
    },
  })
  api.interceptors.request.use({
    onSuccess: (consfigs) => {
      const headers = new Headers(consfigs.headers)
      headers.set('X-Gender', get(store.getState(), 'gender.data'))
      headers.set('Authorization', `JWT ${get(store.getState(), 'session.data.token', '')}`)
      if(typeof consfigs.body !== 'string') {
        headers.set('content-type', 'multipart/form-data;')
      }
      return {
        ...consfigs,
        headers,
      }
    },
  })
  return (next) => action => {
    return next(action)
  }
}
