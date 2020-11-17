import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import Variant from './Variant'
import CountInput from 'common/widgets/countInput'
import { useMemo, useCallback, useState, useEffect } from 'react'
import getVariants from './utils/getVariants'
import get from 'lodash/get'
import omit from 'lodash/omit'
import isEmpty from 'lodash/isEmpty'
import styles from './attribute.styles'

Attributes.propTypes = {
  isAvailable: PropTypes.bool.isRequired,
  variants: PropTypes.array,
  selectVariant: PropTypes.func.isRequired,
  count: PropTypes.node.isRequired,
  setCount: PropTypes.func.isRequired,
}

Attributes.defaultProps = {
  variants: undefined,
}

export default function Attributes({ isAvailable, variants, selectVariant, count, setCount }) {
  const [selection, setSelection] = useState({})

  const handreTypeSelection = useCallback((key, value) => {
    const newSelection = value ? { ...selection, [key]: value } : omit(selection, key)
    setSelection(newSelection)
    if(isEmpty(newSelection)) {
      return selectVariant({})
    }

    const attributesToSearch = Object.keys(newSelection)
    const variant = variants.filter(({ attributes }) => {
      return attributes.filter(({ attribute, values }) => {
        const attrId = attribute.id
        const attrValue = get(values, '[0].id')
        return attributesToSearch.includes(attrId) && newSelection[attribute.id] === attrValue
      }).length === attributesToSearch.length
    })
    if(variant.length === 1) {
      selectVariant(variant[0])
    } else {
      selectVariant({})
    }
  }, [selection, setSelection, variants])

  const totalQuantity = useMemo(() => {
    if(!Array.isArray(variants)) {
      return 0
    }
    return variants.reduce((co, { quantityAvailable }) => {
      return co + quantityAvailable || 0
    }, 0)
  }, [variants])
  const pureSelections = useMemo(() => getVariants(variants, totalQuantity), [variants, totalQuantity])

  useEffect(() => {
    if(!isEmpty(selection)) {
      return
    }
    const onlyOne = Object.values(pureSelections)
      .filter(({ values }) => {
        return values.length === 1
      })
      .reduce((acc, { id, values }) => {
        return {
          ...acc,
          [id]: values[0].id,
        }
      }, {})
    if(!isEmpty(onlyOne)) {
      setSelection(onlyOne)
    }
  }, [pureSelections])

  useEffect(() => {
    if(Array.isArray(variants) && variants.filter(({ quantityAvailable }) => Boolean(quantityAvailable)).length === 1) {
      selectVariant(variants.filter(({ quantityAvailable }) => Boolean(quantityAvailable))[0])
    }
  }, [variants])


  const content = useMemo(() => {
    return pureSelections.map((variant) => (
      <Variant
        key={variant.id}
        {...variant}
        handreTypeSelection={handreTypeSelection}
        selection={selection}
        variants={variants}
      />)
    )
  }, [pureSelections, handreTypeSelection, selection, variants])

  if(!totalQuantity) {
    return (
      <Text style={styles.outOfStock}>{gettext('out of stock')}</Text>
    )
  }
  return (
    <View>
      {content}
      <View style={styles.quantityRow}>
        <Text style={styles.quantity}>{gettext('Quantity')}</Text>
        <Text style={styles.quantity}>:</Text>
        <Text style={styles.quantity}>   </Text>
        <CountInput count={count} setCount={setCount}/>
      </View>
    </View>
  )
}
