import React, { createContext, useState, useEffect } from "react";
import { PersonService } from "../services/PersonService";

export const PersonContext = createContext();

const PersonContextProvider = (props) => {

  const personService = new PersonService();

  const [personTypes, setPersonTypes] = useState([]);

  const [persons, setPersons] = useState([]);

  const [editPerson, setEditPerson] = useState(null);



  useEffect(() => {
    personService.getPersons().then(data => setPersons(data.data))
  }, []);

  useEffect(() => {
    personService.getPersonTypes().then(data => setPersonTypes(data.data))
  }, []);



  const createPerson = (person) => {
    personService.createPerson(person).then((data) => setPersons([...persons, data]));
  };

  const deletePerson = (personid) => {
    personService.deletePerson(personid).then((bool) => bool ? setPersons(persons.filter((p) => p.id !== personid)) : "");
  };

  const updatePerson = (person) => {
    personService
      .updatePerson(person)
      .then((data) => {
        let personsClone = [...persons];
        let personIndex = personsClone.findIndex(idx => idx.id === person.id);
        personsClone[personIndex] = data

        setPersons(
          personsClone
        )
      }

      );
    setEditPerson(null);
  };

  const findPerson = (id) => {
    const person = persons.find((p) => p.id === id);
    setEditPerson(person);
  };

  return (
    <PersonContext.Provider
      value={{
        createPerson,
        deletePerson,
        updatePerson,
        findPerson,
        editPerson,
        persons,
        personTypes
      }}
    >
      {props.children}
    </PersonContext.Provider>
  );
}

export default PersonContextProvider;