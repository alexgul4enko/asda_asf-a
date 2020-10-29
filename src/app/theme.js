import { Platform, Dimensions, PixelRatio, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window')

function em(value) {
  return PixelRatio.getFontScale() * 16 * value
}


const variables = {
  padding: em(1.25),
  fontSize: em(1),
  fontSizeSmaller: em(0.75),
  fontSizeSmall: em(0.875),
  fontSizeTitle: em(1.25),
  primary: '#B0867D',
  secondary: '#00838f',
  error: '#ef0b3c',
  success: '#00c853',
  color: '#333333',
  white: '#fff',
  grey: '#8D8D8D',
  primaryLight: '#F8F0E6',
  borderColor: '#EDEDED',
  primaryColor: '#CA9A90',
  greyText: '#3C3C3C',
}

const headerStyles = StyleSheet.create({
  primary: {
    backgroundColor: variables.primary,
  },
  primaryTitle: {
    fontSize: variables.fontSizeTitle,
  },
})

const tabsStyles = StyleSheet.create({
  primary: {
    backgroundColor: variables.primary,
  },
})


export default {
  ...variables,
  width,
  height,
  isIos: Platform.OS === 'ios',
  primaryHeader: {
    headerStyle: headerStyles.primary,
    headerTitleStyle: headerStyles.primaryTitle,
    headerTintColor: variables.color,
  },
  barStyle: tabsStyles.primary,
}
