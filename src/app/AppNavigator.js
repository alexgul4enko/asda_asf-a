import Config from 'react-native-config'
import { useEffect, useRef } from 'react'
import messaging from '@react-native-firebase/messaging'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { NavigationContainer } from '@react-navigation/native'
import BackIcon from 'common/navigation/BackIcon'
import Welcome from 'screens/welcome'
import Home, { homeOptions } from 'screens/mainTabs'
import Designer, { designerOptions } from './screens/designer'
import Celebrity, { celebrityOptions } from './screens/celebrity'
import Categories, { categoriesOptions } from './screens/categories'
import Products, { productsOptions } from './screens/products'
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
import { handleNotification } from './common/notifications'
import { CheckAccess } from '@cranium/access'
import { access } from 'common/session'
import theme from 'theme'


const MainStack = createSharedElementStackNavigator()

const linking = {
  prefixes: [Config.API_URL, Config.SHEME_NAME + '://'],
  config: {
    initialRouteName: 'main',
    screens: {
      main: {
        path: 'main',
      },
      Designer: {
        path: 'designer/:slug',
      },
      Celebrity: {
        path: 'celebrity/:slug',
      },
      Products: {
        path: 'products/category/:slug?',
      },
      Product: {
        path: 'product/:slug?',
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
  useEffect(() => {
    return messaging().onMessage(remoteMessage => handleNotification(remoteMessage, navigationRef))
  }, [])

  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <CheckAccess level={access.F_FIRST_INSTALL}>
        <Welcome/>
      </CheckAccess>
      <CheckAccess level={access.F_FIRST_INSTALL_PASSED}>
        <MainStack.Navigator screenOptions={screenOptions}>
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
        </MainStack.Navigator>
      </CheckAccess>
    </NavigationContainer>
  )
}
