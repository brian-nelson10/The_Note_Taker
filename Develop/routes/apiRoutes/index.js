const router = require("express").Router();
const { notes } = require("../../db/db.json");
const { filterByQuery, findById, createNewNote, validateNote } = require("../../lib/index2");

router.get("/db", (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    console.log(req.query)
    res.json(results);
});

router.get("/db/:id", (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});

router.post("/db", (req, res) => {
    req.body.id = notes.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send("The Note is not properly formatted.");
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

module.exports = router;