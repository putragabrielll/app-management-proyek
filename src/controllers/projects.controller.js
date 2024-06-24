const { Project } = require("../models/data.model");
const hedleError = require("../helpers/utils");

exports.allProject = async (req, res) => {
    const projects = await Project.find();
    return res.json({
        success: true,
        message: "All projects",
        data: projects
    })
}

exports.oneProject = async (req, res) => {
    const project = await Project.findById(req.params.id);
    return res.json({
        success: true,
        message: "One project",
        data: project
    })
}

exports.updateProject = async (req, res) => {
    // const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // return res.json({
    //     success: true,
    //     message: "Project updated successfully",
    //     data: project
    // })

    try {
        if (!req.body.name) {
            throw ({ code: "THROW", message: "Name is required" })
        }
        const data = {
            name: req.body.name,
            description: req.body.description,
            updatedAt: Date.now()
        }
        const project = await Project.findByIdAndUpdate(req.params.id, data);
        return res.json({
            success: true,
            message: "Project updated successfully",
            data: project
        })
    } catch (err) {
        hedleError.outError(err, res)
    }
}

exports.createProject = async (req, res) => {
    try {
        if (!req.body.name) {
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
        hedleError.outError(err, res)
    }
}

exports.deleteProject = async (req, res) => {
    const project = await Project.findByIdAndDelete(req.params.id);
    return res.json({
        success: true,
        message: "Project deleted successfully",
        data: project
    })
}