'use client'
import Link from "next/link"
import axios from "axios"
import { useEffect, useState } from "react"
// import { error } from "console"

export default function verifyEmailPage() {
    const [token, setToken] = useState('')
    const [Verified, setVerified] = useState(false)
    const [Error, setError] = useState(false)
   
   
    const verifyUserEmail = async () => {
        // console.log("verifyuser");
        try {
            
            await axios.post("/api/users/verifyemail", { token })
            setVerified(true)

        } catch (error: any) {
            setError(true)
            console.log(error.response.data);
        }
    }

useEffect(()=>{
   const tokenUrl= window.location.search.split("=")[1]
   setToken(tokenUrl || '')
},[])
useEffect(()=>{
    verifyUserEmail()
    if(token.length > 0){
        verifyUserEmail()
    }
})

    return (
//         <div>
//             <h1>Verify Email</h1>
//             <h2>{
//                 token?`${token}`:"no token"
                
//                 }</h2>

//            {
//             Verified &&(
//                 <div>
//                     <h2>verified</h2>
//                     <Link href="/login">login</Link>
//                 </div>
//             )
//            }
           
// {/* 
//            {Error &&(
//              <div>
//                     <h2>ERROR</h2>
                    
//                 </div>
//            )} */}

//         </div>
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
  <h1 className="text-3xl font-bold mb-4 text-gray-800">Verify Email</h1>
  <h2 className="text-lg text-gray-600 mb-6">
    {token ? `${token}` : "no token"}
  </h2>

  {Verified && (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-2">Verified</h2>
      <Link href="/login" className="text-blue-600 hover:underline">
        Login
      </Link>
    </div>
  )}
</div>

        
    )
}