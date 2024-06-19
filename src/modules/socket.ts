import WebSocket, { type RawData } from "ws";
import http from 'http'

export default function handleSocketConnection(server: http.Server) {
  const socketServer = new WebSocket.Server({ server });
  socketServer.on("connection", (socketConnectionClient: WebSocket) => {
    console.log(`${socketServer.clients.size} users are connected!`);

    //Handle client events...
    socketConnectionClient.on("message", (bufferLike: RawData): void => {
      const data = bufferLike.toString("utf-8");
      socketConnectionClient.send("Message Recieved: " + data);
    });

    socketConnectionClient.on("error", (err: Error): Error => {
      socketConnectionClient.send(`Connection Error: ${err.message}`);
      throw err;
    });
  });
}
