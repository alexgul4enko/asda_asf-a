import { SafeAreaView, Text, Linking, ScrollView, View, I18nManager } from 'react-native'
import { CheckAccess } from '@cranium/access'
import Link from 'common/widgets/link'
import Icon from 'common/widgets/Icon'
import Button from 'common/widgets/button'
import MeetUs from './widgets/meetUs'
import LanguageSelector from './widgets/radio'
import { usePrefetchQuery, useClear } from '@cranium/resource'
import { useMemo, useCallback } from 'react'
import { access } from 'common/session'
import openUrl from 'common/utils/openUrl'
import get from 'lodash/get'
import styles from './profile.styles'
import SHOP from './shop.graphql'

function returnPolicy() { openUrl('/help/return-policy') }
function privacyPolicy() { openUrl('/help/privacy-policy') }
function aboutUs() { openUrl('/help/about-us') }
function stores() { openUrl('/help/stores') }
function faq() { openUrl('/help/faq') }
function terms() { openUrl('/help/terms-and-conditions') }
function celebrity() { openUrl('/help/become-celebrity') }
function designer() { openUrl('/help/become-designer') }


export default function ProfileView() {
  const clear = useClear('session')
  const shop = usePrefetchQuery(SHOP, { parseValue: 'data.shop.companyAddress' })()
  const address = useMemo(() => {
    return [
      get(shop, 'data.streetAddress1'),
      get(shop, 'data.city.displayName'),
      get(shop, 'data.postalCode'),
      get(shop, 'country.country'),
    ].join(' ')
  }, [shop.data])
  const phone = useCallback(() => {
    Linking.openURL(`tel:${get(shop, 'data.phone')}`)
  }, [get(shop, 'data.phone')])
  const mail = useCallback(() => Linking.openURL('mailto:info@wecre8.com'), [])
  return (
    <SafeAreaView style={styles.main}>
      <ScrollView style={styles.main} contentContainerStyle={styles.scroll}>
        <CheckAccess level={access.F_UNAUTHORISED}>
          <MeetUs/>
        </CheckAccess>
        <CheckAccess level={access.F_PROTECTED}>
          <Text style={styles.title}>{gettext('My account')}</Text>
          <Link to="EditProfile" style={styles.link}>
            <Text style={styles.linktext}>{gettext('Profile')}</Text>
            <Icon name={I18nManager.isRTL ? 'chevron-left-01' : 'chevron-right-01'} size={20}/>
          </Link>
          <Link to="AddressBook" style={styles.link}>
            <Text style={styles.linktext}>{gettext('Address Book')}</Text>
            <Icon name={I18nManager.isRTL ? 'chevron-left-01' : 'chevron-right-01'} size={20}/>
          </Link>
          <Link to="ChangePass" style={styles.link}>
            <Text style={styles.linktext}>{gettext('Change Password')}</Text>
            <Icon name={I18nManager.isRTL ? 'chevron-left-01' : 'chevron-right-01'} size={20}/>
          </Link>
          <Link to="Orders" style={styles.link}>
            <Text style={styles.linktext}>{gettext('My Orders')}</Text>
            <Icon name={I18nManager.isRTL ? 'chevron-left-01' : 'chevron-right-01'} size={20}/>
          </Link>
        </CheckAccess>
        <Text style={styles.title}>{gettext('Settings')}</Text>
        <Link to="Settings" style={styles.link}>
          <Text style={styles.linktext}>
            {gettext('Subscriptions')}
          </Text>
          <Icon name={I18nManager.isRTL ? 'chevron-left-01' : 'chevron-right-01'} size={20}/>
        </Link>
        <Text style={styles.title}>{gettext('Change language')}</Text>
        <LanguageSelector/>
        <Text style={styles.title}>{gettext('Support')}</Text>
        <Button
          style={styles.link}
          onPress={returnPolicy}
        >
          <Text style={styles.linktext}>{gettext('Shipping & Return Policy')}</Text>
          <Icon name={I18nManager.isRTL ? 'chevron-left-01' : 'chevron-right-01'} size={20}/>
        </Button>
        <Button
          style={styles.link}
          onPress={aboutUs}
        >
          <Text style={styles.linktext}>{gettext('About us')}</Text>
          <Icon name={I18nManager.isRTL ? 'chevron-left-01' : 'chevron-right-01'} size={20}/>
        </Button>
        <Button
          style={styles.link}
          onPress={stores}
        >
          <Text style={styles.linktext}>{gettext('Store Address')}</Text>
          <Icon name={I18nManager.isRTL ? 'chevron-left-01' : 'chevron-right-01'} size={20}/>
        </Button>
        <Button
          style={styles.link}
          onPress={faq}
        >
          <Text style={styles.linktext}>{gettext('FAQs')}</Text>
          <Icon name={I18nManager.isRTL ? 'chevron-left-01' : 'chevron-right-01'} size={20}/>
        </Button>
        <Button
          style={styles.link}
          onPress={privacyPolicy}
        >
          <Text style={styles.linktext}>{gettext('Privacy Policy')}</Text>
          <Icon name={I18nManager.isRTL ? 'chevron-left-01' : 'chevron-right-01'} size={20}/>
        </Button>
        <Button
          style={styles.link}
          onPress={terms}
        >
          <Text style={styles.linktext}>{gettext('Terms and conditions')}</Text>
          <Icon name={I18nManager.isRTL ? 'chevron-left-01' : 'chevron-right-01'} size={20}/>
        </Button>
        <Text style={styles.title}>{gettext('Join us')}</Text>
        <Button
          style={styles.link}
          onPress={designer}
        >
          <Text style={styles.linktext}>{gettext('Become designer')}</Text>
          <Icon name={I18nManager.isRTL ? 'chevron-left-01' : 'chevron-right-01'} size={20}/>
        </Button>
        <Button
          style={styles.link}
          onPress={celebrity}
        >
          <Text style={styles.linktext}>{gettext('Become celebrity')}</Text>
          <Icon name={I18nManager.isRTL ? 'chevron-left-01' : 'chevron-right-01'} size={20}/>
        </Button>
        <Text style={styles.title}>{gettext('Contact us')}</Text>
        <View style={styles.contacts}>
          <View style={styles.row}>
            <View style={styles.buttonWrapper}>
              <Button onPress={phone} style={styles.contactButton}>
                <Icon name="whatsup-01"/>
                <Text style={styles.contactText}>{gettext('Phone')}</Text>
              </Button>
            </View>
            <View style={styles.buttonWrapper}>
              <Button onPress={mail} style={styles.contactButton}>
                <Icon name="web-01"/>
                <Text style={styles.contactText}>{gettext('Email')}</Text>
              </Button>
            </View>
          </View>
          <Text style={styles.address}>{address}</Text>
        </View>
        <CheckAccess level={access.F_PROTECTED}>
          <Button
            title={gettext('Log out')}
            outline
            onPress={clear}
            style={styles.logout}
            textStyle={styles.logoutext}
          />
        </CheckAccess>
      </ScrollView>
    </SafeAreaView>

  )
}
