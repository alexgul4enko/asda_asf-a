import { View, Text } from 'react-native'
import { useMemo } from 'react'
import get from 'lodash/get'
import styles from './variants.styles'

export default function Variants({ data }) {
  return useMemo(() => {
    if(!Array.isArray(data)) {
      return null
    }
    return data.map(({ values, attribute }, index) => (
      <View style={[styles.row, !(index % 2) && styles.odd]} key={attribute.id}>
        <View style={styles.col}>
          <Text style={styles.title}>{get(attribute, 'translation.name') || attribute.name}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.desc}>{get(values, '[0]translation.name') || get(values, '[0].name')}</Text>
        </View>
      </View>
    ))
  }, [data])
}
