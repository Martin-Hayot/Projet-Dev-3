const express = require("express")
const bodyparser = require("body-parser")
const cors = require("cors")

const app = express();
const port = 3000

const userRouter = require("./routes/user")
const orderRouter = require("./routes/order")
const agendaRouter = require("./routes/agenda")
const masteringRouter = require("./routes/mastering")

app.use(cors())
app.use(express.urlencoded({extended: false}))

app.use("/", userRouter);
app.use("/", orderRouter);
app.use("/", agendaRouter);
app.use("/", masteringRouter);

app.get("/users", (req, res) =>{
    res.status(200).json({
        id: 1,
        username: "titi"
    })
})

app.post("/login", (req, res)=>{
   const url = req.body
   console.log(url);
   res.status(201).send(`<h1>Post success</h1><br><h2>Welcome ${url.email}</h2>`)
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})