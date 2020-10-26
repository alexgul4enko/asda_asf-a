import Config from 'react-native-config'
import * as Sentry from '@sentry/react-native'
import API from './api'
import AsyncStorage from '@react-native-community/async-storage'
import { resourcesReducer } from '@cranium/resource'
import { cacheMiddleware, persistReducer } from '@cranium/cache'
import { promisableActionMiddleware, composeReducers, combineReducers } from '@cranium/redux-helpers'
import { createStore, applyMiddleware } from 'redux'
import { reducers } from 'store'
import authMiddleware from 'common/session/authMiddleware'
import { composeWithDevTools } from 'redux-devtools-extension'

const isSentryEnabled = Config.SENTRY_DSN && !__DEV__

if(isSentryEnabled) {
  Sentry.init({
    dsn: Config.SENTRY_DSN,
    environment: Config.SENTRY_ENVIRONMENT,
  })
}

const compose = composeWithDevTools({
  name: Config.APP_NAME,
})

export default createStore(
  composeReducers(
    {},
    combineReducers(reducers),
    persistReducer(JSON.parse(Config.CACHE_STATE_PERSIST_KEYS)),
    resourcesReducer,
  ),
  {},
  compose(
    applyMiddleware(
      authMiddleware,
      promisableActionMiddleware({ API }),
      cacheMiddleware({
        storeKey: Config.CACHE_STORAGE_KEY,
        cacheKeys: JSON.parse(Config.CACHE_STATE_KEYS),
        storage: AsyncStorage,
      })
    )
  )
)
