const { Tugas } = require("../models/data.model");


exports.allTugasbyProject = async (req, res) => {
    const tugas = await Tugas.find({ projectId: req.params.projectId });
    return res.json({
        success: true,
        message: `All tugas by project id ${req.params.projectId}`,
        data: tugas
    })
}

exports.updateTugas = async (req, res) => {
    const data = {
        title: req.body.title,
        description: req.body.description,
        startTime: new Date((req.body.startTime)).toISOString(),
        endTime: new Date((req.body.endTime)).toISOString(),
        updatedAt: Date.now()
    }
    const tugas = await Tugas.findByIdAndUpdate(req.params.id, data);
    return res.json({
        success: true,
        message: "Tugas updated successfully",
        data: tugas
    })
}
    
exports.createTugasbyProject = async (req, res) => {
    const data = {
        projectId: req.params.projectId,
        title: req.body.title,
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
}

exports.deleteTugas = async (req, res) => {
    const tugas = await Tugas.findByIdAndDelete(req.params.id);
    return res.json({
        success: true,
        message: "Tugas deleted successfully",
        data: tugas
    })
}