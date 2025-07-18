"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function signInPage(){
    const Router=useRouter()
    const [user,setuser]=useState({
      
        email:'',
        password:"",

    })
    const [DisabledButton,setDisabledButton]=useState(false)
    const [loading,setloading]=useState(false)

    const onsignIn=async()=>{
     
            
         if(user.email.length>0 && user.password.length>0 ){
               setloading(true)
         }
        try {
            const Response=await axios.post("/api/users/login",user)
            console.log("signin Success",Response.data);
            Router.push("/profile")

            useEffect(()=>{
         if(user.email.length>0 && user.password.length>0 ){
            setDisabledButton(false)
         }
         else setDisabledButton(true)
                
            },[user])

            
        } catch (error:any) {
            console.log(error.message);
            
        }
    }

    return (
   
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
      {loading ? "Processing..." : "Sign In"}
    </h1>

    <div className="space-y-4">
      

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="text"
          id="email"
          value={user.email}
          onChange={(e) => setuser({ ...user, email: e.target.value })}
          placeholder="Email"
          className="mt-1 w-full text-black px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setuser({ ...user, password: e.target.value })}
          placeholder="Password"
          className="mt-1 w-full text-black px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={onsignIn}
        disabled={DisabledButton }
        className={`w-full py-2 text-white font-semibold rounded-xl transition duration-300 ${
          DisabledButton ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {DisabledButton ? "No SignIn" : "Sign In"}
      </button>


      <p className="text-center text-sm mt-4 text-gray-600">
        Already have an account?{" "}
        <Link href="/signup" className="text-blue-600 hover:underline">
          Visit signUp page
        </Link>
      </p>
    </div>
  </div>
</div>

        

    ) 
}