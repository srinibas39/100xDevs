

 "use client"
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {

  interface User{
    name:string,
    email:string
  }

  const [user,setUser] = useState<User>({name:"",email:""})
  const [loading,setLoading] = useState(true)

  const getUser = async()=>{
      const res = await axios.get("https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details")
      setUser(res.data)
      setLoading(false)
  }
  useEffect(()=>{
    getUser()
  },[])

  if(loading){
    return <div>loading...</div>
  }

  return !loading && (
     <div>
        <p>Username {user?.name}</p>
        <p>Email {user?.email}</p>
     </div>
  );
}
