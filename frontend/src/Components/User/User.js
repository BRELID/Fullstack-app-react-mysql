import React, { Component } from 'react'
import './User.css'

const SERVER_PORT = 4200
const APP_URL = `http://localhost:${SERVER_PORT}`


export default class User extends Component {

    state = {
      users: [],
      user: {
        firstname: 'John',
        lastname: 'Doe',
        gender: 'male',
        email: 'john.doe@coolmail.com'
      }
    }
  
    // When the component did mount we show users
    // Lorsque le composant est monté, nous affichons les utilisateurs
    componentDidMount(){
      this.getUsers()
    }
  


  
   
  
    addUser = _ => {
      const { user } = this.state

      fetch(`${APP_URL}/user/add?firstname=${user.firstname}&lastname=${user.lastname}&gender=${user.gender}&email=${user.email}`)
      .then(this.getUsers)
      .catch( err => console.log(err))
    }


    deleteUser = id => {
        console.log(id);
        let confirmation = window.confirm("Are you really sure you want to delete this user ?")

        if(confirmation){

            fetch(`${APP_URL}/user/delete?id=${id}`)
            .then(this.getUsers)
            .catch( err => console.log(err))
          }
    }


    // Give all user from database
    // Nous transmet tous les utilisateurs de la BDD
    getUsers = () => {
        fetch(`${APP_URL}/user`)
        .then(response => response.json())
        .then(response => this.setState({ users: response.data}))
        .catch(err => console.log(err))
      }

    renderUser = ({ id, firstname, lastname, gender, email}) => 
    (
    <tr key={id}><td>{firstname} {lastname}</td><td>{gender}</td><td>{email}</td><td><button onClick={() => this.deleteUser(id)}> Supprimer</button></td></tr>
    )
  
    render() {
      const { users, user } = this.state
      return (
        <div className="User">

            <table>
                <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Delete</th>
                </tr>
                {users.map(this.renderUser)}
            </table>
  
          <div>
            <h2>Ajouter un nouvel utilisateur</h2>
            <div>
            <label htmlFor="firstname">Firstname: </label>
            <input
                name="firstname"
                id="firstname"
                value={user.firstname}
                onChange={e => this.setState({ user: {...user, firstname:e.target.value}})} />
            <label htmlFor="lastname">Lastname: </label>
            <input
                name="lastname"
                id="lastname"
                value={user.lastname}
                onChange={e => this.setState({ user: {...user, lastname:e.target.value}})} />
            <br />
            <label htmlFor="gender">Gender: </label>
            <input
                name="gender"
                id="gender"
                value={user.gender}
                onChange={e => this.setState({ user: {...user, gender:e.target.value}})} />
            <label htmlFor="email">Email: </label>    
            <input
                name="email"
                id="email"      
                value={user.email}
                onChange={e => this.setState({ user: {...user, email:e.target.value}})} />
            <button onClick={this.addUser}> Ajouter</button>
            </div>
            
          </div>
        </div>
      );
    }
  }
