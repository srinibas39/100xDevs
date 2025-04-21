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

//Readonly should not be altered after intialization

interface config{
    readonly apiKey:string,
    readonly endPoint:string
}

export const config:config={
    apiKey:"123132",
    endPoint:"something"
}

// config.apiKey = "dasdasd"

//Record --> For writing cleaner objects
interface User5{
    name:string,
    age:number
}

type users = {
    [key:string]:User5
}

export const users:users = {
    'abc123':{name:"a",age:19},
    'cyz354':{name:"b",age:20}
}

//clear way of writing this using Recor

interface User6{
    name:string,
    age:number
}

type users1 = Record<string,User6>

export const allUsers:users1 = {
    'abc123':{name:"a",age:19},
    'cyz354':{name:"b",age:20}
}

//Map is fancier way to set object

interface User7{
    name:string,
    age:number
}

const users2 = new Map<string,User7>();

users2.set('abc123',{name:"a",age:19});
users2.set('abc123',{name:"a",age:19});

console.log(users2);

//Excelude --> if you want to excelude a certain event
type Event = 'click' | 'scroll' | 'mousemove';
type ExcludedScroll = Exclude<Event,'scroll'>;


const getEvent= (e:ExcludedScroll)=>{
    console.log(e)
}

getEvent('click')
// getEvent('scroll')

