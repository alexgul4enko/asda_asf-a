import parseSlug from 'common/utils/parseSlug'
import Icon from 'common/widgets/Icon'
import Button from 'common/widgets/button'
import { StyleSheet } from 'react-native'
import Share from 'react-native-share'

const style = StyleSheet.create({
  btn: {
    paddingVertical: 0,
  },
})

export default function({ route }) {
  return {
    title: parseSlug(route.params.slug),
    headerRight: () => (
      <Button
        onPress={() => Share.open({ url: 'https://wecre8.inprogress.rocks/' })}
        style={style.btn}
      >
        <Icon name="share-01"/>
      </Button>
    ),
  }
}
