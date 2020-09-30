import { SafeAreaView, Text, Linking } from 'react-native'
import Config from 'react-native-config'
import Link from 'common/widgets/link'
import Button from 'common/widgets/button'
import { useCache } from 'common/cache'

// TODO: add site url to env file
export default function ProfileView() {
  const { token, setToken } = useCache()

  return (
    <SafeAreaView>
      {!token ? (
        <Link to="Login">
          <Text>{gettext('login')}</Text>
        </Link>) : null
      }
      <Button
        title="Privaticy policy"
        onPress={() => Linking.openURL('https://wecre8.inprogress.rocks/')}
      />
      {token ? (
        <Button
          title="Logout"
          primary
          onPress={() => setToken('')}
        />) : null
      }
    </SafeAreaView>

  )
}
