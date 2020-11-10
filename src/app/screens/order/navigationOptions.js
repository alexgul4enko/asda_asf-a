import get from 'lodash/get'

export default function({ route }) {
  return {
    title: [gettext('Order'), ' ', '#', get(route, 'params.number')],
  }
}
