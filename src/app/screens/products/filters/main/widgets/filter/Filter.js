import PropTypes from 'prop-types'
import { Text, I18nManager } from 'react-native'
import Link from 'common/widgets/link'
import Icon from 'common/widgets/Icon'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import styles from './filter.styles'

Filter.propTypes = {
  name: PropTypes.node,
  values: PropTypes.array,
  slug: PropTypes.string,
  translation: PropTypes.object,
}

Filter.defaultProps = {
  slug: undefined,
  name: undefined,
  values: undefined,
  translation: undefined,
}

export default function Filter({ name, values, slug, translation }) {
  const filters = useSelector(state => get(state, 'productsCount.filters.filter.attributes', []))
  const selections = useMemo(() => {
    if(isEmpty(filters)) { return {} }
    const selected = filters.find((filtr) => filtr.slug === slug)
    if(isEmpty(selected) || isEmpty(selected.values)) { return {} }
    const set = new Set(selected.values)
    const selectedText = values.filter(({ slug }) => set.has(slug)).map(({ name, translation }) => get(translation, 'name') || name).join(', ')
    return {
      count: ` (${selected.values.length}) `,
      selectedText,
      selected: selected.values,
    }
  }, [filters, slug, values])
  const params = useMemo(() => {
    return {
      title: get(translation, 'name') || name,
      values,
      slug,
      selected: selections.selected,
    }
  }, [values, name, slug, selections.selected, translation])

  return (
    <Link to="Attributes" params={params} style={styles.link}>
      <Text style={styles.text}>
        {get(translation, 'name') || name} {selections.count}
      </Text>
      <Text
        numberOfLines={1}
        allowFontScaling
        ellipsizeMode="tail"
        style={styles.selection}
      >
        {selections.selectedText}
      </Text>
      <Icon name={I18nManager.isRTL ? 'chevron-left-01' : 'chevron-right-01'} size={24}/>
    </Link>
  )
}
