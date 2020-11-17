import PropTypes from 'prop-types'
import { Text } from 'react-native'
import Button from 'common/widgets/button'
import Animated, { Easing } from 'react-native-reanimated'
import { useCallback, useMemo, useEffect } from 'react'
import interpolateColors from 'common/utils/interpolateColors'
import styles from './category.styles'
import get from 'lodash/get'
import theme from 'theme'

Category.propTypes = {
  name: PropTypes.node,
  slug: PropTypes.string,
  id: PropTypes.string,
  selectItem: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  translation: PropTypes.object,
}

Category.defaultProps = {
  name: undefined,
  slug: undefined,
  id: undefined,
  isActive: undefined,
  translation: undefined,
}

export default function Category({ name, slug, id, selectItem, isActive, translation }) {
  const animatedValue = useMemo(() => new Animated.Value(isActive ? 1 : 0), [])
  const style = useMemo(() => ([
    styles.item,
    {
      backgroundColor: interpolateColors(
        animatedValue,
        [0, 1],
        ['#ffffff', theme.primaryLight],
      ),
    },
  ]), [animatedValue])
  useEffect(() => {
    Animated.timing(animatedValue, {
      duration: 200,
      toValue: isActive ? 1 : 0,
      easing: Easing.inOut(Easing.ease),
    }).start()
  }, [isActive])


  const handlePress = useCallback(() => selectItem(id), [id, selectItem])
  return (
    <Animated.View style={style}>
      <Button onPress={handlePress} style={styles.button}>
        <Text style={styles.text}>{get(translation, 'name') || name}</Text>
      </Button>
    </Animated.View>
  )
}
