import Person from "./Person";

const Persons = ({ persons, remove }) => {
    return (
      <div>
        {persons.map((person) => (
          <Person person={person} key={person.id} remove={() => remove(person.id)} />
        ))}
      </div>
    );
  };

  export default Persons;