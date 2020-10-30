import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

export default function getSlider(banners, type) {
  if(isEmpty(banners.data) || !Array.isArray(banners.data)) {
    return
  }
  const slider = banners.data.filter(Boolean)
    .filter(({ codename, promotion }) => {
      return codename && codename.includes('HOME_PAGE_SLIDER_BANNER') && !!get(promotion, 'isActive')
    })
  return isEmpty(slider) ? undefined : slider
}
