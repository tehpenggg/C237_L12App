// Import required modules
const express = require('express');

// Create an Express application
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

// Declare any necessary variables or in-memory data structures here
const sessions = [];
let uniqueId = 0;

// TASK: Define appropriate routes below
// ---------------------------------------------------

//Define a route to render the index page
app.get('/', (req, res) => {
    res.render('index',{sessions});
});

// ---------------------------------------------------
app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {

    const newSession = {
        id: uniqueId++,
        sessionName: req.body.sessionName,
        sessionDuration: req.body.sessionDuration
    };

    sessions.push(newSession);

    res.render('confirm', {
        sessionName: req.body.sessionName,
        sessionDuration: req.body.sessionDuration
    });
}); 

app.post('/delete/:id', (req, res) => {

    const id = parseInt(req.params.id); 

    sessions = sessions.filter(p => p.id !== id);

    res.redirect('/');
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});