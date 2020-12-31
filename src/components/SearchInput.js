import styles from './SearchInput.module.css'

const SearchInput = ({...rest}) => {
  //{...rest} we wan to use that in the input
  return (
    <div className={styles.wrapper}>
      <input className={styles.input} {...rest} />
    </div>
  )
}

export default SearchInput;