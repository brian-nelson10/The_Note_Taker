const express = require('express');
const path = require('path')
const fs = require('fs');
const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes/index1');

const PORT = process.env.PORT || 3001;
const app = express();

const note = require('./db/db.json');

//parse incoming array or string data
app.use(express.urlencoded({ extended: true }));
//parse incoming json data
app.use(express.json());
app.use(express.static('public'));

// Use apiRoutes
//app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

app.get('/api/notes', (req, res) => {
  res.json(note.slice(1));
})

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

function createNewNote(body, notesArray) {
  const newNote = body;
  if (!Array.isArray(notesArray))
      notesArray = [];

  if (notesArray.length === 0)
      notesArray.push(0);

  body.id = notesArray[0];
  notesArray[0]++;
  notesArray.push(newNote);    
  
  fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify(notesArray, null, 2)
      );
      
      return newNote;
}

// function filterByQuery(query, notesArray) {
//   let filteredNotes = notesArray;
//   if (query.title) {
//       filteredNotes = filteredNotes.filter(note => note.title === query.title);
//   }
//   return filteredNotes;
// }

function findById(id, notesArray) {
  const result = notesArray.filter(newNote => newNote.id === id)[0];
  return result;
}


function validateNote(newNote) {
  if (!newNote.name || typeof newNote.name !== 'string') {
      return false;
  }
  return true;
}

app.post("/notes", (req, res) => {
  req.body.id = notes.length.toString();

  if (!validateNote(req.body)) {
      res.status(400).send("The Note is not properly formatted.");
  } else {
      const newNote = createNewNote(req.body, note);
      res.json(newNote);
  }
});

// app.get("/notes", (req, res) => {
//   let results = notes;
//   if (req.query) {
//       results = filterByQuery(req.query, results);
//   }
//   console.log(req.query)
//   res.json(results);
// });

app.get("/notes/:id", (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
      res.json(result);
  } else {
      res.sendStatus(404);
  }
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });