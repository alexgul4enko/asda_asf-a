import ImagePicker from 'react-native-image-picker'
import Platform from 'react-native'
import get from 'lodash/get'
import types from './mimeTypes.json'

export default function getImage(options) {
  return new Promise((resolve) => {
    ImagePicker.showImagePicker(
      options,
      (response) => {
        if(!response.uri) {
          return resolve()
        }
        const { uri } = response
        const fixedUri = Platform.OS === 'android' ? uri : fixExtensionName(uri)
        const name = get(response, 'fileName') || fixedUri.split('/').pop()
        const type = response.type || getMimeType(name)
        const avatar = { uri: fixedUri, type, name }
        resolve(avatar)
      })
  })
}


function getMimeType(name) {
  if(!name) {
    return ''
  }
  return get(types, `.${name.split('.').pop()}`, '')
}


function fixExtensionName(fileName) {
  const nameArr = fileName.split('.')
  const fileFormat = nameArr[nameArr.length - 1]

  if(fileFormat === 'HEIC') {
    nameArr[nameArr.length - 1] = 'jpg'
  }

  return nameArr.join('.')
}
