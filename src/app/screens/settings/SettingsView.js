import PropTypes from 'prop-types'
import { SafeAreaView, Text, View, ScrollView } from 'react-native'
import BoolInput from 'common/forms/inputs/boolInput'
import styles from './settings.styles'

SettingsView.propTypes = {
  push: PropTypes.bool,
  changePushNotifications: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

SettingsView.defaultProps = {
  push: false,
}

export default function SettingsView({ push, changePushNotifications, children }) {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.form}>
        <ScrollView
          contentContainerStyle={styles.root}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          style={styles.root}
          scrollEnabled={false}
        >
          <Text style={styles.title}>{gettext('Push notifications')}</Text>
          <BoolInput
            text={gettext('push notifications promotions')}
            value={push}
            onChange={changePushNotifications}
          />
          <Text style={styles.subscribeTitle}>{gettext('Fear of missing out?')}</Text>
          <Text style={styles.desc}>{gettext('Be the first to know about the latest deals, style updates & more!')}</Text>
          {children}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
