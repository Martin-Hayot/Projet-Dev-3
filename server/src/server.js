const express = require("express")
const bodyparser = require("body-parser")
const cors = require("cors")

const app = express();
const port = 3000

app.use(cors())

app.get("/users", (req, res) =>{
    res.status(200).json({
        id: 1,
        username: "titi"
    })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})