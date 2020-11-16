import PropTypes from 'prop-types'
import ListPropTypes from 'common/prop-types/List'
import { SectionList, SafeAreaView } from 'react-native'
import { LoadingWrapper } from 'common/widgets/loading'
import ListEmptyComponent from 'common/widgets/listEmptyComponent'
import Header from './widgets/header'
import keyExtractor from './utils/keyExtractor'
import renderItem from './utils/renderItem'
import renderSection from './widgets/section'
import styles from './categories.styles'


CategoriesView.propTypes = {
  ...ListPropTypes,
  data: PropTypes.array,
}

CategoriesView.defaultProps = {
  data: undefined,
}

export default function CategoriesView({ data, loadNext, refetch, refreshing, isLoading }) {
  return (
    <SafeAreaView style={styles.root}>
      <LoadingWrapper isLoading={isLoading}>
        <SectionList
          ListHeaderComponent={<Header/>}
          sections={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={loadNext}
          onRefresh={refetch}
          refreshing={refreshing}
          ListEmptyComponent={<ListEmptyComponent/>}
          renderSectionHeader={renderSection}
        />
      </LoadingWrapper>
    </SafeAreaView>
  )
}
