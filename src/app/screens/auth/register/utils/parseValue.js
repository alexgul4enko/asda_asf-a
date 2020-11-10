import parseValue from 'common/utils/parseValue'

const errors = {
  PASSWORD_ENTIRELY_NUMERIC: 'password',
  PASSWORD_TOO_COMMON: 'password',
  PASSWORD_TOO_SHORT: 'password',
  PASSWORD_TOO_SIMILAR: 'password',
  UNIQUE: 'email',
}


export default parseValue('data.accountRegister.accountErrors', 'data.accountRegister.user', errors)
