import { useState, useEffect } from "react";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personsService.fetchAll().then((persons) => setPersons(persons));
  }, []);

  const handleNewNameChange = (e) =>
    setNewPerson((s) => ({ ...s, name: e.target.value }));
  const handleNewNumberChange = (e) =>
    setNewPerson((s) => ({ ...s, number: e.target.value }));

  const addPerson = (e) => {
    e.preventDefault();
    const personWithName = persons.find(
      (p) => p.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    if (personWithName) {
      const shouldUpdate = window.confirm(
        `${personWithName.name} is already added to phonebook, replace the old number with a new one?`
      );

      if (shouldUpdate) {
        personsService
          .updatePerson({ ...personWithName, number: newPerson.number })
          .then((updatedPerson) =>
            setPersons(
              persons.map((p) =>
                p.id === updatedPerson.id ? updatedPerson : p
              )
            )
          )
          .catch((r) => {
            if (r.response.status === 404) {
              setPersons(persons.filter((p) => p.id !== personWithName.id));
              setMessage({
                text: `Information of ${personWithName.name} has already been removed from server`,
                error: true,
              });
            }
            if (r.response.status === 400)
              setMessage({ text: r.response.data.error, error: true });
          });
      }
    } else {
      personsService
        .createPerson(newPerson)
        .then((person) => {
          setPersons([...persons, person]);
          setNewPerson({ name: "", number: "" });
          setMessage({ text: `Added ${person.name}` });
        })
        .catch((r) => {
          if (r.response.status === 400)
            setMessage({ text: r.response.data.error, error: true });
        });
    }
  };

  const deletePerson = (id) => {
    const p = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${p.name}?`))
      personsService
        .deletePerson(id)
        .then(() => setPersons(persons.filter((p) => p.id !== id)));
  };

  const handleQueryChange = (e) => setQuery(e.target.value);

  const personsToDisplay = query
    ? persons.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <Message {...message} onTimedOut={() => setMessage(null)} />}
      <Filter query={query} onChange={handleQueryChange} />
      <h3>Add a new</h3>
      <PersonForm
        name={newPerson.name}
        number={newPerson.number}
        onNameChange={handleNewNameChange}
        onNumberChange={handleNewNumberChange}
        onSubmit={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToDisplay} onDelete={deletePerson} />
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

const Persons = ({ persons, onDelete }) => (
  <table>
    <tbody>
      {persons.map(({ name, number, id }) => (
        <tr key={number}>
          <th align="left">{name}</th>
          <td>{number}</td>
          <td>
            <button onClick={() => onDelete(id)}>delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const Message = ({ text, error, onTimedOut }) => {
  useEffect(() => {
    const ref = setTimeout(() => onTimedOut(), 5000);
    return () => clearTimeout(ref);
  }, [onTimedOut]);

  return <p className={`message ${error ? "error" : "success"}`}>{text}</p>;
};

export default App;
