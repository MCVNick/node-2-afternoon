require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')

const ctrl = require('./controller')

const app = express()
app.use(bodyParser.json())

massive(process.env.CONNECTION_STRING)
    .then((db) => {
        app.set('db', db)
    })
    .catch((err) => console.log('Error', err))

app.get('/api/products', ctrl.getAll)
app.get('/api/products/:id', ctrl.getOne)
app.put('/api/products/:id', ctrl.update)
app.post('/api/products', ctrl.create)
app.delete('/api/products/:id', ctrl.delete)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log('Server listening on port', PORT))