import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import bcrypt from "bcryptjs";
import { sendMail } from "@/helpers/mailer";


dbConnect();
export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const { username, email, password } = reqBody
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json(
                {
                    error: "User already exist"
                },
                { status: 400 }
            )
        }
        //    hashpassword
        const hashpassword =  await bcrypt.hash(password, 10)

        //  add new user in database

        const newUser = new User({
            username, email, password: hashpassword
        })


        console.log(newUser)

        const saveuser = await newUser.save()
        console.log("no "+saveuser._id)

        // send Verification Email
        const mailsend = await sendMail({ email, emailtype: "VERIFY", userId:saveuser._id })
        console.log(mailsend+"");
        return NextResponse.json({message:"User Resgistered Successfully"})
      
    }


    catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 }
        )

    }

}
// function console(){
//     console.log("console")
// }