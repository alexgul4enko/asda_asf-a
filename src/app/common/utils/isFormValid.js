export default function isFormValid(form = {}) {
  if(!form.dirty) {
    return false
  }
  if(form.hasValidationErrors) {
    return false
  }
  if(form.hasSubmitErrors && !form.dirtySinceLastSubmit) {
    return false
  }
  return true
}
