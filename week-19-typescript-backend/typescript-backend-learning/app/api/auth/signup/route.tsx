import client from "@/app/utils/db";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";




export async function POST(req:NextRequest){
    const body = await req.json()

    const {name,password} = body;

    if(!name || !password){
        NextResponse.json({
            message:"Incorrect data"
        },{status:400})
    }
 
    const res = await client.user.create({
         data:{
            name,
            password
         }
    })

    console.log("res",res)

    return NextResponse.json({
        message:"Succesfully signed up"
    })
}