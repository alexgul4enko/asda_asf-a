import { TransitionPresets } from '@react-navigation/stack'
import CloseIcon from 'common/navigation/CloseIcon'

export default {
  headerShown: true,
  gestureEnabled: true,
  cardOverlayEnabled: true,
  mode: 'modal',
  ...TransitionPresets.ModalSlideFromBottomIOS,
  headerBackImage: CloseIcon,
  title: gettext('Filter'),
}
