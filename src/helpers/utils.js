exports.outError = async (err, response) => { // Function untuk menangani error
    if (err.code === "THROW") {
        return response.status(500).json({
            success: false,
            message: err.message
        })
    }
}