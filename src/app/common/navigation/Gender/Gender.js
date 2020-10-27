import PropTypes from 'prop-types'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import Button from 'common/widgets/button'
import styles from './gender.styles'

GenderView.propTypes = {
  womenStyle: PropTypes.array.isRequired,
  menStyle: PropTypes.array.isRequired,
  menText: PropTypes.object.isRequired,
  womenText: PropTypes.object.isRequired,
  setMen: PropTypes.func.isRequired,
  setWomen: PropTypes.func.isRequired,
}

export default function GenderView({ womenStyle, menStyle, menText, womenText, setMen, setWomen }) {
  return (
    <View style={styles.main}>
      <Button style={styles.btnMen} onPress={setMen}>
        <Animated.View style={menStyle}>
          <Animated.Text style={[styles.text, menText]}>{gettext('MEN')}</Animated.Text>
        </Animated.View>
      </Button>
      <Button style={styles.btnWomen} onPress={setWomen}>
        <Animated.View style={womenStyle}>
          <Animated.Text style={[styles.text, womenText]}>{gettext('WOMEN')}</Animated.Text>
        </Animated.View>
      </Button>
    </View>

  )
}
