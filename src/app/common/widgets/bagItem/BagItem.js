import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import Avatar from 'common/widgets/avatar'
import Button from 'common/widgets/button'
import Link from 'common/widgets/link'
import Icon from 'common/widgets/Icon'
import { useMemo } from 'react'
import get from 'lodash/get'
import makeSlug from 'common/utils/makeSlug'
import styles from './bag-item.styles'
import theme from 'theme'

BagItem.propTypes = {
  children: PropTypes.node,
  quantity: PropTypes.node,
  variant: PropTypes.object,
  style: PropTypes.any,
  deleteItem: PropTypes.func,
}

BagItem.defaultProps = {
  children: undefined,
  quantity: undefined,
  variant: undefined,
  style: undefined,
  deleteItem: undefined,
}

export default function BagItem({ children, quantity, variant, style, deleteItem }) {
  const values = useMemo(() => {
    return variant.attributes.map(({ attribute, values }) => {
      return (
        <View style={styles.attribute} key={attribute.id}>
          <Text style={styles.name}>{get(attribute, 'translation.name') || attribute.name }</Text>
          <Text style={styles.name}>:</Text>
          <Text style={styles.value}>{get(values, '[0]translation.name') || get(values, '[0].name')}</Text>
        </View>
      )
    })
  }, [variant.attributes])
  const params = useMemo(() => ({
    slug: makeSlug(get(variant, 'product.translation.name') || get(variant, 'product.name'), get(variant, 'product.id')),
  }), [get(variant, 'product')])
  const _style = useMemo(() => ([styles.root, style]), [style])
  return (
    <View style={_style}>
      <View style={styles.row}>
        <Link to="Product" params={params} style={styles.link}>
          <Avatar
            url={get(variant, 'product.thumbnail.url')}
            style={styles.image}
          />
        </Link>
        <View style={styles.attributes}>
          <Text
            style={styles.title}
            numberOfLines={2}
            allowFontScaling={false}
            ellipsizeMode="tail"
          >
            {get(variant, 'product.translation.name') || get(variant, 'product.name')}
          </Text>
          {values}
        </View>
        {
          deleteItem ? (
            <Button style={styles.deleteButton} onPress={deleteItem}>
              <Icon name="close-01" size={16} color={theme.greyText}/>
            </Button>
          ) : null
        }
      </View>
      {children}
    </View>
  )
}
