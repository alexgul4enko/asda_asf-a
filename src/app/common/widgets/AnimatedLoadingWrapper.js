import PropTypes from 'prop-types'
import { Component, Fragment } from 'react'
import Animated, { Easing } from 'react-native-reanimated'
import { ActivityIndicator, StyleSheet, Text } from 'react-native'
import theme from 'theme'

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  style: Text.propTypes.style,
  children: PropTypes.node,
  loadingColor: PropTypes.string,
}

const defaultProps = {
  style: undefined,
  children: undefined,
  loadingColor: undefined,
}


export default class AnimatedLoadingWrapper extends Component {
  constructor(props) {
    super(props)
    this.animatedValue = new Animated.Value(Number(props.isLoading))
    this.childrenStyles = {
      transform: [
        {
          scale: Animated.interpolate(this.animatedValue, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Animated.Extrapolate.CLAMP,
          }),
        },
      ],
      opacity: Animated.interpolate(this.animatedValue, {
        inputRange: [0, 1],
        outputRange: [1, 0],
        extrapolate: Animated.Extrapolate.CLAMP,
      }),
      overflow: 'hidden',
    }
    this.loadingStyles = {
      transform: [
        {
          scale: Animated.interpolate(this.animatedValue, {
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: Animated.Extrapolate.CLAMP,
          }),
        },
      ],
      opacity: Animated.interpolate(this.animatedValue, {
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: Animated.Extrapolate.CLAMP,
      }),
      overflow: 'hidden',
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.isLoading !== prevProps.isLoading) {
      Animated.timing(this.animatedValue, {
        duration: 200,
        toValue: Number(this.props.isLoading),
        easing: Easing.inOut(Easing.ease),
      }).start()
    }
  }

  render() {
    if(typeof this.props.isLoading !== 'boolean') { return this.props.children }
    return (
      <Fragment>
        <Animated.View style={[this.props.style, this.childrenStyles]}>
          {this.props.children}
        </Animated.View>
        <Animated.View style={[styles.loading, this.loadingStyles]}>
          <ActivityIndicator color={this.props.loadingColor || theme.primary} />
        </Animated.View>
      </Fragment>
    )
  }
}

AnimatedLoadingWrapper.propTypes = propTypes
AnimatedLoadingWrapper.defaultProps = defaultProps

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
  },
})
