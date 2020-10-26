import React from 'react'
import { Provider } from 'react-redux'
import { CheckCache } from '@cranium/cache'
import AppNavigator from './AppNavigator'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Translations from 'common/translations'
import AppPermissions from 'common/session'
import store from './init'


export default function App() {
  return (
    <Translations>
      <SafeAreaProvider>
        <Provider store={store}>
          <CheckCache>
            <AppPermissions>
              <AppNavigator/>
            </AppPermissions>
          </CheckCache>
        </Provider>
      </SafeAreaProvider>
    </Translations>
  )
}
