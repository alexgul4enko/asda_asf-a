import PropTypes from 'prop-types'
import { SafeAreaView, View, Image, Text } from 'react-native'
import Card from './widgets/card'
import styles from './gender.styles'

PushNotificationsView.propTypes = {
  women: PropTypes.func.isRequired,
  men: PropTypes.func.isRequired,
}

const source = {
  uri: 'logo',
}

export default function PushNotificationsView({ women, men }) {
  return (
    <SafeAreaView style={styles.page}>
      <Image
        source={source}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.title}>{gettext('A space for innovators where art, fashion and creativity take place')}</Text>
      <View style={styles.cards}>
        <Card
          title={gettext('MEN')}
          image="men"
          onPress={men}
        />
        <Card
          title={gettext('WOMEN')}
          image="women"
          onPress={women}
        />
      </View>
    </SafeAreaView>
  )
}
