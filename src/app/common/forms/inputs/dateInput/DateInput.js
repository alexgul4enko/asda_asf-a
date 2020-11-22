import PropTypes from 'prop-types'
import Button from 'common/widgets/button'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Text, Platform, Modal, View, TouchableWithoutFeedback } from 'react-native'
import { useState, useCallback, Fragment, useMemo } from 'react'
import moment from 'moment'
import styles from './date-input.styles'

DateInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

DateInput.defaultProps = {
  value: undefined,
}

export default function DateInput({ value, onChange }) {
  const [show, setShow] = useState(false)
  const [tempValue, setTempValue] = useState()

  const open = useCallback(() => {
    setTempValue(value)
    setShow(true)
  }, [setShow, setTempValue, value])

  const close = useCallback(() => setShow(false), [setShow])

  const saveChanges = useCallback(() => {
    setShow(false)
    onChange(tempValue)
  }, [setShow, tempValue, onChange])

  const handleChange = useCallback((e, selectedDate) => {
    if(Platform.OS === 'ios') {
      return setTempValue(moment(new Date(selectedDate)).format('YYYY-MM-DD'))
    }
    if(!selectedDate) {
      return setShow(false)
    }
    setShow(false)
    setTempValue(moment(new Date(selectedDate)).format('YYYY-MM-DD'))
    onChange(moment(new Date(selectedDate)).format('YYYY-MM-DD'))
  }, [onChange, setTempValue, setShow])

  const val = useMemo(() => {
    const v = Platform.OS === 'ios' ? tempValue : value
    return v ? moment(v, 'YYYY-MM-DD').toDate() : new Date()
  }, [tempValue, value])


  if(Platform.OS === 'ios') {
    return (
      <Fragment>
        <Button onPress={open} style={styles.button}>
          <Text style={styles.text}>{value}</Text>
        </Button>
        <Modal
          visible={show}
          transparent
          animationType="slide"
        >
          <View style={styles.modal}>
            <TouchableWithoutFeedback onPress={close}>
              <View style={styles.overlay}>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.form}>
              <Text style={styles.title}>{gettext('Date of birth')}</Text>
              <DateTimePicker
                testID="dateTimePicker"
                value={val}
                mode="date"
                display="default"
                onChange={handleChange}
              />
              <Button onPress={saveChanges} style={styles.dataButton} title={gettext('Save')} primary/>
            </View>
          </View>
        </Modal>
      </Fragment>
    )
  }
  return (
    <Fragment>
      <Button onPress={open} style={styles.button}>
        <Text style={styles.text}>{value}</Text>
      </Button>
      {show ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={val}
          mode="date"
          display="default"
          onChange={handleChange}
        />
      ) : null}
    </Fragment>
  )
}
