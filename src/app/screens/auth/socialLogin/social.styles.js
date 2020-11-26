import { StyleSheet } from 'react-native'
import theme from 'theme'


export default StyleSheet.create({
  root: {
    alignSelf: 'stretch',
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: '#E9E9E9',
    height: 1,
    flex: 1,
  },
  desc: {
    fontSize: 11,
    lineHeight: 16,
    marginHorizontal: 16,
  },
  row: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingVertical: 16,
    height: 64,
    justifyContent: 'space-around',
  },
  btnWrapper: {
    alignSelf: 'stretch',
  },
  fb: {
    flex: 1,
    backgroundColor: '#3B5998',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    width: theme.width / 3,
  },
  fbIcon: {
    height: 32,
    width: 8,
  },
  google: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.grey,
    width: theme.width / 3,
  },
  googleIcon: {
    height: 16,
    width: 16,
  },
})
