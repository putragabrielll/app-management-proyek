exports.outError = async (err, response) => { // Function untuk menangani error
    if (err.code === "THROW") {
        return response.status(`${err.status}`).json({
            success: false,
            message: err.message
        })
    }
}