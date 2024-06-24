const mongoose = require("../lib/mongoose.lib");

exports.Project = mongoose.model("Project", {
    name: String,
    description: String,
    createdAt: Date,
    updatedAt: Date
});

exports.Tugas = mongoose.model("Tugas", {
    projectId: String,
    title: String,
    description: String,
    startTime: String,
    endTime: String,
    createdAt: Date,
    updatedAt: Date
})