import PropTypes from 'prop-types'
import { View, Text, I18nManager } from 'react-native'
import Button from 'common/widgets/button'
import Icon from 'common/widgets/Icon'
import Animated, { Easing } from 'react-native-reanimated'
import { useMemo, useCallback, useState } from 'react'
import styles from './collapse.styles'

const { concat } = Animated

Collapse.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  style: PropTypes.any,
  titleStyle: PropTypes.any,
}

Collapse.defaultProps = {
  title: undefined,
  children: undefined,
  style: undefined,
  titleStyle: undefined,
}


export default function Collapse({ title, children, style, titleStyle }) {
  const collapseValue = useMemo(() => new Animated.Value(0), [])
  const rotateValue = useMemo(() => new Animated.Value(270), [])
  const [expanded, expand] = useState(true)
  const [height, setHeight] = useState(undefined)
  const handlePress = useCallback(() => {
    Animated.timing(collapseValue, {
      duration: 300,
      toValue: expanded ? 0 : height,
      easing: Easing.inOut(Easing.ease),
    }).start()

    Animated.timing(rotateValue, {
      duration: 300,
      toValue: expanded ? 90 : 270,
      easing: Easing.inOut(Easing.ease),
    }).start()
    expand(!expanded)
  }, [expanded, expand, height, rotateValue, collapseValue, height])

  const handleHeight = useCallback((e) => {
    collapseValue.setValue(e.nativeEvent.layout.height)
    setHeight(e.nativeEvent.layout.height)
  }, [setHeight])

  const iconStyle = useMemo(() => ({
    transform: [{ rotate: concat(rotateValue, 'deg') }],
  }), [rotateValue])

  return (
    <View style={style}>
      <Button onPress={handlePress} style={styles.header}>
        <Text style={[title, titleStyle]}>{title}</Text>
        <Animated.View style={iconStyle}>
          <Icon name={I18nManager.isRTL ? 'chevron-left-01' : 'chevron-right-01'} size={20}/>
        </Animated.View>
      </Button>
      <Animated.View style={{ height: collapseValue, overflow: 'hidden' }}>
        <View style={styles.content} onLayout={handleHeight}>
          {children}
        </View>
      </Animated.View>
    </View>
  )
}
