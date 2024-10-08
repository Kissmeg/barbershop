import React, { useState } from "react";
import axios from "axios";

const Termin = () => {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://barbershop-5827.vercel.app/?vercelToolbarCode=oMyzgW10mN59Sb_", formData);
            console.log("Termin created:", response.data);
            setSuccess("Termin successfully created!");
            setFormData({ name: "", email: "", phone: "" }); // Clear form
            setError(""); // Reset error
        } catch (error) {
            console.error("Failed to create termin:", error);
            setError("Failed to create termin. Please try again.");
            setSuccess(""); // Reset success message
        }
    };

    return (
        <div className="pt-20">
            <h1>Book a Termin</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Client Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Client Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Jebme ti asdasdasdasdasdasdasdasd u</button>
            </form>
            {success && <div className="text-green-500">{success}</div>}
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
};

export default Termin;
