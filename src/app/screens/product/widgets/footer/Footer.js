import PropTypes from 'prop-types'
import { View, KeyboardAvoidingView, Modal, TouchableWithoutFeedback, Text, Platform } from 'react-native'
import Button from 'common/widgets/button'
import Link from 'common/widgets/link'
import Animated from 'react-native-reanimated'
import LikeButton from 'common/widgets/product/LikeButton'
import BagItem from 'common/widgets/bagItem'
import Loading from './Loading'
import styles from './footer.styles'

Footer.propTypes = {
  options: PropTypes.object.isRequired,
  like: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  isAvailable: PropTypes.bool.isRequired,
  addTobag: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  price: PropTypes.node,
  animatedStyle: PropTypes.array.isRequired,
}

Footer.defaultProps = {
  price: undefined,
}


export default function Footer({
  animatedStyle,
  options,
  like,
  id,
  isAvailable,
  addTobag,
  active,
  close,
  item,
  price,
}) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={64}>
      <View style={styles.footer}>
        <LikeButton
          like={like}
          id={id}
          size={30}
          options={options}
        />
        <Animated.View style={animatedStyle}>
          <Button
            disabled={!isAvailable}
            title={gettext('ADD TO BAG')}
            primary
            style={styles.button}
            onPress={addTobag}
          />
        </Animated.View>
        <Modal
          visible={active}
          transparent
          animationType="fade"
        >
          <TouchableWithoutFeedback onPress={close}>
            <View style={styles.overlay}>
              <Loading close={close}>
                <BagItem {...item}>
                  <View style={styles.bagFooter}>
                    <Text style={styles.totalPrice}>{price}</Text>
                    <View style={styles.buttonWrapper}>
                      <Link primary to="Cart" onPress={close}>
                        <Text style={styles.link}>{gettext('Go to bag')}</Text>
                      </Link>
                    </View>
                  </View>
                </BagItem>
              </Loading>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  )
}
