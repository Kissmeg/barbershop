import React, { useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Modal from 'react-modal';
import format from 'date-fns/format';
import { sr } from 'date-fns/locale'; // Dodaj date-fns formatiranje
import { ToastContainer, toast } from "react-toastify"; // Importuj Toastify
import 'react-toastify/dist/ReactToastify.css'; // Toastify stilovi

Modal.setAppElement('#root');

const Termin = () => {
  const [formData, setFormData] = useState({ name: "", surname: "", email: "", phone: "", time: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !formData.time) {
      toast.error("Niste izabrali datum ili termin!");
      return;
    }

    const formattedDate = format(selectedDate, "dd.MM.yyyy", { locale: sr });

    try {
      const response = await axios.post("https://barbershop-backend-rex2.onrender.com/api/create", {
        ...formData,
        date: formattedDate, // Formatiran datum na srpski
        time: formData.time
      });

      console.log("Termin created:", response.data);
      setSuccess("Termin uspešno kreiran!");
      toast.success(`Termin uspešno zakazan za ${formattedDate} u ${formData.time}`);
      setFormData({ name: "", surname: "", email: "", phone: "", time: "" });
      setError("");
      setModalIsOpen(false); // Zatvori modal nakon uspešnog kreiranja termina
    } catch (error) {
      toast.error("Došlo je do greške prilikom zakazivanja termina.");
      setSuccess("");
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const dayOfWeek = date.getDay();

    // Proveri da li je dan radni (radni dani su od utorka (2) do subote (6))
    if (dayOfWeek >= 2 && dayOfWeek <= 6) {
      setModalIsOpen(true);
      setAvailableTimes(generateAvailableTimes());
    }
  };

  // Generiši termine na svakih 30 minuta između 8:00 i 18:00
  const generateAvailableTimes = () => {
    const times = [];
    let startHour = 8;
    let endHour = 18;
    for (let hour = startHour; hour < endHour; hour++) {
      times.push(`${hour}:00`);
      times.push(`${hour}:30`);
    }
    return times;
  };

  const tileDisabled = ({ date, view }) => {
    // Onemogući dane koji nisu radni (ponedeljak i nedelja) i ograniči na 14 dana unapred
    return view === 'month' && (date.getDay() === 0 || date.getDay() === 1 || date < new Date() || date > new Date(new Date().setDate(new Date().getDate() + 14)));
  };

  const handleTimeSelect = (time) => {
    setFormData({ ...formData, time });
    setModalIsOpen(false); // Zatvori modal
    toast.success(`Izabrali ste termin: ${format(selectedDate, "dd.MM.yyyy", { locale: sr })} u ${time}`);
  };

  return (
    <div className="pt-40">
      <div>
        <p className="text-center">Zakazivanje termina</p>
        <div className="flex justify-center">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Ime"
              value={formData.name}
              onChange={handleChange}
              required
              className="border p-2"
            />
            <input
              type="text"
              name="surname"
              placeholder="Prezime"
              value={formData.surname}
              onChange={handleChange}
              required
              className="border p-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border p-2"
            />
            <input
              type="text"
              name="phone"
              placeholder="Tel. br"
              value={formData.phone}
              onChange={handleChange}
              required
              className="border p-2"
            />
            {selectedDate && (
              <div className="mt-2">
                <p>Izabrani datum: {format(selectedDate, "dd.MM.yyyy", { locale: sr })}</p>
              </div>
            )}
            <button type="submit" className="bg-blue-500 text-white p-2">Zakazi termin</button>
          </form>
        </div>
        {success && <div className="text-green-500">{success}</div>}
        {error && <div className="text-red-500">{error}</div>}
      </div>

      <div className="mt-10 flex justify-center">
        <Calendar
          onChange={handleDateChange}
          tileDisabled={tileDisabled}
          value={new Date()}
          className="border"
        />
      </div>

      {/* Modal za prikaz dostupnih termina */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <h2>Izaberite termin</h2>
        <div className="space-y-2">
          {availableTimes.map((time, index) => (
            <button
              key={index}
              onClick={() => handleTimeSelect(time)}
              className="block w-full bg-gray-200 p-2 text-center hover:bg-gray-300"
            >
              {time}
            </button>
          ))}
        </div>
        <button onClick={() => setModalIsOpen(false)} className="mt-4 bg-red-500 text-white p-2">Zatvori</button>
      </Modal>

      {/* ToastContainer za prikaz poruka */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </div>
  );
};

export default Termin;
