import { I18nManager } from 'react-native'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

export default function getPrice(prices) {
  if(isEmpty(prices)) { return null }
  const fromAmount = get(prices, 'start.gross.amount', '').toLocaleString()
  const fromCurrency = get(prices, 'start.currency')
  const toAmount = get(prices, 'stop.gross.amount', '').toLocaleString()
  const toCurrency = get(prices, 'stop.currency')
  const fromPrice = I18nManager.isRTL ? [fromCurrency, fromAmount].filter(Boolean).reverse().join(' ') : [fromCurrency, fromAmount].filter(Boolean).join(' ')
  const toPrice = I18nManager.isRTL ? [toCurrency || fromCurrency, toAmount].filter(Boolean).reverse().join(' ') : [toCurrency || fromCurrency, toAmount].filter(Boolean).join(' ')
  return Array.from(new Set([fromPrice, toPrice].filter(Boolean))).join(' - ')
}
