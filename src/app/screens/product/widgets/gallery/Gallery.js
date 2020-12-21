import PropTypes from 'prop-types'
import { FlatList, View, Text } from 'react-native'
import Image from './image'
import PhotoView from '@merryjs/photo-viewer'
import { useState, useCallback, useMemo } from 'react'
import keyExtractor from './utils/keyExtractor'
import isEmpty from 'lodash/isEmpty'
import styles from './gallery.slyles'
import theme from 'theme'

Gallery.propTypes = {
  data: PropTypes.array,
  children: PropTypes.node,
}

Gallery.defaultProps = {
  data: [],
  children: undefined,
}

export default function Gallery({ data, children }) {
  const [page, setPage] = useState(0)
  const [visible, setVisible] = useState(false)
  const handleScroll = useCallback((e) => {
    setPage(Math.round(e.nativeEvent.contentOffset.x / theme.width))
  }, [setPage])

  const open = useCallback(() => setVisible(true), [setVisible])
  const close = useCallback(() => setVisible(false), [setVisible])

  const renderItem = useCallback(({ item, index }) => {
    return (<Image {...item} setVisible={open} />)
  }, [open])

  const images = useMemo(() => {
    if(!Array.isArray(data) || isEmpty(data)) {
      return []
    }
    return data.map(({ url }) => ({ source: { uri: url } }))
  }, [data])

  if(!Array.isArray(data) || isEmpty(data)) {
    return null
  }
  return (
    <View style={styles.root}>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      />
      {children}
      <View style={styles.pages}>
        <Text style={styles.page}>{`${page + 1}/${data.length}`}</Text>
      </View>
      <PhotoView
        visible={visible}
        data={images}
        initial={page}
        onDismiss={close}
      />
    </View>
  )
}
