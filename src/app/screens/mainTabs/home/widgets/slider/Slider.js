import PropTypes from 'prop-types'
import { FlatList, View } from 'react-native'
import { useState, useCallback } from 'react'
import keyExtractor from './utils/keyExtractor'
import renderItem from './utils/renderItem'
import Indicators from './widgets/indicators'
import theme from 'theme'

Slider.propTypes = {
  slides: PropTypes.array,
}

Slider.defaultProps = {
  slides: undefined,
}

export default function Slider({ slides }) {
  const [active, setActive] = useState(0)
  const handleScroll = useCallback((e) => {
    setActive(Math.round(e.nativeEvent.contentOffset.x / theme.width))
  }, [])
  if(!slides) { return null }
  return (
    <View>
      <FlatList
        data={slides}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      />
      <Indicators count={slides.length} active={active}/>
    </View>
  )
}
