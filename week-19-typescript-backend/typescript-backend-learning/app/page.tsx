import axios from "axios"


async function getUser(){
  const response = await axios.get("https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details")
  // await delay(5000)
  return response.data;
}

function delay(ms:number){
  return new Promise(resolve=>setTimeout(resolve,ms))
}

export default async function Home() {
  const userData = await getUser()
  return (
    <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center">
            <div className="border p-8 rounded">
                <div>
                    Name: {userData?.name}
                </div>
                
                {userData?.email}
            </div>
        </div>
    </div>
  );
}
