const { Project } = require("../models/data.model");
const hedleError = require("../helpers/utils");

exports.allProject = async (req, res) => { // Function untuk memunculkan semua project
    const projects = await Project.find();
    return res.json({
        success: true,
        message: "All projects",
        data: projects
    })
}

exports.oneProject = async (req, res) => {  // Function untuk memunculkan satu project
    try {
        const project = await Project.findById(req.params.id);
        if (!project) { // Jika project tidak ditemukan
            throw ({ code: "THROW", message: "Project not found" })
        }
        return res.json({
            success: true,
            message: "One project",
            data: project
        })
    } catch (err) {
        hedleError.outError(err, res) // Jika terjadi error
    }
}

exports.updateProject = async (req, res) => {
    // const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // return res.json({
    //     success: true,
    //     message: "Project updated successfully",
    //     data: project
    // })

    try {
        const data = {
            name: req.body.name,
            description: req.body.description,
            updatedAt: Date.now()
        }
        if (!req.body.name) { // Jika name tidak ada atau tidak diisi
            throw ({ code: "THROW", message: "Name is required" })
        }
        const project = await Project.findByIdAndUpdate(req.params.id, data);
        if (!project) { // Jika project tidak ditemukan
            throw ({ code: "THROW", message: "Project not found" })
        }
        return res.json({
            success: true,
            message: "Project updated successfully",
            data: project
        })
    } catch (err) {
        hedleError.outError(err, res) // Jika terjadi error
    }
}

exports.createProject = async (req, res) => {
    try {
        if (!req.body.name) { // Jika name tidak ada atau tidak diisi
            throw ({ code: "THROW", message: "Name is required" })
        }
        const data = {
            name: req.body.name,
            description: req.body.description,
            createdAt: Date.now(),
            updatedAt: null
        }

        const project = new Project(data);
        await project.save();

        return res.json({
            success: true,
            message: "Project created successfully",
            data: project
        })
    } catch (err) {
        hedleError.outError(err, res) // Jika terjadi error
    }
}

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) { // Jika project tidak ditemukan
            throw ({ code: "THROW", message: "Project not found" })
        }
        return res.json({
            success: true,
            message: "Project deleted successfully",
            data: project
        })
    } catch (err) {
        hedleError.outError(err, res) // Jika terjadi error
    }
}