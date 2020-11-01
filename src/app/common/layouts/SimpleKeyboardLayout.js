import PropTypes from 'prop-types'
import { useMemo } from 'react'
import {
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  ViewPropTypes,
  Platform,
} from 'react-native'


SimpleKeyboardLayout.propTypes = {
  keyboardShouldPersistTaps: PropTypes.oneOf(['never', 'always', 'handled']),
  children: PropTypes.node,
  style: ViewPropTypes.style,
  keyboardVerticalOffset: PropTypes.number,
}

SimpleKeyboardLayout.defaultProps = {
  keyboardShouldPersistTaps: 'handled',
  children: null,
  style: undefined,
  keyboardVerticalOffset: undefined,
}

export default function SimpleKeyboardLayout({
  children,
  style,
  keyboardShouldPersistTaps,
  keyboardVerticalOffset,
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
      <KeyboardAvoidingView behavior={behavior} style={keyBoardStyle} keyboardVerticalOffset={keyboardVerticalOffset}>
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
