import React, { useContext, useState } from 'react'
import { AdminContext } from '../Context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const Login = () => {
    const [state, seState] = useState('Admin')

    const {setAdminToken, backendUrl} = useContext(AdminContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (event)=>{

        event.preventDefault()

        try {
            
            if (state ==='Admin') {
                const {data} = await axios.post(backendUrl + '/api/login',{email,password})
                if(data.success){
                    toast.success("Uspesno ulogovan")
                    localStorage.setItem('adminToken',data.token)
                    setAdminToken(data.token);
                    
                }else
                toast.error("Pogresna sifra!")
            }

        } catch (error) {
            
        }

    }

  return (
    <div>
      <form onSubmit={onSubmitHandler} action="" className='min-h-[80vh] flex items-center' >
        <div className='flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[5e5e5e] text-sm shadow-lg'>
            <p className='text-2xl font-semibold m-auto'> <span>{state} Login</span></p>
            <div>
                <p>Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" required/>
            </div>
            <div>
                <p>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" required/>
            </div>
            <button>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login
