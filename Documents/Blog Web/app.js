require('dotenv').config();

const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');


app.use(express.static('public'));


//Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs'); //Set view engine is ejs


const PORT = 3000 || process.env.PORT;

app.use('/', require('./server/routes/main'));


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})

