import { NextResponse,NextRequest } from "next/server";
import jwt from "jsonwebtoken"


export const  getFromToken=(request:NextRequest)=>{

   

    try {
         const token=request.cookies.get("token")?.value || "";
        const decoded:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        console.log("decpd"+typeof decoded.id)
        return decoded.id

        
    } catch (error:any) {
        return NextResponse.json({
            error:"token Id not found"
        },
    {status:500})
        
    }
}