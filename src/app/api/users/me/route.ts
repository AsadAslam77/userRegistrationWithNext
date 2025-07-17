import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken"
// import { getFromToken } from "@/helpers/getDataFromToken";
import { getFromToken } from "@/helpers/getDataFromToken";

dbConnect();
export async function POST(request: NextRequest) {
    try {
          const userId = await getFromToken(request)
     console.log("data aa raha h")
     console.log("userId:" ,typeof userId ,userId);


    const user = await User.findOne({ _id: userId }).select("-password")


    // if (!user) {
    //     return NextResponse.json({
    //         error: "User not Found"
    //     }, { status: 500 })
    // }


    return NextResponse.json({
        message: "User found",
        data: user

    })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{
            status:500
        })
    }
  
}