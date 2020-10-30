import { SafeAreaView, Text, Linking } from 'react-native'
import { CheckAccess } from '@cranium/access'
import Link from 'common/widgets/link'
import Button from 'common/widgets/button'
import { access } from 'common/session'
import { useClear } from '@cranium/resource'

// TODO: add site url to env file
export default function ProfileView() {
  const clear = useClear('session')
  return (
    <SafeAreaView>
      <CheckAccess level={access.F_UNAUTHORISED}>
        <Link to="Login">
          <Text>{gettext('login')}</Text>
        </Link>
      </CheckAccess>
      <Button
        title="Privaticy policy"
        onPress={() => Linking.openURL('https://wecre8.inprogress.rocks/')}
      />
      <CheckAccess level={access.F_PROTECTED}>
        <Button
          title="Logout"
          primary
          onPress={clear}
        />
      </CheckAccess>
    </SafeAreaView>

  )
}
