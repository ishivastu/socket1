import "./config/env.js";
import express from "express";
import {createServer} from "http";
import cors from "cors"
import {Server} from "socket.io"


const PORT=process.env.PORT || 8000;

const app=express();

const server=createServer(app);

app.use(
  cors({
    origin: "*",
  }),
);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection",(socket)=>{
  console.log(socket.id)


socket.on("join-room",(roomId)=>{
  console.log(roomId)
  socket.join(roomId);
})

socket.on("send-message",({roomId,msg})=>{
  console.log(msg)
  socket.to(roomId).emit("receive-message",msg)
})


})

server.listen(PORT,()=>{
  console.log("server started...")
})



