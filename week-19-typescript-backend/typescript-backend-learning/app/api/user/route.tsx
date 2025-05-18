import { NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json({name:"srinibas",email:"srinibaskhuntia39@gmail.com"})
}
