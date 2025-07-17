import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConfig";

dbConnect();
export async function GET(request: NextRequest) {
    try {
        const Response = NextResponse.json({
            message: "Loggedout successfully",
            success: true
        })
        Response.cookies.set("token", "", {
            httpOnly: true, expires: new Date(0)
        })
        return Response
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })

    }
}