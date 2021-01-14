import { Server } from "http";
import socketIO from "socket.io";

export default class WebSocket {
    static socket: socketIO.Server;
    constructor(public socket: socketIO.Server | null = null) { };

    static setSocket(httpServer: Server): void {
        this.socket = socketIO(httpServer);
    }

    static getSocket(): socketIO.Server {
        return this.socket;
    }
}