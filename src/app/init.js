import Config from 'react-native-config'
import * as Sentry from '@sentry/react-native'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { memoryCache } from 'common/cache'
const isSentryEnabled = Config.SENTRY_DSN && !__DEV__

if(isSentryEnabled) {
  Sentry.init({
    dsn: Config.SENTRY_DSN,
    environment: Config.SENTRY_ENVIRONMENT,
  })
}


const httpLink = createHttpLink({
  uri: Config.API_URL + '/graphql/',
})


const authLink = setContext((_, { headers }) => {
  const data = memoryCache.getData()
  return {
    headers: {
      ...headers,
      'X-Gender': data.gender,
      Authorization: `JWT ${data.token || ''}`,
    },
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
