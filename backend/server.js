const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
require('dotenv').config()

// SERVER PORT
// PORT DU SERVEUR
const serverPort = process.env.SERVER_PORT;


/* GET VAR ENV FOR DATABASE CONNECTION */
/* RECUPERE LES VARIABLES D'ENVIRONNEMENT POUR LA CONNEXION AVEC LA BDD */
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
})

// We try to connect to the database
// On essaie de se connecter à la base de donner
connection.connect(err => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
})


const app = express()
app.use(cors())

app.get('/', (req, res) => {
    res.send('aller dans /user pour voir les utilisateurs')
})


// Route /user give all users
// La route /user nous donnes tous les utilisateurs
const QUERY_SELECT_ALL_USERS = 'SELECT * FROM USERS'
app.get('/user', (req, res) => {
    connection.query(QUERY_SELECT_ALL_USERS, (err, result) => {
        if (err) {
            return res.send(err)
        } else {
            return res.json({
                data: result
            })
        }
    })
})


// Route for add user
// Route qui permet l'ajout d'un utilisateur
app.get('/user/add', (req, res) => {
    const {
        firstname,
        lastname,
        gender,
        email
    } = req.query;
    
    const INSERT_USER_QUERY = `INSERT INTO USERS(firstname, lastname, gender, email) VALUES('${firstname}', '${lastname}', '${gender}', '${email}')`
    connection.query(INSERT_USER_QUERY, (err, result) => {
        if (err) {
            return res.send(err)
        } else {
            return res.send('L\'utilisateur a été ajouté avec succès')
        }
    })
})

// Route for delete user according to his id
// Route qui permet de supprimer un utilisateur selon son id
app.get('/user/delete', (req, res) => {
    const {
        id
    } = req.query;
    
    const DELETE_USER_QUERY = `DELETE FROM USERS WHERE id=${id}`
    connection.query(DELETE_USER_QUERY, (err, result) => {
        if (err) {
            return res.send(err)
        } else {
            return res.send('L\'utilisateur a été supprimé avec succès')
        }
    })
})






app.listen(serverPort, () => {
    console.log('server is connected to the port: ' + serverPort)
})