const fs = require("fs");
const path = require("path");
 
function filterByQuery(query, notesArray) {
    let filteredNotes = notesArray;
    if (query.title) {
        filteredNotes = filteredNotes.filter(note => note.title === query.title);
    }
    return filteredNotes;
}

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({notes: notesArray}, null, 2)
        );
        
        return note;
}

function validateNote(note) {
    if (!note.name || typeof note.name !== 'string') {
        return false;
    }
    return true;
}

module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    validateNote
};