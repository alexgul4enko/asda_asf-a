import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  header: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowOpacity: 0.1,
    marginBottom: 4,
    elevation: 6,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
    textAlign: 'left',
  },
  totals: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '600',

  },
  price: {
    fontSize: 14,
    lineHeight: 16,
    marginLeft: 8,
  },
})
