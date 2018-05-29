const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

persons = [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
      },
      {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
      },
      {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
      }
    ]
  
// const data = require('db.json');

const http = require('http');

app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(person => person.id.toString() === id )
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    console.log("poisto")
    res.status(204).end("Poistettu")
  })

app.post('/api/persons', (req, res) => {
    const note = req.body
    console.log(person)
  
    response.json(person)
  })


  app.get('/info', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    let pvm = new Date().toUTCString();
    const message = '<P>Puhelinluettelossa ' + persons.length + ' henkilon tiedot</P>'

    res.write(message);
    res.end(pvm);
  })


const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)