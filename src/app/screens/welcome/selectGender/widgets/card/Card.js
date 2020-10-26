import PropTypes from 'prop-types'
import { View, Image, Text } from 'react-native'
import Button from 'common/widgets/button'
import { useMemo } from 'react'
import styles from './card.styles'

export default function Card({ title, onPress, image }) {
  const source = useMemo(() => ({ uri: image }), [image])
  return (
    <View style={styles.main}>
      <Button style={styles.button} onPress={onPress}>
        <Image
          source={source}
          style={styles.image}
        />
        <View style={styles.title}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </Button>
    </View>
  )
}
