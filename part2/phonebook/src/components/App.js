/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import personService from '../services/persons';

const Person = ({ person, handleDelete }) => {
  return (
    <li key={person.id}>
      {person.name} {person.number}{' '}
      <button name={person.name} value={person.id} onClick={handleDelete}>
        {' '}
        delete{' '}
      </button>
    </li>
  );
};

const Filter = ({ search, onChange }) => {
  return (
    <div>
      filter shown with <input value={search} onChange={onChange} />
    </div>
  );
};

const PersonForm = ({
  newName,
  newNumber,
  handleAddButton,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={handleAddButton}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Message = ({ message }) => {
  if (!message) return null;

  const messageStyle = {
    color: 'blue',
    background: 'white',
    fontSize: 16,
    borderStyle: 'solid',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  };

  return <div style={messageStyle}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  const makeMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  useEffect(() => {
    personService.getAll().then((data) => {
      console.log(data);
      setPersons(data);
    });
  }, []);

  const handleAddButton = (event) => {
    event.preventDefault();

    const samePerson = persons.find((person) => person.name === newName);
    if (samePerson) {
      const result = window.confirm(
        `${newName} is already added to the phonebook, replace old number with the new one?`
      );

      if (result) {
        const updatedPerson = {
          ...samePerson,
          number: newNumber,
        };

        personService
          .update(samePerson.id, updatedPerson)
          .then(() => {
            setPersons(
              persons.map((person) =>
                person.id == samePerson.id ? updatedPerson : person
              )
            );
            makeMessage(`${newName} is updated`, 'success');
          })
          .catch((e) => {
            makeMessage(`${e.response.data.error}`);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(newPerson)
        .then(() => {
          setPersons(persons.concat(newPerson));
          makeMessage(`${newName} is added to phonebook`, 'success');
        })
        .catch((err) => {
          makeMessage(`${err.response.data.error}`);
        });
    }
    setNewName('');
    setNewNumber('');
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

  const handleDelete = (event) => {
    const result = window.confirm(
      `Are you sure you want to delete ${event.target.name}?`
    );
    if (result) {
      const id = event.target.value;
      personService.remove(id);
      setPersons(persons.filter((person) => person.id != id));
      console.log(persons);
    }
  };

  const personsToShow = search
    ? persons.filter((person) =>
        person.name.toLowerCase().startsWith(search.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} />
      <Filter search={search} onChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleAddButton={handleAddButton}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => (
          <Person person={person} handleDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
};

export default App;
