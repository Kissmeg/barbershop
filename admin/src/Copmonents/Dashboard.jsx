import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Dashboard = () => {
    
    const [data, setData] = useState([]);
    
    const fetchData = async () => {
        try {
          const response = await axios.get("https://barbershop-backend-rex2.onrender.com/api/getAllUsers");
          setData(response.data); // Podesi zakazane termine iz baze podataka
        } catch (error) {
          toast.error("Greška prilikom povlačenja korisnika.", { position: "top-center" });
        }
      };
    
      useEffect(()=>{
        fetchData();
      },[])
      return (
    <div>
        <div className=''>
            {
                data.map((users)=>(
                    <div>
                        {users.name}
                    </div>
                ))
            }
        </div>  
    </div>
  )
}

export default Dashboard
