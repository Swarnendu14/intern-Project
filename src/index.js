const express = require('express');
const bodyParser = require('body-parser');
const route = require('../src/routes/route');

const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://swarnenduktpp:Rq0bKY4NZeTmPE0F@cluster0.qntniml.mongodb.net/InternCollege?retryWrites=true&w=majority', {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});