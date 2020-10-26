import Animated, { Easing } from 'react-native-reanimated'
import { useMemo, useCallback, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import get from 'lodash/get'
import Search from './Search'


export default function SearchContainer(props) {
  const inputRef = useRef()
  const gender = useSelector(state => get(state, 'gender.data'))
  useEffect(() => {
    if(inputRef.current) {
      handleClose()
    }
  }, [gender])
  const animatedValue = useMemo(() => new Animated.Value(0), [])
  const animatedStyle = useMemo(() => ({
    width: Animated.interpolate(animatedValue, {
      inputRange: [0, 1],
      outputRange: [0, 42],
      extrapolate: Animated.Extrapolate.CLAMP,
    }),
    overflow: 'hidden',
  }), [animatedValue])

  const handleBlur = useCallback(() => {
    Animated.timing(animatedValue, {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    }).start()
  }, [animatedValue])

  const handleFocus = useCallback(() => {
    Animated.timing(animatedValue, {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
    }).start()
  }, [animatedValue])

  const handleClose = useCallback(() => {
    inputRef.current.blur()
    inputRef.current.clear()
    props.onSearch()
  }, [])

  return (
    <Search
      {...props}
      inputRef={inputRef}
      animatedStyle={animatedStyle}
      handleBlur={handleBlur}
      handleFocus={handleFocus}
      handleClose={handleClose}
    />
  )
}
