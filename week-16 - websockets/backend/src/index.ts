import { WebSocket,WebSocketServer } from "ws";

const wss = new WebSocketServer({port:5000})

wss.on("connection",(ws)=>{

    setInterval(()=>{
        ws.send("current price of solana "+Math.random())
    },1000)
    

    ws.on("message",(msg)=>{
        console.log(msg.toString())
    })
})