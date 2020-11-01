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
// import NotFount from './screens/notFound'
import Favourites, { favouritesOptions } from './screens/favourites'
import Cart from './screens/cart'
import { Login } from './screens/auth'
import { handleNotification } from './common/notifications'
import { CheckAccess } from '@cranium/access'
import { access } from 'common/session'

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
        <MainStack.Navigator screenOptions={{
          headerBackTitleVisible: false,
          headerBackImage: BackIcon,
        }}>
          <MainStack.Screen name="main" component={Home} options={homeOptions} />
          <MainStack.Screen name="Designer" component={Designer} options={designerOptions} />
          <MainStack.Screen
            name="Celebrity"
            component={Celebrity}
            options={celebrityOptions}
            // sharedElementsConfig={(route, otherRoute, showing) => {
            //   const { id } = route.params
            //   return [
            //     {
            //       id: `item.${id}.photo`,
            //       animation: 'fade',    Filters
            //     },
            //   ]
            // }}
          />
          <MainStack.Screen name="Categories" component={Categories} options={categoriesOptions} />
          <MainStack.Screen name="Products" component={Products} options={productsOptions} />
          <MainStack.Screen name="Filters" component={Filters} options={filtersOptions}/>
          <MainStack.Screen name="Attributes" component={Attributes} options={attributesOptions}/>
          <MainStack.Screen name="Price" component={Price} options={priceOptions}/>
          <MainStack.Screen name="CategoryFilter" component={CategoryFilter} options={categoryFiltersOptions} />
          <MainStack.Screen name="Product" component={Product} options={productOptions} />
          <MainStack.Screen name="Favourites" component={Favourites} option={favouritesOptions}/>
          <MainStack.Screen name="Cart" component={Cart} />
          <MainStack.Screen name="Login" component={Login} />
        </MainStack.Navigator>
      </CheckAccess>
    </NavigationContainer>
  )
}
