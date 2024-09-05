require('dotenv').config();

const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
const connectDB = require('./server/config/db');



app.use(express.static('public'));


//Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs'); //Set view engine is ejs


const PORT = 3000 || process.env.PORT;


// Connect to DB
connectDB();


app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})

