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
            
           
                const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})
                if(data.success){
                    toast.success("Uspesno ulogovan")
                    localStorage.setItem('adminToken',data.token)
                    setAdminToken(data.token);
                    
                }else
                toast.error("Pogresna sifra!")
            }

         catch (error) {
            
        }

    }

  return (
    <div className=''>
      <form onSubmit={onSubmitHandler} action="" className='min-h-[80vh] flex items-center' >
        <div className='flex flex-col gap-4 m-auto p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[5e5e5e] text-sm shadow-lg justify-center'>
            <p className='text-4xl font-bold text-center pb-4'><span>{state} Login</span></p>
            <div className=''>
                <p className='text-2xl font-bold pb-2'>Email</p>
                <input className='p-2 rounded-lg w-full bg-blue-200'placeholder='email...' onChange={(e)=>setEmail(e.target.value)} value={email} type="email" required/>
            </div>
            <div>
                <p className='text-2xl font-bold pb-2'>Password</p>
                <input className='p-2 rounded-lg w-full bg-blue-200'placeholder='password...' onChange={(e)=>setPassword(e.target.value)} value={password} type="password" required/>
            </div>
            <button className='p-2 border-2 border-black hover:border-white hover:bg-black hover:text-white transition-all ease-in-out text-xl pt-2'>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login
