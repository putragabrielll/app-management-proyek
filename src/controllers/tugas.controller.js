const { Project } = require("../models/data.model");
const { Tugas } = require("../models/data.model");
const hedleError = require("../helpers/utils");
const moment = require("moment");


exports.allTugasbyProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) { // Jika project tidak ditemukan
            throw ({ code: "THROW", message: "Project not found", status: 404 })
        }
        const tugas = await Tugas.find({ projectId: req.params.projectId }); // Function untuk memunculkan semua tugas berdasarkan id project
        return res.json({
            success: true,
            message: `All tugas by project id ${req.params.projectId}`,
            data: tugas
        })
    } catch (err) {
        hedleError.outError(err, res) // Jika terjadi error
    }
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
        if ((!req.body.title) || (!req.body.startTime) || (!req.body.endTime)) { // Jika data tidak ada atau tidak diisi
            throw ({ code: "THROW", message: "Data cannot be empty", status: 400 })
        }
        const tugas = await Tugas.findByIdAndUpdate(req.params.id, data);
        if (!tugas) { // Jika tugas tidak ditemukan
            throw ({ code: "THROW", message: "Tugas not found", status: 404 })
        }
        return res.json({
            success: true,
            message: "Tugas updated successfully",
            data: tugas
        })
    } catch (err) {
        hedleError.outError(err, res) // Jika terjadi error
    }
}
    
exports.createTugasbyProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) { // Jika project tidak ditemukan
            throw ({ code: "THROW", message: "Project not found", status: 404 })
        } else if ((!req.body.title) || (!req.body.startTime) || (!req.body.endTime)) { // Jika data tidak ada atau tidak diisi
            throw ({ code: "THROW", message: "Data cannot be empty", status: 400 })
        } else if (moment(req.body.startTime).isAfter(req.body.endTime, "minute")) { // Jika start time lebih besar dari end time atau sebaliknya
            throw ({ code: "THROW", message: "Start time cannot be greater than end time", status: 400 })
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
        hedleError.outError(err, res) // Jika terjadi error
    }
}

exports.deleteTugas = async (req, res) => {
    try {
        const tugas = await Tugas.findByIdAndDelete(req.params.id);
        if (!tugas) { // Jika tugas tidak ditemukan
            throw ({ code: "THROW", message: "Tugas not found", status: 404 })
        }
        return res.json({
            success: true,
            message: "Tugas deleted successfully",
            data: tugas
        })
    } catch (err) {
        hedleError.outError(err, res) // Jika terjadi error
    }
}

exports.tugasNotCompletedbyProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) { // Jika project tidak ditemukan
            throw ({ code: "THROW", message: "Project not found", status: 404 })
        }
        const tugas = await Tugas.find({ // Function untuk memunculkan semua tugas yang belum completed berdasarkan id project
            projectId: req.params.projectId,
            status: false
        });
        return res.json({
            success: true,
            message: `Tugas not completed by project id ${req.params.projectId}`,
            data: tugas
        })
    } catch (err) {
        hedleError.outError(err, res) // Jika terjadi error
    }
}