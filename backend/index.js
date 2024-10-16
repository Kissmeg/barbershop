import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import route from "./routes/userRoutes.js"
import cors from "cors";
import jwt  from "jsonwebtoken"
import adminRoute from "./routes/adminRoutes.js"

const app = express();

app.use(express.json())
app.use(bodyParser.json());
app.use(cors());

dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGURL = process.env.MONGO_URL;

mongoose.connect(MONGURL).then(()=>{
    console.log("Mongodb Atlas running")
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
        
    })
}).catch((error)=> console.log(error));

app.use("/api", route);
app.use("/api/admin", adminRoute);
