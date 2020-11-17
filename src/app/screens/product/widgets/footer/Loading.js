import PropTypes from 'prop-types'
import { View, TouchableWithoutFeedback, Text } from 'react-native'
import Button from 'common/widgets/button'
import Icon from 'common/widgets/Icon'
import Animated, { Easing } from 'react-native-reanimated'
import { useMemo, useEffect, Fragment } from 'react'
import styles from './footer.styles'

Loading.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default function Loading({ close, children }) {
  const loadingValue = useMemo(() => new Animated.Value(0), [])
  const rotateValue = useMemo(() => new Animated.Value(0), [])
  const bagValue = useMemo(() => new Animated.Value(0), [])
  const loadingStyles = useMemo(() => ([
    {
      width: 200,
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: Animated.interpolate(loadingValue, {
        inputRange: [0, 1, 2, 3],
        outputRange: [0, 1, 1, 0],
        extrapolate: Animated.Extrapolate.CLAMP,
      }),
      transform: [{
        scale: Animated.interpolate(loadingValue, {
          inputRange: [0, 1, 2, 3],
          outputRange: [0, 0.8, 1, 0],
          extrapolate: Animated.Extrapolate.CLAMP,
        }),
      }, {
        rotate: Animated.concat(rotateValue, 'deg'),
      }],
    },
  ]), [loadingValue, rotateValue])

  const bagStyles = useMemo(() => ([
    {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      transform: [{
        translateY: Animated.interpolate(bagValue, {
          inputRange: [0, 1],
          outputRange: [500, 0],
          extrapolate: Animated.Extrapolate.CLAMP,
        }),
      }],
    },
  ]), [bagValue])

  useEffect(() => {
    Animated.timing(rotateValue, {
      duration: 1000,
      toValue: 720,
      easing: Easing.inOut(Easing.ease),
    }).start()
    Animated.timing(loadingValue, {
      duration: 2000,
      toValue: 3,
      easing: Easing.inOut(Easing.ease),
    }).start(() => {
      Animated.timing(bagValue, {
        duration: 500,
        toValue: 1,
        easing: Easing.inOut(Easing.ease),
      }).start()
    })
  }, [])


  return (
    <Fragment>
      <Animated.View style={loadingStyles}>
        <Icon name="cart" size={60} color="#ffffff"/>
      </Animated.View>
      <TouchableWithoutFeedback onPress={() => true}>
        <Animated.View style={bagStyles}>
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <Text style={styles.title}>{gettext('Added to Bag')}</Text>
              <Text style={styles.title}>:</Text>
            </View>
            <Button onPress={close}><Icon name="close-01"/></Button>
          </View>
          {children}
        </Animated.View>
      </TouchableWithoutFeedback>
    </Fragment>
  )
}
