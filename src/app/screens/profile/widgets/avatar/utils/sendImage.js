import API from 'api'

const queryString = `mutation UPLOAD_AVATAR($id: ID!, $image: Upload!) {
  userAvatarUpdate(id: $id, image: $image) {
    accountErrors {
      field
      message
    }
    user {
      id
    }
  }
}`


export default function sendImage(id, image) {
  const data = new FormData()
  const operations = {
    variables: { id, image: null },
    query: queryString,
  }
  data.append('operations', JSON.stringify(operations))
  data.append('map', JSON.stringify({ 1: ['variables.image'] }))
  data.append('1', image)
  return API.post('/graphql', {
    operations: JSON.stringify(operations),
    map: JSON.stringify({ 1: ['variables.image'] }),
    1: image,
  })
    .then(() => image)
}
