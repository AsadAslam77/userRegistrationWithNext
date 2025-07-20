'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import { use, useState } from "react"
import toast from "react-hot-toast"
import Link from "next/link"

export default function ProfilePage(){
  const [data, setData]=useState('Nothing')
  const router=useRouter

   const getUserDetails=async()=>{
    try {
   const res=   await axios.post("/api/users/me")
   console.log(res.data.data._id);
   setData(res.data.data._id)
   
  } catch (error:any) {
     console.log(error.message)
    
  }
   }

   const logout=async ()=>{
    try {
        axios.get("/api/users/logout")
        console.log("Logout Successfully")
        toast.success("Logout Successfully")
        
    } catch (error:any) {
    console.log(error.message);
    toast.error(error.message)
    
    
  }

   }

    return(
        <div className="flex flex-col  justify-center items-center 
        min-h-screen py-2"><h1> Profile Page</h1> 
        <h2>{data==='Nothing'?"nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
         <button 
         className="bg-blue-500  mt-4 hover:bg-blue-700 text-white 
         font-bold  py-2 px-2 rounded"
         onClick={logout}>logout</button>
         <button 
         className="bg-green-500  mt-4 hover:bg-green-700 text-white 
         font-bold  py-2 px-2 rounded"
         onClick={getUserDetails}>Get User Detail</button>
        </div>
    )
}