import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const loginAdmin = async (req, res)=>{
    try {
        const {email, password} = req.body

        if (email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
            
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true, token})

        }else{
            res.json({success:false, message:"Invalid credentials"})
        }

    } catch (error) {
        console.error("Greška prilikom prijave.", error);
        res.status(500).json({ message: "Došlo je do greške prilikom prijave." });
    }
}
export const fetchData = async(req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(404).json({message: "User not Found."});
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: "Error"});
    }
}