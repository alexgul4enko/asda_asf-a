import PropTypes from 'prop-types'
import { useTranslations } from '@cranium/i18n'
import { FlatList, SafeAreaView, Text } from 'react-native'
import { LoadingWrapper } from 'common/widgets/loading'
import Link from 'common/widgets/link'
import Icon from 'common/widgets/Icon'
import ListEmptyComponent from 'common/widgets/listEmptyComponent'
import renderItem from './utils/renderItem'
import keyExtractor from './utils/keyExtractor'
import styles from './address-book.styles'

const params = {
  title: gettext('Add new address'),
}

AddressBookView.propTypes = {
  data: PropTypes.array,
  refetch: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

AddressBookView.defaultProps = {
  data: undefined,
}

export default function AddressBookView({ data, refetch, refreshing, isLoading }) {
  const { gettext } = useTranslations()
  return (
    <SafeAreaView style={styles.root}>
      <LoadingWrapper isLoading={isLoading}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onRefresh={refetch}
          refreshing={refreshing}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          ListEmptyComponent={<ListEmptyComponent title={gettext('Your address book is empty')}/>}
        />
        <Link to="Address" primary style={styles.link} params={params}>
          <Icon name="plus-01" color="#ffffff" size={20}/>
          <Text style={styles.linkText}>{gettext('Add new address')}</Text>
        </Link>
      </LoadingWrapper>
    </SafeAreaView>
  )
}
