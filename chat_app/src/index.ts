import {WebSocketServer ,WebSocket} from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface Client {
    socket : WebSocket;
    room : string;  
}

const clients: Client[] = [];

wss.on("connection", (socket) => {
   

    socket.on("message", (data) => {
        const message = JSON.parse(data.toString());
        if(message.type === "join") {
            const client: Client = {
                socket: socket,
                room: message.room
            };
            clients.push(client);
            console.log(`Client joined room: ${message.room}`);
        } else if(message.type === "message") {
            const client = clients.find(c => c.socket === socket);
            if(client) {
                const roomClients = clients.filter(c => c.room === client.room && c.socket !== socket);
                roomClients.forEach(c => {
                    c.socket.send(JSON.stringify({ type: "message", content: message.content }));
                });
            }
        }
    });

     socket.on("close", () => {
        const index = clients.findIndex(
        (client) => client.socket === socket
        );
        if (index !== -1) {
            clients.splice(index, 1);
        }
    });
});