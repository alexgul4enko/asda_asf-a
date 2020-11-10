import parseValue from 'common/utils/parseValue'

const errors = {
  PASSWORD_ENTIRELY_NUMERIC: 'newPassword',
  PASSWORD_TOO_COMMON: 'newPassword',
  PASSWORD_TOO_SHORT: 'newPassword',
  PASSWORD_TOO_SIMILAR: 'newPassword',
}


export default parseValue('data.passwordChange.accountErrors', 'data.passwordChange.user', errors)
