import { Inject, Injectable } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { ErrorConstants } from "src/core/common/constants/error.constant";
import { LoggerUseCases } from "src/use-cases/logger/logger.use-case";

@Injectable()
@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class LecturesGetaway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    private server: Server;

    @Inject(LoggerUseCases)
    private loggerUseCases: LoggerUseCases;

    handleConnection(@ConnectedSocket() client: any) {
        console.log(`${client.id} Connected`); // TODO: Remove for PROD.
    }

    handleDisconnect(@ConnectedSocket() client: any) {
        console.log(`${client.id} Disconnected`); // TODO: Remove for PROD.
    }

    getAllRooms() {
        try {
            return this.server.sockets.adapter.rooms;
        }
        catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
            return undefined;
        }
    }

    @SubscribeMessage('createLecture')
    createLecture(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        try {
            client.join(data);
            client.broadcast.emit('lecturesChange', { 'lecturesChangeData': data })

            console.log(this.getAllRooms()); // TODO: Remove for PROD.
        }
        catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
        }
        return undefined;
    }

    @SubscribeMessage('endLecture')
    endLecture(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        try {
            client.broadcast.emit('lecturesChange', { 'lecturesChangeData': data })
            client.leave(data);
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
        }
        return undefined;
    }

    @SubscribeMessage('joinLecture')
    joinLecture(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        try {
            client.join(data);
        }
        catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
        }
        return undefined;
    }

    @SubscribeMessage('enableVerification')
    enableVerification(@MessageBody() data: any) {
        try {
            this.server.in(data.room).emit('enableVerificationAnswer', { 'verificationEnabled': true });
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
        }
        return undefined;
    }
}