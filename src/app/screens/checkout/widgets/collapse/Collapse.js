import PropTypes from 'prop-types'
import { View } from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'
import { useMemo, useCallback, useState, useEffect } from 'react'
import styles from './collapse.styles'

Collapse.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
}

Collapse.defaultProps = {
  children: undefined,
  isOpen: false,
}

export default function Collapse({ children, isOpen }) {
  const collapseValue = useMemo(() => new Animated.Value(0), [])
  const [height, setHeight] = useState(undefined)
  useEffect(() => {
    if(!height) { return }
    Animated.timing(collapseValue, {
      duration: 300,
      toValue: isOpen ? 0 : height,
      easing: Easing.inOut(Easing.ease),
    }).start()
  }, [isOpen])


  const handleHeight = useCallback((e) => {
    !isOpen && collapseValue.setValue(e.nativeEvent.layout.height)
    setHeight(e.nativeEvent.layout.height)
  }, [setHeight, isOpen])


  return (
    <Animated.View style={[{ height: 0 }, { height: collapseValue, overflow: 'hidden' }]}>
      <View style={styles.content} onLayout={handleHeight}>
        {children}
      </View>
    </Animated.View>
  )
}
