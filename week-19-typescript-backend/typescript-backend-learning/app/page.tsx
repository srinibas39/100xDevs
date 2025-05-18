
"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {

  interface User{
    name:string,
    email:string
  }

  const [user,setUser] = useState<User>({name:"",email:""})

  const getUser = async()=>{
      const res = await axios.get("https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details")
      setUser(res.data)
  }
  useEffect(()=>{
    getUser()
  },[])
  return (
     <div>
        <p>Username {user?.name}</p>
        <p>Email {user?.email}</p>
     </div>
  );
}
