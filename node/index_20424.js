const express = require('express')
const app = express()
const port = 3000;

app.post('/', (req, res) => {
    console.log("Get ejecutado en raiz");
    res.send("Hello desde post")
})

app.put('/', (req, res) => {
    console.log("Get ejecutado en raiz");
    res.send("Hello desde put")
})

app.get('/', (req, res) => {
    console.log("Get ejecutado en raiz");
    res.send("Mi primer end point")
})
app.delete('/', (req, res) => {
    console.log("Get ejecutado en raiz");
    res.send("Mi primer end point")
})


app.listen(port, () => {
    console.log("Servidor de ejemplo ejecutando en " + port)
})