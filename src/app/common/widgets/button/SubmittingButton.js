import PropTypes from 'prop-types'
import { useMemo, useEffect } from 'react'
import Animated, { Easing } from 'react-native-reanimated'
import AnimatedLoadingWrapper from 'common/widgets/AnimatedLoadingWrapper'
import Button from './Button'
import styles from './button.styles'
import interpolateColors from 'common/utils/interpolateColors'
import theme from 'theme'

SubmittingButton.propTypes = {
  title: PropTypes.node,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node,
}

SubmittingButton.defaultProps = {
  title: undefined,
  children: undefined,
}

export default function SubmittingButton({ title, submitting, valid, onPress, children }) {
  const animatedValue = useMemo(() => new Animated.Value(valid ? 0 : 1), [])

  const viewStyles = useMemo(() => ([
    styles.animated,
    {

      backgroundColor: interpolateColors(
        animatedValue,
        [0, 1],
        [theme.primary, theme.grey],
      ),
    },
  ]), [animatedValue])
  const textStyles = useMemo(() => ([
    styles.title,
    styles.primaryTitle,
  ]), [])


  useEffect(() => {
    Animated.timing(animatedValue, {
      duration: 200,
      toValue: valid ? 0 : 1,
      easing: Easing.inOut(Easing.ease),
    }).start()
  }, [valid])


  return (
    <Button
      primary
      disabled={!valid || submitting}
      onPress={onPress}
      style={styles.submit}
    >
      <Animated.View style={viewStyles}>
        <AnimatedLoadingWrapper isLoading={submitting}>
          {children || (<Animated.Text style={textStyles}>{title}</Animated.Text>)}
        </AnimatedLoadingWrapper>
      </Animated.View>
    </Button>
  )
}
