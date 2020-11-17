import PropTypes from 'prop-types'
import { Text } from 'react-native'
import Button from 'common/widgets/button'
import Animated, { Easing } from 'react-native-reanimated'
import Avatar from 'common/widgets/avatar'
import { useCallback, useMemo, useEffect } from 'react'
import get from 'lodash/get'
import interpolateColors from 'common/utils/interpolateColors'
import styles from './attribute.styles'
import theme from 'theme'

Attribute.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
  }),
  name: PropTypes.node,
  slug: PropTypes.string,
  id: PropTypes.string,
  selectItem: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  translation: PropTypes.object,
}

Attribute.defaultProps = {
  image: undefined,
  name: undefined,
  slug: undefined,
  id: undefined,
  isActive: undefined,
  translation: undefined,
}

export default function Attribute({ image, name, slug, id, selectItem, isActive, translation }) {
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


  const handlePress = useCallback(() => selectItem(slug), [slug, selectItem])
  return (
    <Animated.View style={style}>
      <Button onPress={handlePress} style={styles.button}>
        {
          get(image, 'url') ? (
            <Avatar
              url={get(image, 'url')}
              noImage="noimage"
              style={styles.image}
              resizeMode="cover"
              size={20}
            />
          ) : null

        }
        <Text style={styles.text}>{get(translation, 'name') || name}</Text>
      </Button>
    </Animated.View>
  )
}
