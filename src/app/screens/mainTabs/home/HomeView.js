import PropTypes from 'prop-types'
import { ScrollView } from 'react-native'
import Propmo from './widgets/promo'
import PromoCategories from './widgets/promoCategories'
import Celebrities from './widgets/celebrities'
import Header from './widgets/header'
import Banner from './widgets/banner'
import Slider from './widgets/slider'
import MeetUs from './widgets/meetUs'
import Insta from './widgets/insta'
import styles from './home.styles'

Home.propTypes = {
  headerBanner: PropTypes.object.isRequired,
  firstBanner: PropTypes.object.isRequired,
  secondBanner: PropTypes.object.isRequired,
  slides: PropTypes.array,
}

Home.defaultProps = {
  slides: undefined,
}

export default function Home({ headerBanner, firstBanner, secondBanner, slides }) {
  return (
    <ScrollView style={styles.content}>
      <MeetUs/>
      <Header {...headerBanner}/>
      <Slider slides={slides}/>
      <Propmo title={gettext('Top categories')}>
        <PromoCategories type="TOP"/>
      </Propmo>
      <Propmo title={gettext('Celebrity Picks')} primary>
        <Celebrities />
      </Propmo>
      <Banner {...firstBanner}/>
      <Propmo title={gettext('Explorer popular categories')} block>
        <PromoCategories type="POPULAR"/>
      </Propmo>
      <Banner {...secondBanner}/>
      <Insta/>
    </ScrollView>
  )
}
