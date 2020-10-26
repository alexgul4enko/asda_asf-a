import { Component } from 'react'
import PropTypes from 'prop-types'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import { Text } from 'react-native'
import Animated from 'react-native-reanimated'
import icoMoonConfig from 'assets/selection.json'

const propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  allowFontScaling: PropTypes.bool,
  isRTL: PropTypes.bool,
  style: Text.propTypes.style,
}

const defaultProps = {
  size: 30,
  color: '#000',
  allowFontScaling: true,
  style: {},
  isRTL: false,
}

const Icon_ = createIconSetFromIcoMoon(icoMoonConfig)

export default class Icon extends Component {
  render() {
    const { name, style, size, color, allowFontScaling } = this.props
    return (
      <Icon_
        name={name}
        size={size}
        color={color}
        style={style}
        allowFontScaling={allowFontScaling}
        accessible={false}
        focusable={false}
      />
    )
  }
}

Icon.propTypes = propTypes
Icon.defaultProps = defaultProps

const AnimatedIcon = Animated.createAnimatedComponent(Icon)

export { AnimatedIcon }
