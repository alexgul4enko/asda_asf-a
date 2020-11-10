import PropTypes from 'prop-types'
import Button from 'common/widgets/button'
import Icon from 'common/widgets/Icon'
import { Text } from 'react-native'
import Share from 'react-native-share'
import { useCallback } from 'react'
import { useTranslations } from '@cranium/i18n'
import makeSlug from 'common/utils/makeSlug'
import Config from 'react-native-config'
import styles from './share-button.styles'

ShareButton.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
}

ShareButton.defaultProps = {
  name: undefined,
  id: undefined,
}


export default function ShareButton({ id, name }) {
  const { gettext } = useTranslations()
  const handleShare = useCallback(() => {
    const slug = makeSlug(name, id)
    const link = Config.SITE_URL + '/product/' + slug
    Share.open({
      message: link,
      title: name,
    })
  }, [id, gettext, name])
  return (
    <Button onPress={handleShare} style={styles.button} outline>
      <Icon name="share-01" size={16}/>
      <Text style={styles.text}>{gettext('Share')}</Text>
    </Button>
  )
}
