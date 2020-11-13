import PropTypes from 'prop-types'
import { View, Text, TextInput } from 'react-native'
import Button from 'common/widgets/button'
import { useState, useCallback, useRef } from 'react'
import styles from './promo.styles'

Promo.propTypes = {
  applyPromoCode: PropTypes.func,
}

Promo.defaultProps = {
  applyPromoCode: undefined,
}

export default function Promo({ applyPromoCode }) {
  const ref = useRef()
  const [val, setVal] = useState('')
  const handlePress = useCallback(() => {
    applyPromoCode(val)
    ref.current.clear()
  }, [val, applyPromoCode])
  return (
    <View style={styles.promo}>
      <Text style={styles.promoText}>{gettext('Apply a promo code')}</Text>
      <View style={styles.row}>
        <View style={styles.inputWrapper}>
          <TextInput
            ref={ref}
            onChangeText={setVal}
            style={styles.input}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <Button
          disabled={!val}
          primary
          title={gettext('Apply')}
          style={styles.btn}
          textStyle={styles.btnTextStyle}
          onPress={handlePress}
        />
      </View>
    </View>
  )
}
