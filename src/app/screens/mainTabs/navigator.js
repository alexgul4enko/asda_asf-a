import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabBarIcon from 'common/navigation/TabBarIcon'
import Logo from 'common/widgets/logo'
import Gender from 'common/navigation/Gender'
import Home from './home'
import Designers from './designers'
import Celebrities from './celebrities'
import Profile from './profile'
import Categories from 'screens/categories'
import NavigationButtons from './navidation/NavigationButtons'
import theme from 'theme'


const Tab = createBottomTabNavigator()

function makeTabIcon(icon) {
  return function(props) {
    return <TabBarIcon {...props} icon={icon}/>
  }
}


export default function HomeNavigation() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.primary,
        inactiveTintColor: theme.grey,
        labelStyle: {
          fontWeight: '600',
          fontSize: 8,
          lineHeight: 12,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: makeTabIcon('tab-home'),
        }}
      />
      <Tab.Screen
        name="Designers"
        component={Designers}
        options={{
          tabBarIcon: makeTabIcon('tab-designers'),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Categories}
        options={{
          tabBarIcon: makeTabIcon('tab-categories'),
        }}
      />
      <Tab.Screen
        name="Celebrities"
        component={Celebrities}
        options={{
          tabBarIcon: makeTabIcon('tab-celebrities'),
        }}
      />
      <Tab.Screen
        name="Detail"
        component={Profile}
        options={{
          tabBarIcon: makeTabIcon('tab-user'),
        }}
      />
    </Tab.Navigator>
  )
}

export const homeOptions = {
  headerTitle: () => <Logo/>,
  headerLeft: () => <Gender/>,
  headerRight: () => <NavigationButtons/>,
}
