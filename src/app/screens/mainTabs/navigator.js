import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTranslations } from '@cranium/i18n'
import TabBarIcon from 'common/navigation/TabBarIcon'
import Logo from 'common/widgets/logo'
import Gender from 'common/navigation/Gender'
import Home from './home'
import Designers from './designers'
import Celebrities from './celebrities'
import Profile from './profile'
import Categories from './categories'
import UserPick from 'common/navigation/userPick'
import theme from 'theme'


const Tab = createBottomTabNavigator()

function makeTabIcon(icon) {
  return function(props) {
    return <TabBarIcon {...props} icon={icon}/>
  }
}


export default function HomeNavigation() {
  const { gettext } = useTranslations()
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.primary,
        inactiveTintColor: theme.grey,
        keyboardHidesTabBar: true,
        labelStyle: {
          fontWeight: '600',
          fontSize: 10,
          lineHeight: 12,
          paddingBottom: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: makeTabIcon('tab-home'),
          tabBarLabel: gettext('Home'),
        }}
      />
      <Tab.Screen
        name="Designers"
        component={Designers}
        options={{
          tabBarIcon: makeTabIcon('tab-designers'),
          tabBarLabel: gettext('Designers'),
        }}
      />
      <Tab.Screen
        name="Catalog"
        component={Categories}
        options={{
          tabBarIcon: makeTabIcon('tab-categories'),
          tabBarLabel: gettext('Catalog'),
        }}
      />
      <Tab.Screen
        name="Celebrities"
        component={Celebrities}
        options={{
          tabBarIcon: makeTabIcon('tab-celebrities'),
          tabBarLabel: gettext('Celebrities'),
        }}
      />
      <Tab.Screen
        name="Detail"
        component={Profile}
        options={{
          tabBarIcon: makeTabIcon('tab-user'),
          tabBarLabel: gettext('Me'),
        }}
      />
    </Tab.Navigator>
  )
}

export const homeOptions = {
  headerTitle: () => <Logo/>,
  headerLeft: () => <Gender/>,
  headerRight: () => <UserPick/>,
  headerTitleAlign: 'center',
}
