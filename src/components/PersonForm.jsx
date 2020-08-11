import React from "react";
import axios from 'axios'

export default class PersonForm extends React.Component {
  constructor() {
    super();
    this.state = {
      people: [],
    };
  }

  componentDidMount = (event) => {
    axios.get('/people').then((response) => {
      this.setState({
        people: response.data,
      });
    });
  };

  createPerson = (event) => {
    event.preventDefault();
    axios
      .post('/people', {
        name: this.state.newPersonName,
        age: this.state.newPersonAge,
      })
      .then((response) => {
        console.log(response);
        this.setState({
          people: response.data,
        });
      });
  };

  updatePerson = async (e) => {
    e.preventDefault();
    const id = e.target.getAttribute("id");
    const response = await axios.put(`/people/${id}`, {
      name: this.state.updatePersonName,
      age: this.state.updatePersonAge,
    });
    this.setState({ people: response.data });
  };

  deletePerson = async (e) => {
    const response = await axios.delete(`/people/${e.target.value}`);
    console.log(response.data);
    this.setState({ people: response.data });
  };

  changeNewPersonName = (event) => {
    this.setState({
      newPersonName: event.target.value,
    });
  };

  changeNewPersonAge = (event) => {
    this.setState({
      newPersonAge: event.target.value,
    });
  };

  updatePersonAge = (event) => {
    this.setState({
      updatePersonAge: event.target.value,
    });
  };

  updatePersonName = (event) => {
    this.setState({
      updatePersonName: event.target.value,
    });
  };

  render = () => {
    return (
      <div className="container">
        <h2>Add new person</h2>
        <form onSubmit={this.createPerson}>
          <input
            onKeyUp={this.changeNewPersonName}
            type="text"
            placeholder="name"
          />
          <br />
          <input
            onKeyUp={this.changeNewPersonAge}
            type="number"
            placeholder="age"
          />
          <br />
          <button type="submit">CREATE</button>
        </form>
        <h2>Contact List</h2>
        <ul>
          {this.state.people.map((person) => {
            return (
              <li key={person.id}>
                {person.name}: {person.age}
                <button value={person.id} onClick={this.deletePerson}>
                  DELETE
                </button>
                <form id={person.id} onSubmit={this.updatePerson}>
                  <input
                    onKeyUp={this.updatePersonName}
                    type="text"
                    placeholder="name"
                  />
                  <input
                    onKeyUp={this.updatePersonAge}
                    type="text"
                    placeholder="age"
                  />
                  <button type="submit">Change</button>
                </form>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
}
