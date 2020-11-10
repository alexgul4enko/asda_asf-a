import { useState, useCallback } from 'react'
import { View, Text } from 'react-native'
import { CheckAccess } from '@cranium/access'
import Link from 'common/widgets/link'
import Button from 'common/widgets/button'
import Icon from 'common/widgets/Icon'
import { access } from 'common/session'
import styles from './meet-us.styles'


export default function MeetUs() {
  const [hide, setHide] = useState(false)
  const handlePress = useCallback(() => {
    setHide(true)
  }, [setHide])
  return (
    <CheckAccess level={access.F_UNAUTHORISED}>
      {
        !hide ? (
          <View style={styles.root}>
            <Text style={styles.title}>{gettext('LET`S GET PERSONAL')}</Text>
            <Text style={styles.desc}>{gettext('Sign in for a tailored shopping experience')}</Text>
            <View style={styles.btnClose}>
              <Button style={styles.close} onPress={handlePress}>
                <Icon name="close-01" size={20}/>
              </Button>
            </View>
            <View style={styles.row}>
              <Link to="Register" outline style={styles.btn}>
                <Text>{gettext('Register')}</Text>
              </Link>
              <Link to="Login" primary style={styles.btn}>
                <Text style={styles.signIn}>{gettext('Sign in')}</Text>
              </Link>
            </View>
          </View>
        ) : null
      }
    </CheckAccess>
  )
}
