import React, { useContext, useEffect, useState } from 'react'
import Sidemenu from '../Copmonents/Sidemenu'
import axios from 'axios';
import Modal from 'react-modal';
import { AdminContext } from '../Context/AdminContext';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import format from 'date-fns/format';
import { sr } from 'date-fns/locale'; 
import { toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';
const DodajKorisnika = () => {
  const [data, setData] = useState([]);
  const [fetchIdUser, setFetchIdUser] = useState();
  const [updateForm, setUpdateForm] = useState([]);
  const [emails, setEmails] = useState([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [appointmentModal, setAppointmentModal] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const {adminToken} = useContext(AdminContext)
  const [addUser, setAddUser] = useState([]);
  const [scheduledAppointments, setScheduledAppointments] = useState([]); // Zakazani termini iz baze

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5 // Broj korisnika po stranici
  const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const users = data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sortira po vremenu kada je korisnik dodat u bazu
        .slice(indexOfFirstUser, indexOfLastUser);

    // Paginacija
    const totalPages = Math.ceil(data.length / usersPerPage);
    
    const submitUpdate = async (event) => {
      event.preventDefault();  // Sprečava refresh stranice
      try {
          await axios.put(`http://localhost:8000/api/admin/update/${fetchIdUser}`, updateForm, {
              headers: {
                  Authorization: `Bearer ${adminToken}` // Proslediš Bearer token
              }
          });
          toast.success("Korisnik uspešno ažuriran.");
      } catch (error) {
          toast.error("Neuspešno ažuriranje korisnika.");
      }
  }
  const deleteUser = async (userId) => {
      try {
          await axios.delete(`http://localhost:8000/api/admin/delete/${userId}`, {
              headers: {
                  Authorization: `Bearer ${adminToken}` // Proslediš Bearer token
              }
          });
          // Ažuriraj stanje da ukloni korisnika
          setData(data.filter(user => user._id !== userId));
          toast.success("Korisnik uspešno obrisan.");
      } catch (error) {
          toast.error("Neuspešno brisanje korisnika.");
      }
  };
  const fetchScheduledAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/appointments");
      setScheduledAppointments(response.data); // Podesi zakazane termine iz baze podataka
    } catch (error) {
      toast.error("Greška prilikom povlačenja zakazanih termina.");
    }
  };
  const fetchEmails = async ()=> {
    try {
      const response = await axios.get("http://localhost:8000/api/emails")
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const dayOfWeek = date.getDay();
    
    if (dayOfWeek >= 2 && dayOfWeek <= 6) {
      setAppointmentModal(true);
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
    if (view === 'month') {
      const dateStr = format(date, "dd.MM.yyyy", { locale: sr });
  
      // Provera da li postoji termin sa vremenom 'slobodan_dan' za taj datum
      const isOffDay = scheduledAppointments.some(
        (appointment) => appointment.date === dateStr && appointment.time === 'slobodan_dan'
      );
  
      // Provera da li su svi termini za taj dan zauzeti
      const takenTimes = scheduledAppointments.filter(appointment => appointment.date === dateStr);
      const allTimesTaken = takenTimes.length >= 20;
  
      return date.getDay() === 0 || date.getDay() === 1 || date > new Date(new Date().setDate(new Date().getDate() + 14)) || allTimesTaken || isOffDay;
    }
    return false;
  };
  

  const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/admin/getAllUsers", {
                headers: {
                    Authorization: `Bearer ${adminToken}` // Proslediš Bearer token
                }
            });
            setData(response.data);
        } catch (error) {
            toast.error("Greška prilikom povlačenja korisnika.");
        }
    };
    
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedDate || !addUser.time) {
      toast.error("Morate izabrati datum i termin pre potvrde!");
      return;
    }
  
    const formattedDate = format(selectedDate, "dd.MM.yyyy", { locale: sr });
  
    // Proveri da li postoji email u bazi
    const emailFound = emails.some(emailObj => emailObj.email.trim() === addUser.email.trim());
  
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
      await axios.post("http://localhost:8000/api/create", {
        ...addUser,
        date: formattedDate,
      });
  
      toast.success(`Uspešno zakazan termin za ${formattedDate} u ${addUser.time}!`);
      
      setAppointmentModal(false);
      setSelectedDate(null);
  
      // Osvježavanje zakazanih termina i emailova
      fetchScheduledAppointments();
      fetchEmails(); // Dodato za osvežavanje email liste
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Došlo je do greške prilikom zakazivanja termina.");
      }
    }
  };
  useEffect(()=>{
    fetchUsers();
  },[data])
  
  return (
    <div className=''>
      <div className=" grid grid-cols-5 grid-rows-2 gap-4">
          
          <div className="row-span-2 bg-gray-300 shadow-2xl h-screen">
              <Sidemenu />
          </div>
          
          <div className="col-span-2 row-span-1 rounded-lg bg-gray-100 shadow-lg border-2 m-4">
            <div>
              <div className="flex justify-center p-4">
                <Calendar
                  onChange={handleDateChange}
                  tileDisabled={tileDisabled}
                  value={new Date()}
                  className=""
                />
              </div>
            </div>
          

          </div>
          <div className='col-span-2 row-span-1 col-start-4 rounded-lg bg-gray-100 shadow-lg border-2 m-4 '>
          <form className='p-4 flex justify-center' onSubmit={handleSubmit}>     
                        <div>
                          <div className=''>
                              <p className=''>Ime</p>
                              <input className='border-2 border-black' type="text" name='name' value={addUser.name} onChange={(e) => setAddUser({ ...addUser, name: e.target.value })} />
                          </div>
                          <div className=''>
                              <p>Prezime</p>
                              <input className='border-2 border-black' type="text" name='surname' value={addUser.surname} onChange={(e) => setAddUser({ ...addUser, surname: e.target.value })} />
                          </div>
                          <div className=''>
                              <p>Email</p>
                              <input className='border-2 border-black' type="email" name='email' value={addUser.email} onChange={(e) => setAddUser({ ...addUser, email: e.target.value })} />
                          </div>
                          <div className=''>
                              <p>Telefon</p>
                              <input className='border-2 border-black' type="number" name='phone' value={addUser.phone} onChange={(e) => setAddUser({ ...addUser, phone: e.target.value })} />
                          </div>
                          <div className='flex justify-center'>
                              <button className='p-2 m-4 bg-blue-400 rounded-lg hover:bg-blue-500 ease-in-out transition-all hover:scale-105' type='submit'>Dodaj korisnika</button>
                          </div>
                        </div>
                    </form>
          </div>
          <div className="col-span-4 col-start-2 row-start-2 rounded-lg bg-gray-100 shadow-lg border-2 m-4 p-4">
            <table className='table-auto border-collapse border border-gray-300 w-full'>
                  <thead>
                      <tr className='bg-gray-300 text-left'>
                          <th className='p-3 border-2 border-black'>ID</th>
                          <th className='p-3 border-2 border-black'>Ime</th>
                          <th className='p-3 border-2 border-black'>Prezime</th>
                          <th className='p-3 border-2 border-black'>Email</th>
                          <th className='p-3 border-2 border-black'>Telefon</th>
                          <th className='p-3 border-2 border-black'>Datum</th>
                          <th className='p-3 border-2 border-black'>Vreme</th>
                          <th className='p-3 border-2 border-black'>Delete</th>
                          <th className='p-3 border-2 border-black'>Update</th>
                      </tr>
                  </thead>
                  <tbody className='bg-gray-300'>
                      {users.map((user, index)=> (
                          <tr key={index} className='text-left hover:bg-neutral-400 transition-all ease-in-out'>
                              <td className='p-3 border-t-[1px] border-2 border-black'>{user._id}</td>
                              <td className='p-3 border-t-[1px] border-2 border-black'>{user.name}</td>
                              <td className='p-3 border-t-[1px] border-2 border-black'>{user.surname}</td>
                              <td className='p-3 border-t-[1px] border-2 border-black'>{user.email}</td>
                              <td className='p-3 border-t-[1px] border-2 border-black'>{user.phone}</td>
                              <td className='p-3 border-t-[1px] border-2 border-black'>{user.date}</td>
                              <td className='p-3 border-t-[1px] border-2 border-black'>{user.time}</td>
                              <td className='p-3 border-t-[1px] border-2 border-black '>
                                  <button className='text-base ' onClick={() => deleteUser(user._id)}> Obrisi </button>
                              </td>
                              <td className='p-3 border-2 bg-blue-400 border-black'>

                                  <button className='text-base' 
                                      onClick={() => {
                                          setUpdateModal(true);
                                          setFetchIdUser(user._id)
                                      }}
                                  > 
                                  Ažuriraj
                                  </button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
              {/* Dodaj navigaciju za paginaciju */}
              <div className="flex justify-between mt-4">
                        <button 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                            disabled={currentPage === 1}
                            className="p-2 bg-gray-300 rounded"
                        >
                            Prethodna
                        </button>
                        <span>Strana {currentPage} od {totalPages}</span>
                        <button 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                            disabled={currentPage === totalPages}
                            className="p-2 bg-gray-300 rounded"
                        >
                            Sledeća
                        </button>
                    </div>
          </div>
      </div>
      <div className='absolute z-0'>
        <Modal
        ariaHideApp={false}
        isOpen={updateModal}
        onRequestClose={() => setUpdateModal(false)}
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
        <div>
          <div className="flex justify-center p-4">
            <Calendar
              onChange={handleDateChange}
              tileDisabled={tileDisabled}
              value={new Date()}
              className=""
            />
          </div>
        </div>
        <form className='p-4 flex justify-center' onSubmit={submitUpdate}>
            <div>
              <div>
                <p>ID</p>
                <p className='text-xs text-center'>{fetchIdUser}</p>
              </div>
              <div className=''>
                  <p>Ime</p>
                  <input  className='border-2 border-black' type="text" name='name' value={updateForm.name} onChange={(e) => setUpdateForm({ ...updateForm, name: e.target.value })}/>
              </div>
              <div className=''>
                  <p>Prezime</p>
                  <input className='border-2 border-black' type="text" name='surname' value={updateForm.surname} onChange={(e) => setUpdateForm({ ...updateForm, surname: e.target.value })} />
              </div>
              <div className=''>
                  <p>Email</p>
                  <input className='border-2 border-black' type="email" name='email' value={updateForm.email} onChange={(e) => setUpdateForm({ ...updateForm, email: e.target.value })} />
              </div>
              <div className=''>
                  <p>Telefon</p>
                  <input className='border-2 border-black' type="number" name='phone' value={updateForm.phone} onChange={(e) => setUpdateForm({ ...updateForm, phone: e.target.value })} />
              </div>
              <div className='flex justify-center'>
                  <button className='p-2 m-4 bg-blue-400 rounded-lg hover:bg-blue-500 ease-in-out transition-all hover:scale-105' type='submit'>Dodaj korisnika</button>
              </div>
            </div>
        </form>
        </Modal>
        <div className='absolute z-50'>
        <Modal
          ariaHideApp={false}
          isOpen={appointmentModal}
        
          onRequestClose={() => setAppointmentModal(false)}
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
                  
                  
                  setAddUser({ ...addUser, time });
                  toast.info(`Izabrali ste termin u ${time} sati.`);
                  setAppointmentModal(false); // Zatvaranje modala odmah nakon izbora termina
                }}
                className="block w-full p-2 rounded-md bg-gray-200 text-center hover:bg-gray-300"
              >
                {time}
              </button>
            ))}
          </div>
        <div className="lg:flex justify-center">
        <button onClick={() => setAppointmentModal(false)} className="mt-4 bg-red-500 text-white p-2 rounded-md">Zatvori</button>
        </div>
        </Modal>
      </div>
      </div>
    </div>
  )
}

export default DodajKorisnika
