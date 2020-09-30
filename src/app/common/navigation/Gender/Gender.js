import Button from 'common/widgets/button'
import styles from './gender.styles'

export default function Gender({ gender, changeGender }) {
  return (
    <Button title={gender} style={styles.btn} onPress={changeGender}/>
  )
}
