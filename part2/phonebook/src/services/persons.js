import axios from "axios";

const baseUrl = "/api/persons";

const fetchAll = () => axios.get(baseUrl).then((r) => r.data);

const createPerson = (newPerson) =>
  axios.post(baseUrl, newPerson).then((r) => r.data);

const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`);

const updatePerson = (person) =>
  axios.put(`${baseUrl}/${person.id}`, person).then((r) => r.data);

const personsService = { fetchAll, createPerson, deletePerson, updatePerson };

export default personsService
