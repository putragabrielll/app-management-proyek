const { Project } = require("../models/data.model");
const { Tugas } = require("../models/data.model");
const hedleError = require("../helpers/utils");
const moment = require("moment");


exports.allTugasbyProject = async (req, res) => {
    const tugas = await Tugas.find({ projectId: req.params.projectId });
    return res.json({
        success: true,
        message: `All tugas by project id ${req.params.projectId}`,
        data: tugas
    })
}

exports.updateTugas = async (req, res) => {
    try {
        const data = {
            title: req.body.title,
            status: req.body.status,
            description: req.body.description,
            startTime: new Date((req.body.startTime)).toISOString(),
            endTime: new Date((req.body.endTime)).toISOString(),
            updatedAt: Date.now()
        }
        if ((!req.body.title) || (!req.body.startTime) || (!req.body.endTime)) {
            throw ({ code: "THROW", message: "Data cannot be empty" })
        }
        const tugas = await Tugas.findByIdAndUpdate(req.params.id, data);
        if (!tugas) {
            throw ({ code: "THROW", message: "Tugas not found" })
        }
        return res.json({
            success: true,
            message: "Tugas updated successfully",
            data: tugas
        })
    } catch (err) {
        hedleError.outError(err, res)
    }
}
    
exports.createTugasbyProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            throw ({ code: "THROW", message: "Project not found" })
        } else if ((!req.body.title) || (!req.body.startTime) || (!req.body.endTime)) {
            throw ({ code: "THROW", message: "Data cannot be empty" })
        } else if (moment(req.body.startTime).isAfter(req.body.endTime, "minute")) {
            throw ({ code: "THROW", message: "Start time cannot be greater than end time" })
        }
        const data = {
            projectId: req.params.projectId,
            title: req.body.title,
            status: false,
            description: req.body.description,
            startTime: new Date((req.body.startTime)).toISOString(),
            endTime: new Date((req.body.endTime)).toISOString(),
            createdAt: Date.now(),
            updatedAt: null
        }
    
        const tugas = new Tugas(data);
        await tugas.save();
        
        return res.json({
            success: true,
            message: "Tugas created successfully",
            data: tugas
        })
    } catch (err) {
        hedleError.outError(err, res)
    }
}

exports.deleteTugas = async (req, res) => {
    try {
        const tugas = await Tugas.findByIdAndDelete(req.params.id);
        if (!tugas) {
            throw ({ code: "THROW", message: "Tugas not found" })
        }
        return res.json({
            success: true,
            message: "Tugas deleted successfully",
            data: tugas
        })
    } catch (err) {
        hedleError.outError(err, res)
    }
}

exports.tugasNotCompletedbyProject = async (req, res) => {
    const tugas = await Tugas.find({
        projectId: req.params.projectId,
        status: false
    });
    return res.json({
        success: true,
        message: `Tugas not completed by project id ${req.params.projectId}`,
        data: tugas
    })
}