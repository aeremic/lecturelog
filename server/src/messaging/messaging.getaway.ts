import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { ErrorConstants } from "src/core/common/constants/error.constant";
import { MessagingConstants } from "src/core/common/constants/messaging.constants";
import { LectureUseCases } from "src/use-cases/lecture/lecture.use-case";
import { LoggerUseCases } from "src/use-cases/logger/logger.use-case";

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

    @SubscribeMessage(MessagingConstants.CreateLectureMessage)
    createRoom(@MessageBody() roomId: any, @ConnectedSocket() client: Socket) {
        try {
            client.join(roomId);
            client.broadcast.emit(MessagingConstants.LecturesChangeMessage, { 'lecturesChangeData': roomId })

            console.log(this.getAllRooms()); // TODO: Remove for PROD.
        }
        catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
        }
        return undefined;
    }

    @SubscribeMessage(MessagingConstants.EndLectureMessage)
    endRoom(@MessageBody() roomId: any, @ConnectedSocket() client: Socket) {
        try {
            client.broadcast.emit(MessagingConstants.LecturesChangeMessage, { 'lecturesChangeData': roomId })
            client.leave(roomId);
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
        }
        return undefined;
    }

    @SubscribeMessage(MessagingConstants.JoinLectureMessage)
    joinRoom(@MessageBody() roomId: any, @ConnectedSocket() client: Socket) {
        try {
            client.join(roomId);
        }
        catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
        }
        return undefined;
    }

    @SubscribeMessage(MessagingConstants.StartTimerMessage)
    startTimer(@MessageBody() roomId: any, @ConnectedSocket() client: Socket) {
        this.lectureUseCases.stopLectureTimer(roomId);
        this.lectureUseCases.startLectureTimer(roomId);
    }

    @SubscribeMessage(MessagingConstants.EnableVerificationMessage)
    enableVerification(@MessageBody() roomId: any) {
        try {
            this.server.in(roomId).emit(MessagingConstants.EnableVerificationAnswerMessage, { 'verificationEnabled': true });
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
        }
        return undefined;
    }

    @SubscribeMessage(MessagingConstants.GenerateCodeMessage)
    generateCode(@MessageBody() roomId: any, @ConnectedSocket() client: Socket) {
        this.lectureUseCases.generateCode(roomId);
    }

    sendTimerEventToLecture(roomId: any, timerEvent: string, counter: number = null) {
        try {
            this.server.in(roomId).emit(MessagingConstants.LectureTimerEventMessage, { 'id': roomId, 'lectureTimerEventType': timerEvent, 'lectureTimerCount': counter ?? -1 });
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
        }
        return undefined;
    }

    sendCodeEventToLecture(roomId: any, codeEvent: number, code: string = null) {
        try {
            this.server.in(roomId).emit(MessagingConstants.LectureCodeEventMessage, { 'id': roomId, 'lectureCodeEventType': codeEvent, 'lectureCodeValue': code ?? '' });
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
        }
        return undefined;
    }
}