import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderColor: '#DDDDDD',
    paddingHorizontal: 12,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 0,
  },
  text: {
    paddingRight: 12,
  },
  modal: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  overlay: {
    flex: 1,
    alignSelf: 'stretch',
  },
  form: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 14,
  },
})
