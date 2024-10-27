import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Modal from 'react-modal';
import { AdminContext } from '../Context/AdminContext';
import Sidemenu from './Sidemenu';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import format from 'date-fns/format';
import { sr } from 'date-fns/locale'; 

const Dashboard = () => {
    const [modalTermin, setModalTermin] = useState(false);
    const [terminsCount, setTerminsCount ] = useState({});

    const [fetchIdUser, setFetchIdUser] = useState();
    const [updateForm, setUpdateForm] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { adminToken } = useContext(AdminContext);
    const [data, setData] = useState([]);
    const [scheduledAppointments, setScheduledAppointments] = useState([]); // Zakazani termini iz baze

    const [selectedDate, setSelectedDate] = useState(null);
    const [appointmentModal, setAppointmentModal] = useState(false);
    const [availableTimes, setAvailableTimes] = useState([]);

    // Paginacija
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5 // Broj korisnika po stranici

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

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/admin/getAllUsers", {
                headers: {
                    Authorization: `Bearer ${adminToken}` // Proslediš Bearer token
                }
            });
            setData(response.data);
        } catch (error) {
            toast.error("Greška prilikom povlačenja korisnika.", { position: "top-center" });
        }
    };

    useEffect(() => {
        fetchData();
        
    }, [data]);
    
    // Izračunaj korisnike za trenutnu stranicu
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sortira po vremenu kada je korisnik dodat u bazu
        .slice(indexOfFirstUser, indexOfLastUser);

    // Paginacija
    const totalPages = Math.ceil(data.length / usersPerPage);
    const formattedDate = format(selectedDate, "dd.MM.yyyy", { locale: sr });
    
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
      
          return date.getDay() === 0 || date.getDay() === 1 || date < new Date() || date > new Date(new Date().setDate(new Date().getDate() + 14)) || allTimesTaken || isOffDay;
        }
        return false;
      };

      const handleDateChange = (date) => {
        setSelectedDate(date);
        const dayOfWeek = date.getDay();
        
        if (dayOfWeek >= 2 && dayOfWeek <= 6) {
          setModalTermin(true);
          setAvailableTimes(generateAvailableTimes(date));
          
        }
      };
      const renderTileContent = ({ date, view }) => {

        if (view === 'month') {
          const dateString = format(date, "dd.MM.yyyy", { locale: sr });
          
          const count = data.filter((termin) => termin.date === dateString).length
        
          return count > 0 ? (
            <div className="relative">
              <span className="absolute -right-1 -bottom-2 bg-neutral-950 text-white text-xs rounded-full h-3.5 w-3.5 flex items-center justify-center">
                    {count}
                </span>
            </div>
          ) : null;
        }
      };
      
    return (
        <div className='grid grid-cols-5 grid-rows-5 gap-4'>
            <div className="row-span-5 bg-gray-300 shadow-2xl h-screen">
                <Sidemenu />
            </div>
            <div className="border-2 col-span-2 row-span-1 mt-4 shadow-xl bg-gray-100 rounded-lg">
                <p className='text-center text-2xl font-bold'>Ukupno korisnika</p>
                <p className='text-center text-3xl font-extrabold pt-4'>{data.length}</p>
            </div>

            <div className="border-2 col-span-2 row-span-1 col-start-4 mt-4 shadow-xl bg-gray-100 rounded-lg">
                <div className='flex justify-center p-4'>
                <Calendar
                
                    onChange={handleDateChange}
                    
                    value={new Date()}
                    tileContent={renderTileContent}
                    >
                    
                    </Calendar>
                    <p className='text-xs rounded-full bg-neutral-950 text-white p-0.5'>{data.length}</p>
                </div>
            </div>
            
            <div className='border-2 flex justify-center items-center col-span-4 row-span-4 col-start-2 row-start-2 rounded-lg bg-gray-100 shadow-lg m-4'>
                <div className=''>
                    <p className='text-4xl my-4'>Poslednjih 5 zakazanih termina</p>
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
                                <th className='p-3 border-2 border-black'>Akcija</th>
                                <th className='p-3 border-2 border-black'>Azuriraj</th>
                            </tr>
                        </thead>
                        <tbody className='bg-gray-300'>
                            {currentUsers.map((user, index)=> (
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
                                                setModalIsOpen(true);
                                                setFetchIdUser(user._id)
                                            }}
                                        > 
                                            Update
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

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                ariaHideApp={false}
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
                </div>
            </Modal>

            <Modal
            isOpen={modalTermin}
            onRequestClose={() => setModalTermin(false)}
            ariaHideApp={false}
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
           <p className="text-center text-2xl m-4">Termini za {formattedDate}</p>
            <div className="grid grid-cols-5 gap-4">
                {data.filter((termin) => termin.date === formattedDate).map((user, index)=>(
                    <div key={index} className='p-2 bg-gray-200 rounded-lg'>
                        <p className='text-center font-bold'>{user.time}</p>
                        <p className='text-center font-normal'>{user.name} {user.surname}</p>
                        
                    </div>
                ))}
            </div>

            </Modal>
        </div>
    );
}

export default Dashboard;
