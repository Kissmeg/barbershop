import React, { useEffect, useState } from 'react'
import Sidemenu from '../Copmonents/Sidemenu'
import Calendar from 'react-calendar'
import { format } from 'date-fns';
import { sr } from 'date-fns/locale';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import axios from 'axios';

const SlobodanDan = () => {
  const [offDay, setOffDay] = useState(); 
  const [scheduledAppointments, setScheduledAppointments] = useState([]); // Zakazani termini iz baze
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [offDays, setOffDays] = useState([]); // Lista slobodnih dana
  const [offDayModal, setoffDayModal] = useState(false);
  
  const formattedDate = format(selectedDate, "dd.MM.yyyy", { locale: sr });

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

  const fetchScheduledAppointments = async () => {
    try {
      const response = await axios.get("https://barbershop-backend-rex2.onrender.com/api/appointments");
      setScheduledAppointments(response.data);
    } catch (error) {
      
    }
  };

  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = format(date, "dd.MM.yyyy", { locale: sr });

      // Provera da li je datum u listi slobodnih dana
      const isOffDay = scheduledAppointments.some(
        (appointment)=> appointment.date === dateStr && appointment.time === 'slobodan_dan'
      );

      // Provera da li su svi termini za ovaj dan zauzeti
      const takenTimes = scheduledAppointments.filter(appointment => appointment.date === dateStr);
      const allTimesTaken = takenTimes.length >= 20;

      return date.getDay() === 0 || date.getDay() === 1 || date < new Date() || date > new Date(new Date().setDate(new Date().getDate() + 14)) || allTimesTaken || isOffDay;
    }
    return false;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const dayOfWeek = date.getDay();
    
    if (dayOfWeek >= 2 && dayOfWeek <= 6) {
      setoffDayModal(true);
      setAvailableTimes(generateAvailableTimes(date));
    }
  };

  const handleConfirmOffDay = async () => {
    const formattedDate = format(selectedDate, "dd.MM.yyyy", { locale: sr });
    
    try {
        const response = await axios.post("https://barbershop-backend-rex2.onrender.com/api/createAppointment",{
            name:"dejan",
            surname:"tolmac",
            phone:"0129412",
            email:"dejan.tolmac@gmail.com",
            date: formattedDate,
            time:'slobodan_dan',
            
        })
        setOffDays((prevOffDays)=>[...prevOffDays, formattedDate])
        setoffDayModal(false);
        toast.success('Uspesno zakazan slobodan dan.')
    } catch (error) {
        toast.error('Neuspesan zakazan slobodan dan.')
    }
  };

  useEffect(() => {
    fetchScheduledAppointments();
  }, [tileDisabled]);

  return (
    <div>
      <div className="grid grid-cols-5 grid-rows-5 gap-4">
        <div className="row-span-5 bg-gray-300 shadow-2xl h-screen">
          <Sidemenu />
        </div>
        
        <div className="col-span-4 row-span-5 bg-gray-100 shadow-2xl border-2 m-4">
        <div class="flex justify-center items-center h-full">
                
                    <Calendar 
                    tileDisabled={tileDisabled}
                    onChange={handleDateChange}
                    value={new Date()}
                    className=""
                    />
                
            </div>
        </div>

        <Modal
          isOpen={offDayModal}
          ariaHideApp={false}
          onRequestClose={() => setoffDayModal(false)}
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
          <div className='text-xl m-4'>
            <p>Da li si siguran da želiš da uzmes <span className='font-bold underline underline-offset-4'>{formattedDate}</span> kao slobodan dan!?</p>
            <div className='flex justify-between pt-4'>
              <button onClick={() => setoffDayModal(false)} className='bg-red-500 rounded-md p-2 hover:bg-red-600 hover:scale-105 transition-all ease-in-out'>
                Otkaži
              </button>
              
              <button onClick={handleConfirmOffDay} className='bg-blue-500 rounded-md p-2 hover:bg-blue-600 hover:scale-105 transition-all ease-in-out'>
                Potvrdi
              </button>
            </div>
          </div>
        </Modal>
      </div>   
    </div>
  )
}

export default SlobodanDan;
