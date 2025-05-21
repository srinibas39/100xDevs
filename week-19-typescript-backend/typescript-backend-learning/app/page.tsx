import axios from "axios"
import Link from "next/link";
import client from "./utils/db";


// async function getUser(){
//   const response = await axios.get("http://localhost:3000/api/user")
//   console.log(response)
//   // await delay(5000)`
//   return response.data.user;
// }

async function getUser(){
   try{
    //direct database call
      const user = client.user.findFirst({
        select:{
          name:true
        }
      })
     return user

   }
   catch(e){
    console.log(e)
   }
}

function delay(ms:number){
  return new Promise(resolve=>setTimeout(resolve,ms))
}

export default async function Home() {
  const userData = await getUser()
  return (
    <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center align-center">
            <div className="border p-8 rounded">
                <div>
                    Name: {userData?.name}
                </div>
          
            </div>
            <div className="border p-8 rounded">
                <Link href="/signup"  >Signup</Link>
                <div className="m-4"></div>
                <Link href="/signin">Signin</Link>
            </div>
        </div>
    </div>
  );
}
