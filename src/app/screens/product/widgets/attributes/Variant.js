import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import Box from './Box'
import { useMemo, useState, useCallback } from 'react'
import omit from 'lodash/omit'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import styles from './attribute.styles'

Variant.propTypes = {
  name: PropTypes.string,
  values: PropTypes.array,
  id: PropTypes.string.isRequired,
  handreTypeSelection: PropTypes.func.isRequired,
  selection: PropTypes.object,
  variants: PropTypes.array,
  translation: PropTypes.object,
}

Variant.defaultProps = {
  name: undefined,
  values: undefined,
  selection: undefined,
  variants: undefined,
  translation: undefined,
}

export default function Variant({ name, values, id, handreTypeSelection, selection, variants, translation }) {
  const [selected, select] = useState((Array.isArray(values) && values.length === 1) ? values[0].id : undefined)

  const availableVariants = useMemo(() => {
    const evailable = new Set()
    if(!Array.isArray(values)) {
      return evailable
    }
    const selectedAttributes = Object.keys(omit(selection, id))
    if(isEmpty(selectedAttributes)) {
      return new Set(values.map(({ id }) => id))
    }

    variants.filter(({ quantityAvailable }) => quantityAvailable > 10)
      .filter(({ attributes }) => {
        return attributes.filter(({ attribute, values }) => {
          return !isEmpty(selectedAttributes) && selectedAttributes.includes(attribute.id) && values.findIndex(({ id }) => id === selection[attribute.id]) > -1
        }).length === selectedAttributes.length
      })
      .forEach(({ attributes }) => {
        attributes.forEach(({ values }) => { evailable.add(get(values, '[0].id')) })
      }, [])
    return evailable
  }, [selection, variants])


  const handleSelection = useCallback((box) => {
    if(values.length === 1) { return }
    handreTypeSelection(id, selected === box ? undefined : box)
    select(selected === box ? undefined : box)
  }, [selected, select, values, id, handreTypeSelection])

  const boxes = useMemo(() => {
    if(!Array.isArray(values)) { return null }
    return values.map((item) => (
      <Box
        {...item}
        key={item.id}
        isActive={selected === item.id}
        select={handleSelection}
        disabled={!availableVariants.has(item.id)}
      />
    ))
  }, [values, selected, handleSelection, availableVariants])

  return (
    <View style={styles.variant}>
      <View style={styles.variantTitleRow}>
        <Text style={styles.variantTitle}>{get(translation, 'name') || name}</Text>
        <Text style={styles.variantTitle}>:</Text>
      </View>
      <View style={styles.boxes}>
        {boxes}
      </View>
    </View>
  )
}
