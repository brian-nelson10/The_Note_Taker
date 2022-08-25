// const router = require("express").Router();

// const {  findById, createNewNote, validateNote } = require("./lib/index2");
// const note = require('./db/db.json');
// // router.get("/notes", (req, res) => {
// //     let results = notes;
// //     if (req.query) {
// //         results = filterByQuery(req.query, results);
// //     }
// //     console.log(req.query)
// //     res.json(results);
// // });

// router.get("/notes/:id", (req, res) => {
//     const result = findById(req.params.id, notes);
//     if (result) {
//         res.json(result);
//     } else {
//         res.sendStatus(404);
//     }
// });

// router.post("/notes", (req, res) => {
//     req.body.id = note.length.toString();

//     if (!validateNote(req.body)) {
//         res.status(400).send("The Note is not properly formatted.");
//     } else {
//         const newNote = createNewNote(req.body, note);

//         res.json(newNote);
//     }
// });

// module.exports = router;