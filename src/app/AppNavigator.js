import Config from 'react-native-config'
import { useSelector } from 'react-redux'
import { useEffect, useRef, useCallback } from 'react'
import messaging from '@react-native-firebase/messaging'
import notifee, { EventType } from '@notifee/react-native'
import { StatusBar, Platform } from 'react-native'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { NavigationContainer } from '@react-navigation/native'
import BackIcon from 'common/navigation/BackIcon'
import Welcome from 'screens/welcome'
import { LoadingWrapper } from 'common/widgets/loading'
import Home, { homeOptions } from 'screens/mainTabs'
import Designer, { designerOptions } from './screens/designer'
import Celebrity, { celebrityOptions } from './screens/celebrity'
import Categories, { categoriesOptions } from './screens/categories'
import Products, { productsOptions } from './screens/products'
import analytics from '@react-native-firebase/analytics'
import {
  Filters,
  filtersOptions,
  Attributes,
  attributesOptions,
  Price,
  priceOptions,
  CategoryFilter,
  categoryFiltersOptions,
} from './screens/products/filters'
import Product, { productOptions } from './screens/product'
import Favourites, { favouritesOptions } from './screens/favourites'
import Cart, { cartOptions } from './screens/cart'
import Checkout, { checkoutOptions } from './screens/checkout'
import {
  Login,
  loginOptions,
  Register,
  RegistrationSuccess,
  registerOptions,
} from './screens/auth'
import AddressBook, { addressBookOptions } from './screens/addressBook'
import Address, { addressOptions } from './screens/address'
import Country, { countryOptions } from './screens/country'
import City, { cityOptions } from './screens/city'
import CountryArea, { countryAreaOptions } from './screens/countryArea'
import Profile, { profileOptions } from './screens/profile'
import ChangePass, { changePassOptions } from './screens/changePass'
import Orders, { ordersOptions } from './screens/orders'
import Order, { orderOptions } from './screens/order'
import ReviewOrder, { reviewOptions } from './screens/reviewOrder'
import Settings, { settingsOptions } from './screens/settings'
import Media, { mediaOptions } from './screens/media'
import { handleNotification, handleNotificationClick } from './common/notifications'
import { CheckAccess } from '@cranium/access'
import { access } from 'common/session'
import theme from 'theme'
import get from 'lodash/get'


const MainStack = createSharedElementStackNavigator()

const linking = {
  prefixes: [Config.SITE_URL, Config.SHEME_NAME + '://'],
  config: {
    initialRouteName: 'main',
    screens: {
      Designers: {
        path: 'designers',
      },
      Designer: {
        path: 'designer/:slug',
      },
      Celebrities: {
        path: 'celebrities',
      },
      Celebrity: {
        path: 'celebrity/:slug',
      },
      Products: {
        path: 'products/:type/:slug',
      },
      Product: {
        path: 'product/:slug',
      },
    },
  },
}

const screenOptions = {
  headerBackTitleVisible: false,
  headerBackImage: BackIcon,
  headerTitleStyle: {
    maxWidth: theme.width - 200,
  },
}

export default function AppNavigator() {
  const navigationRef = useRef()
  const routeNameRef = useRef()
  useEffect(() => {
    analytics().logAppOpen()
    messaging().onNotificationOpenedApp(message => handleNotificationClick(message, navigationRef))
    notifee.onForegroundEvent(({ type, detail }) => {
      if(type === EventType.PRESS) {
        handleNotificationClick(detail.notification, navigationRef)
      }
    })
    messaging().onMessage(handleNotification)
    messaging().registerDeviceForRemoteMessages()
  }, [])
  const onReady = useCallback(() => {
    routeNameRef.current = navigationRef.current.getCurrentRoute().name
  }, [routeNameRef, navigationRef])
  const handleStateChange = useCallback(() => {
    const previousRouteName = routeNameRef.current
    const currentRouteName = navigationRef.current.getCurrentRoute().name
    if(previousRouteName !== currentRouteName) {
      analytics().logScreenView({ screen_name: currentRouteName })
    }
    routeNameRef.current = currentRouteName
  }, [routeNameRef, navigationRef])
  const isInitialized = useSelector(state => get(state, 'isInitialized'))
  return (
    <LoadingWrapper isLoading={!isInitialized}>
      <StatusBar barStyle="dark-content"/>
      <NavigationContainer
        linking={linking}
        ref={navigationRef}
        onReady={onReady}
        onStateChange={handleStateChange}
      >
        <CheckAccess level={access.F_FIRST_INSTALL}>
          <Welcome/>
        </CheckAccess>
        <CheckAccess level={access.F_FIRST_INSTALL_PASSED}>
          <MainStack.Navigator screenOptions={screenOptions} keyboardHandlingEnabled={Platform.OS === 'android' ? false : undefined}>
            <MainStack.Screen name="main" component={Home} options={homeOptions} />
            <MainStack.Screen name="Designer" component={Designer} options={designerOptions} />
            <MainStack.Screen name="Celebrity" component={Celebrity} options={celebrityOptions} />
            <MainStack.Screen name="Categories" component={Categories} options={categoriesOptions} />
            <MainStack.Screen name="Products" component={Products} options={productsOptions} />
            <MainStack.Screen name="Filters" component={Filters} options={filtersOptions}/>
            <MainStack.Screen name="Attributes" component={Attributes} options={attributesOptions}/>
            <MainStack.Screen name="Price" component={Price} options={priceOptions}/>
            <MainStack.Screen name="CategoryFilter" component={CategoryFilter} options={categoryFiltersOptions} />
            <MainStack.Screen name="Product" component={Product} options={productOptions} />
            <MainStack.Screen name="Favourites" component={Favourites} options={favouritesOptions}/>
            <MainStack.Screen name="Cart" component={Cart} options={cartOptions}/>
            <MainStack.Screen name="Checkout" component={Checkout} options={checkoutOptions}/>
            <MainStack.Screen name="Login" component={Login} options={loginOptions}/>
            <MainStack.Screen name="Register" component={Register} options={registerOptions}/>
            <MainStack.Screen name="RegistrationSuccess" component={RegistrationSuccess} options={registerOptions}/>
            <MainStack.Screen name="AddressBook" component={AddressBook} options={addressBookOptions}/>
            <MainStack.Screen name="Address" component={Address} options={addressOptions}/>
            <MainStack.Screen name="Country" component={Country} options={countryOptions}/>
            <MainStack.Screen name="City" component={City} options={cityOptions}/>
            <MainStack.Screen name="CountryArea" component={CountryArea} options={countryAreaOptions}/>
            <MainStack.Screen name="EditProfile" component={Profile} options={profileOptions}/>
            <MainStack.Screen name="ChangePass" component={ChangePass} options={changePassOptions}/>
            <MainStack.Screen name="Orders" component={Orders} options={ordersOptions}/>
            <MainStack.Screen name="Order" component={Order} options={orderOptions}/>
            <MainStack.Screen name="ReviewOrder" component={ReviewOrder} options={reviewOptions}/>
            <MainStack.Screen name="Settings" component={Settings} options={settingsOptions}/>
            <MainStack.Screen name="Media" component={Media} options={mediaOptions}/>
          </MainStack.Navigator>
        </CheckAccess>
      </NavigationContainer>
    </LoadingWrapper>
  )
}
