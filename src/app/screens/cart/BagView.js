import PropTypes from 'prop-types'
import { SafeAreaView, RefreshControl, Text, KeyboardAvoidingView, I18nManager } from 'react-native'
import { Fragment } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import Recomentations from 'common/widgets/recomentations'
import { LoadingWrapper } from 'common/widgets/loading'
import Button from 'common/widgets/button'
import Toast from 'common/widgets/toast'
import Icon from 'common/widgets/Icon'
import Empty from './widgets/empty'
import Header from './widgets/header'
import keyExtractor from './utils/keyExtractor'
import isEmpty from 'lodash/isEmpty'
import styles from './bag.styles'

BagView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  refetch: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
  data: PropTypes.array,
  renderItem: PropTypes.func.isRequired,
  totals: PropTypes.object,
  proceed: PropTypes.func.isRequired,
  errors: PropTypes.any,
}

BagView.defaultProps = {
  data: undefined,
  totals: undefined,
  errors: undefined,
}

export default function BagView({ isLoading, refetch, refreshing, data, renderItem, totals, proceed, errors }) {
  return (
    <SafeAreaView style={styles.root}>
      <LoadingWrapper isLoading={isLoading}>
        {
          isEmpty(data) ? (
            <Empty/>
          ) : (
            <Fragment>
              <FlatList
                ListHeaderComponent={<Header {...totals}/>}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                data={data}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refetch} />}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                stickyHeaderIndices={[0]}
                ListFooterComponent={<Recomentations style={styles.footer} title={gettext("Items you don't want to miss")}/>}
              />
              <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
                <Button to="Checkout" primary style={styles.btn} onPress={proceed}>
                  <Text style={styles.link}>{gettext('Proceed to checkout')}</Text>
                  <Icon name={I18nManager.isRTL ? 'chevron-left-01' : 'chevron-right-01'} color="#ffffff" size={22}/>
                </Button>
              </KeyboardAvoidingView>
              <Toast error={errors}/>
            </Fragment>
          )
        }
      </LoadingWrapper>
    </SafeAreaView>
  )
}
