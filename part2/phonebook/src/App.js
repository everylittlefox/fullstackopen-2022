import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((p) => setPersons(p.data));
  }, []);

  const handleNewNameChange = (e) =>
    setNewPerson((s) => ({ ...s, name: e.target.value }));
  const handleNewNumberChange = (e) =>
    setNewPerson((s) => ({ ...s, number: e.target.value }));

  const addName = (e) => {
    e.preventDefault();
    const personWithNameExists = persons.some(
      (p) => p.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    if (personWithNameExists) {
      alert(`${newPerson.name} is already added to phonebook`);
    } else {
      newPerson.id = persons.length + 1;
      setPersons([...persons, newPerson]);
      setNewPerson({ name: "", number: "" });
    }
  };

  const handleQueryChange = (e) => setQuery(e.target.value);

  const personsToDisplay = query
    ? persons.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={query} onChange={handleQueryChange} />
      <h3>Add a new</h3>
      <PersonForm
        name={newPerson.name}
        number={newPerson.number}
        onNameChange={handleNewNameChange}
        onNumberChange={handleNewNumberChange}
        onSubmit={addName}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToDisplay} />
    </div>
  );
};

const Filter = ({ query, onChange }) => (
  <div>
    filter shown with a <input value={query} onChange={onChange} />
  </div>
);

const PersonForm = ({
  name,
  onNameChange,
  number,
  onNumberChange,
  onSubmit,
}) => (
  <form>
    <div>
      <div>
        name: <input value={name} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={number} onChange={onNumberChange} />
      </div>
    </div>
    <div>
      <button onClick={onSubmit} type="submit">
        add
      </button>
    </div>
  </form>
);

const Persons = ({ persons }) => (
  <table>
    <tbody>
      {persons.map(({ name, number }) => (
        <tr key={number}>
          <th align="left">{name}</th>
          <td>{number}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default App;
