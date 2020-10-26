import { SafeAreaView, Text, Linking } from 'react-native'
import Config from 'react-native-config'
import { CheckAccess } from '@cranium/access'
import Link from 'common/widgets/link'
import Button from 'common/widgets/button'
import { access } from 'common/session'

// TODO: add site url to env file
export default function ProfileView() {
  return (
    <SafeAreaView>
      <CheckAccess level={access.F_UNAUTHORISED}>
        <Link to="Login">
          <Text>{gettext('login')}</Text>
        </Link>
      </CheckAccess>
      {/* !token ? (
        ) : null
      */}
      <Button
        title="Privaticy policy"
        onPress={() => Linking.openURL('https://wecre8.inprogress.rocks/')}
      />
      <CheckAccess level={access.F_PROTECTED}>
        <Button
          title="Logout"
          primary
          onPress={() => {}}
        />
      </CheckAccess>
    </SafeAreaView>

  )
}
