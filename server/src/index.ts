console.log("hello world");
import WebSocket, { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer(function (request: any, response: any) {
  console.log(new Date() + "Received Request for " + request.url);
  response.end("hii there");
});

let userCount: number = 0;
const wss = new WebSocketServer({ server });

wss.on("connection", function connection(socketInstance) {
  socketInstance.on("err", console.error);  
  userCount++;
  socketInstance.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  console.log("user connected \n total " + userCount);

  socketInstance.send("hello, Message sent !");
});

server.listen(8080, function () {
  console.log(new Date() + "server is running on 8080");
});
