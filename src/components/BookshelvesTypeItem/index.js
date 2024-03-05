import './index.css'

const BookshelvesTypeItem = props => {
  const {data, onClickTypeParent, isActive} = props
  const {value, label} = data

  const onClickTypeChild = () => {
    onClickTypeParent(value)
  }

  return (
    <li>
      <button
        className={`shelf-type-button ${isActive ? 'active-shelf' : ''}`}
        type="button"
        onClick={onClickTypeChild}
      >
        {label}
      </button>
    </li>
  )
}

export default BookshelvesTypeItem
