import PropTypes from 'prop-types'
import { View, Linking, Text } from 'react-native'
import { LoadingWrapper } from 'common/widgets/loading'
import Avatar from 'common/widgets/avatar'
import Icon from 'common/widgets/Icon'
import Button from 'common/widgets/button'
import get from 'lodash/get'
import styles from './insta.styles'

InstaView.propTypes = {
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
}


export default function InstaView({ data, isLoading }) {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Icon name="instagram-01"/>
        <Text style={styles.title}>{gettext('Instagram feed')}</Text>
      </View>
      <LoadingWrapper isLoading={isLoading}>
        <View style={styles.list}>
          {
            data.map((item) => (
              <Button
                key={item.node.shortcode}
                onPress={() => Linking.openURL(`https://www.instagram.com/p/${item.node.shortcode}/`)}
                style={styles.button}
              >
                <Avatar
                  url={get(item, 'node.thumbnail_resources[1].src')}
                  style={styles.image}
                />
              </Button>
            ))
          }
        </View>
      </LoadingWrapper>
    </View>
  )
}
