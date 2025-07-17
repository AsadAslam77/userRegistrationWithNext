import mongoose from "mongoose";
import { Connection } from "mongoose";
export async function dbConnect() {

    try {

        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.Connection;


        mongoose.connection.on('connected', () => {
            console.log("Db connected");
        
        })
         mongoose.connection.on('error', (err) => {
                    console.log("Db Connection error , Make your db is up and running"+err);
                    
            })
            
            



    } catch (error) {
        console.log("Something went Wrong is connecting to Db");
        console.log(error)

    }

}