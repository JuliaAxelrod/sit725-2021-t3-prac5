let service = require ("../services/projectService");

const getProjects = (res) => {
    service.getAllProjects(res);
}

const insertProject = (project,res) => {
    service.insertProject(project, res);
}

const deleteProject = (id, res) => {
    service.deleteProject(id, res);
}

module.exports = {getProjects, insertProject, deleteProject}