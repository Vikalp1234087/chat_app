import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface Client {
  socket: WebSocket;
  room: string;
}

const clients: Client[] = [];
const rooms = new Map<string, Set<WebSocket>>();

function generateRoomId() {
  return `ROOM-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function removeClientFromRoom(socket: WebSocket) {
  const clientIndex = clients.findIndex((client) => client.socket === socket);

  if (clientIndex !== -1) {
    const [client] = clients.splice(clientIndex, 1);
    const roomMembers = rooms.get(client.room);

    if (roomMembers) {
      roomMembers.delete(socket);

      if (roomMembers.size === 0) {
        rooms.delete(client.room);
      }
    }
  }
}

function joinRoom(socket: WebSocket, roomId: string) {
  const existingClient = clients.find((client) => client.socket === socket);

  if (existingClient) {
    removeClientFromRoom(socket);
  }

  const client: Client = {
    socket,
    room: roomId,
  };

  clients.push(client);

  if (!rooms.has(roomId)) {
    rooms.set(roomId, new Set());
  }

  rooms.get(roomId)?.add(socket);

  console.log(`Client joined room: ${roomId}`);
  socket.send(JSON.stringify({ type: "room_joined", roomId }));
}

wss.on("connection", (socket) => {
  socket.on("message", (data) => {
    try {
      const message = JSON.parse(data.toString());

      if (message.type === "create_room") {
        const roomId = message.roomId || generateRoomId();
        joinRoom(socket, roomId);
        socket.send(JSON.stringify({ type: "room_created", roomId }));
        return;
      }

      if (message.type === "join") {
        const roomId = String(message.room || "").trim();

        if (!roomId) {
          socket.send(JSON.stringify({ type: "error", message: "Room ID is required" }));
          return;
        }

        joinRoom(socket, roomId);
        return;
      }

      if (message.type === "message") {
        const client = clients.find((item) => item.socket === socket);

        if (!client) {
          return;
        }

        const roomClients = clients.filter(
          (item) => item.room === client.room && item.socket !== socket
        );

        roomClients.forEach((roomClient) => {
          roomClient.socket.send(
            JSON.stringify({
              type: "message",
              content: message.content,
              sender: message.sender || "Guest",
              isOwn: false,
            })
          );
        });
      }
    } catch (error) {
      console.error("Invalid message received:", error);
      socket.send(JSON.stringify({ type: "error", message: "Invalid message" }));
    }
  });

  socket.on("close", () => {
    removeClientFromRoom(socket);
  });
});

console.log("Chat server running on ws://localhost:8080");