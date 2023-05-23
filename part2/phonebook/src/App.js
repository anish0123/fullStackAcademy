import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import axios from "axios";
import phoneService from "./services/Numbers";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    phoneService.getAll().then((numbers) => setPersons(numbers));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const findName = persons.filter((person) => person.name === newName);
    if (findName.length === 0) {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      phoneService.create(newPerson).then((person) => {
        setPersons(persons.concat(person));
      });
      setNewName("");
      setNewNumber("");
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) 
       {
        const newPerson = {
          name: newName,
          number: newNumber,
        };
        phoneService.update(findName[0].id, newPerson).then((p) => {
          setPersons(
            persons.map((person) =>
            person.id === findName[0].id ? p : person
            )
          );
        });
        setNewName("");
        setNewNumber("");
      }
    }
  };

  const deletePerson = (id) => {
    const person = persons.filter((person) => person.id === id);
    if (window.confirm(`Delete ${person[0].name}?`)) {
      phoneService
        .remove(id)
        .then((numbers) =>
          setPersons(persons.filter((person) => person.id !== id))
        );
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>PhoneBook</h2>
      <Filter search={search} handleChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm
        submit={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} remove={deletePerson} />
    </div>
  );
};

export default App;
