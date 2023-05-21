const Input = ({title, handleChange, value}) => {

    return (
        <div>
        {title} <input onChange={handleChange} value={value} />
      </div>
    )
}

export default Input