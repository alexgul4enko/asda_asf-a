export default function({ route }) {
  return {
    title: route.params.title || gettext('Edit address'),
  }
}
