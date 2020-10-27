import { useCallback, useMemo } from 'react'
import Animated, { Easing } from 'react-native-reanimated'
import { useSetData } from '@cranium/resource'
import { useSelector } from 'react-redux'
import Gender from './Gender'
import get from 'lodash/get'
import interpolateColors from 'common/utils/interpolateColors'
import theme from 'theme'
import styles from './gender.styles'

export default function GenderContainer() {
  const setGender = useSetData('gender')
  const gender = useSelector(state => get(state, 'gender.data'))

  const animatedValue = useMemo(() => new Animated.Value(gender === 'M' ? 1 : 0), [])
  const menStyle = useMemo(() => ([
    styles.tab,
    {
      backgroundColor: interpolateColors(
        animatedValue,
        [0, 1],
        [theme.primaryLight, '#ffffff'],
      ),
      borderColor: interpolateColors(
        animatedValue,
        [0, 1],
        [theme.primaryLight, theme.primary],
      ),
    },
  ]), [animatedValue])
  const womenStyle = useMemo(() => ([
    styles.tab,
    {
      backgroundColor: interpolateColors(
        animatedValue,
        [0, 1],
        ['#ffffff', theme.primaryLight],
      ),
      borderColor: interpolateColors(
        animatedValue,
        [0, 1],
        [theme.primary, theme.primaryLight],
      ),
    },
  ]), [animatedValue])

  const menText = useMemo(() => ({
    color: interpolateColors(
      animatedValue,
      [0, 1],
      [theme.grey, '#000000'],
    ),
  }), [animatedValue])
  const womenText = useMemo(() => ({
    color: interpolateColors(
      animatedValue,
      [0, 1],
      ['#000000', theme.grey],
    ),
  }), [animatedValue])
  const animate = useCallback((toValue) => {
    Animated.timing(animatedValue, {
      duration: 200,
      toValue,
      easing: Easing.inOut(Easing.ease),
    }).start()
  }, [animatedValue])
  const setMen = useCallback(() => {
    setGender('M')
    animate(1)
  }, [setGender, animate])
  const setWomen = useCallback(() => {
    setGender('F')
    animate(0)
  }, [setGender, animate])
  return (
    <Gender
      womenStyle={womenStyle}
      menStyle={menStyle}
      menText={menText}
      womenText={womenText}
      setMen={setMen}
      setWomen={setWomen}
    />
  )
}
