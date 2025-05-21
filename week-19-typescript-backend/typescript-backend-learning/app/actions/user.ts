
"use server"
import client from "../utils/db";

export async function signup(name:string,password:string){
    try{
        const user  = await client.user.create({
            data:{
                name,
                password
            }
        })

        return "Signed up"
    }
    catch(e){
        console.log(e);
    }
}