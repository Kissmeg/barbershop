import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Modal from 'react-modal'
import { AdminContext } from '../Context/AdminContext';
import Sidemenu from './Sidemenu';

const Dashboard = () => {
    const [fetchIdUser, setFetchIdUser] = useState();
    const [updateForm, setUpdateForm] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { adminToken } = useContext(AdminContext);
    const [data, setData] = useState([]);

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
    
    
    
    const updateUser = async (userId) => {
    };

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

    return (
        <div className='grid grid-cols-5 grid-rows-5 gap-4'>
             <div className="row-span-5 bg-blue-950 rounded-tr-3xl ">
                <Sidemenu />
             </div>
            <div className='flex justify-center items-center h-screen col-span-4 row-span-5'>
                <div className='w-3/4'>
                    <table className='table-auto border-collapse border border-gray-300 w-full'>
                        <thead>
                            <tr className='bg-gray-100'>
                                <th className='p-3 border border-gray-300'>ID</th>
                                <th className='p-3 border border-gray-300'>Ime</th>
                                <th className='p-3 border border-gray-300'>Prezime</th>
                                <th className='p-3 border border-gray-300'>Email</th>
                                <th className='p-3 border border-gray-300'>Telefon</th>
                                <th className='p-3 border border-gray-300'>Datum</th>
                                <th className='p-3 border border-gray-300'>Vreme</th>
                                <th className='p-3 border border-gray-300'>Akcija</th>
                                <th className='p-3 border border-gray-300'>Azuriraj</th>
                            </tr>
                        </thead>
                        <tbody className='bg-neutral-200'>
                            {data
                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sortira po vremenu kada je korisnik dodat u bazu
                                .map((user, index) => (
                                    <tr key={index} className='text-center hover:bg-neutral-400 transition-all ease-in-out'>
                                        <td className='p-3 border border-gray-300'>{user._id}</td>
                                        <td className='p-3 border border-gray-300'>{user.name}</td>
                                        <td className='p-3 border border-gray-300'>{user.surname}</td>
                                        <td className='p-3 border border-gray-300'>{user.email}</td>
                                        <td className='p-3 border border-gray-300'>{user.phone}</td>
                                        <td className='p-3 border border-gray-300'>{user.date}</td>
                                        <td className='p-3 border border-gray-300'>{user.time}</td>
                                        <td className='p-3 border bg-red-500'>
                                            <button className='text-base' onClick={() => deleteUser(user._id)}> Obrisi </button>
                                        </td>
                                        <td className='p-3 border bg-blue-400'>
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
                    <form onSubmit={submitUpdate} className=''>
                        <div className=''>
                            <p className='font-bold'>ID</p>
                            <p className='text-sm'>{fetchIdUser}</p>
                        </div>
                        <div className='my-4'>
                            <p>Ime</p>
                            <input className='border-2 border-black' type="text" name='name'  value={updateForm.name} onChange={(e) => setUpdateForm({ ...updateForm, name: e.target.value })}/>
                        </div>
                        <div className='my-4'>
                            <p>Prezime</p>
                            <input className='border-2 border-black' type="text" name='surname' value={updateForm.surname} onChange={(e) => setUpdateForm({ ...updateForm, surname: e.target.value })}/>
                        </div>
                        <div className='my-4'>
                            <p>Email</p>
                            <input className='border-2 border-black' type="email" name='email' value={updateForm.email} onChange={(e) => setUpdateForm({ ...updateForm, email: e.target.value })}/>
                        </div>
                        <div className='my-4'>
                            <p>Telefon</p>
                            <input className='border-2 border-black' type="number" name='phone' value={updateForm.phone} onChange={(e) => setUpdateForm({ ...updateForm, phone: e.target.value })}/>
                        </div>
                        <div className='my-4'>
                            <p>Datum</p>
                            <input className='border-2 border-black' type="date" name='date' value={updateForm.date} onChange={(e) => setUpdateForm({ ...updateForm, date: e.target.value })}/>
                        </div>
                        <div className='my-4'>
                            <p>Termin</p>
                            <input className='border-2 border-black' type="time" name='time' value={updateForm.time} onChange={(e) => setUpdateForm({ ...updateForm, time: e.target.value })}/>
                        </div>
                        <button className='p-2 border-2 bg-blue-500 rounded-lg '>Ažuriraj</button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default Dashboard;
