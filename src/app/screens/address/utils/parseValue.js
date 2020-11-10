import parseValue from 'common/utils/parseValue'


const parseUpdate = parseValue('data.accountAddressUpdate.accountErrors', 'data.accountAddressUpdate', {})
const parseCreate = parseValue('data.accountAddressCreate.accountErrors', 'data.accountAddressCreate', {})
const parseDelete = parseValue('data.accountAddressDelete.accountErrors', 'data.accountAddressDelete', {})
export {
  parseUpdate,
  parseCreate,
  parseDelete,
}
