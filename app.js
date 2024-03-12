import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import main from './server/routes/main.js'

const app = express();
const PORT = process.env.PORT || 4800;

//static files
app.use(express.static("public"))

// templeting engine
app.set('view engine', 'ejs');
app.use(expressEjsLayouts);
app.set('layout', './layouts/main')


//set routes 
app.use('/', main);

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})