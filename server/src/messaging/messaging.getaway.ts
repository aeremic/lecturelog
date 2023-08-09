import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class LecturesGetaway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    public server: Server;

    handleConnection(@ConnectedSocket() client: any) {
        console.log('New connection');
    }

    handleDisconnect(@ConnectedSocket() client: any) {
        console.log("Disconnected");
    }

    @SubscribeMessage('createLecture')
    createLecture(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        client.join(data);

        return undefined;
    }

    @SubscribeMessage('joinLecture')
    joinLecture(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        client.join(data);

        return undefined;
    }

    @SubscribeMessage('enableVerification')
    enableVerification(@MessageBody() data: any) {
        this.server.in(data.room).emit('enableVerificationAnswer', { 'verificationEnabled': true });

        return undefined;
    }
}