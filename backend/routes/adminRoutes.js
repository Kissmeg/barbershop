import express from 'express'
import { fetchData, loginAdmin } from '../controller/adminController.js'
import { authAdmin } from '../middlewares/authAdmin.js';
const adminRoute = express.Router()

adminRoute.post('/login', loginAdmin);
adminRoute.get('/getAllUsers', fetchData);

export default adminRoute;
