import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

export default function getBanner(banners, type) {
  if(isEmpty(banners.data) || !Array.isArray(banners.data)) {
    return {}
  }
  return banners.data.filter(Boolean).find(({ codename, promotion }) => codename === type && !!get(promotion, 'isActive'))
}
