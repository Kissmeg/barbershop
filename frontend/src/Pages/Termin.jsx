import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Modal from 'react-modal';
import format from 'date-fns/format';
import { sr } from 'date-fns/locale'; 
import { toast, ToastContainer } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

const Termin = () => {
  const [emails, setEmails] = useState([]);
  const [showCalendar, setShowCalendar] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", surname: "", email: "", phone: "", time: "" });
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [scheduledAppointments, setScheduledAppointments] = useState([]); // Zakazani termini iz baze

  // Funkcija za povlačenje zakazanih termina iz baze
  const fetchScheduledAppointments = async () => {
    try {
      const response = await axios.get("https://barbershop-backend-rex2.onrender.com/api/appointments");
      setScheduledAppointments(response.data); // Podesi zakazane termine iz baze podataka
    } catch (error) {
      toast.error("Greška prilikom povlačenja zakazanih termina.");
    }
  };
  const fetchEmails = async ()=> {
    try {
      const response = await axios.get("https://barbershop-backend-rex2.onrender.com/api/emails")
      setEmails(response.data)
    } catch (error) {
      toast.error("Greska prilikom povlacenja emailova.")
    }
  }
  // Pozivaj fetchScheduledAppointments pri inicijalnom učitavanju stranice
  useEffect(() => {
    fetchEmails();
    fetchScheduledAppointments();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedDate || !formData.time) {
      toast.error("Morate izabrati datum i termin pre potvrde!");
      return;
    }
  
    const formattedDate = format(selectedDate, "dd.MM.yyyy", { locale: sr });
  
    // Proveri da li postoji email u bazi
    const emailFound = emails.some(emailObj => emailObj.email.trim() === formData.email.trim());
  
    if (emailFound) {
      const hasAppointment = scheduledAppointments.some(appointment => {
        const appointmentDate = new Date(appointment.date.split('.').reverse().join('-') + ' ' + appointment.time);
        const diffInDays = Math.ceil((selectedDate - appointmentDate) / (1000 * 60 * 60 * 24));
        return diffInDays >= 0 && diffInDays < 7;
      });
  
      if (hasAppointment) {
        toast.error("Možete zakazati novi termin tek nakon 7 dana od poslednjeg zakazivanja.");
        return;
      }
    } else {
      console.log("No previous appointments found for this email.");
    }
  
    try {
      await axios.post("https://barbershop-backend-rex2.onrender.com/api/create", {
        ...formData,
        date: formattedDate,
      });
  
      toast.success(`Uspešno zakazan termin za ${formattedDate} u ${formData.time}!`);
      setFormData({ name: "", surname: "", email: "", phone: "", time: "" });
      setModalIsOpen(false);
      setSelectedDate(null);
  
      // Osvježavanje zakazanih termina i emailova
      fetchScheduledAppointments();
      fetchEmails(); // Dodato za osvežavanje email liste
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message, { position: "top-center" });
      } else {
        toast.error("Došlo je do greške prilikom zakazivanja termina.");
      }
    }
  };
  
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const dayOfWeek = date.getDay();

    if (dayOfWeek >= 2 && dayOfWeek <= 6) {
      setModalIsOpen(true);
      setAvailableTimes(generateAvailableTimes(date));
    }
  };

  const generateAvailableTimes = (date) => {
    const times = [];
    let startHour = 8;
    let endHour = 18;
    for (let hour = startHour; hour < endHour; hour++) {
      times.push(`${hour}:00`);
      times.push(`${hour}:30`);
    }
    const dateStr = format(date, "dd.MM.yyyy", { locale: sr });
    const takenTimes = scheduledAppointments
      .filter(appointment => appointment.date === dateStr)
      .map(appointment => appointment.time);
    return times.filter(time => !takenTimes.includes(time));
  };

  const tileDisabled = ({ date, view }) => {
    return view === 'month' && (date.getDay() === 0 || date.getDay() === 1 || date < new Date() || date > new Date(new Date().setDate(new Date().getDate() + 14)));
  };

  return (
    <div className="pt-40">
      <ToastContainer /> 
      <p className="text-center text-2xl lg:text-4xl p-4 mb-10">Zakazivanje termina</p>
      
      {showForm &&(
    <div>
      <div className="lg:flex flex justify-center">
        <div className="lg:flex flex">
          <form onSubmit={handleSubmit} className="p-4">
              <div className="">
                <div>
                  <p className="before:content-['*'] before:text-red-500">Ime</p>
                  <input type="text" name="name" placeholder="Ime" value={formData.name} onChange={handleChange} required           className=" lg:w-full flex border p-2 border-[#bc9935] "/>
                </div>
                
                <div>
                  <p className="before:content-['*'] before:text-red-500">Prezime</p>
                  <input type="text" name="surname" placeholder="Prezime" value={formData.surname} onChange={handleChange} required className=" lg:w-full flex border p-2 border-[#bc9935]"/>
                </div>
                
                <div className="lg:flex gap-4">
                  <div>
                    <p className="flex before:content-['*'] before:text-red-500">Email</p>
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required      className=" border p-2 border-[#bc9935]"/>
                  </div>

                  <div>
                    
                    <p className="flex before:content-['*'] before:text-red-500"> Telefon</p>
                    <input type="tel" name="phone" placeholder="Tel. br" value={formData.phone} onChange={handleChange} required      className=" border p-2 border-[#bc9935]"/>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
              <button className="p-2 mt-2 border-2 border-black" onClick={()=>{setShowForm(false); setShowCalendar(true) }}>Povratak</button>
                <button className="flex bg-[#bc9935] text-white p-2 mt-2">Zakazi termin</button>
                
              </div>
              
          </form>
        </div>
      </div>
    </div>
      )}
      {showCalendar &&(
        <div>
          <div className="mx-8 flex justify-center">
            <Calendar
             locale="sr-RS"
              onChange={handleDateChange}
              tileDisabled={tileDisabled}
              value={new Date()}
              className=""
            />
          </div>
        </div>
      )}

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
        <p className="text-center text-2xl m-4">Izaberite termin</p>
        <div className="grid grid-cols-5 gap-4">
          {availableTimes.map((time, index) => (
            <button
              key={index}
              onClick={() => {
                setShowCalendar(false);
                setShowForm(true);
                setFormData({ ...formData, time });
                toast.info(`Izabrali ste termin u ${time} sati.`, { position: "top-center" });
                setModalIsOpen(false); // Zatvaranje modala odmah nakon izbora termina
              }}
              className="block w-full p-2 rounded-md bg-gray-200 text-center hover:bg-gray-300"
            >
              {time}
            </button>
          ))}
        </div>
       <div className="lg:flex justify-center">
       <button onClick={() => setModalIsOpen(false)} className="mt-4 bg-red-500 text-white p-2 rounded-md">Zatvori</button>
       </div>
      </Modal>
    </div>
  );
};

export default Termin;
