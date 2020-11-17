import isEmpty from 'lodash/isEmpty'

export default function makeQuery(ids, id) {
  if(isEmpty(ids) || !Array.isArray(ids)) { return }
  const products = ids.filter(item => item !== id)
  if(isEmpty(products)) { return }
  return `query RECENT ($languageCode: LanguageCodeEnum!) { ${products.reduce((selector, id) => selector + ' ' + makeSelector(id), '')} }`
}

function makeSelector(id) {
  return `
 ${id.replace(/=/g, '')}: product(id: "${id}") {
    id
    slug
    name
    translation(languageCode: $languageCode) {
      name
    }
    updatedAt
    inWishlist
    isVip
    thumbnail(size: 510) {
      url
    }
    minimalVariantPrice {
      amount
    }
    pricing {
      onSale
      priceRangeUndiscounted {
        start {
          currency
          gross {
            amount
          }
        }
        stop {
          gross {
            amount
          }
        }
      }
      priceRange {
        start {
          currency
          gross {
            amount
          }
        }
        stop {
          gross {
            amount
          }
        }
      }
    }
  }`
}
