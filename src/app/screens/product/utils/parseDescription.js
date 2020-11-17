import { Text, View } from 'react-native'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

export default function parseDescription(desc) {
  if(!desc) {
    return null
  }
  const data = JSON.parse(desc)
  if(isEmpty(get(data, 'blocks')) || !Array.isArray(get(data, 'blocks'))) {
    return null
  }
  return data.blocks.map(({ type, text, key, inlineStyleRanges }) => (
    <View key={key} style={{ paddingVertical: 4, alignSelf: 'stretch', flex: 1 }}>
      <Text style={getStyle(inlineStyleRanges)}>{text}</Text>
    </View>
  ))
}

function getStyle(inlineStyleRanges) {
  if(isEmpty(inlineStyleRanges) || !Array.isArray(inlineStyleRanges)) {
    return {
      textAlign: 'left',
    }
  }
  return inlineStyleRanges.reduce((e, i) => ({ ...e, ...getfont(i) }), {})
}


function getfont({ style }) {
  switch (style) {
    case 'BOLD':
      return {
        fontWeight: 'bold',
        textAlign: 'left',
      }
    case 'ITALIC':
      return {
        fontStyle: 'italic',
        textAlign: 'left',
      }
    default:
      return {
        textAlign: 'left',
      }
  }
}
