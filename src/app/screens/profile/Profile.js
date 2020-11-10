import ProfileContainer from './ProfileContainer'
import { LoadingWrapper } from 'common/widgets/loading'
import { SafeAreaView } from 'react-native'
import { usePrefetchQuery } from '@cranium/resource'
import USER from './user.graphql'
import styles from './profile.styles'


export default function DesignerContainer(props) {
  const me = usePrefetchQuery(USER, { parseValue: 'data.me' })()
  return (
    <SafeAreaView style={styles.root}>
      <LoadingWrapper isLoading={me.initialLoading}>
        <ProfileContainer
          initialValues={me.data}
          {...me}
          {...props}
        />
      </LoadingWrapper>
    </SafeAreaView>
  )
}
