import express from 'express'
import { deleteUser, fetchData, loginAdmin, updateUser } from '../controller/adminController.js'
import  authAdmin from '../middlewares/authAdmin.js';
import { ensureToken } from '../controller/userController.js';
const adminRoute = express.Router()

adminRoute.post('/login', loginAdmin);
adminRoute.get('/getAllUsers', ensureToken, fetchData);

adminRoute.put("/update/:id", updateUser);

adminRoute.delete('/delete/:id', deleteUser);

export default adminRoute;
