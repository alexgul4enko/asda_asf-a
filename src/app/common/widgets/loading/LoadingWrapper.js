import { SafeAreaView, ActivityIndicator } from 'react-native'
import styles from './loading.styles.js'
import theme from 'theme'

export default function LoadingWrapper({ isLoading, children }) {
  if(isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={theme.primary}/>
      </SafeAreaView>
    )
  }
  return children
}
