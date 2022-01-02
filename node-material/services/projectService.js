let dbo = require('../db/conn');

let projectCollection;

setTimeout(() => {
    projectCollection = dbo.getDB().collection ("projects");
},5000);

const getAllProjects = (res) => {
    projectCollection.find().toArray((err,result) => {
        if (err) throw err;
        res.send(result);
    } )

}

const insertProject = (project, res) => {
    projectCollection.insertOne(project,(err, ruslt) => {
        if (err) throw err;
        res.send({result: 204 });
    }) 
}

const deleteProject = (id, res) => {
    projectCollection.deleteOne({ projectID: id }, (err, result) => {
        if (err) throw err;
        res.send({ result: 204 });
    })
}

module.exports = { getAllProjects, insertProject, deleteProject}