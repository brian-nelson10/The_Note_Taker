// const fs = require("fs");
// const path = require("path");


// function createNewNote(body, notesArray) {
//     const newNote = body;
//     if (!Array.isArray(notesArray))
//         notesArray = [];

//     if (notesArray.length === 0)
//         notesArray.push(0);

//     body.id = notesArray[0];
//     notesArray[0]++;
//     notesArray.push(newNote);    
    
//     fs.writeFileSync(
//         path.join(__dirname, './db/db.json'),
//         JSON.stringify(notesArray, null, 2)
//         );
        
//         return newNote;
// }

// // function filterByQuery(query, notesArray) {
// //     let filteredNotes = notesArray;
// //     if (query.title) {
// //         filteredNotes = filteredNotes.filter(note => note.title === query.title);
// //     }
// //     return filteredNotes;
// // }

// function findById(id, notesArray) {
//     const result = notesArray.filter(newNote => newNote.id === id)[0];
//     return result;
// }

// function validateNote(newNote) {
//     if (!newNote.name || typeof newNote.name !== 'string') {
//         return false;
//     }
//     return true;
// }

// module.exports = {
//     //filterByQuery,
//     findById,
//     createNewNote,
//     validateNote
// };