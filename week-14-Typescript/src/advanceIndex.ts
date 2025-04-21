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