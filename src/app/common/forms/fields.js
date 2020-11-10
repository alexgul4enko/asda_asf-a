import BaseFieldHOC from './BaseFieldHOC'

import TextInput from './inputs/textInput'
import LinkInput from './inputs/linkInput'
import BoolInput from './inputs/boolInput'
import RadioInput from './inputs/radioInput'
import DateInput from './inputs/dateInput'

const TextField = BaseFieldHOC(TextInput)
const LinkField = BaseFieldHOC(LinkInput)
const BoolField = BaseFieldHOC(BoolInput)
const RadioField = BaseFieldHOC(RadioInput)
const DateField = BaseFieldHOC(DateInput)

export {
  TextField,
  LinkField,
  BoolField,
  RadioField,
  DateField,
}
