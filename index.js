const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')

app.use(bodyParser.json())

app.use(express.static('build'))


// Morgan
morgan.token('person', function getPerson (req) {
  return req.person
})

app.use('/api/persons', morgan(':method :person :url :status :res[content-length] - :response-time'))

app.use(assignPerson)

const cors = require('cors');
app.use(cors())


function assignPerson (req, res, next) {
  console.log("morgan: ", req.method)
  if (req.method === "POST") {
    req.person = JSON.stringify({ name: req.body.name, number: req.body.number })
  }
  next()
}

let persons = [
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
    const body = req.body
    console.log(body)
  
    if (body.number === undefined || body.name === undefined) {
      return res.status(400).json({error: 'content missing'})
    }

    console.log(persons)
    console.log(body.name)
    if (persons.find(person => person.name === body.name)) {
      return res.status(400).json({error: 'name already exists'})
    }
    

    const generateId = () => { return Math.round(Math.random() * 999999) }

    const person = {
      number: body.number,
      name: body.name,
      id: generateId()
    }

    persons = persons.concat(person);
    res.json(persons)
  })


  app.get('/info', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    let pvm = new Date().toUTCString();
    const message = '<P>Puhelinluettelossa ' + persons.length + ' henkilon tiedot</P>'

    res.write(message);
    res.end(pvm);
  })


const port = process.env.PORT || 3001
app.listen(port, () => {console.log(`Server running on port ${port}`)})
