import jwt from 'jsonwebtoken';

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const { adminToken } = req.headers;
        if (!adminToken) {
            return res.json({ success: false, message: 'Not authorized' });
        }

        // Verifikuj token
        const token_decode = jwt.verify(adminToken, process.env.JWT_SECRET);
        
        // Ispiši dekodovan token u konzolu radi provere
        console.log("Dekodovan token:", token_decode);

        // Provera da li token sadrži email i šifru admina
        if (token_decode.email !== process.env.ADMIN_EMAIL || token_decode.password !== process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: 'Not authorized' });
        }

        // Ako je sve u redu, dozvoli pristup
        next();

    } catch (error) {
        console.error("Greška prilikom prijave.", error);
        res.status(500).json({ message: "Došlo je do greške prilikom prijave." });
    }
}

export default authAdmin;
