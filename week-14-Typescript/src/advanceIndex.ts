//Pick
interface User1 {
    firstName:string,
    lastName:string,
    email:string,
    age:number
    dob:Date
}

type UserProfile = Pick<User1,"firstName"|"age">

const getUserProfile = (user:UserProfile)=>{
    console.log(`firstName: ${user.firstName} age: ${user.age}`)
}


getUserProfile({
    firstName:"srinibas",
    age:20
})

//Paritial

interface User4{
    id:string,
    name:string,
    email:string,
    age:number,
    createadAt:Date
}

type userInfo = Pick<User4,"name"|"email">;

type UserInfoPartial = Partial<userInfo>

const getUserProfile2 = (user:UserInfoPartial)=>{
    console.log(`name: ${user?.name} email: ${user?.email}`)
}


getUserProfile2({})