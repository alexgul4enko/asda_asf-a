import PropTypes from 'prop-types'
import { View, TextInput, ViewPropTypes } from 'react-native'
import Animated from 'react-native-reanimated'
import Button from '../button'
import Icon from '../Icon'
import styles from './search.styles'
import theme from 'theme'

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  animatedStyle: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
}

Search.defaultProps = {
  style: undefined,
}

export default function Search({
  onSearch,
  style,
  animatedStyle,
  handleBlur,
  handleFocus,
  handleClose,
  inputRef,
  placeholder,
}) {
  return (
    <View style={[styles.search, style]}>
      <View style={styles.wrapper}>
        <Icon name="search-01" color={theme.grey} size={24}/>
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          onChangeText={onSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          selectTextOnFocus={false}
        />
      </View>
      <Animated.View style={animatedStyle}>
        <Button style={styles.close} onPress={handleClose}>
          <Icon name="close-01" />
        </Button>
      </Animated.View>
    </View>
  )
}
