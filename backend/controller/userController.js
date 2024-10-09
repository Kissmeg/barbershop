import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

export const create = async(req, res)=>{
    try {
        const { name, surname, email, phone, date, time } = req.body;
    
        // Provera da li je isti email već iskoristio zakazivanje u poslednjih 7 dana
        const existingTermin = await User.findOne({
          email,
          date: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) }
        });
    
        if (existingTermin) {
          return res.status(400).json({ message: "Već postoji zakazan termin za ovaj email u poslednjih 7 dana." });
        }
    
        // Kreiranje novog termina
        const newTermin = new User({ name, surname, email, phone, date, time });
        await newTermin.save();
    
        res.status(201).json({ message: "Termin uspešno kreiran!" });
      } catch (error) {
        console.error("Greška prilikom kreiranja termina:", error);
        res.status(500).json({ message: "Došlo je do greške prilikom kreiranja termina." });
      }
}

export const prot = async (req, res) => {
    try {
        // Proveri token
        jwt.verify(req.token, process.env.SECRET_KEY, (err, data) => {
            if (err) {
                res.sendStatus(403);
            } else {
                res.json({
                    token: req.token,
                    data: data
                });
            }
        });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

// Dodaj `export` da bi mogla biti uvezena
export function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

export const termin = async(req, res) => {
    try {
        const user = {id: 3};
        const token = jwt.sign({user}, process.env.SECRET_KEY);
        res.json({
            token: token
        });
    } catch (error) {
        res.status(500).json({error: "Error"});
    }
}

export const fetch = async(req, res) => {
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

export const update = async(req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findOne({_id: id});
        if (!userExist) {
            return res.status(404).json({message: "User not found."});
        }
        const updateUser = await User.findByIdAndUpdate(id, req.body, {new: true});
        res.status(201).json(updateUser);
    } catch (error) {
        res.status(500).json({error: "Error"});  
    }
}

export const deleteUser = async(req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findOne({_id: id});
        if (!userExist) {
            return res.status(404).json({message: "User not found."});
        }
        await User.findByIdAndDelete(id);
        res.status(201).json({message: "User Deleted Sucessfully"});
    } catch (error) {
        res.status(500).json({error: "Error"});  
    }
}
