import { useMemo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import theme from 'theme'

BaseFieldLayout.propTypes = {
  label: PropTypes.node,
  required: PropTypes.bool,
  inputComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.func,
  ]).isRequired,
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
}

BaseFieldLayout.defaultProps = {
  label: undefined,
  required: false,
}

export default function BaseFieldLayout({
  label,
  required,
  inputComponent: InputComponent,
  meta,
  input,
  ...rest
}) {
  const error = useMemo(() => {
    if(meta.submitError && !meta.dirtySinceLastSubmit) {
      return meta.submitError
    }
    if(meta.error && meta.touched) {
      return meta.error
    }
  }, [meta.error, meta.touched, meta.dirtySinceLastSubmit, meta.submitError])


  const Label = useMemo(() => !!label && <Text style={styles.desc}>{label}{required ? '*' : ''}</Text>, [label, required])
  return (
    <View style={styles.view}>
      {Label}
      <InputComponent {...rest} {...input} required={required} />
      <Text style={styles.error}>{error}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'column',
    marginBottom: 8,
  },
  desc: {
    fontWeight: '600',
    lineHeight: 16,
    fontSize: 12,
    marginBottom: 6,
    textAlign: 'left',
  },
  error: {
    color: theme.error,
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'left',
  },
})
