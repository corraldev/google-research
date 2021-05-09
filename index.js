var express = require('express')
var morgan = require('morgan')

var app = express()

app.use(morgan('combined'))

app.get('/', function (req, res) {
    res.cookie('corraldev', 'hackerone');
    res.send('corraldev@wearehackerone.com')
})

app.listen(8080);