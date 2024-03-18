import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import main from './server/routes/main.js'
import authentication from './server/routes/authentication.js'
import pg from 'pg'
import bcrypt from 'bcrypt'
import bodyParser from "body-parser";



const app = express();
const PORT = process.env.PORT || 4800;
app.use(bodyParser.urlencoded({ extended: false }))

//static files
app.use(express.static("public"))

// templeting engine
app.set('view engine', 'ejs');
app.use(expressEjsLayouts);
app.set('layout', './layouts/main')

//connect to database
const client = new pg.Client({
    user: 'airline',
    host: 'localhost',
    database: 'airline-app',
    password: 'airline',
    port: 5433,
});

client.connect()
    .then(() => {

        console.log('Connected to PostgreSQL database');

        app.listen(PORT, () => {
            console.log(`app listening on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL:', err.message);
    });

//set routes 
app.use('/', main);
app.use('/', authentication);
export default client;