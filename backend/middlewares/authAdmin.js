import jwt from 'jsonwebtoken'

// admin authentication middleware

export const authAdmin = async(req, res, next)=>{
    try {
        
        const {adminToken} = req.headers
        if (!adminToken) {
            return res.json({success:false, message:'Not authorized login again'})
        }
        const token_decode = jwt.verify(adminToken, process.env.JWT_SECRET)
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({success:false, message:'Not authorized login again'})
        }
        next()


    } catch (error) {
        console.error("Greška prilikom prijave.", error);
        res.status(500).json({ message: "Došlo je do greške prilikom prijave." });
    }
}