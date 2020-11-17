import PropTypes from 'prop-types'
import Animated, { Easing } from 'react-native-reanimated'
import CacheImage from 'common/widgets/CacheImage'
import Button from 'common/widgets/button'
import { useMemo, useCallback, useEffect } from 'react'
import get from 'lodash/get'
import interpolateColors from 'common/utils/interpolateColors'
import styles from './attribute.styles'
import theme from 'theme'

Variant.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
  }),
  id: PropTypes.string.isRequired,
  name: PropTypes.node,
  isActive: PropTypes.bool.isRequired,
  select: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  translation: PropTypes.object,
}

Variant.defaultProps = {
  image: undefined,
  name: undefined,
  translation: undefined,
}

export default function Variant({ image, id, name, isActive, select, disabled, translation }) {
  const animatedValue = useMemo(() => new Animated.Value(isActive ? 1 : 0), [])
  const animatedStyle = useMemo(() => {
    if(!get(image, 'url')) {
      return [
        styles.box,
        {
          backgroundColor: interpolateColors(
            animatedValue,
            [-1, 0, 1],
            [theme.borderColor, '#ffffff', theme.primary],
          ),
          borderColor: interpolateColors(
            animatedValue,
            [-1, 0, 1],
            [theme.borderColor, theme.borderColor, theme.primary],
          ),
        },
      ]
    }
    return [
      styles.box,
      {
        backgroundColor: interpolateColors(
          animatedValue,
          [-1, 0, 1],
          [theme.greyText, '#ffffff', '#ffffff'],
        ),
        opacity: Animated.interpolate(animatedValue, {
          inputRange: [-1, 0, 1],
          outputRange: [0.5, 1, 1],
          extrapolate: Animated.Extrapolate.CLAMP,
        }),
        borderWidth: Animated.interpolate(animatedValue, {
          inputRange: [0, 1],
          outputRange: [1, 2],
          extrapolate: Animated.Extrapolate.CLAMP,
        }),
        borderColor: interpolateColors(
          animatedValue,
          [0, 1],
          [theme.borderColor, '#000000'],
        ),
      },
    ]
  }, [animatedValue, image])

  const textStyles = useMemo(() => {
    return [
      styles.variantName,
      {
        color: interpolateColors(
          animatedValue,
          [-1, 0, 1],
          [theme.greyText, '#000000', '#ffffff'],
        ),
      },
    ]
  }, [animatedValue])

  useEffect(() => {
    Animated.timing(animatedValue, {
      duration: 200,
      toValue: disabled ? -1 : isActive ? 1 : 0,
      easing: Easing.inOut(Easing.ease),
    }).start()
  }, [isActive, disabled])

  const source = useMemo(() => ({ uri: get(image, 'url') }), [image])
  const handlePress = useCallback(() => select(id), [id, select])
  return (
    <Animated.View style={animatedStyle}>
      <Button onPress={handlePress} style={styles.button} disabled={disabled}>
        {
          get(image, 'url') ? (
            <CacheImage
              source={source}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <Animated.Text style={textStyles}>{get(translation, 'name') || name}</Animated.Text>
          )
        }
      </Button>
    </Animated.View>
  )
}
