const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs');

const PORT = process.env.PORT || 3001;


//json file
const theNote = require('./db/db.json');

//parse incoming array or string data
app.use(express.urlencoded({ extended: true }));
//parse incoming json data
app.use(express.json());
app.use(express.static('public'));

// html routes
app.get('/api/notes', (req, res) => {
  res.json(theNote.slice(1));
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
// api route post
app.post('/api/notes', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = theNote.length.toString();

      const newNote = createNewNote(req.body, theNote);
      res.json(newNote);
});

function findById(id, notesArray) {
  const result = notesArray.filter(newNote => newNote.id === id)[0];
  return result;
}

// api route get id 
app.get("/notes/:id", (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
      res.json(result);
  } else {
      res.sendStatus(404);
  }
});

function deleteNote(id, notesArray) {
  for (let i = 0 ; i < notesArray.length; i ++) {
    let note = notesArray[i];

    if (note.id == id) {
      notesArray.splice(i, 1);
      fs.writeFileSync(
        path.join(__dirname, '.db/db.json'),
        JSON.stringify(notesArray, null, 2)
      );
    }
  }
}

// api route delete note
app.delete('/api/notes/:id', (req, res) => {
  deleteNote(req.params.id, theNote);
  res.json(true);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });