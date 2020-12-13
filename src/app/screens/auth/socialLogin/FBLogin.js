import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { Image } from 'react-native'
import { useQuery } from '@cranium/resource'
import { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import Button from 'common/widgets/button'
import SOCIAL from './social-login.graphql'
import styles from './social.styles'

const source = { uri: 'facebook' }
export default function FBLogin() {
  const navigation = useNavigation()
  const { request } = useQuery(SOCIAL, { namespace: 'session', parseValue: 'data.oauthTokenCreate' })
  const login = useCallback((variables) => {
    LoginManager.logInWithPermissions(['public_profile'])
      .then(result => {
        if(result.isCancelled) {
          return
        }
        AccessToken.getCurrentAccessToken()
          .then((data) => request({ accessToken: data.accessToken.toString(), backend: 'FACEBOOK' }))
          .then(data => {
            if(data && data.token) {
              return navigation.goBack()
            }
            return data
          })
      })
  }, [request, navigation.goBack])

  return (
    <Button
      onPress={login}
      style={styles.fb}
    >
      <Image source={source} style={styles.fbIcon} resizeMode="contain"/>
    </Button>
  )
}
