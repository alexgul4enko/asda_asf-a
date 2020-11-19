import Config from 'react-native-config'
import { match } from 'path-to-regexp'

const links = [
  { test: match('/designers'), routeName: 'Designers' },
  { test: match('/celebrities'), routeName: 'Celebrities' },
  { test: match('/profile/wishlist'), routeName: 'Favourites' },
  { test: match('/basket'), routeName: 'Cart' },
  { test: match('/designer/:slug'), routeName: 'Designer' },
  { test: match('/celebrity/:slug'), routeName: 'Celebrity' },
  { test: match('/products/:type/:slug'), routeName: 'Products' },
  { test: match('/product/:slug'), routeName: 'Product' },
  { test: match('/order-detail/:token'), routeName: 'Order' },
]

export default function navigateByUrl(url, navigate) {
  if(!url || !url.includes(Config.SITE_URL)) { return }
  const path = url.replace(Config.SITE_URL, '')
  const reg = links.find(link => link.test(path))
  if(reg && typeof navigate === 'function') {
    const params = reg.test(path)
    navigate(reg.routeName, params.params)
  }
}

export function canHanldeUrl(url) {
  if(!url || !url.includes(Config.SITE_URL)) { return }
  const path = url.replace(Config.SITE_URL, '')
  return Boolean(links.find(link => link.test(path)))
}
