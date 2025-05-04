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

//todos

interface Todo{
    title:string,
    description:string,
    done:boolean,
    userId:number
}
const createTodo = async({title,description,done,userId}:Todo)=>{
    const response = await prisma.todo.create({
        data:{
            title,
            description,
            done,
            userId
        }
    })

    console.log(response)
}

const getTodos = async(userId:number)=>{
    const res = await prisma.todo.findMany({
        where:{
            userId:userId
        }
    })

    console.log("res",res)
}

const getTodosAndUserDetails = async(userId:number)=>{
    const res = await prisma.todo.findMany({
        where:{
            userId:userId
        },
        select:{
            user:{
                select:{
                    username:true,
                    email:true
                }
            },
            title:true,
            description:true
        }
    })

    console.log("response",res)
}

// insertUser("sri","sri@gmail.com","1234");
// updateUser(1,{username:"bs",email:"bs@gmail.com",password:"12345"})
// getUser(1);
// deleteUser(1);
// createTodo({title:"Date",description:"Going to date",done:false,userId:2})
// getTodos(2);
getTodosAndUserDetails(2);
