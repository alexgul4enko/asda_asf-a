import get from 'lodash/get'

export default function({ route }) {
  return {
    title: get(route, 'params.title') || gettext('Address Book'),
  }
}
