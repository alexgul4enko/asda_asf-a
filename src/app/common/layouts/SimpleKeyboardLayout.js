import { useMemo } from 'react'
import {
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  ViewPropTypes,
  Platform,
} from 'react-native'
import PropTypes from 'prop-types'

SimpleKeyboardLayout.propTypes = {
  keyboardShouldPersistTaps: PropTypes.oneOf(['never', 'always', 'handled']),
  children: PropTypes.node,
  style: ViewPropTypes.style,
}

SimpleKeyboardLayout.defaultProps = {
  keyboardShouldPersistTaps: 'handled',
  children: null,
  style: undefined,
}

export default function SimpleKeyboardLayout({
  children,
  style,
  keyboardShouldPersistTaps,
}) {
  const behavior = useMemo(() => Platform.OS === 'ios' ? 'padding' : undefined, [])
  const keyBoardStyle = useMemo(() => ([styles.main, style]), [style])
  return (
    <ScrollView
      scrollEnabled={false}
      contentContainerStyle={styles.main}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      style={styles.main}
    >
      <KeyboardAvoidingView behavior={behavior} style={keyBoardStyle}>
        {children}
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignSelf: 'stretch',
  },
})
