import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, startOfWeek, endOfWeek, isSameMonth, getDay, isBefore, addDays, isAfter } from 'date-fns';
import Modal from 'react-modal';
import { sr } from 'date-fns/locale';
import axios from 'axios'; // Import axios za API pozive
import api from '../api';

const Termin = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bookingModalIsOpen, setBookingModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [bookedEmails, setBookedEmails] = useState([]);

  // Imena dana u nedelji
  const daysOfWeek = ['Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota', 'Nedelja'];

  // Prikaz trenutnog meseca i godine
  const currentMonth = format(currentDate, 'MMMM yyyy', { locale: sr });

  // Današnji datum
  const today = new Date();

  // Krajnji datum za zakazivanje (14 dana unapred od danas)
  const maxBookingDate = addDays(today, 14);

  // Generiši datume u okviru meseca u format tabele (početak i kraj meseca + nedelja)
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const dates = eachDayOfInterval({ start: startDate, end: endDate });

  // Generisanje termina od 8:00 do 18:00 na svakih pola sata
  const generateTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 8; hour < 18; hour++) {
      timeSlots.push(`${hour}:00`);
      timeSlots.push(`${hour}:30`);
    }
    return timeSlots;
  };

  // Otvaranje modala za odabrani datum
  const openModal = (date) => {
    if (!isBefore(date, today) && !isAfter(date, maxBookingDate)) {
      setSelectedDate(format(date, 'd MMMM yyyy', { locale: sr }));
      setModalIsOpen(true);
    }
  };

  // Otvaranje modala za unos podataka
  const openBookingModal = (time) => {
    console.log('Otvoren modal za vreme:', time);
    setModalIsOpen(false);
    setBookingModalIsOpen(true);
  };

  // Zatvaranje modala
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDate(null);
  };

  const closeBookingModal = () => {
    setBookingModalIsOpen(false);
    setName('');
    setSurname('');
    setPhone('');
    setEmail('');
    setEmailError('');
  };

  // Promena meseca
  const changeMonth = (direction) => {
    setCurrentDate((prevDate) =>
      direction === 'next' ? addMonths(prevDate, 1) : subMonths(prevDate, 1)
    );
  };

  // Funkcija za validaciju email adrese
  const validateEmail = (email) => {
    const emailExists = bookedEmails.some((bookedEmail) => bookedEmail.email === email && isBefore(new Date(bookedEmail.date), addDays(today, 7)));
    if (emailExists) {
      setEmailError('Ovaj email je već korišćen, možete ponovo uneti za 7 dana.');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Funkcija za slanje podataka
  const handleBooking = async () => {
    const clientData = {
        name: 'Marko Marković',
        email: 'marko@example.com',
        phone: '0612345678'
    };

    try {
        const response = await api.post('/clients', clientData);
        console.log('Klijent uspešno dodat:', response.data);
    } catch (error) {
        console.error('Greška prilikom slanja podataka:', error.response.data);
    }
};

  return (
    <div className="py-20">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold mb-2">{currentMonth}</h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => changeMonth('prev')}
            className="px-4 py-2 rounded hover:bg-[#bc9355] hover:scale-105 transition-all ease-in-out" 
          >
            Prethodni
          </button>
          <button
            onClick={() => changeMonth('next')}
            className="px-4 py-2 rounded hover:bg-[#bc9355] hover:scale-105 transition-all ease-in-out"
          >
            Sledeći
          </button>
        </div>
      </div>
      
      <div className='flex justify-center'>
        <div className="w-1/3 grid grid-cols-7 text-center font-bold bg-black text-neutral-200">
          {daysOfWeek.map((day) => (
            <div key={day} className="p-2 border">
              {day}
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-center'>
        <div className="grid w-1/3 grid-cols-7 border border-white">
          {dates.map((date) => {
            const isDateInRange = !isBefore(date, today) && !isAfter(date, maxBookingDate);
            const dayOfWeek = getDay(date);
            const isWeekendOrMonday = dayOfWeek === 0 || dayOfWeek === 1;

            return (
              <button
                key={date}
                onClick={() => openModal(date)}
                className={`h-20 border p-2 hover:bg-[#bc9355] hover:text-black transition ${
                  isSameMonth(date, currentDate) ? '' : ''
                } ${format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd') ? 'text-[#bc9355]' : ''} ${
                  !isDateInRange || isWeekendOrMonday ? 'text-neutral-500 bg-neutral-300 cursor-not-allowed' : ''
                }`}
                disabled={!isDateInRange || isWeekendOrMonday}
              >
                <span className={isSameMonth(date, currentDate) ? '' : 'text-neutral-500 hover:text-black'}>
                  {format(date, 'd')}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <p className='font-light text-sm text-center italic py-4'>Napomena: Zakazivanje termina je moguće samo 14 dana unapred, za zakazivanje više od 14 dana unapred pozovite na broj.</p>
      
      {/* Modal za odabir termina */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-white p-6 rounded shadow-lg mt-20"
        overlayClassName="fixed inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Termini za {selectedDate}</h2>
        <div className="grid grid-cols-5 p-4">
          {generateTimeSlots().map((time, index) => (
            <div
              key={index}
              className="bg-neutral-200 p-4 m-2 rounded shadow-xl hover:bg-[#bc9355] hover:scale-105 hover:text-black transition-all ease-in-out cursor-pointer"
              onClick={() => openBookingModal(time)}
            >
              {time}
            </div>
          ))}
        </div>
        <button
          onClick={closeModal}
          className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Zatvori
        </button>
      </Modal>

      {/* Modal za unos podataka */}
      <Modal
        isOpen={bookingModalIsOpen}
        onRequestClose={closeBookingModal}
        className="bg-white p-6 rounded shadow-lg mt-20"
        overlayClassName="fixed inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Unesite podatke za rezervaciju</h2>
        <form onSubmit={handleBooking}>
          <div className="mb-4">
            <label className="block mb-2">Ime:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Prezime:</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Telefon:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border rounded w-full p-2"
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Rezerviši
          </button>
        </form>
        <button
          onClick={closeBookingModal}
          className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Zatvori
        </button>
      </Modal>
    </div>
  );
};

export default Termin;
