import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const insertUser = async(username:string,email:string,password:string)=>{
    const res = await prisma.user.create({
        data:{
            username,
            email,
            password
        }
    })

    console.log("res",res)
}

interface User{
    username:string,
    email:string,
    password:string
}

const updateUser = async(id:number,{username,email,password}:User)=>{
    try{
        const response = await prisma.user.update({
            where:{id},
            data:{username,email,password}
        })
        console.log(response)
    }
    catch(e){
        console.log(e);
    }
}

const getUser = async(id:number)=>{
    try{
        const response = await prisma.user.findFirst({
            where:{
                id:id
            }
        })
        console.log("response",response)
    }
    catch(e){
        console.log(e)
    }
}

const deleteUser = async(id:number)=>{
    try{
        const response = await prisma.user.delete({
            where:{id}
        })

        console.log(response)
    }
    catch(e){
        console.log(e);
    }
}

// insertUser("sri","sri@gmail.com","1234")
// updateUser(1,{username:"bs",email:"bs@gmail.com",password:"12345"})
// getUser(1);
deleteUser(1);

