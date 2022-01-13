const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const createTable = `
    CREATE TABLE IF NOT EXISTS people(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(500)
    )
`

const sql = `INSERT INTO people(name) values('John Doe')`

connection.query(createTable)
connection.query(sql)
connection.end()


app.get('/', (req,res) => {
    let people = ''

    const selectPeople = `SELECT * FROM people`

    const connect = mysql.createConnection(config)


    connect.query(selectPeople, (err, result) => {
        if (err) throw new Error

        result.forEach(person => {
            people += `<li>#${person.id} ${person.name}</li>`
        })

        res.send(`
            <h1>Full Cycle Rocks!</h1>
            <ul>
                ${people}
            </ul>
        `)
    })

    connect.end()

})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})