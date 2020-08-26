import axios from "axios";



export class PersonService {

    baseUrl = "https://smartestcorrea.azurewebsites.net/person/";

    async createPerson(person) {
        var personcontent = {
            "name": person.name,
            "age": parseInt(person.age),
            "persontypeid": parseInt(person.personTypeId)
        }
        var result = await axios.post(this.baseUrl + "createperson", personcontent);
        return result.data.data[0];
    }

    async deletePerson(personid) {
        var result = await axios.delete(this.baseUrl + "deleteperson/" + personid);
        return result;
    }

    getPersons() {
        return axios.get(this.baseUrl + "getpersons").then(res => res.data);
    }

    async updatePerson(person) {
        var personcontent = {
            "id": person.id,
            "name": person.name,
            "age": parseInt(person.age),
            "persontypeid": parseInt(person.personTypeId)
        }
        var result = await axios.put(this.baseUrl + "updateperson", personcontent);
        return result.data.data[0];
    }

    async getPersonTypes() {
        var result = await axios.get(this.baseUrl + "getpersontypes");
        return result.data;
    }

}