const x:number = 1;
console.log(x)

function greetName(firstName:string){
    console.log("hello "+firstName)
}

function sum(a:number,b:number) : number{
    return a + b
}

function isLegal(age:number):boolean{
    if(age > 18){
        return true;
    }else{
        return false;
    }
}

function something(innerFunction : ()=>void){
     setTimeout(innerFunction,1000)
}

function  innerFunction(){
    console.log("inner function")
}

something(innerFunction)

//interface

const user ={
    firstName:"srinibas",
    lastName:"khuntia,",
    age:22,
    email:"srinibaskhuntia39@gmail.com"
}

interface User {
    firstName:string;
    lastName:string,
    age:number,
    email:string
}

function legalAge(user :User): boolean{
    if(user.age > 18){
        return true;
    }
    else{
        return false;
    }
}

legalAge(user);

//interface in react

interface TodoType{
    title:string,
    description:string
}

interface TodoInput{
    todo:TodoType
}

function todo({todo} : TodoInput){

}

//interface can be used to implement classes like in jvava
interface Person {
    name:string,
    age:number,
    greet:(phrase:string)=>void
}

class Employee implements Person {
    name: string;
    age: number;

    constructor(n: string, a: number) {
        this.name = n;
        this.age = a;
    }

    greet(phrase: string) {
        console.log(`${phrase} ${this.name}`);
    }
}

//types

type User2 = {
    firstName : string,
    lastName : string,
    age: number
}

//union

type id = string | number

function getId(id:id){
    console.log("ID:",id)
}

getId("hello123");
getId(33);


//intersection
type Emploees = {
    name : string,
    startDate : Date;
}

type Manager = {
    name : string,
    department : string
}

type TeamLead = Emploees & Manager

const teamLead :TeamLead = {
    name:"sri",
    department:"IT",
    startDate:new Date()
}


//Arrays in TS
function maxValue(arr:number[]){
    let max = 0;
    for(let i=0;i<arr.length;i++){
        if(arr[i] > max){
            max=arr[i]
        }
    }

    return max;
}


console.log(maxValue([1,2,3]))

//Example
 type User3 = {
    firstname:string,
    lastname:string,
    age:number
 }

 type UserList = User3[];

 function getLegal(users:UserList){
    return users.filter(user=>user.age>=18)
 }

 let xz=getLegal([
    {
        firstname:"hari",
        lastname:"abc",
        age:17
    },
    {
        firstname:"hariom",
        lastname:"abc",
        age:18
    },
    {
        firstname:"hariiiii",
        lastname:"abc",
        age:20
    },
 ])

 console.log(xz)