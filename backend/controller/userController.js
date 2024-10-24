import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

export const create = async(req, res)=>{
    try {
      const { name, surname, email, phone, date, time } = req.body;

      // Parsiranje datuma u DD.MM.YYYY formatu
      const [day, month, year] = date.split(".");
      const requestedDate = new Date(year, month - 1, day); // meseci su od 0 do 11
      const today = new Date();
      
      // Formatiranje datuma u "dan, mesec, godina"
      const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
      const formattedDate = requestedDate.toLocaleDateString('sr-RS', options);
      
      console.log(formattedDate); // Ispisuje datum u formatu "dan, mesec, godina"
      
        
        
        if (requestedDate < today) {
          
            
          return res.status(400).json({ message: requestedDate + " " + "Ne možete zakazivati termine u prošlosti." });
        }
    
        // Provera da li korisnik već ima zakazan termin u budućnosti
        const futureTermin = await User.findOne({
          email: email,
          date: { $gte: today } // Termin mora biti u budućnosti
        });
    
        if (futureTermin) {
          // Provera da li je prošlo 7 dana od poslednjeg zakazanog termina
          const lastTerminDate = new Date(futureTermin.date);
          const sevenDaysAfterLastTermin = new Date(lastTerminDate.setDate(lastTerminDate.getDate() + 7));
    
          if (requestedDate < sevenDaysAfterLastTermin) {
            return res.status(400).json({
              message: `Već imate zakazan termin. Sledeći termin možete zakazati tek nakon ${sevenDaysAfterLastTermin.toLocaleDateString()}.`
            });
          }
        }
    
        // Kreiranje novog termina
        const newTermin = new User({ name, surname, email, phone, date, time });
        await newTermin.save();
    
        res.status(201).json({ message: `Termin uspešno kreiran za ${date} u ${time} sati!` });
      } catch (error) {
        console.error("Greška prilikom kreiranja termina:", error);
        res.status(500).json({ message: "Došlo je do greške prilikom kreiranja termina." });
      }
}
export const createAppointment = async(req, res)=>{
  try {
      const { name, surname, email, phone, date, time } = req.body;
      

      // Kreiranje novog termina
      const newTermin = new User({ name, surname, email, phone, date, time });
      await newTermin.save();
  
      res.status(201).json({ message: `Termin uspešno kreiran za ${date} u ${time} sati!` });
    } catch (error) {
      console.error("Greška prilikom kreiranja termina:", error);
      res.status(500).json({ message: "Došlo je do greške prilikom kreiranja termina." });
    }
}
export const fetchAppointments = async (req, res) => {
    try {
      const appointments = await User.find({}, 'date time'); // Samo datum i vreme
      if (appointments.length === 0) {
        return res.status(404).json({ message: "Nema zakazanih termina." });
      }
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ error: "Greška prilikom dohvatanja termina." });
    }
  };

  export const fetchEmails = async (req, res) => {
    try {
      const appointments = await User.find({}, 'email'); // Samo datum i vreme
      if (appointments.length === 0) {
        return res.status(404).json({ message: "Nema email-ova." });
      }
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ error: "Greška prilikom dohvatanja emailova." });
    }
  };
  
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
    if (typeof bearerHeader !== 'undefined' && bearerHeader.startsWith("Bearer ")) {
        const bearerToken = bearerHeader.split(" ")[1];
        if (!bearerToken) {
            return res.sendStatus(403); // Token nije prisutan
        }
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403); // Header nije prisutan ili ne sadrži Bearer
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
