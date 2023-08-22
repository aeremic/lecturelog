import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { ErrorConstants } from "src/core/common/constants/error.constant";
import { LectureUseCases } from "src/use-cases/lecture/lecture.use-case";
import { LoggerUseCases } from "src/use-cases/logger/logger.use-case";
import { SubjectUseCases } from "src/use-cases/subject/subject.use-case";

@Injectable()
@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class MessagingGetaway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    private server: Server;

    @Inject(forwardRef(() => LectureUseCases))
    private lectureUseCases: LectureUseCases;

    @Inject(LoggerUseCases)
    private loggerUseCases: LoggerUseCases;

    handleConnection(@ConnectedSocket() client: any) {
        console.log(`${client.id} Connected`); // TODO: Remove for PROD.
    }

    handleDisconnect(@ConnectedSocket() client: any) {
        console.log(`${client.id} Disconnected`); // TODO: Remove for PROD.
    }

    getAllRooms() {
        return this.server.sockets.adapter.rooms;
    }

    @SubscribeMessage('createLecture')
    createLecture(@MessageBody() roomId: any, @ConnectedSocket() client: Socket) {
        try {
            client.join(roomId);
            client.broadcast.emit('lecturesChange', { 'lecturesChangeData': roomId })

            console.log(this.getAllRooms()); // TODO: Remove for PROD.
        }
        catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
        }
        return undefined;
    }

    @SubscribeMessage('endLecture')
    endLecture(@MessageBody() roomId: any, @ConnectedSocket() client: Socket) {
        try {
            client.broadcast.emit('lecturesChange', { 'lecturesChangeData': roomId })
            client.leave(roomId);
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
        }
        return undefined;
    }

    @SubscribeMessage('joinLecture')
    joinLecture(@MessageBody() roomId: any, @ConnectedSocket() client: Socket) {
        try {
            client.join(roomId);
        }
        catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
        }
        return undefined;
    }

    @SubscribeMessage("startTimer")
    startTimer(@MessageBody() roomId: any, @ConnectedSocket() client: Socket) {
        this.lectureUseCases.stopLectureTimer(roomId);
        this.lectureUseCases.startLectureTimer(roomId);
    }

    @SubscribeMessage('enableVerification')
    enableVerification(@MessageBody() roomId: any) {
        try {
            this.server.in(roomId).emit('enableVerificationAnswer', { 'verificationEnabled': true });
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
        }
        return undefined;
    }

    sendTickEventToLecture(roomId: any, timerEvent: string) {
        try {
            this.server.in(roomId).emit('lectureTimerTickEvent', { 'id': roomId, 'lectureTimerTickEvent': timerEvent });
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
        }
        return undefined;
    }
}