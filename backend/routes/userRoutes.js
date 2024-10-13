import express from "express";
import { fetch, create, prot, update, fetchAppointments, deleteUser, termin, ensureToken } from "../controller/userController.js";

const route = express.Router();

// Dodaj `ensureToken` kao middleware na rute koje zahtevaju autorizaciju
route.get("/prot", ensureToken, prot);

route.post("/create", create);

route.get("/getAllUsers",ensureToken, fetch);  // Ovde dodato ensureToken za proveru
route.get("/appointments", fetchAppointments)
route.put("/update/:id", ensureToken, update);  // Ovde takođe ensureToken
route.delete("/delete/:id", ensureToken, deleteUser);  // ensureToken i za brisanje

export default route;
