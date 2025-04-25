import { WebSocket,WebSocketServer } from "ws";

const wss = new WebSocketServer({port:5000})

wss.on("connection",(ws)=>{
    
    console.log("user connected")

    ws.on("message",(msg)=>{
        console.log(msg.toString())
    })
})