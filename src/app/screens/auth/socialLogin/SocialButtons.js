import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import FBLogin from './FBLogin'
import GoogleLogin from './GoogleLogin'
import styles from './social.styles'

SocialButtons.propTypes = {
  title: PropTypes.node,
}

SocialButtons.defaultProps = {
  title: undefined,
}

export default function SocialButtons({ title }) {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.divider}/>
        <Text style={styles.desc}>{title}</Text>
        <View style={styles.divider}/>
      </View>
      <View style={styles.row}>
        <View style={styles.btnWrapper}>
          <FBLogin/>
        </View>
        <View style={styles.btnWrapper}>
          <GoogleLogin/>
        </View>
      </View>
    </View>
  )
}
