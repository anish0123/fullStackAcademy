import Input from "./Input"

const PersonForm = ({submit, handleNameChange, handleNumberChange, newName, newNumber}) => {

    return(
        <form onSubmit={submit}>
        <div>
          <Input
            title="name : "
            handleChange={handleNameChange}
            value={newName}
          />
        </div>
        <div>
          <Input
            title="number : "
            handleChange={handleNumberChange}
            value={newNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
};

export default PersonForm;