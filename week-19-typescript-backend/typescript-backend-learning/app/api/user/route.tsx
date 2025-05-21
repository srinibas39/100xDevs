import client from "@/app/utils/db";
import { NextResponse } from "next/server";


export async function GET(){
    const user  =await  client.user.findFirst({
        select:{
            name:true
        }
    });
    return NextResponse.json({user:user},{status:200})
}
