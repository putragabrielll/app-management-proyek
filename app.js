require("dotenv").config({
    path: "./.env"
});

const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => { // cek aplikasi apakah berjalan.
    return res.json({
        success: true,
        message: "Welcome to my API"
    });
})

app.use("/", require("./src/routers/index")); // list End point keseluruhan

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})