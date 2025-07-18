import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
// import { MailtrapClient } from "mailtrap"


export const sendMail = async ({ email, emailtype, userId }: any) => {

    try {
        if (!userId) {
            throw new Error("userId is missing");
        }
        const hash_verifyToken = await bcrypt.hash(userId.toString(), 10)

        if (emailtype === "VERIFY") {
            await User.findByIdAndUpdate(userId,{$set:{
                 
                verifyToken: hash_verifyToken,
                verifyTokenExpiry: Date.now() + 360000
            }
            })
        }
        else if (emailtype === "RESET") {
            await User.findByIdAndUpdate(userId, {$set: {
                forgotPasswordToken: hash_verifyToken,
                forgotPasswordTokenExpiry: Date.now() + 360000
            }})
        }


        console.log("transport")
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "d4c277bb0a6b16",
                pass: "cfa2714e4d20d3"
            }
        });

        // const { MailtrapTransport } = require("mailtrap");

        // const TOKEN = "<YOUR_API_TOKEN>";
        // const transport = nodemailer.createTransport(
        //     MailtrapTransport({
        //         token: TOKEN,
        //     })
        // );




        const mailOption = {
            from: 'malisial30023@gmail.com',
            to: email,
            subject: emailtype === 'VERIFY' ? "verify your email" : "Rest your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hash_verifyToken}">here</a> 
            to ${emailtype === 'VERIFY' ? "verify your email" : "Rest your Password"}  or copy and paste
            the link below in your browser <br/>${process.env.DOMAIN}/verifyemail?token=${hash_verifyToken} </p>`, // HTML body
        }

        const emailResponse = await transport.sendMail(mailOption)
        return emailResponse


    } catch (error: any) {

        throw new Error("message error: " + error.message);

    }

}