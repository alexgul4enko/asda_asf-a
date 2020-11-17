import PropTypes from 'prop-types'
import { FlatList, View, Text } from 'react-native'
import Image from './image'
import PhotoView from '@merryjs/photo-viewer'
import { useState, useCallback } from 'react'
import keyExtractor from './utils/keyExtractor'
import isEmpty from 'lodash/isEmpty'
import styles from './gallery.slyles'

Gallery.propTypes = {
  data: PropTypes.array,
}

Gallery.defaultProps = {
  data: [],
}

export default function Gallery({ data }) {
  const [visible, setVisible] = useState([])

  const open = useCallback(({ uri, title }) => {
    setVisible([{ source: { uri }, title }])
  }, [setVisible])
  const close = useCallback(() => setVisible([]), [setVisible])

  const renderItem = useCallback(({ item, index }) => {
    return (<Image {...item} setVisible={open} />)
  }, [open])

  if(!Array.isArray(data) || isEmpty(data)) {
    return null
  }
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{gettext('My gallery')}</Text>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <PhotoView
        visible={!isEmpty(visible)}
        data={visible}
        onDismiss={close}
        initial={0}
      />
    </View>
  )
}
