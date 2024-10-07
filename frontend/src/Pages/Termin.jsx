import React, { useState } from "react";
import axios from "axios";

const Termin = () => {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/tolmacClients/create", formData);

            console.log("Termin created:", response.data);
            
        } catch (error) {
            console.error("Failed to create termin:", error);
        }
    };

    return (
        <div className="pt-20">
            <h1>Book a Termin</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Client Name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="email" placeholder="Client Name" value={formData.email} onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                <button type="submit">Jebme ti asdasdasdasdasdasdasdasd u</button>
              
            </form>
            
        </div>
    );
};

export default Termin;
