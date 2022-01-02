let express = require ("express");
let router = express.Router();

let controller = require("../controller/projectController");


router.get('/', (req,res) => {
    controller.getProjects(res);
});

    // To get a priject by id
router.get('/:id', (req, res) => {
    // call a method from the controller to insert data to the db
    res.send("this has worked from projects");
});

router.post('/', (req, res) => {
   controller.insertProject(req.body, res)
});

// remove a given project
router.delete('/:id', (req,res) => {
    // call a method from the controller to delete data from the db
    controller.deleteProject(req.params.id, res);
    res.sendStatus(204);
});

// update a given project
router.put('/', (req,res) => {
    // call a method from the controller to insert data to the db
    res.sendStatus(204);
});

module.exports = router;