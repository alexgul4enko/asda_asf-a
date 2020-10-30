import PropTypes from 'prop-types'
import Button from 'common/widgets/button'
import Icon from 'common/widgets/Icon'
import AnimatedLoadingWrapper from '../AnimatedLoadingWrapper'
import { useCallback, useState } from 'react'
import { useQuery, useSetData } from '@cranium/resource'
import reducer from './utils/unlike'
import styles from './product.styles'
import DISLIKE from './dislike.graphql'
import theme from 'theme'

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
}
export default function DeleteButton({ id }) {
  const [isLoading, setLoading] = useState(false)

  const { request } = useQuery(DISLIKE, { reducer: 'none', namespace: 'unlike', forceUpdates: true })
  const setData = useSetData('favourites')

  const handlePress = useCallback(() => {
    setLoading(true)
    request({ id })
      .then(() => {
        return setData(id, { reducer })
      })
    return true
  }, [request, id, setLoading])
  return (
    <Button onPress={handlePress} style={styles.deleteButton}>
      <AnimatedLoadingWrapper isLoading={isLoading}>
        <Icon name="close-01" size={17} color={theme.primary}/>
      </AnimatedLoadingWrapper>
    </Button>
  )
}
