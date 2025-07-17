"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function signUpPage(){
    const Router=useRouter()
    const [user,setuser]=useState({
        username:"",
        email:'',
        password:"",

    })
    const [DisabledButton,setDisabledButton]=useState(false)
    const [loading,setloading]=useState(false)

    const onsignUp=async()=>{
     
            
         if(user.email.length>0 && user.password.length>0 && user.username.length>0){
               setloading(true)
         }
        try {
            const Response=await axios.post("/api/users/signup",user)
            console.log("signup Success",Response.data);
            Router.push("/login")

            useEffect(()=>{
         if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setDisabledButton(false)
         }
         else setDisabledButton(true)
                
            },[user])

            
        } catch (error:any) {
            console.log(error.message);
            
        }
    }

    return (
    // <div >
    //     <h1>{loading?"processing":"Sign UP"}</h1>
    //     <br />
    //     <label htmlFor="username">username:</label>
    //     <input type="text"
    //     id="username"
    //     value={user.username}
    //     onChange={(e)=>{setuser({...user,username:e.target.value})}}
    //     placeholder="username"
    //      />
    //      <br />
    //       <label htmlFor="email">Email:</label>
    //     <input type="text"
    //     id="email"
    //     value={user.email}
    //     onChange={(e)=>{setuser({...user,email:e.target.value})}}
    //     placeholder="Email"
    //      />
    //      <br />
    //        <label htmlFor="password">Password:</label>
    //     <input type="text"
    //     id="password"
    //     value={user.password}
    //     onChange={(e)=>{setuser({...user,password:e.target.value})}}
    //     placeholder="Password"
    //      />
    //      <br />
        
    //     <button
    //     onClick={ onsignUp}
    //     >{
    //         DisabledButton?"No SignUp":"Sign Up"}</button>
    //         <br />
    //         <Link href="/login">visit login page</Link>
    //     </div>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
      {loading ? "Processing..." : "Sign Up"}
    </h1>

    <div className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setuser({ ...user, username: e.target.value })}
          placeholder="Username"
          className="mt-1 w-full text-black px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

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
        onClick={onsignUp}
        disabled={DisabledButton }
        className={`w-full py-2 text-white font-semibold rounded-xl transition duration-300 ${
          DisabledButton ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {DisabledButton ? "No SignUp" : "Sign Up"}
      </button>

      <p className="text-center text-sm mt-4 text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Visit login page
        </Link>
      </p>
    </div>
  </div>
</div>

        

    ) 
}