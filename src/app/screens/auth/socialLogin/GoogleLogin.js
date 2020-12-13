import { GoogleSignin } from '@react-native-community/google-signin'
import { Image } from 'react-native'
import { useQuery } from '@cranium/resource'
import { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import Button from 'common/widgets/button'
import SOCIAL from './social-login.graphql'
import styles from './social.styles'

GoogleSignin.configure({
  webClientId: '564360241228-0d9p4v527320d9f1kd1886a8k5qgt6oc.apps.googleusercontent.com',
})

const source = { uri: 'google' }

export default function GoogleLogin() {
  const navigation = useNavigation()
  const { request } = useQuery(SOCIAL, { namespace: 'session', parseValue: 'data.oauthTokenCreate' })
  const login = useCallback((variables) => {
    GoogleSignin.hasPlayServices()
      .then(() => GoogleSignin.signIn())
      .then(({ idToken }) => request({ accessToken: idToken, backend: 'GOOGLE_OAUTH2' }))
      .then(data => {
        if(data && data.token) {
          return navigation.goBack()
        }
        return data
      })
  }, [request, navigation.goBack])

  return (
    <Button
      onPress={login}
      style={styles.google}
    >
      <Image source={source} style={styles.googleIcon} resizeMode="contain"/>
    </Button>
  )
}
