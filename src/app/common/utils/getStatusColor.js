export default function getStatusColor(status) {
  switch (status) {
    case 'UNFULFILLED':
      return '#f54046'
    case 'PARTIALLY_FULFILLED':
      return '#c1b444'
    case 'FULFILLED':
      return '#37B24D'
    case 'CANCELED':
      return '#dddddd'
    case 'DRAFT':
      return '#000000'
    default:
      return '#000000'
  }
}
