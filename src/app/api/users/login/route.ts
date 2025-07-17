import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

dbConnect();
export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const { email, password } = reqBody

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "Email Not Found" },
                { status: 400 }
            )
        }


     const validpassword=  await bcrypt.compare(password,user.password)
     if(!validpassword){
          return NextResponse.json({ error: "Check your Credential" },
                { status: 400 }
            )
     }
     const tokenData={
        id:user._id,
        username:user.username,
        password:user.password
     }

  const token=  jwt.sign(tokenData,process.env.TOKEN_SECRET!,{
    expiresIn:"1d"
   })
console.log("token is",token);


  const Response= NextResponse.json({
    message:"login Successfully",
    succuss:true
   })
   Response.cookies.set("token",token,{
    httpOnly:true
   })
   console.log(Response);
   
   return Response


    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        },
            { status: 500 })

    }
}