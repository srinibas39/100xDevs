
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [socket,setSocket] = useState<WebSocket | null>(null)
  const [message,setMessage] = useState<string>("")
  const handleSend = ()=>{
    // socket.send(e.target.value)
    if(socket?.readyState === WebSocket.OPEN){
      socket?.send(message)
    }
  }

  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:5000")
    setSocket(ws)
    ws.onopen = ()=>{
      console.log("websocket connection established")
    }
    ws.onmessage = (e)=>{
        // alert(e.data)
        console.log(e.data)
    }
    ws.onerror = (e)=>{
      console.error("Webscoket error",e)
    }

    return ()=>{
      ws.close()
    }
  },[])

  return (
    <>
      <div>
           <h1>Web sockets</h1>
           <label>Enter message</label>
           <input type="text" name="message" onChange={e=>setMessage(e.target.value)} value={message}/>
           <button onClick={handleSend} >Send</button>
      </div>
    </>
  )
}

export default App
