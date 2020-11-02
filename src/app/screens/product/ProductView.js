import PropTypes from 'prop-types'
import { SafeAreaView } from 'react-native'
import Gallery from './widgets/gallery'

ProductView.propTypes = {
  images: PropTypes.array,
}

ProductView.defaultProps = {
  images: [],
}

export default function ProductView({ images }) {
  return (
    <SafeAreaView>
      <Gallery data={images}/>
    </SafeAreaView>
  )
}
