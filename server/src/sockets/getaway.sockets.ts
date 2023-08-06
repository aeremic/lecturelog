import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class Getaway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    public server: Server;

    handleConnection(@ConnectedSocket() client: any) {
        console.log('New connection');
    }

    handleDisconnect(@ConnectedSocket() client: any) {
        console.log("Disconnected");
    }

    @SubscribeMessage('createSession')
    createRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        client.join(data);

        return undefined;
    }
}