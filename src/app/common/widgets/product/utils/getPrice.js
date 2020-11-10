import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

export default function getPrice(prices) {
  if(isEmpty(prices)) { return null }
  const fromAmount = get(prices, 'start.gross.amount', '').toLocaleString()
  const fromCurrency = get(prices, 'start.currency')
  const toAmount = get(prices, 'stop.gross.amount', '').toLocaleString()
  const toCurrency = get(prices, 'stop.currency')
  const fromPrice = [fromCurrency, fromAmount].filter(Boolean).join(' ')
  const toPrice = [toCurrency || fromCurrency, toAmount].filter(Boolean).join(' ')
  return Array.from(new Set([fromPrice, toPrice].filter(Boolean))).join(' - ')
}
