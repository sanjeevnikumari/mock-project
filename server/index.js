// const express=require("express")
// const mongoose=require("mongoose")
// const cors=require("cors")
// const app=express();

// app.use(express.json())
// app.use(cors())


// mongoose.connect("mongodb://127.0.0.1:27017/employee")
// const EmployeeModel = require('./models/Employee');

// app.post("/login",(req,res)=>{
//     const {email,password}=req.body;
//     EmployeeModel.findOne({email:email})
//     .then(user=>{
//         if(user){
//             if(user.password==password){
//                 res.json("success")
//             }else{
//                 res.json("the password is incorrect")
//             }
//         }else{
//             res.json("no record existed")
//         }
//     })
// })



// app.post('/register', (req, res) => {
//     EmployeeModel.create(req.body)
//         .then(employee => res.json(employee))
//         .catch(err => res.json(err));
// });

// app.listen(3001,()=>{
//     console.log("server is running")
// })

///backend
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Models
const EmployeeModel = require("./models/Employee");
app.get('/', (req, res) => {
  res.send('✅ Server is live and MongoDB is connected!');
});

// Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email })
    .then(user => {
      if (!user) return res.json("no record existed");
      if (user.password === password) return res.json("success");
      return res.json("the password is incorrect");
    })
    .catch(err => res.status(500).json({ error: "Login failed", details: err }));
});

// Register Route
app.post("/register", (req, res) => {
  EmployeeModel.create(req.body)
    .then(employee => res.json(employee))
    .catch(err => res.json(err));
});

// Chat Interview Routes
const interviewRoutes = require("./routes/interviewRoutes");
app.use("/api", interviewRoutes);

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
