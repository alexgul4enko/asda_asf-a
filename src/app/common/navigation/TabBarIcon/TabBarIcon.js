import PropTypes from 'prop-types'
import Icon from 'common/widgets/Icon'

TabBarIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
}

export default function TabBarIcon({ color, size, focused, icon }) {
  return (
    <Icon
      name={focused ? `${icon}-active` : icon}
      color={color}
      size={20}
    />
  )
}
