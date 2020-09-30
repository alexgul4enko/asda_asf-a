import { Component } from 'react'
import { AccessibilityInfo } from 'react-native'

export default function withAccesebility(ChildComponent) {
  return class AccesebilityWrapper extends Component {
    constructor(props) {
      super(props)
      this.state = {
        accesebilityEnabled: false,
      }
    }

    componentDidMount() {
      AccessibilityInfo.fetch()
        .then(accesebilityEnabled => this.setState({ accesebilityEnabled }))
    }

    render() {
      return (<ChildComponent {...this.props} {...this.state} />)
    }
  }
}
