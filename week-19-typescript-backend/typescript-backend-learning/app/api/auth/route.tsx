import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const body = await req.json()
    console.log(body)
    return NextResponse.json({name:body.name,email:body.email})
}