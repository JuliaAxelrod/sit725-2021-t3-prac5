let express = require ("express");
let router = express.Router();

router.get('/', (req,res) => {
    // call a method from the controller
    // res.send (data);
    res.send("this has worked from guides");
});

    // To get a priject by id
router.get('/{id}', (req,res) => {
    // call a method from the controller to insert data to the db
    res.send("this has worked from guides");
});

router.post('/', (req,res) => {
    // call a method from the controller to insert data to the db
    res.sendStatus(204);
});

// remove a given project
router.delete('/', (req,res) => {
    // call a method from the controller to delete data from the db
    res.sendStatus(204);
});

// update a given project
router.put('/', (req,res) => {
    // call a method from the controller to insert data to the db
    res.sendStatus(204);
});

module.exports = router;