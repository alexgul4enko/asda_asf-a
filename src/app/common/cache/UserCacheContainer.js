import PropTypes from 'prop-types'
import { createContext, useContext, Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import Config from 'react-native-config'
import { LoadingWrapper } from 'common/widgets/loading'
import omit from 'lodash/omit'
import memoryCache from './memoryCache'


const Context = createContext()

const propTypes = {
  children: PropTypes.node.isRequired,
}


export default class CacheProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
    }
    this.setGender = this.setGender.bind(this)
    this.goToApp = this.goToApp.bind(this)
    this.save = this.save.bind(this)
    this.setToken = this.setToken.bind(this)
  }

  setToken(token) {
    memoryCache.setData({ token })
    this.setState({ token }, this.save)
  }

  setGender(gender) {
    memoryCache.setData({ gender })
    this.setState({ gender }, this.save)
  }

  goToApp() {
    this.setState({ firstInstall: false })
  }

  save() {
    AsyncStorage.setItem(Config.CACHE_STORAGE_KEY, JSON.stringify(omit(this.state, ['loaded', 'firstInstall'])))
  }

  componentDidMount() {
    AsyncStorage.getItem(Config.CACHE_STORAGE_KEY)
      .then(data => {
        const value = data ? JSON.parse(data) : { firstInstall: true }
        memoryCache.setData(value)
        this.setState({
          loaded: true,
          ...value,
        })
      })
  }

  render() {
    return (
      <Context.Provider value={{ ...this.state, setGender: this.setGender, goToApp: this.goToApp, setToken: this.setToken }}>
        <LoadingWrapper isLoading={!this.state.loaded}>
          {this.props.children}
        </LoadingWrapper>
      </Context.Provider>
    )
  }
}

CacheProvider.propTypes = propTypes


export function useCache() {
  return useContext(Context)
}
