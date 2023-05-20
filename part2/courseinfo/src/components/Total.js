const Total = ({parts}) => {
    const sum = parts.reduce((s, part) => s + part.exercises,0)
    return(
        <h4>
           total of {sum} exercises
        </h4>
    )

}

export default Total;