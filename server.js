const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json())

mongoose.connect(
    process.env.MONGODB_URL
)

app.get('/', (req, res) => {
    res.status(200).send("Working well");
})

app.post("/create/admin", (req, res) => {
    res.status(200).send(req.body);
})

// Admin Post Request
app.use('/admin', require('./Routes/Admin/admin.post'));

// Client Get Request
app.use("/client", require("./Routes/Client/client.get"));

// Client Post Request
app.use('/client', require('./Routes/Client/client.post'));

const port = process.env.PORT || 3004;

app.listen(port, () => console.log(`Server is running on port${port}`))
