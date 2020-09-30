import errors from './constants'

export function required(value) {
  return !value ? errors.required : undefined
}
